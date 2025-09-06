import { baseurl } from './../../apiroute/baseurl';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService  {

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  constructor (private _httpclient:HttpClient){

  }
  allProducts() :Observable<any>{
    return this._httpclient.get(`${baseurl}/api/v1/products`)
  }
  oneProduct (productid:string) :Observable<any>{
    return this._httpclient.get(`${baseurl}/api/v1/products/${productid}`)
  }
  cartOfProducts() :Observable<any>{
    return this._httpclient.get(`${baseurl}/api/v1/cart`,{
  headers: {
    token: localStorage.getItem("token") || ""
  }
})}

postCart(productId: string, count: number) :Observable<any>{
  return this._httpclient.post(`${baseurl}/api/v1/cart`,{productId, count },{
     headers: {
    token: localStorage.getItem("token") || ""
  }
  })
}

updateCartItem(productId: string, count: number): Observable<any> {
  return this._httpclient.put(`${baseurl}/api/v1/cart/${productId}`,
    { count },
    {
      headers: {
        token: localStorage.getItem("token") || ""
      }
    }
  );
}

 updateCartCount() {
  if(localStorage.getItem('token')){
this.cartOfProducts().subscribe({
      next: (data: any) => {
        this.cartCount.next(data.numOfCartItems);
      },
      error: (err) => console.error(err)
    });
  }
  else{
    if(localStorage.getItem('cart')){
      const cartData: Object[] = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartCount.next(cartData.length)
    }
  }

  }

deleteProductFromCart(id:string) :Observable<any>{
  return this._httpclient.delete(`${baseurl}/api/v1/cart/${id}`,{
  headers: {
    token: localStorage.getItem("token") || ""
  }
  }
  )
}

getAllCategory() :Observable<any>{
  return this._httpclient.get(`${baseurl}/api/v1/categories`,)
}
}
