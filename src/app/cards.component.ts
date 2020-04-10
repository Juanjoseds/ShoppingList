import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
  selector: 'app-card-list',
  template: `
    <div class="mainproducts">

      <div class="card ml-1 mr-1" *ngFor="let item of cart; let i = index">
        <div class="card-body grid">
            <div><input type="checkbox" class="checkbox" id="" (click)="onChecked(item)"></div>
            <div><p class="productname">{{item}}</p></div>
        </div>
        <p id="{{item}}1">{{getSupermarket(item)}}</p>
        <p id="{{item}}2">{{getPrice(item)}}</p>
      </div>

    </div>
  `
})

export class CardsComponent {
  constructor(public appComponent: AppComponent) {}
  cart: string[] = this.appComponent.model.cart;

  /*
  *   Método que cambia el valor de 'bought' del producto al hacer clic en el checkbox
   */
  onChecked(item){
    this.appComponent.model.items.forEach((i) => {
      if (i.product === item) {
        console.log(i.bought);
        i.bought = !i.bought;
        console.log(i.bought);
      }
    });
  }

  /*
  * Escribimos en el HTML el nombre del supermercado
  */
  getSupermarket(item){
    this.appComponent.model.items.forEach((i) => {
      if (i.product === item) {
        i.supermarket = 'Mercadona';
        document.getElementById(item + '1').innerHTML = i.supermarket;
      }
    });
  }

  /*
  * Escribimos en el HTML el precio del producto
  */

  getPrice(item){
    this.appComponent.model.items.forEach((i) => {
      if (i.product === item) {
        i.price = 500;
        document.getElementById(item + '2').innerHTML = i.price + ' €';
      }
    });
  }
}
