import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products : any[] = [];
  productsSub;
  constructor() {
    this.productsSub = new BehaviorSubject<any[]>(this.products);
  }

  fetchProducts() {
    const items = [
      {
        id:1,
        name:'course name',
        description: 'sdjfjasdflkj',
        image: "https://www.bikesonline.com/assets/full/24680.jpg?20210317031457",
        price: 12,
      }
    ];
      this.products = [...items];
    this.productsSub.next([...this.products]);

   }


  getProducts() {
    return this.productsSub.asObservable();
  }
}
