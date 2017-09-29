import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import {CampaignPage} from '../campaign/campaign';
import {CommonDataProvider} from '../../providers/common-data/common-data';

/**
 * Generated class for the ListCampaignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-campaign',
  templateUrl: 'list-campaign.html',
})
export class ListCampaignPage {

  camps:any[];
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public modalCtrl: ModalController
    , public alertCtrl: AlertController
    , public loadingCtrl: LoadingController 
    ,public cdt:CommonDataProvider) {
      this.loading.present();
      this.cdt.getCampaigns().subscribe(data=>{
        this.camps = data.sort((a,b)=>{
          if((new Date(a.cookDate)) > (new Date(b.cookDate)))
            return -1;
          if((new Date(a.cookDate)) < (new Date(b.cookDate)))
            return 1;
          return 0;
        });
        this.loading.dismiss();
      });
  }

  createCampaign(){
    // let modal = this.modalCtrl.create(CampaignPage);
    // modal.present();
    this.navCtrl.push(CampaignPage);
  }
  deleteCamp(camp){
    let confirm = this.alertCtrl.create({
      title: 'Delete Campaign?',
      message: 'Do you want to delete Campaign: ' + camp.name + '?',
      buttons: [
        { text: 'Yes', handler: () => { this.cdt.removeCampaign(camp.$key); }},
        { text: 'No', handler: () => { return;}}
      ]
    });
    confirm.present();
  }
  showdetail(camp){
    // let modal = this.modalCtrl.create(CampaignPage,{camp:camp});
    // modal.present();
    this.navCtrl.push(CampaignPage,{camp:camp});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCampaignPage');
  }

}
