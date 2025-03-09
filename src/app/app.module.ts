import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/essentials/nav-bar/nav-bar.component';
import { FooterComponent } from './components/essentials/footer/footer.component';
import { HomeComponent } from './components/essentials/home/home.component';
import { AccueilComponent } from './components/essentials/home/all/accueil/accueil.component';
import { AproposComponent } from './components/essentials/home/all/apropos/apropos.component';
import { ProjectComponent } from './components/essentials/home/all/project/project.component';
import { ContactComponent } from './components/essentials/home/all/contact/contact.component';
import { LoaderComponent } from './components/essentials/loader/loader.component';
import { ClientsComponent } from './components/essentials/home/all/clients/clients.component';
import { ServicesComponent } from './components/essentials/home/all/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AccueilComponent,
    AproposComponent,
    ProjectComponent,
    ContactComponent,
    LoaderComponent,
    ClientsComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
