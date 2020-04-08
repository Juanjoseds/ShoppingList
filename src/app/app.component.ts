import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppingList';
  model = {
    user: 'DAW',
    items: [],
    cart: []
  };

  addItem(producto) {
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

  getProducts() {
    let products: string[] = [];
    this.model.items.forEach((item, index) => products.push(item.product));
    return products;
  }

  addShoppingList(producto){
    if (this.model.cart.indexOf(producto) === -1){
      this.model.cart.push(producto);
    }
  }
}
