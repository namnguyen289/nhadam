import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController,LoadingController } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';
import { NumberFunctionProvider} from '../../providers/number-function/number-function'
import { CommonDataProvider} from '../../providers/common-data/common-data';
// import { FirebaseListObservable } from 'angularfire2/database';


/**
 * Generated class for the ListOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-order',
  templateUrl: 'list-order.html',
})
export class ListOrderPage {
  // orderList:any;
  orders:any[];
  sweetLvl1:number=1;
  sweetLvl2:number=2;
  sweetLvl3:number=3;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    // , public db:AngularFireDatabase
    , public alertCtrl: AlertController
    , public loadingCtrl: LoadingController
    , public cdt:CommonDataProvider
    , public num:NumberFunctionProvider
  ) {
    this.cdt.getNotFinishedOrder().subscribe(data=>{
      this.orders = data;
    });
  }
  minusQuantity(order){
    if(order.quantity>1){
      order.quantity -= 1;
    }
    this.cdt.updateOrder(order.$key,order,()=>{});
  }
  totalSweetByLvl(orders:any[],lvl:number){
    let total = 0;
    if(!orders)return 0;
    orders.forEach(order=>{
      total+= (order.sweetLevel == lvl? (Number.parseInt(order.quantity)+Number.parseInt(order.bonusQuantity)):0);
    });
    return total;
  }
  addQuantity(order){
    order.quantity = Number.parseInt(order.quantity);
    order.quantity +=1;
    this.cdt.updateOrder(order.$key,order,()=>{});
  }
  deleteOrder(order){
    let confirm = this.alertCtrl.create({
      title: 'Delete Order?',
      message: 'Do you want to delete ' + order.name + '\'s order?' + " Quantity:" + order.quantity,
      buttons: [
        { text: 'Yes', handler: () => { this.cdt.removeOrder(order.$key); }},
        { text: 'No', handler: () => { return;}}
      ]
    });
    confirm.present();
  }

  showdetail(order){
    this.navCtrl.push(OrderDetailPage,{key:order.$key,data:order});
  }

  /* finishOrder(){
    let confirm = this.alertCtrl.create({
      title: 'Finsihed all Orders?',
      message: 'Did you finished all orders?',
      buttons: [
        { text: 'Yes', handler: () => {
           this.processCompleteOrders(); 
          }
        },
        { text: 'No', handler: () => { return;}}
      ]
    });
    confirm.present();
  } 
  processCompleteOrders(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.orders.forEach(e=>{
      this.db.list("/orders",{
        query:{
          orderByChild: 'done',
          equalTo: 'N'
        }
      }).update(e.$key,{done:'Y'});
      this.db.object("/customers/"+e.$key).subscribe(val=>{
        val.orderTime = val.orderTime?val.orderTime:0;
        val.orderedQuantity = val.orderedQuantity?val.orderedQuantity:0;
        this.db.object("/customers/"+e.$key).update({orderTime:(val.orderTime + 1),orderedQuantity:(val.orderedQuantity - e.quantity)});
      });
    });
    loading.dismiss();
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderPage');
  }

}
