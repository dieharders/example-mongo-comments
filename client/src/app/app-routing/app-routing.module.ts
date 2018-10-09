import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

const routes: Routes = [
   { 
     path: 'comments', 
     component: CustomerComponent 
   },
   { 
     path: 'comment/add', 
     component: AddCustomerComponent 
   },
   { 
     path: 'comments/:id',
     component: CustomerDetailsComponent 
   },
   { 
     path: '', 
     redirectTo: 'comments', 
     pathMatch: 'full'
   }, 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}