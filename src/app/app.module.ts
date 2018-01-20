import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { ProductService} from './shared/product.service';
import { FilterPipe } from './pipe/filter.pipe';
import { CustomHttpcomComponent } from './customHttpcom/customHttpcom.component';

import { providerHttp } from './customHttp/customHttp';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { LoadingBarService } from './customHttp/share/loading-bar/loading-bar.service';
import { LoadingBarComponent } from './customHttp/share/loading-bar/loading-bar.component';
import {AngularLoadingBarModule} from 'ng4-loader-bar';
const routeConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:productId', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    CustomHttpcomComponent,
    FilterPipe,
    LoadingBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig , { useHash: true }),
    ReactiveFormsModule,
    HttpClientModule,AngularLoadingBarModule.forRoot()
  ],
  providers: [
    ProductService,
    LoadingBarService,
    {
      provide: Http,
      useFactory: providerHttp,
      deps: [XHRBackend, RequestOptions, LoadingBarService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
