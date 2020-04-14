import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  producto: any = {};

  constructor(private homeComponent: HomeComponent, private ruta: ActivatedRoute) {}

  ngOnInit(): void {
    this.producto = this.ruta.snapshot.params['producto'];
    console.log(this.producto);
    //this.homeComponent.findProduct(this.ruta.snapshot.params['producto']).subscribe((c: any) => this.producto = c);
  }

}
