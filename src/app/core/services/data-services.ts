import { Injectable } from '@angular/core';
import { CartProduct } from '../interfaces/cart-product';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';
import { ProductsService } from './productsAPI/products.service';

@Injectable({
  providedIn: 'root'
})
export class DataServices {
    addToCart!:boolean;
    stored = localStorage.getItem("cart");
    cart: CartProduct[] = this.stored ? JSON.parse(this.stored) : localStorage.setItem('cart',JSON.stringify([]));
    productInCart!:boolean;


      constructor (private router:Router,private _productsService:ProductsService){
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

  getProduct(id:string){
    if(localStorage.getItem('token')){
    this.router.navigate(['user/details', id]);
    }
    else{
    this.router.navigate(['details', id]);
    }
  }
}
