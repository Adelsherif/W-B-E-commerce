import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { ProductsService } from '../../core/services/productsAPI/products.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  isMenuOpen = false;
  count!:number;

  constructor (private _productsservices:ProductsService){}
ngOnInit(): void {
 this._productsservices.cartCount$.subscribe(data =>{
    this.count = data;
  })
  this._productsservices.updateCartCount();
}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
