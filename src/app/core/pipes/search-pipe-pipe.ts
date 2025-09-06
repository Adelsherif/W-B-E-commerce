import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/productsAPI/products.service';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
  constructor(private _productsServices:ProductsService) {

  }
  transform(data:Product[],value:string): any {


if(data){
return data.filter(item => item.title.includes(value));

}
  }
}
