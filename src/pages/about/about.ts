import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  customers:FirebaseListObservable<any[]>;
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
  constructor(public navCtrl: NavController, db:AngularFireDatabase) {
    this.customers = db.list("/customers");
  }

}
