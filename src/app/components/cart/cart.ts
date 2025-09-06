import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { CartProducts } from '../../core/interfaces/cart';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Skleton } from '../skleton/skleton';
import { Product } from '../../core/interfaces/product';
import { CartProduct } from '../../core/interfaces/cart-product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,MatIconModule,Skleton],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit{
  allData!:CartProducts[];
  dataFromStorage!:Product[];
  total:number = 0;
  loading!:boolean;
  loadingId!:string;
  deleteLoader!:boolean;
  dataOfCart!:CartProduct[];
  token = localStorage.getItem('token');
  dataS!:CartProduct[];

  constructor (private _productapiservices:ProductsService) {}

ngOnInit(): void {
    this.getCartProducts();
    this._productapiservices.updateCartCount();
}

  getCartProducts(){
    this.loading = true;
    if(localStorage.getItem('token')){
      this._productapiservices.cartOfProducts().subscribe({
      next:(data) =>{
        this.allData = data.data.products;
        this.total = data.data.totalCartPrice;
        this.loading = false
        console.log( data.data);
      },
      error: (data) =>{
          console.log(data);
      },
      complete:() =>{}
    })}
    else{
      if(localStorage.getItem('cart') ){
          this.dataOfCart =  JSON.parse(localStorage.getItem('cart')!)
         this._productapiservices.allProducts().subscribe({
      next:(data) =>{
   this.dataFromStorage = data.data
  .filter((product: Product) =>
    this.dataOfCart.some(element => product.id === element.productId)
  )
  .map((product: Product) => {
    const cartItem = this.dataOfCart.find(element => element.productId === product.id);
    this.total = cartItem ? this.total + product.price * cartItem.count : 0;
    return {
      ...product,
      count: cartItem ? cartItem.count : 1
    } ;
  }
);
        this.loading = false
      },
      error: (data) =>{
          console.log(data);
      }
    })}}
  }
  deleteProduct(id:string){
    this.deleteLoader = true;
    this._productapiservices.deleteProductFromCart(id).subscribe(
      data => {
        this.allData = this.allData.filter(product => product.product.id !== id)
        this.total = data.data.totalCartPrice;
        this.deleteLoader = false;
        this._productapiservices.updateCartCount()
      }
    )
  }
  deleteProductFromStorage(id:string,count:number,price:number){
      if(localStorage.getItem('cart') ){
        this.dataS = JSON.parse(localStorage.getItem('cart')!);
        if(this.dataS){
        this.dataOfCart = this.dataS!.filter(p => p.productId != id)
        localStorage.setItem('cart',JSON.stringify(this.dataOfCart))
        this.total =0;
        this.getCartProducts();
        this._productapiservices.updateCartCount();
        }
      }
  }
}
