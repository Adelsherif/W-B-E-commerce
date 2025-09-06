import { Component } from '@angular/core';
import { MainSection } from '../../components/main-section/main-section';
import { Products } from '../../components/products/products';
import { Category } from "../../components/category/category";

@Component({
  selector: 'app-home',
  imports: [MainSection, Products, Category],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
