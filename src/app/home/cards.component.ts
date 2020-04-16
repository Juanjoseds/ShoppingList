import {Component} from '@angular/core';
import {HomeComponent} from './home.component';
import {Router} from '@angular/router';
import {firebaseService} from '../firebaseService';

@Component({
  selector: 'app-card-list',
  templateUrl: './cards.component.html',
  styleUrls: ['./home.component.scss']
})

export class CardsComponent {
  constructor(public homeComponent: HomeComponent, private router: Router, private fbs: firebaseService) {}

  /*
  *   Método que cambia el valor de 'bought' en Firebase al hacer clic en el checkbox
   */
  onChecked(item) {
    this.fbs.cartRef.update(item.key, {
      bought: !item.bought
    });
  }


  /*
  * Escribimos en el HTML el nombre del supermercado
  */
  getSupermarket(item){
    this.homeComponent.model.items.forEach((i) => {
      if (i.product === item) {
        if (i.supermarket == null){
          document.getElementById(item + '1').innerHTML = 'Sin supermercado favorito';
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
          document.getElementById(item + '2').innerHTML = 'Sin precio definido';
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
  }

  goToDetails(producto){
    this.router.navigate(['/details', producto]);
  }
}
