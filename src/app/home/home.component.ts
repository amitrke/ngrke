import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contentList: [];
  public uploadServerURL: string;
  public error: boolean;

  constructor(
    private router: Router,
    private contentService: ContentService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const searchCriteria = new ContentEntity(undefined, undefined, undefined, undefined);
    searchCriteria.status = 'published-to-homepage';
    this.contentService.awsSearch(searchCriteria).subscribe(data => {
      this.contentList = data;
    }, error => {
        this.error = true;
        console.error(error);
    });
    this.uploadServerURL = environment.staticContentURL;
  }

  moreBtnClick = function (url: String) {
    this.router.navigateByUrl(url);
  };
}
