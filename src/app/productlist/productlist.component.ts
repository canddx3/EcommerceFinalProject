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
  addItemToCart(item: { id: any; }) {
    this.productsService.addToCart(item.id);
  }
}
