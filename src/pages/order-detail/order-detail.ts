import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
// import {AngularFireDatabase} from 'angularfire2/database';
import { CommonDataProvider } from '../../providers/common-data/common-data';
import { NumberFunctionProvider } from '../../providers/number-function/number-function';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  order: any;
  sweetLvls: any[];
  campaigns: any[];
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public cdt: CommonDataProvider
    , public num: NumberFunctionProvider
    , public alertCtrl: AlertController
    , public loadingCtrl: LoadingController) {
    this.loading.present();
    this.order = this.navParams.get('data');
    this.order.orderKey = this.navParams.get('key');
    this.sweetLvls = cdt.getSweetLevels();
    cdt.getCampaigns().subscribe(data => {
      this.campaigns = data;
      this.loading.dismiss();
    });

  }

  save() {
    this.cdt.updateOrder(this.order.orderKey, this.order, val => this.navCtrl.pop());
  }

  finished() {
    this.cdt.updateOrder(this.order.orderKey, { done: 'Y',money:this.order.money }
      , val => {
        this.cdt.updateCustomer(this.order.userKey, {
          orderedQuantity: this.order.orderedQuantity - this.order.quantity,
          bonusOrderedQuantity: this.order.bonusQuantity>0?0: this.order.bonusOrderedQuantity - this.order.quantity,
          orderTime: this.order.orderTime - 1,
          updateTime: (new Date()).toString()
        }, () => { this.navCtrl.pop(); });
        // subscribe(data=>{
        //   user=data;
        //   this.db.object("/orders/"+this.order.userKey).update({
        //     orderedQuantity:user.orderedQuantity -this.order.quantity,
        //     orderTime:user.orderTime - 1
        //   })
        // });


      });
  }

  deleteOrder() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Order?',
      message: 'Do you want to delete ' + this.order.name + '\'s order?' + " Quantity:" + this.order.quantity,
      buttons: [
        {
          text: 'Yes', handler: () => {
            this.cdt.removeOrder(this.order.orderKey);
            this.navCtrl.pop();
          }
        },
        { text: 'No', handler: () => { return; } }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

}
