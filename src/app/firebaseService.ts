import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class firebaseService {
  public itemsRef: AngularFireList<any>;
  public cartRef: AngularFireList<any>;

  constructor(private fdb: AngularFireDatabase, private fauth: AngularFireAuth) {
    this.fauth.authState.subscribe(
      (data) => console.log('logged in:', data),
      (error) => console.log('Error en el login', error),
      () => console.log('auth complete')
    );
    this.itemsRef = this.fdb.list('productos');
    this.cartRef = this.fdb.list('cart');
  }

  addItem(producto){
    this.itemsRef.push(producto);
  }

  addToCart(producto){
    this.cartRef.push(producto);
  }

  login(): Observable<any>{
    return fromPromise(this.fauth.signInWithEmailAndPassword('micarritodaw@micarrito.com', 'micarritodaw'));
  }

  getFireItems(): Observable<any>{
    return this.fdb.list('productos').snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => {
          return {
            key: c.payload.key,
            product: c.payload.val().product,
            supermarket: c.payload.val().supermarket,
            price: c.payload.val().price,
          };
        })));
  }

  getFireCart(): Observable<any> {
    return this.fdb.list('cart').snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => {
          return {
            key: c.payload.key,
            bought: c.payload.val().bought,
            product: c.payload.val().product,
          };
        })));
  }

}
