import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'search-bar',
  template: `
      <div class="card-body">
        <div class="input-group input-group-sm mb-2">
          <input class="form-control form-margin" type="text"
                 placeholder="Buscar producto..."
                 aria-label="Number"
                 [formControl]="myControl"
                 [matAutocomplete]="auto">
          <mat-autocomplete #auto="matAutocomplete">
            <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
              {{option}}
            </mat-option>
          </mat-autocomplete>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary">Añadir</button>
          </div>
        </div>
`
})
export class SearchComponent implements OnInit{
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        // Tiempo de retardo para cada petición
        debounceTime(400),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
