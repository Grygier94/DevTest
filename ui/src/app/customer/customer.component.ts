import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: CustomerModel[] = [];
  public customerTypes: string[] = ["Small", "Large"];

  public newCustomer: CustomerModel = {
    customerId: null,
    name: null,
    type: null
  };

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.GetCustomers().subscribe(customers => this.customers = customers);
  }

  public createCustomer(form: NgForm): void {
    this.validateName(form);
    if (form.invalid) {
      alert('form is not valid');
    } else {
      this.customerService.CreateCustomer(this.newCustomer).then(() => {
        this.customerService.GetCustomers().subscribe(customers => this.customers = customers);
      });
    }
  }

  public validateName(form: NgForm) {
    if (form.controls['name'].value?.trim().length < 5) {
      form.controls['name'].setErrors({ 'invalid': true });
    }
  }
}
