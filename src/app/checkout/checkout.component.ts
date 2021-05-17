import { ProductsService } from '../services/products.service';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
    state: ['', Validators.required],
    country: ['', Validators.required],
    zip: ['', Validators.required],
  });
  constructor(private router: Router, private fb: FormBuilder, private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getCart().subscribe(data => {
      this.cart = [...data];
      this.cartTotal = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    })
  }

  doCheckout() {
    const order = {
      ...this.checkoutForm.value,
      items: this.cart
    }
    this.productsService.checkout(order)
    this.productsService.checkout(order).subscribe(res => {
      // snack bar isnt working
      // const snackbar = document.getElementById('snackbar');
      // snackbar.innerHTML = 'Order placed successfully';
      // snackbar.className = 'show';
      // setTimeout(() => {
        // snackbar.className = snackbar.className.replace('show', '')
        this.productsService.clearFromCart();
        this.router.navigate(['/products']);
      // }, 3000);

    });;
  }

}
