import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


/*
  Generated class for the CommonDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonDataProvider {

  sweetLevels:any[];
  constructor(public db:AngularFireDatabase) {
    db.list("/sweetLevel", { query: { orderByChild: "lvl" } }).subscribe(val => {
      this.sweetLevels = val;
    });
  }

  getSweetLevels():any[]{
    return this.sweetLevels;
  }

  getTextSweetLevel(lvl):string{
    return this.sweetLevels.filter(val=>val.lvl == lvl)[0].name;
  }

}
