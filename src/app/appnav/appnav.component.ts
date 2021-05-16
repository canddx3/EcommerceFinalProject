import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appnav',
  templateUrl: './appnav.component.html',
  styleUrls: ['./appnav.component.css']
})
export class AppnavComponent implements OnInit {
  cart : any[] = [];
  constructor(private productServcie: ProductsService) { }

  ngOnInit() {
    this.productServcie.getCart().subscribe(data => {
      this.cart = [ ...data];
    });
  }
}
