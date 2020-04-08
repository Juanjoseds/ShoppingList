import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
  selector: 'app-card-list',
  template: `

    <mat-list *ngIf="cart.length>0" role="list">
      <h3 matSubheader>Productos</h3>
      <mat-divider></mat-divider>
      <mat-list-item role="listitem"  *ngFor="let item of cart">{{item}}<mat-divider></mat-divider></mat-list-item>
    </mat-list>
  `
})

export class CardsComponent {
  constructor(public appComponent: AppComponent) {}
  cart: string[] = this.appComponent.model.cart;

}
