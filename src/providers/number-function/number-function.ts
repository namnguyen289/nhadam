import { Injectable } from '@angular/core';

/*
  Generated class for the NumberFunctionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NumberFunctionProvider {

  constructor() {
    console.log('Hello NumberFunctionProvider Provider');
  }

  formatNo(event) {
    let val = event.target.value;
    val = val ? parseInt(val) : '0';
    val = this.removezero(val.toString());
    if(event.keyCode >= 48 && event.keyCode <= 57 && val!=="0")
      event.target.value = val;
    return val;
  }

  removezero(number: string) {
    if (number == '0') return '0';
    let arr = number.split('');
    if (arr.length > 1 && arr[0] == '0') {
      return this.removezero(arr.slice(0, 1).join(''));
    }
    return number;
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  parseInt(str:string){
    if(!str || str==="") return 0;
    return parseInt(str);
  }
}
