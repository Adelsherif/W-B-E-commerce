import { Product } from './../../core/interfaces/product';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { CartProduct } from '../../core/interfaces/cart-product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  loading! : boolean;
  count = 15;
  allProducts !: Product[];
  addToCart!:boolean;
  loadinId!:String;
  stored = localStorage.getItem("cart");
  cart: CartProduct[] = this.stored ? JSON.parse(this.stored) : localStorage.setItem('cart',JSON.stringify([]));
  productInCart!:boolean;

  constructor (private router:Router,private _productsService:ProductsService){
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    this.loading = true
    this._productsService.allProducts().subscribe({
      next: (data) =>{
      this.allProducts = data.data
      } ,
      error :() => console.log('error'),
      complete : () =>{
      this.loading = false
      }
    }
    )
   }

  getProduct(id:string){
    if(localStorage.getItem('token')){
    this.router.navigate(['user/details', id]);
    }
    else{
    this.router.navigate(['details', id]);
    }
   }

  putProductToCart(productId:string,numberofPieces:number){
    //this.addToCart = true;

    if(localStorage.getItem('token')){
      this._productsService.postCart(productId,numberofPieces).subscribe({
    next:data => {
      this.router.navigate(['user/cart'])
    this.addToCart = false;
         this._productsService.updateCartItem(productId, numberofPieces).subscribe({
        next: (res) => {

          console.log("Updated:", res);
        },
        error: (err) => console.error(err)
      });
      this._productsService.updateCartCount()
    },
    error: (err) => console.log(err)
    }
  )
    }
    else{
      if(localStorage.getItem('cart')){
         this.productInCart = this.cart.some((product) => product.productId === productId) ;
        if(!this.productInCart){
          this.cart.push({productId:productId,count:numberofPieces});
          localStorage.setItem('cart',JSON.stringify(this.cart));
          this._productsService.updateCartCount();
        }
      this.router.navigate(['cart'])
      };
    }
}

range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
}
