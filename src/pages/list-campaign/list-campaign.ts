import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {CampaignPage} from '../campaign/campaign';

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
    ,public modalCtrl: ModalController
    , public db:AngularFireDatabase
    ,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      this.loading.present();
      db.list('/campaigns',{
        query:{
          orderByChild: 'done'
        }
      }).subscribe(data=>{
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
    let modal = this.modalCtrl.create(CampaignPage);
    modal.present();
  }
  deleteCamp(camp){
    let confirm = this.alertCtrl.create({
      title: 'Delete Campaign?',
      message: 'Do you want to delete Campaign: ' + camp.name + '?',
      buttons: [
        { text: 'Yes', handler: () => { this.db.list("/campaigns").remove(camp.$key); }},
        { text: 'No', handler: () => { return;}}
      ]
    });
    confirm.present();
  }
  showdetail(camp){
    let modal = this.modalCtrl.create(CampaignPage,{camp:camp});
    modal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCampaignPage');
  }

}
