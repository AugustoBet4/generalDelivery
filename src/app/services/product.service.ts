import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase,
    private af: AngularFireAuth) { }

  getProducts() {
    return this.productList = this.firebase.list('users/' + this.af.auth.currentUser.uid + '/products/');
  }

  insertProducts(product:Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
