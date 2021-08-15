import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyProxyPipe implements PipeTransform {
  currencyPipe = new CurrencyPipe('pt-Br')

  transform(value, code='BRL', display='symbol',digites='0.3-5',local='pt-BR') {
     return this.currencyPipe.transform(value,code,display,digites,local)
  }

}
