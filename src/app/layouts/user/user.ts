import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from "@angular/router";
import { Navbar } from '../../components/navbar/navbar';
import { Home } from '../../pages/home/home';
import { Products } from '../../components/products/products';
import { CartProduct } from '../../core/interfaces/cart-product';
import { ProductsService } from '../../core/services/productsAPI/products.service';

@Component({
  selector: 'app-user',
  imports: [Navbar,Home,Products, Footer, RouterOutlet],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User {

  constructor (private _productsService:ProductsService){
    this.posttDataFromStorage();
  }
    posttDataFromStorage(){
     if(localStorage.getItem('token')){
      if(localStorage.getItem('cart')){
        const mydata:CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
        console.log(mydata);
        mydata.forEach((element) => {
          this._productsService.postCart(element.productId, element.count).subscribe({
            next:(data) =>{
                   this._productsService.updateCartCount()
         this._productsService.updateCartItem(element.productId, element.count).subscribe({
        next: (res) => {
          console.log("Updated:", res);
        },
        error: (err) => console.error(err)
      });
            },
            error:(err) => console.log(err),
            complete:() =>{
              localStorage.setItem("cart",JSON.stringify([]))
            }
        })
        });
      }
    }
  }
}
