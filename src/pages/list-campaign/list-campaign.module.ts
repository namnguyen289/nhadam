import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCampaignPage } from './list-campaign';

@NgModule({
  declarations: [
    ListCampaignPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCampaignPage),
  ],
})
export class ListCampaignPageModule {}
