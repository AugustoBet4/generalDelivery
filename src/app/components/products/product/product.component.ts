import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

// Service
import { ProductService } from "../../../services/product.service";
import { ToastrService } from "ngx-toastr";

// Product Class
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    public productService: ProductService,
    public toastr: ToastrService,
    public af: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }
  ngOnDestroy() {
    
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null){
      this.productService.insertProducts(productForm.value);
      this.toastr.success('Operación Exitosa','Producto Agregado');
    }
    else{
      this.productService.updateProduct(productForm.value);
      this.toastr.success('Operación Exitosa','Producto Modificado');
    }
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }
  logout() {
    this.af.auth.signOut();
    this.router.navigate(['']);
  }

}
