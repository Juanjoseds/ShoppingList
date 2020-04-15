import {Component} from '@angular/core';
import {HomeComponent} from './home.component';
import {Router} from '@angular/router';
import {firebaseService} from '../firebaseService';

@Component({
  selector: 'app-card-list',
  template: `
    <div class="mainproducts">

      <div *ngIf="homeComponent.getCartLength() > 0">
        <div class="card ml-1 mr-1 mb-1 card-complete" id="{{item}}0" *ngFor="let item of this.homeComponent.model.cart">
          <div class="card-body grid">
                <div class="checkboxdiv"><mat-checkbox [checked]=item.bought color="primary" class="checkbox" (click)="onChecked(item)"></mat-checkbox></div>
                <div class="product-info">
                  <p class="productname">{{item.product}}</p>
                  <p class="product-supermarket" id="{{item.product}}1">{{getSupermarket(item.product)}}</p>
                  <p class="product-price" id="{{item.product}}2">{{getPrice(item.product)}}</p>
                </div>
                <div class="container">
                  <div class="product-icons">
                    <div><i class="far fa-trash-alt remove" (click)="deleteProduct(item)"></i></div>
                    <div><i class="far fa-edit" (click)="goToDetails(item.product)"></i></div>
                  </div>
                </div>
            </div>

        </div>
      </div>

      <div class="main-empty-parent" *ngIf="homeComponent.getCartLength() == 0">
        <div class="main-empty">
          <p class="p-icon" ><i class="fas fa-broom"></i></p>
          <p class="p-text">La lista de la compra esta vacía</p>
        </div>
      </div>

    </div>`,
  styleUrls: ['./home.component.scss']
})

export class CardsComponent {
  constructor(public homeComponent: HomeComponent, private router: Router, private fbs: firebaseService) {}

  /*
  *   Método que cambia el valor de 'bought' en Firebase al hacer clic en el checkbox
   */
  onChecked(item){
    this.fbs.cartRef.update(item.key, {
      bought: !item.bought
    });
   /* this.homeComponent.model.items.forEach((i) => {
      if (i.product === item) {
        const element = document.getElementById(item + '0');
        i.bought = !i.bought;
        if (i.bought){
          element.style.backgroundColor = '#EDFEE6';
          element.style.borderColor = '#2BFF83';
          element.style.transition = '500ms';
        }else{
          element.style.borderColor = 'rgba(0,0,0,.125)';
          element.style.backgroundColor = 'white';
          element.style.transition = '500ms';
        }
      }
    });*/
  }

  /*
  * Escribimos en el HTML el nombre del supermercado
  */
  getSupermarket(item){
    this.homeComponent.model.items.forEach((i) => {
      if (i.product === item) {
        if (i.supermarket == null){
          document.getElementById(item + '1').innerHTML = "Sin supermercado favorito";
        }else{
          document.getElementById(item + '1').innerHTML = i.supermarket;
        }
      }
    });
  }

  /*
  * Escribimos en el HTML el precio del producto
  */

  getPrice(item){
    this.homeComponent.model.items.forEach((i) => {
      if (i.product === item) {
        if (i.price == null){
          document.getElementById(item + '2').innerHTML = "Sin precio definido";
        }else{
          document.getElementById(item + '2').innerHTML = i.price + ' €';
        }
      }
    });
  }

  /*
  * Borramos el producto de la lista de la compra
  */

  deleteProduct(item){
    this.fbs.cartRef.remove(item.key);
    console.log("estoy borrando");
  }

  goToDetails(producto){
    this.router.navigate(['/details', producto]);
  }
}
