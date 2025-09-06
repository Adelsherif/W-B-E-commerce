import { Component } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { DataServices } from '../../core/services/data-services';
import { CategoryPipePipe } from '../../core/pipes/category-pipe-pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-electronics',
  imports: [CategoryPipePipe,CommonModule,MatIconModule],
  templateUrl: './electronics.html',
  styleUrl: './electronics.scss'
})
export class Electronics {

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
