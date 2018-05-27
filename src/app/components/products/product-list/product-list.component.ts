import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Subscription } from 'rxjs/Subscription';

// Service
import { ProductService } from '../../../services/product.service';
import { ToastrService } from "ngx-toastr";

// Product Class
import { Product } from '../../../models/product';
import { isEmpty } from '@firebase/util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  isOn: false;
  subscription: any = '';

  constructor(
    public productService: ProductService,
    public toastr: ToastrService,
    public af: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.af.auth.currentUser !== null){
      this.subscription = this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      });
    });
    }
    else{
      this.af.auth.signOut();
      this.router.navigate(['']);
    }
  }
  ngOnDestroy() {
    this.productService.selectedProduct = new Product();
  }

  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({},product);
  }
  
  onDelete($key: string) {
    if (confirm('Esta seguro de eliminar?')) {
      this.productService.deleteProduct($key);
      this.toastr.success('Operación Exitosa', 'Producto Eliminado');
    }
  }

  onSubmit(productForm: NgForm) {
    this.productService.updateProduct(productForm.value);
    this.toastr.success('Operación Exitosa','Producto Modificado');
    this.isOn = false;
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

  empty(){
    if(!isEmpty(this.productList))
      return true;
    else
      return false;
  }

  logout() {
    this.subscription.unsubscribe();
    this.af.auth.signOut();
    this.router.navigate(['/']);
  }
}
