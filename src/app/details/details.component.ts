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
export class DetailsComponent implements OnInit {
  producto: any = {};
  private suscripcion;
  constructor(private homeComponent: HomeComponent, private ruta: ActivatedRoute, private fbs: firebaseService,  private router: Router) {}

  ngOnInit(): void {
    this.producto = this.ruta.snapshot.params.producto;
  }


  getItem(){
    this.homeComponent.model.items.forEach(item => {
      if (item.product === this.producto){
        this.changeFireValues(item);
      }
    });
  }

  changeFireValues(item){
    this.fbs.itemsRef.update(item.key, {
      product: (document.getElementById('nombre') as HTMLInputElement).value,
      price: this.getPriceFixed(),
      supermarket: (document.getElementById('super') as HTMLInputElement).value
    });

    let key = '';
    this.suscripcion = this.fbs.cartRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          if (action.payload.val().product === item.product){
            console.log(action.payload.key);
            key = action.payload.key;
            console.log(key);
            this.updateCart(key);
          }
        });
      });
  }

  getPriceFixed(){
    if ((document.getElementById('precio') as HTMLInputElement).value === 0) {
      return null;
    }else{
      return (document.getElementById('precio') as HTMLInputElement).value;
    }
  }

  updateCart(key){
    console.log(key);
    this.fbs.cartRef.update(key, {
      product: (document.getElementById('nombre') as HTMLInputElement).value,
    });
    this.suscripcion.unsubscribe();
    this.router.navigate(['']);
  }

}
