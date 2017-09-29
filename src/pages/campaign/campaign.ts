import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {OrderDetailPage} from '../order-detail/order-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import {NumberFunctionProvider} from '../../providers/number-function/number-function'
import {CommonDataProvider} from '../../providers/common-data/common-data';
/**
 * Generated class for the CampaignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html',
})
export class CampaignPage {

  myDate: String = new Date().toISOString();
  summary: string = "total";
  camp: any = {};
  orders:any;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    // , public viewCtrl: ViewController
    , public db: AngularFireDatabase
    , public numf:NumberFunctionProvider
    , public cdt:CommonDataProvider) {

    if (this.navParams.get('camp')) {
      this.camp = this.navParams.get('camp');
      this.cdt.getOrdersByCampaign(this.camp.$key).subscribe(data=>{
        this.orders = data;
        this.camp.totalSale = 0
        this.camp.sweetLvls = this.cdt.getSweetLevels();
        this.camp.sweetLvls.forEach(sweetLvl => {
          sweetLvl.quantity = this.totalSweetByLvl(data,sweetLvl.lvl);
          this.camp.totalSale += sweetLvl.quantity;
        });
      });
    } else {
      this.camp = this.defaulCampain();
    }
  }

  totalSweetByLvl(orders:any[],lvl:number){
    let total = 0;
    orders.forEach(order=>{
      total+= (order.sweetLevel == lvl? (Number.parseInt(order.quantity)+Number.parseInt(order.bonusQuantity)):0);
    });
    return total;
  }

  defaulCampain(): any {
    let camp = {
      cookDate: new Date().toISOString(),
      totalSale: 0,
      totalCooked: 0,
      done:false,
      sweetLvls:[
        // {name:"Siêu ít ngọt", quantity:0},
        // {name:"Ít ngọt", quantity:0},
        // {name:"Ngọt", quantity:0}
      ],
      money:{
        capital:{ aloe:0, sugar:0, bottle:0, other:0, total:0},
        received:0,
        income:0
      }
    }
    camp.sweetLvls = this.cdt.getSweetLevels();
    return camp;
  }
  total(){
    return Number.parseInt(this.camp.money.capital.aloe)+Number.parseInt(this.camp.money.capital.sugar)+Number.parseInt(this.camp.money.capital.bottle)+Number.parseInt(this.camp.money.capital.other);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignPage');

  }
  save() {
    this.camp.money.capital.total = this.total();
    this.camp.money.income = this.camp.money.received - this.total();
    this.camp.name = document.querySelector("#time-cook .datetime-text").textContent;
    if (this.camp.$key) {
      this.cdt.updateCampaign(this.camp.$key, this.camp,()=>{});
    } else {
      this.cdt.addNewCampaign(this.camp);
    }
    this.dismiss();
  }
  showdetail(order){
    this.navCtrl.push(OrderDetailPage,{key:order.$key,data:order});
  }
  dismiss() {
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
}
