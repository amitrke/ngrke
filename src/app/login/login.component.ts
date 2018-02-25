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

    this.userService.get(profile.getId()).subscribe(value => {
        if (value) {
          this.userService.cachedUser = value;
        }
      }, error => {
        if (error) {
          console.log('In error block, registering user');
          this.registerUser(profile);
        }
      }
    );
  }

  registerUser(profile: gapi.auth2.BasicProfile) {
    const user: UserEntity = new UserEntity(
      profile.getId(),
      profile.getName(),
      profile.getEmail(),
      profile.getImageUrl(),
      'User'
    );
    this.userService.create(user).subscribe(value => {
      if (value) {
        console.log('Registeration complete');
      }
    }, error => {
      if (error) {
        console.log ('Could not register the user:' + console.dir(error));
      }
    });
  }
}
