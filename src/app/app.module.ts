import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from './shared/shared.module';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CatCardComponent } from './components/categories/components/cat-card/cat-card.component';
import { LabelsComponent } from './components/labels/labels.component';
import { LabCardComponent } from './components/labels/components/lab-card/lab-card.component';
import { AuthInterceptorService } from "./api/auth-interceptor.service";
import { EndPointMapper } from './helpers/endpoint-mapper.helper.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UpcomingComponent,
    FooterComponent,
    CategoriesComponent,
    CatCardComponent,
    LabelsComponent,
    LabCardComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [
    EndPointMapper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
