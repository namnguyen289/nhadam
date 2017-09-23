import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import {NumberFunctionProvider} from '../../providers/number-function/number-function'
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
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public viewCtrl: ViewController
    , public db: AngularFireDatabase,
    public numf:NumberFunctionProvider) {

    if (this.navParams.get('camp')) {
      this.camp = this.navParams.get('camp');
    } else {
      this.camp = this.defaulCampain();
    }
  }

  defaulCampain(): any {
    let camp = {
      cookDate: new Date().toISOString(),
      totalSale: 0,
      totalCooked: 0,
      done:false,
      sweetLvls:[
        {name:"Siêu ít ngọt", quantity:0},
        {name:"Ít ngọt", quantity:0},
        {name:"Ngọt", quantity:0}
      ],
      money:{
        capital:{ aloe:0, sugar:0, bottle:0, other:0, total:0},
        received:0,
        income:0
      }
    }
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
      this.db.list("/campaigns").update(this.camp.$key, this.camp);
    } else {
      this.db.list('/campaigns').push(this.camp);
    }
    this.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
