import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PhotoglryComponent } from './photoglry/photoglry.component';
import { LogoutComponent } from './myacc/logout/logout.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: 'page/:id', component: CmsPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'disclaimer', component: DisclaimerComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'photos', component: PhotoglryComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
