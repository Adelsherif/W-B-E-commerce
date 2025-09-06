import { Component } from '@angular/core';
import { MainSection } from '../../components/main-section/main-section';
import { Category } from '../../components/category/category';
import { Products } from '../../components/products/products';

@Component({
  selector: 'app-public-home',
  imports: [MainSection,Category,Products],
  templateUrl: './public-home.html',
  styleUrl: './public-home.scss'
})
export class PublicHome {

}
