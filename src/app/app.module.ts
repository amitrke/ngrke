import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatSidenavModule,
  MatCardModule
} from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { HomeComponent } from './home/home.component';
import {ContentService} from './services/content.service';

@NgModule({
  declarations: [
    AppComponent,
    CmsPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
