import { Component, OnInit } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private myClientId = '670134176077-h5g5nn6catjdo2uoo36d5eji03ccf186.apps.googleusercontent.com';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());

    this.userService.get(profile.getId()).subscribe(value =>{
      if (value) {
        console.log('User data from backend:' + value);
      } else {
        console.log('No user data from backend');
      }
    });

    const user: UserEntity = new UserEntity(
                                  profile.getId(),
                                  profile.getName(),
                                  profile.getEmail(),
                                  profile.getImageUrl(),
                                  'User'
                                );
    this.userService.create(user);
  }
}
