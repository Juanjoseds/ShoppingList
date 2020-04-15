import {Component, Injectable, OnInit} from '@angular/core';
import {HomeComponent} from './home.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, debounceTime, filter} from 'rxjs/operators';
import {firebaseService} from '../firebaseService';


@Component({
  selector: 'search-bar',
  template: `
    <div class="card-body">
      <div class="input-group input-group-sm mb-2">
        <input class="form-control form-margin mt-0" type="text" #item
               placeholder="Buscar producto..."
               aria-label="Number"
               [formControl]="homeComponent.myControl"
               [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let option of homeComponent.filteredOptions | async" [value]="option">
            {{option}}
          </mat-option>
        </mat-autocomplete>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" (click)="homeComponent.addItem(homeComponent.myControl.value); homeComponent.myControl.setValue('');">Añadir
          </button>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  constructor(public homeComponent: HomeComponent) {}
}
