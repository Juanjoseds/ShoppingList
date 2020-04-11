import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage: string[] = ['Has superado los carácteres permitidos',
    'No puedes dejar en blanco el nombre del producto'];
  model = {
    user: 'DAW',
    items: [],
    cart: []
  };

  ngOnInit(): void {}

  addItem(producto) {
    // Control de errores al añadir producto
    if (producto.trim().length < 2){
      this.alertMessage(this.errorMessage[1]);
    }else if (producto.length > 30){
      this.alertMessage(this.errorMessage[0]);
    }else {

      if (this.model.items.length !== 0) {
        // Comprobamos si ya existe el producto
        let duplicado = false;
        this.model.items.forEach((item) => {
          if (item.product === producto) {
            duplicado = true;
          }
        });

        // Si el producto existe lo añadimos a la lista de la compra
        if (duplicado) {
          this.addShoppingList(producto);
        } else {
          // Si no existe, lo añadimos al JSON y a la lista de la compra
          this.model.items.push({product: producto, bought: false, supermarket: null, price: null});
          this.addShoppingList(producto);
        }
        // Si el JSON está vacío lo añadimos al JSON y a la lista de la compra
      } else {
        this.model.items.push({product: producto, bought: false, supermarket: null, price: null});
        this.addShoppingList(producto);
      }
      console.log(this.model.cart);
      console.log(this.model.items);
    }
  }

  /*
  * Método que se encarga de devolver un array de los productos del JSON.
  */
  getProducts() {
    let products: string[] = [];
    this.model.items.forEach((item, index) => products.push(item.product));
    return products;
  }

  getCartLength(){
    return this.model.cart.length;
  }

  /*
  * Método que se encarga de añadir un producto a la lista de la compra
  */
  addShoppingList(producto){
    if (this.model.cart.indexOf(producto) === -1){
      this.model.cart.push(producto);
    }
  }

  /*
  * Método que se encarga de gestionar las alertas de aviso al usuario
  */
  alertMessage(error){
    const element = document.getElementsByClassName('mainAlert')[0];
    element.classList.remove('hidden');

    element.innerHTML = `
    <div class="alert alert-danger" role="alert">
    <strong>¡Ups! </strong>` + error + `</div>`;

    // La alerta desaparecerá en 10 segundos
    setTimeout(function(){
      element.classList.add('hidden');
    }, 10000);
  }

}
