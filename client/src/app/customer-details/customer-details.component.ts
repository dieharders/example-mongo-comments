import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { animView } from '../animations/transitions.animation'; // Anim file

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  animations: [animView] // add our animations
})
export class CustomerDetailsComponent implements OnInit {

  comment = new Customer();
  submitted: boolean = false;
  message: string;
  hobbyInputVal: string;
  showSpinner: boolean = true; // Loading spinner stuff

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hobbyInputVal = '';
    // Get the customer details via their id in url from server
    this.customerService.getCustomer(id)
      .subscribe(comment => {
        this.comment = comment;
        this.showSpinner = false; // Hide spinner
        this.hobbyInputVal = '';
      });
  }

  deleteHobby(hobby): void {
    for (let index = 0; index < this.comment.hobbies.length; index++) {
      if (this.comment.hobbies[index] == hobby) {
        // Delete this item from array
        this.comment.hobbies.splice(index, 1);
      }
    }
  }

  formSubmitHobby(hobby): void {
    if (hobby != '') {
      console.log(hobby+', added to hobbies');
      // Add a hobby to start of array
      if (!this.comment.hobbies) {
        this.comment.hobbies = [];
      }
      this.comment.hobbies.unshift(hobby);
      this.hobbyInputVal = ''; // Clear hobby input val
    }
  }

  update(): void {
    this.submitted = true;
    this.customerService.updateCustomer(this.comment)
        .subscribe(result => {
          this.message = "Hero Updated Successfully!";
          this.hobbyInputVal = ''; // Clear hobby input val
        });
  }

  delete(): void {
    this.submitted = true;
    this.customerService.deleteCustomer(this.comment._id)
        .subscribe(result => this.message = "Hero Deleted Successfully!");
  }

  goBack(): void {
    this.location.back();
  }
}