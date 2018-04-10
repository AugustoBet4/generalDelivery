import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

//Componentes
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/login/email/email.component';
import { SignupComponent } from './components/login/signup/signup.component';

//Servicios
import { ProductService } from './services/product.service';

// Rutas
const appRoutes: Routes = [
  { path: 'productos', component: ProductComponent },
  { path: 'modificar', component: ProductListComponent },
  { path: 'home', component: ProductsComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false})
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
