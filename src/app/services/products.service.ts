import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products : any[] = [];
  cart : any[] = [];
  productsSub;
  cartSub;

  constructor(private http: HttpClient) {
    this.productsSub = new BehaviorSubject<any[]>(this.products);
    this.cartSub = new BehaviorSubject<any[]>(this.cart);
  }

  fetchProducts() {
    this.http.get<any[]>('api/products').subscribe(data => {
    this.products = [...data];
    this.productsSub.next([...this.products]);

    })
   }

  getProducts() {
    return this.productsSub.asObservable();
  }

  getCart() {
    return this.cartSub.asObservable();
  }

  addToCart(id: any) {
    const product  = this.findItemInProducts(id);
    if(product.length !== 0) {
      if(this.findItemInCart(id).length) {
        this.removeFromCart(id);
      } else {
        this.cart.push(product[0]);
      }
      this.cartSub.next([...this.cart]);
    }
  }

  removeFromCart(id: any) {
    if(this.findItemInCart(id).length) {
      const item = this.findItemInCart(id)[0];
      const index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
    }
    this.cartSub.next([...this.cart]);
  }

  clearFromCart() {
    this.cartSub.next([]);
  }

  findItemInCart(id: any) {
    const item = this.cart.filter(products => products._id === id);
    return item;
  }

  findItemInProducts(id: any) {
    const item = this.products.filter(product => product._id === id);
    return item;
  }

  checkout(data: any) {
    return this.http.post('/api/checkout', data);
  }

}

