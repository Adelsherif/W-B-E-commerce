import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { jwtDecode } from "jwt-decode";
import { ProductsService } from '../../core/services/productsAPI/products.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SearchPipePipe } from '../../core/pipes/search-pipe-pipe';
import { Product } from '../../core/interfaces/product';
import {  Router, ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, CommonModule, FormsModule, SearchPipePipe,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
 isMenuOpen = false;
 userName!:string;
 count!:number;
 loading!:boolean;
 searcValue!:string;
 allData!:Product[];
 userToken :boolean = localStorage.getItem('token') ? true :false;

 constructor (private _productsService:ProductsService,private router:Router,private route:ActivatedRoute){

}

  ngOnInit() :void{

  this.numberOfCart();
  this._productsService.cartCount$.subscribe(data =>{
    this.count = data;
  })

const token = localStorage.getItem('token');

if (token) {
  const decoded: any = jwtDecode(token);
  this.userName = decoded.name;
}

  this.getSearchProducts();
}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout(){
    return localStorage.removeItem('token')
}

getSearchProducts(){
      this._productsService.allProducts().subscribe({
      next:(data) => {
        this.allData = data.data;
      }
      ,
      error : (err) =>console.log(err)
    })
}
numberOfCart(){
  this.loading = true;
  if(this.userToken){
  this._productsService.cartOfProducts().subscribe({
    next:(data) => {
      this.loading = false;
      this._productsService.updateCartCount();
      this.count = data.numOfCartItems;
    },
    error:(err) => console.log(err)
  })
}
}

  getProductData(id:string){
    if(id){
      this.searcValue = '';
        this.router.navigate(['user/details',id])
    }
  }

}
