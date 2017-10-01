import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


/*
  Generated class for the CommonDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonDataProvider {

  sweetLevels: any[];
  prize:number=10000;
  orderList: FirebaseListObservable<any[]>;
  notFinishedOrders: FirebaseListObservable<any[]>;
  campaigns: FirebaseListObservable<any[]>;
  customerList: FirebaseListObservable<any[]>;
  arrCampaign: any[];

  constructor(public db: AngularFireDatabase) {
    db.list("/sweetLevel", { query: { orderByChild: "lvl" } }).subscribe(val => { this.sweetLevels = val; });
    db.object('/price').subscribe(val=>this.prize = val.$value);
    this.orderList = this.db.list("/orders");
    this.notFinishedOrders = db.list("/orders", { query: { orderByChild: 'done', equalTo: 'N' } });
    this.campaigns = db.list('/campaigns', { query: { orderByChild: 'done' } });
    this.customerList = db.list('/customers');
    this.getCampaigns().subscribe(val=>{this.arrCampaign = val;});
  }
  /* sweet levels */
  getSweetLevels(): any[] {
    return this.sweetLevels;
  }

  getTextSweetLevel(lvl): string {
    return this.sweetLevels.filter(val => val.lvl == lvl)[0].name;
  }

  getPrice(){
    return this.prize;
  }

  /* Order */
  getOrders(): FirebaseListObservable<any[]> {
    return this.orderList;
  }
  getOrdersByCampaign(campaignKey): FirebaseListObservable<any[]>{
    return this.db.list("/orders", { query: { orderByChild: 'campaign', equalTo: campaignKey } });
  }

  getNotFinishedOrder(): FirebaseListObservable<any[]> {
    return this.notFinishedOrders;
  }
  updateOrder(key, data, callback) {
    return this.getOrders().update(key, data).then(val=>callback(val));
  }
  removeOrder(key) {
    return this.getOrders().remove(key);
  }

  addNewOrder(data,callback){
    return this.getOrders().push(data).then(val=>{callback(val)});
  }

  /* campaigns */
  getCampaigns(): FirebaseListObservable<any[]> {
    return this.campaigns;
  }
  updateCampaign(key, data,callback) {
    return this.getCampaigns().update(key, data).then(val=>callback(val));
  }
  removeCampaign(key) {
    return this.getCampaigns().remove(key);
  }

  addNewCampaign(data){
    return this.getCampaigns().push(data);
  }

  getCampaignName(key){
    return this.arrCampaign.filter(val => val.$key == key)[0].name;
  }

  /* Customer */

  getCustomers(): FirebaseListObservable<any[]> {
    return this.customerList;
  }

  addNewCustomer(data,callback){
    this.getCustomers().push(data).then(val=>{callback(val);});
  }

  updateCustomer(key, data,callback) {
    return this.getCustomers  ().update(key, data).then(val=>callback(val));
  }
}
