import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products : any[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.fetchProducts();
    this.productsService.getProducts().subscribe(data => {
      this.products = [...data];
    });
  }
  addItemToCart(item: { _id: any; }) {
    this.productsService.addToCart(item._id);
  }

  itemInCart(item: { _id: any; }) {
    return this.productsService.findItemInCart(item._id);
  }
}
