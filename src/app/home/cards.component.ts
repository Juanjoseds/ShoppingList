import {Component} from '@angular/core';
import {HomeComponent} from './home.component';

@Component({
  selector: 'app-card-list',
  template: `
    <div class="mainproducts">

      <div *ngIf="homeComponent.getCartLength() > 0">
        <div class="card ml-1 mr-1 mb-1" *ngFor="let item of cart;">
          <div class="card-body grid">
                <div class="checkboxdiv"><mat-checkbox color="primary" class="checkbox" (click)="onChecked(item)"></mat-checkbox></div>
                <div class="product-info">
                  <p class="productname">{{item}}</p>
                  <p class="product-supermarket" id="{{item}}1">{{getSupermarket(item)}}</p>
                  <p class="product-price" id="{{item}}2">{{getPrice(item)}}</p>
                </div>
                <div class="product-icons">
                  <div><i class="fas fa-trash"></i></div>
                  <div><i class="far fa-edit"></i></div>
                </div>
            </div>

        </div>
      </div>

      <div class="main-empty-parent" *ngIf="homeComponent.getCartLength() == 0">
        <div class="main-empty">
          <p class="p-icon"><i class="fas fa-broom"></i></p>
          <p class="p-text">La lista de la compra esta vacía</p>
        </div>
      </div>

    </div>`,
  styleUrls: ['./home.component.scss']
})

export class CardsComponent {
  constructor(public homeComponent: HomeComponent) {}
  cart: string[] = this.homeComponent.model.cart;

  /*
  *   Método que cambia el valor de 'bought' del producto al hacer clic en el checkbox
   */
  onChecked(item){
    this.homeComponent.model.items.forEach((i) => {
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
    this.homeComponent.model.items.forEach((i) => {
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
    this.homeComponent.model.items.forEach((i) => {
      if (i.product === item) {
        i.price = 500;
        document.getElementById(item + '2').innerHTML = i.price + ' €';
      }
    });
  }
}
