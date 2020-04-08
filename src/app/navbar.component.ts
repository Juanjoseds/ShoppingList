import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-navbar',
  template: `
    <mat-menu #appMenu="matMenu" yPosition="above">
      <button mat-menu-item>Settings</button>
      <button mat-menu-item>Help</button>
    </mat-menu>

    <mat-toolbar>
      <span>Shopping List</span>
      <span class="AppOptions"></span>
      <span>
        <button mat-icon-button [matMenuTriggerFor]="appMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
    </span>
    </mat-toolbar>
`,
  styleUrls: ['./app.component.scss']
})
export class NavbarComponent {

}
