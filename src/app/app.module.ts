import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { HomeComponent } from './home/home.component';
import {ContentService} from './services/content.service';
import { HttpClientModule } from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { FileuploadService } from './services/fileupload.service';
import { SubpicComponent } from './subpic/subpic.component';
import { ListpicsComponent } from './myacc/listpics/listpics.component';
import { ListpostsComponent } from './myacc/listposts/listposts.component';
import { EditpostComponent } from './myacc/editpost/editpost.component';
import { SplitAndGetPipe } from './pipes/splitandget';
import { WthrwdgitComponent } from './wthrwdgit/wthrwdgit.component';
import { PhotoglryComponent } from './photoglry/photoglry.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { TruncateAndEllipsis } from './pipes/truncelli';
import { PhotogalleryService } from './services/photogallery.service';
import { LogoutComponent } from './myacc/logout/logout.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CnfdlgComponent } from './cnfdlg/cnfdlg.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    CmsPageComponent,
    HomeComponent,
    LoginComponent,
    SubpicComponent,
    EditpostComponent,
    ListpicsComponent,
    ListpostsComponent,
    SplitAndGetPipe,
    TruncateAndEllipsis,
    WthrwdgitComponent,
    PhotoglryComponent,
    GoogleSigninComponent,
    LogoutComponent,
    DisclaimerComponent,
    ContactusComponent,
    CnfdlgComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    ContentService, UserService, FileuploadService, PhotogalleryService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [CnfdlgComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
