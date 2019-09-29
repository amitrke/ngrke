import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { async } from '@angular/core/testing';
import { PubcacheService } from '../services/pubcache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contentList: any;
  public uploadServerURL: string;
  public error: boolean;

  constructor(
    private router: Router,
    private contentService: ContentService,
    private userService: UserService,
    private pubCacheService: PubcacheService
  ) { }

  async ngOnInit() {
    this.contentList = this.pubCacheService.publicCache.home;
    // await this.fetchPosts();
    this.uploadServerURL = environment.staticContentURL;
  }

  fetchPosts = async() => {
    try {
      console.dir(this.contentList);
      this.contentList = await this.contentService.getHomePosts();
      this.error = false;
    } catch (err) {
      console.error(`homeComponent: unable to fetch homepage posts ${err}`);
    }
  }
  moreBtnClick = function (url: String) {
    this.router.navigateByUrl(url);
  };
}
