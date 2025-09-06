import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipePipe implements PipeTransform {

  transform(products:Product[],category:string) {

    console.log(products);
    console.log(category);


    return products.filter(product => product.category.name === category);

  }

}
