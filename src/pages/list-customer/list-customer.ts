import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {AddOrderPage} from '../add-order/add-order';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the ListCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-customer',
  templateUrl: 'list-customer.html',
})
export class ListCustomerPage {

  customers:FirebaseListObservable<any[]>;
  cusList:any[];
  bCusList:any[];
  cus:any = [
    {name:'Anh Nguyễn'},
    {name:'Cậu Cải'},
    {name:'Châu Trương'},
    {name:'Chồng mập'},
    {name:'Cường Lê'},
    {name:'Cường Phan'},
    {name:'Dì 7'},
    {name:'Dung'},
    {name:'Dũng Đào SD'},
    {name:'Dung Đỗ'},
    {name:'Dũng Nguyễn'},
    {name:'Đoàn Nguyễn'},
    {name:'Đức Nguyễn'},
    {name:'Giang Nguyễn'},
    {name:'Giang Phạm'},
    {name:'Giang Võ'},
    {name:'Hải Vũ'},
    {name:'Hạnh SD'},
    {name:'Hào Lương'},
    {name:'Hằng Hồ'},
    {name:'Hòa Nguyễn'},
    {name:'Hoàng Trần'},
    {name:'Huy Hoang'},
    {name:'Khang Đống'},
    {name:'Khiêm'},
    {name:'Kiểu Lê'},
    {name:'Lâm Nguyễn'},
    {name:'Lợi Đỗ'},
    {name:'Lực Dương'},
    {name:'Minh Đỗ'},
    {name:'Nghĩa Nguyễn'},
    {name:'Ngọc Anh'},
    {name:'Nhà chú'},
    {name:'Nhứt Trịnh'},
    {name:'Niệm Huỳnh'},
    {name:'Oanh Nguyễn'},
    {name:'Phú Lâm'},
    {name:'Phúc Bùi'},
    {name:'Phượng Nguyễn'},
    {name:'Sơn Lê'},
    {name:'Thành Phùng'},
    {name:'Thảo'},
    {name:'Thọ'},
    {name:'Thoa Điền'},
    {name:'Tiến Lê'},
    {name:'Tiên Nguyễn'},
    {name:'Trang Trương'},
    {name:'Tuấn Châu'},
    {name:'Tuyền'},
    {name:'Tuyền Trương'},
    {name:'Việt Trình'},
    {name:'Vũ Ngô'},
    {name:'Long Lý'},
    {name:'Diễm Huỳnh'},
    {name:'Ngọc Nguyễn'},
  ];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db:AngularFireDatabase,
    public alertCtrl: AlertController) {
    this.customers = db.list("/customers",{query:{orderByChild:"orderTime"}});
    this.customers.subscribe(val=>{
      this.cusList = val;
      this.bCusList = JSON.parse(JSON.stringify(this.cusList));
    },err=>{
      this.showAlert("Error",err);
    });
  }
  itemSelected(item){
    console.log(JSON.stringify(item));
    this.navCtrl.push(AddOrderPage,{user:item,key:item.$key});
  }
  filterCustomers(event){

    this.cusList = JSON.parse(JSON.stringify(this.bCusList));
    let val = event.target.value;
    if(val && val.trim() !=""){
      this.cusList = this.cusList.filter(item=>{
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if(this.cusList.length == 0){
        this.cusList.push({name:val});
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCustomerPage');
  }

  showAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  
}
