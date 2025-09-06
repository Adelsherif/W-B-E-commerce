import { Product } from './../../core/interfaces/product';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { CartProduct } from '../../core/interfaces/cart-product';
import { DataServices } from '../../core/services/data-services';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatIcon],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  loading! : boolean;
  count = 15;
  allProducts !: Product[];
  loadingId!:String;
  stored = localStorage.getItem("cart");
  cart: CartProduct[] = this.stored ? JSON.parse(this.stored) : localStorage.setItem('cart',JSON.stringify([]));
  productInCart!:boolean;

  constructor (private router:Router,private _productsService:ProductsService,private dataservices:DataServices){
  }

  ngOnInit(): void {
    this.getData();
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

  getProductDetails(id:string){
  this.dataservices.getProduct(id);
   }

  putToCart(id:string,count:number){
    this.dataservices.putProductToCart(id,count)
}

range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
}
