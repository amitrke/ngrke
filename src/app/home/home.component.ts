import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { async } from '@angular/core/testing';

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

  async ngOnInit() {
    await this.fetchPosts();
    this.uploadServerURL = environment.staticContentURL;
  }

  fetchPosts = async() => {
    const searchCriteria = new ContentEntity(undefined, undefined, undefined, undefined);
    searchCriteria.status = 'published';
    searchCriteria.webid = environment.website;
    try {
      this.contentList = await this.contentService.awsSearch(searchCriteria).toPromise();
    } catch (err) {
      console.error(`homeComponent: unable to fetch homepage posts ${err}`);
    }
  }
  moreBtnClick = function (url: String) {
    this.router.navigateByUrl(url);
  };
}
