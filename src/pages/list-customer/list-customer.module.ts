import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCustomerPage } from './list-customer';


@NgModule({
  declarations: [
    ListCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCustomerPage),
  ],
})
export class ListCustomerPageModule {}
