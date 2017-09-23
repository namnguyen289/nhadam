import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController,LoadingController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database'

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

  order:any;
  sweetLvls:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.order = this.navParams.get('data');
    this.order.orderKey = this.navParams.get('key');
    db.list("/sweetLevel", { query: { orderByChild: "lvl" } }).subscribe(val => {
      this.sweetLvls = val;
    });
  }

  save(){
    this.db.object("/orders/"+this.order.orderKey).update({
      quantity:this.order.quantity>0?this.order.quantity:1,
      comment:this.order.comment?this.order.comment:"",
      sweetLevelName:this.order.sweetLevelName
    }).then(val=>this.navCtrl.pop());
  }

  finished(){
    this.db.object("/orders/"+this.order.orderKey).update({done:'Y'})
    .then(val=>
      {
        this.db.object("/customers/"+this.order.key).update({
          orderedQuantity:this.order.orderedQuantity -this.order.quantity,
          bonusOrderedQuantity:this.order.bonusOrderedQuantity -this.order.quantity,
          orderTime:this.order.orderTime - 1,
          updateTime:(new Date()).toString()
        });
        // subscribe(data=>{
        //   user=data;
        //   this.db.object("/orders/"+this.order.key).update({
        //     orderedQuantity:user.orderedQuantity -this.order.quantity,
        //     orderTime:user.orderTime - 1
        //   })
        // });

        this.navCtrl.pop();
      });
  }

  deleteOrder(){
    let confirm = this.alertCtrl.create({
      title: 'Delete Order?',
      message: 'Do you want to delete ' + this.order.name + '\'s order?' + " Quantity:" + this.order.quantity,
      buttons: [
        { text: 'Yes', handler: () => { 
          this.db.list("/orders").remove(this.order.orderKey); 
          this.navCtrl.pop();
        }},
        { text: 'No', handler: () => { return;}}
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

}
