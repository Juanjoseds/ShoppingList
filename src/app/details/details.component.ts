import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {firebaseService} from '../firebaseService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  producto: any = {};
  private items;
  private suscripcion;
  private login;
  public price = '';
  public supermarket = '';


  constructor(private homeComponent: HomeComponent, private ruta: ActivatedRoute, private fbs: firebaseService,  private router: Router) {
      this.login = this.fbs.login().subscribe(() => { this.suscripcion = fbs.getFireItems().subscribe((data: any) => { this.items = data; this.getFireValue(); }); });
  }

  ngOnInit(): void {
    this.producto = this.ruta.snapshot.params.producto;
  }

  ngOnDestroy(): void {
    this.login.unsubscribe();
  }

  /*
   *  Obtenemos los elementos del modelo y ejecutamos el método changeFireValues para modificar
   */
  getItem(){
    this.homeComponent.model.items.forEach(item => {
      if (item.product === this.producto){
        this.changeFireValues(item);
      }
    });
  }

  changeFireValues(item){
    this.fbs.itemsRef.update(item.key, {
      product: this.getNameFixed(),
      price: this.getPriceFixed(),
      supermarket: this.getSupermarketFixed()
    });

    let key = '';
    this.suscripcion = this.fbs.cartRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          if (action.payload.val().product === item.product){
            key = action.payload.key;
            this.updateCart(key);
          }
        });
      });
  }

  /*
   *  Arregla cualquier tipo de inconsistencia en los campos de precio
   */
  getPriceFixed(){
    if ((document.getElementById('precio') as HTMLInputElement).value === '' ||
        (document.getElementById('precio') as HTMLInputElement).value === '0'){
      if (this.price === 'Introduce un precio') {
        return null;
      } else {
          return this.price;
      }
    }else{
      return (document.getElementById('precio') as HTMLInputElement).value;
    }
  }

  /*
   *  Arregla cualquier tipo de inconsistencia en los campos de product
   */
  getNameFixed(){
    if ((document.getElementById('nombre') as HTMLInputElement).value.trim().length < 2) {
      console.log(this.producto);
      return this.producto;
    }else{
      return (document.getElementById('nombre') as HTMLInputElement).value;
    }
  }

  /*
   *  Arregla cualquier tipo de inconsistencia en los campos de supermarket
   */
  getSupermarketFixed(){
    console.log(this.supermarket);
    if ((document.getElementById('supermarket') as HTMLInputElement).value.trim() === '') {
      if (this.supermarket === 'Introduce un supermercado'){
        return null;
      }
    }
    if ((document.getElementById('supermarket') as HTMLInputElement).value.trim().length < 2 ){
      return this.supermarket;
    }else {
      return (document.getElementById('supermarket') as HTMLInputElement).value;
    }
  }

  /*
   *  Cambia en Firebase el nombre del producto con la key específica.
   */
  updateCart(key){
    console.log(key);
    this.fbs.cartRef.update(key, {
      product: this.getNameFixed(),
    });
    this.suscripcion.unsubscribe();
    this.goToHome();
  }

  goToHome(){
    this.router.navigate(['']);
  }

  getFireValue(){
    this.items.forEach((item) => {
      if (item.product === this.producto){

        if (item.price === undefined){
          this.price = 'Introduce un precio';
        }else{
          this.price = item.price;
        }

        if (item.supermarket === undefined || item.supermarket === ''){
          this.supermarket = 'Introduce un supermercado';
        }else{
          this.supermarket = item.supermarket;
        }
      }
    });
  }

  shortcut(value){
    switch (value) {
      case 1: {
        (document.getElementById('supermarket') as HTMLInputElement).value = 'Mercadona';
        break;
      }
      case 2: {
        (document.getElementById('supermarket') as HTMLInputElement).value = 'Lidl';
        break;
      }
      case 3: {
        (document.getElementById('supermarket') as HTMLInputElement).value = 'Alcampo';
        break;
      }
      case 4: {
        (document.getElementById('supermarket') as HTMLInputElement).value = 'Hiperdino';
        break;
      }

    }
  }
}
