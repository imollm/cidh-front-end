import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    LabCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
