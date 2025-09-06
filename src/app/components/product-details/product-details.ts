import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { Skleton } from '../skleton/skleton';
import { CartProduct } from '../../core/interfaces/cart-product';
import { CartProducts } from '../../core/interfaces/cart';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,Skleton ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit{
  loading!:boolean;
  product!:Product;
  quantity = 1;
  imageSrc!:string;
  productAdded!:boolean;
  btnClicked!:boolean;
  stored = localStorage.getItem("cart");
  cart: CartProduct[] = this.stored ? JSON.parse(this.stored) : localStorage.setItem('cart',JSON.stringify([]));
  productInCart!:boolean;


  constructor (private route:ActivatedRoute,private _productsservices:ProductsService){

    console.log( this.route.snapshot.paramMap.get('id'));

  }

    ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getProductData(id);
      }
    });
  }


  getProductData(id:string){
    this.loading = true;
    if(id){
    this._productsservices.oneProduct(id).subscribe({
      next: (data) =>{
        this.loading = false,
        this.product = data.data,
         console.log(data.data)
      },
      error: (err) => console.log(err),
    })
    }
  }

  imageCover(source:string){
    this.imageSrc = source;
  }


  putProductToCart(productId:string,numberofPieces:number){
  this.btnClicked = true;
  this.productAdded = false;
    if(localStorage.getItem('token')){

      this._productsservices.cartOfProducts().subscribe({
        next:(data) =>{
          this.productInCart = data.data.products
          .some((product:CartProducts) => product.count === numberofPieces && product.product._id === productId  )
          console.log(this.productInCart);
        },
        error:(err) => console.log(err)
      })

      if(!this.productInCart){
 this._productsservices.postCart(productId,numberofPieces).subscribe({
    next:data => {
      this.productAdded = true;
      this._productsservices.updateCartCount()
         this._productsservices.updateCartItem(productId, numberofPieces).subscribe({
        next: (res) => {
          console.log("Updated:", res);
        },
        error: (err) => console.error(err)
      });
    },
    error: (err) => console.log(err),
    complete:() =>{
        this.productAdded = true;
        this.btnClicked = false
    }
  }
  )
      }


}
    else{
      if(localStorage.getItem('cart')){
         this.productInCart = this.cart.some((product) => product.productId === productId && product.count === numberofPieces) ;
        if(!this.productInCart){
          this.cart = this.cart.filter((product) => product.productId !== productId);
          this.cart.push({productId:productId,count:numberofPieces});
          localStorage.setItem('cart',JSON.stringify(this.cart));
          this.btnClicked = false;
          this.productAdded = true;
          this._productsservices.updateCartCount();
        }
        else{
          this.btnClicked = false;
          this.productAdded = false;
        }
      };
    }
  }

}
