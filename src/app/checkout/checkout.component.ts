import { ProductsService } from '../services/products.service';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  noItemsInCart = [];
  cart : any[] = [];
  cartTotal = 0;
  checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
      this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    })
  }

  doCheckout() {
    console.log(this.checkoutForm.value);
  }

}
