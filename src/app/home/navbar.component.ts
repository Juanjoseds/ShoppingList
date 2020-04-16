import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar>
      <span class="title"><i class="fas fa-shopping-basket"></i> Mi carrito</span>
      <span class="AppOptions"></span>
    </mat-toolbar>
`,
  styleUrls: ['./home.component.scss']
})
export class NavbarComponent {}
