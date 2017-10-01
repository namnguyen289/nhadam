import { Component } from '@angular/core';

// import { ContactPage } from '../contact/contact';
import {ListCustomerPage} from '../list-customer/list-customer'
import {ListOrderPage} from '../list-order/list-order';
import {ListCampaignPage} from '../list-campaign/list-campaign'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = ListCampaignPage;
  tab1Root = ListCustomerPage;
  tab2Root = ListOrderPage;
  // tab3Root = ContactPage;

  constructor() {

  }
}
