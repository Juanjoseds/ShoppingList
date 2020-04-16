import {Component, Injectable, OnDestroy} from '@angular/core';
import {from, Observable, Subscription} from 'rxjs';
import {debounceTime, delay, first, map, startWith} from 'rxjs/operators';
import {firebaseService} from '../firebaseService';
import {FormControl} from '@angular/forms';
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy {
  errorMessage: string[] = ['Has superado los caracteres permitidos',
    'No puedes dejar en blanco el nombre del producto', 'El producto ya se encuentra en la lista'];
  model = {
    user: 'DAW',
    items: [],
    cart: []
  };
  login: Subscription;
  suscripcion: Subscription;
  suscripcionCart: Subscription;

  myControl = new FormControl();
  options: string[] = [];
  supermarkets: string[] = [];
  filteredOptions: Observable<string[]>;
  checkedSupermarket;

  constructor(private fbs: firebaseService) {
    this.login = this.fbs.login().subscribe(() => {
      this.suscripcion = fbs.getFireItems().subscribe((data: any) => { this.model.items = data; this.options = this.getProducts(); this.updateAutoComplete(); this.supermarkets = this.getArraySupermarket();});
      this.suscripcionCart = fbs.getFireCart().subscribe((dataCart: any) => { this.model.cart = dataCart;  this.supermarkets = this.getArraySupermarket(); });
    });
  }

  private updateAutoComplete(){
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        // Tiempo de retardo para cada petición
        debounceTime(500),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addItem(producto) {
    // Control de errores al añadir producto
    if (producto == null){
      this.alertMessage(this.errorMessage[1]);
    }else {
      if (producto.trim().length < 2) {
        this.alertMessage(this.errorMessage[1]);
      } else if (producto.length > 30) {
        this.alertMessage(this.errorMessage[0]);
      } else {
        const products = this.model.items.length;
        // @ts-ignore
        if (products !== 0) {
          // Comprobamos si ya existe el producto
          let duplicado = false;
          let duplicadoCart = false;

          this.model.items.forEach((item) => {
            if (item.product === producto) {
              duplicado = true;
            }
          });

          this.model.cart.forEach((item) => {
            if (item.product === producto) {
              duplicadoCart = true;
            }
          });

          // Si el producto existe lo añadimos a la lista de la compra
          if (duplicado && !duplicadoCart) {
            this.fbs.addToCart({product: producto, bought: false});
          } else if (!duplicado && !duplicadoCart) {
            // Si no existe, lo añadimos al JSON y a la lista de la compra
            this.fbs.addItem({product: producto, supermarket: null, price: null});
            this.fbs.addToCart({product: producto, bought: false});
          }else{
            this.alertMessage(this.errorMessage[2]);
          }
          // Si el JSON está vacío lo añadimos al JSON y a la lista de la compra
        } else {
          this.fbs.addItem({product: producto, supermarket: null, price: null});
          this.fbs.addToCart({product: producto, bought: false});
        }
      }
    }
  }

  getCartLength(){
    return this.model.cart.length;
  }

  getProducts(){
    let products: string[] = [];
    this.model.items.forEach((item) => products.push(item.product));
    console.log('model.item:');
    console.log(products);
    return products;
  }

  /*
  * Método que se encarga de gestionar las alertas de aviso al usuario
  */
  alertMessage(error){
    const element = document.getElementsByClassName('mainAlert')[0];
    element.classList.remove('hidden');

    element.innerHTML = `
    <div class="alert alert-danger" role="alert">
    <strong>¡Ups! </strong>` + error + `</div>`;

    // La alerta desaparecerá en 10 segundos
    setTimeout(function(){
      element.classList.add('hidden');
    }, 10000);
  }

  ngOnDestroy(): void {
    this.login.unsubscribe();
    this.suscripcion.unsubscribe();
    this.suscripcionCart.unsubscribe();
  }

  /*
  *   Método que monitoriza los cambios de supermercado de los items
   */
  getArraySupermarket(){
    let itemsCart = [];
    let supermarkets = [];

    this.model.cart.forEach((item) => {
      itemsCart.push(item.product);
    });

    this.model.items.forEach((item) => {
      if (itemsCart.includes(item.product)){

        if (!supermarkets.includes(item.supermarket)){
          if (item.supermarket === undefined){
            if (!supermarkets.includes('Sin supermercado')){
              supermarkets.push('Sin supermercado');
            }
          }else{
            supermarkets.push(item.supermarket);
          }
        }
      }
    });
    return supermarkets;
  }

  checkSupermarket(item) {
    this.model.items.forEach((i) => {
      if (item === i.product){
        if (i.supermarket === undefined){
          this.checkedSupermarket = 'Sin supermercado';
        }else{
          this.checkedSupermarket = i.supermarket;
        }
      }
    });
  }

  remove(option){
    this.model.items.forEach((item) => {
      if (item.product === option){
        this.fbs.itemsRef.remove(item.key);
      }
    });

    this.model.cart.forEach((item) => {
      if (item.product === option){
        this.fbs.cartRef.remove(item.key);
      }
    });
  }
}
