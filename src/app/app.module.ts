import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { RelationshopHttpClient } from './services/header-request.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHandler, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header-request.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass:HeaderInterceptor, multi:true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
