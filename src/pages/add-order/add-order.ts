import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the AddOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.html',
})
export class AddOrderPage {

  user: any;
  sweetLvls: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.user = this.navParams.get("user");
    this.user.key = this.navParams.get("key");
    this.user.quantity = 1;
    this.user.sweetLevel = 2;
    this.user.sweetLevelName = "Ít ngọt";
    this.user.done = false;
    db.list("/sweetLevel", { query: { orderByChild: "lvl" } }).subscribe(val => {
      this.sweetLvls = val;
    }, err => {
      this.showAlert("Error", err,()=>{this.navCtrl.pop();});
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrderPage');
  }

  showAlert(title, message,callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{ text: 'OK', handler: callback},]
    });
    alert.present();
  }

  checkedChange(event, slvl) {
    // console.log(event.checked);
    // console.log(slvl.name);
    this.user.sweetLevel = slvl.lvl;
    this.user.sweetLevelName = slvl.name;
  }
  save() {
    this.db.list("/orders").push(this.user).then(data=>{
      this.showAlert("Success", "Save successfully",()=>{this.navCtrl.pop();});
      
    });
    /*let firstT ime = true;
    this.db.list("/orders", {
      query: {
        orderByChild: "name",
        equalTo: this.user.name
      }
    }).subscribe(data => {
      if (firstTime) {
        firstTime = false;
        if (data && data.length > 0) {
          data.forEach(dt => {
            if (dt.name == this.user.name && dt.done == false) {
              let confirm = this.alertCtrl.create({
                title: 'Daplicated Order?',
                message: 'Do you agree to override old order?' + " Quantity:" + dt.quantity + " Sweet level:" + dt.sweetLevelName,
                buttons: [
                  { text: 'Disagree', handler: () => { this.db.list("/orders").push(this.user);this.navCtrl.pop(); } },
                  { text: 'Agree', handler: () => { this.user.bkdt = dt; this.db.list("/orders").set(dt.$key, this.user);this.navCtrl.pop(); } }
                ]
              });
              confirm.present();
            } else {
              if (dt.$key == data[data.length - 1].$key) {
                this.db.list("/orders").push(this.user);
                this.navCtrl.pop();
              }
            }
          });
        } else {
          this.db.list("/orders").push(this.user);
          this.navCtrl.pop();
        }
      }
    }, err => {
      this.showAlert("Error", err);
      firstTime = true;
    });
 */
  }
}
