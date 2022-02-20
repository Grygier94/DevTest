import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  private customerId: number;

  public customer: CustomerModel;

  constructor(
    route: ActivatedRoute,
    private customerService: CustomerService) {
    this.customerId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.customerService
      .GetCustomer(this.customerId)
      .subscribe(customer => this.customer = customer);
  }
}
