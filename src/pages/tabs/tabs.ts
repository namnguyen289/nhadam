import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import {ListCustomerPage} from '../list-customer/list-customer'
import {ListOrderPage} from '../list-order/list-order';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListCustomerPage;
  tab2Root = ListOrderPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
