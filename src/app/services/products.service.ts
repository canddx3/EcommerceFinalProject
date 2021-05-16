import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products : any[] = [];
  cart : any[] = [];
  productsSub;
  cartSub;

  constructor() {
    this.productsSub = new BehaviorSubject<any[]>(this.products);
    this.cartSub = new BehaviorSubject<any[]>(this.cart);
  }

  fetchProducts() {
    const items = [
      {
        id:1,
        name:'2021 polygon vander t7',
        description: 'VANDER T bikes boast all-rounder trail geometry with moderate chainstay and wheelbase lengths combined with a relaxed head angle; these bikes feel agile in twisty trails while ensuring confidence at high speed.',
        image: "https://www.bikesonline.com/assets/full/24680.jpg?20210317031457",
        price: 1700,
      },
      {
        id:2,
        name:'Session 8 29 GX',
        description: 'Session 8 is a downhill mountain bike with a robust alloy frame and high-pivot suspension design that keeps you nimble, planted, and blazing fast on even the most punishing runs.',
        image: 'https://trek.scene7.com/is/image/TrekBicycleProducts/Session829GX_22_34624_A_Portrait?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440',
        price: 5000
      }
    ];
      this.products = [...items];
    this.productsSub.next([...this.products]);

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

  findItemInCart(id: any) {
    const item = this.cart.filter(products => products.id === id);
    return item;
  }

  findItemInProducts(id: any) {
    const item = this.products.filter(product => product.id === id);
    return item;
  }
}

