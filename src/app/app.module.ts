import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

//Componentes
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component'; 

//Servicios
import { ProductService } from './services/product.service';

// Rutas
const appRoutes: Routes = [
  { path: 'productos', component: ProductComponent },
  { path: 'modificar', component: ProductListComponent },
  { path: '', component: ProductsComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false})
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
