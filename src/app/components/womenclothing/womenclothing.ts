import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { Product } from '../../core/interfaces/product';
import { CategoryPipePipe } from '../../core/pipes/category-pipe-pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DataServices } from '../../core/services/data-services';

@Component({
  selector: 'app-womenclothing',
  imports: [CategoryPipePipe,CommonModule,MatIconModule],
  templateUrl: './womenclothing.html',
  styleUrl: './womenclothing.scss'
})
export class Womenclothing {
  allProducts!:Product[];
  loading!:boolean;
  count = 15;
  loadingId!:String;

  constructor (private _productsServices:ProductsService,private dataServices:DataServices) {
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this._productsServices.allProducts().subscribe({
      next:(data) => {
        console.log(data);
        this.allProducts = data.data;
      }  ,
      error: (err) => console.log(err),
      complete:() => this.loading = false

    })
  }

  putToCart(id:string,count:number){
    this.dataServices.putProductToCart(id,count)
  }

  getProductDetails(id:string){
    this.dataServices.getProduct(id);
  }

range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
}
