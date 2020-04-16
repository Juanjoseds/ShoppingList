import {Component} from '@angular/core';
import {HomeComponent} from './home.component';
import {firebaseService} from '../firebaseService';


@Component({
  selector: 'search-bar',
  template: `
    <div class="card-body">
      <div class="input-group input-group-sm mb-1 ">
        <input class="form-control form-margin mt-0 searchbar" type="text" #item
               placeholder="Buscar producto..."
               aria-label="Number"
               [formControl]="homeComponent.myControl"
               [matAutocomplete]="auto"
                (keyup.enter)="homeComponent.addItem(homeComponent.myControl.value); homeComponent.myControl.setValue('');">
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let option of homeComponent.filteredOptions | async" [value]="option">
            {{option}}<mat-select-trigger >
              <mat-icon class="equis" (click)="homeComponent.remove(option)">clear</mat-icon>
            </mat-select-trigger>
          </mat-option>
        </mat-autocomplete>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary searchbutton" (click)="homeComponent.addItem(homeComponent.myControl.value); homeComponent.myControl.setValue('');"><i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  constructor(public homeComponent: HomeComponent, public fbs: firebaseService) {}
}
