import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { NumberFunctionProvider } from '../../providers/number-function/number-function'
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
  detailFlag: boolean = false;
  orderedQuantity: any;
  campaigns:any[];

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public db: AngularFireDatabase
    , public alertCtrl: AlertController
    , public num: NumberFunctionProvider
    , public loadingCtrl: LoadingController) {
    this.user = this.navParams.get("user");
    this.user.key = this.navParams.get("key");
    this.user.quantity = 1;
    this.user.sweetLevel = 2;
    this.user.sweetLevelName = "Ít ngọt";
    this.user.done = 'N';
    this.user.orderedQuantity = this.user.orderedQuantity ? this.user.orderedQuantity : 0;
    this.user.bonusOrderedQuantity = this.user.bonusOrderedQuantity ? this.user.bonusOrderedQuantity : 0;
    this.user.bonusQuantity = this.user.bonusQuantity ? this.user.bonusQuantity : 0;
    this.user.orderTime = this.user.orderTime ? this.user.orderTime : 0;
    this.orderedQuantity = this.user.orderedQuantity * -1;
    this.loading.present();
    db.list("/sweetLevel", { query: { orderByChild: "lvl" } }).subscribe(val => {
      this.sweetLvls = val;
    }, err => {
      this.showAlert("Error", err, () => { this.navCtrl.pop(); });
    });
    db.list("/campaigns", { query: { orderByChild: "done",equalTo: false } }).subscribe(val => {
      this.campaigns = val;
      this.loading.dismissAll();
    }, err => {
      this.loading.dismissAll();
      this.showAlert("Error", err, () => { this.navCtrl.pop(); });
    });
  }

  showDetail() {
    this.detailFlag = !this.detailFlag;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOrderPage');
  }

  showAlert(title, message, callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{ text: 'OK', handler: callback }]
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
    this.user.createTime = (new Date()).toString();
    if (!this.user.key) {
      this.db.list("/customers").push({
        name: this.user.name,
        orderedQuantity: 0,
        orderTime: 0
      }).then(val => {
        this.user.key = val.key;
        this.db.list("/orders").push(this.user).then(data => {
          this.showAlert("Success", "Save successfully", () => { this.navCtrl.pop(); });
        });
      });
    } else {
      this.db.list("/orders").push(this.user).then(data => {
        this.showAlert("Success", "Save successfully", () => { this.navCtrl.pop(); });
      });
    }
  }
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
              title: 'Duplicated Order?',
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

