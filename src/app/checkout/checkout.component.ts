import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  noItemsInCart = [];
  cart = [1];
  constructor() { }

  ngOnInit(): void {
  }

}
