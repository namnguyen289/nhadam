import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { NumberFunctionProvider } from '../../providers/number-function/number-function'
// import { AngularFireDatabase } from 'angularfire2/database';
import { CommonDataProvider } from '../../providers/common-data/common-data';

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
  kinds: any[];
  detailFlag: boolean = false;
  orderedQuantity: any;
  bonusOrderedQuantity:any;
  campaigns: any[];

  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    // , public db: AngularFireDatabase
    , public alertCtrl: AlertController
    , public num: NumberFunctionProvider
    , public loadingCtrl: LoadingController
    , public cdt: CommonDataProvider) {
    this.loading.present();
    this.user = this.navParams.get("user");
    delete(this.user.$key);
    this.user.userKey = this.navParams.get("key");
    this.user.quantity = 1;
    this.user.sweetLevel = 2;
    this.user.done = 'N';
    this.user.orderedQuantity = this.user.orderedQuantity ? this.user.orderedQuantity : 0;
    this.user.bonusOrderedQuantity = this.user.bonusOrderedQuantity ? this.user.bonusOrderedQuantity : 0;
    this.user.bonusQuantity = this.user.bonusQuantity ? this.user.bonusQuantity : 0;
    this.user.orderTime = this.user.orderTime ? this.user.orderTime : 0;
    this.user.kind = "nhadam";
    this.orderedQuantity = this.user.orderedQuantity * -1;
    this.bonusOrderedQuantity = this.user.bonusOrderedQuantity * -1;
    this.sweetLvls = cdt.getSweetLevels();
    this.kinds = cdt.getKinds();
    cdt.getCampaigns().subscribe(data => {
      this.campaigns = data.filter(dt => !dt.done);
      if (this.campaigns.length > 0) {
        this.user.campaign = this.campaigns[0].$key;
      }else{
        this.showAlert("Missing Campaign","Please create campaign first!",()=>{
          this.navCtrl.pop();
        });
      }
      this.loading.dismiss();
    }, err => {
      this.loading.dismissAll();
      this.showAlert("Error", err, () => { this.navCtrl.pop(); });
    });
  }

  checkpromotion(event){
    this.user.bonusQuantity = Math.floor((this.num.parseInt(this.num.formatNo(event)+event.key) + this.num.parseInt(this.user.orderedQuantity)*-1)/this.cdt.getBottle2promote());
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

  /* checkedChange(event, slvl) {
    // console.log(event.checked);
    // console.log(slvl.name);
    this.user.sweetLevel = slvl.lvl;
    this.user.sweetLevelName = slvl.name;
  } */
  save() {
    if(!this.user.quantity || String(this.user.quantity).trim() ==="" || String(this.user.quantity) == "0")
    {
      this.showAlert("Error", "Please input quantity", () => {});
      return;
    }
    this.user.createTime = (new Date()).toString();
    if (!this.user.userKey) {
      this.cdt.addNewCustomer({
        name: this.user.name,
        orderedQuantity: 0,
        orderTime: 0
      }, val => {
        this.user.userKey = val.key;
        this.cdt.addNewOrder(this.user, data => {
          this.navCtrl.pop();
        });
      });
    } else {
      this.cdt.addNewOrder(this.user, data => {this.navCtrl.pop(); 
        // this.showAlert("Success", "Save successfully", () => { this.navCtrl.pop(); });
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

