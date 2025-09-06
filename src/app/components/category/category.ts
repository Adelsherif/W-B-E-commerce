import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { CategoryInterface } from '../../core/interfaces/category-interface';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  allCategories!:CategoryInterface[];
  loading!:boolean;

  constructor (private _productsservice: ProductsService){
    this.getCategories();
  }


  getCategories(){
    this.loading = true;
    this._productsservice.getAllCategory().subscribe({
      next: (data) =>{
        this.allCategories = data.data;
        this.loading = false;
      },
      error: (err) => console.log(err)

    })
  }
}
