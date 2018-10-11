import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contentList$: Observable<ContentEntity[]>;
  public uploadServerURL: string;

  constructor(
    private router: Router,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentList$ = this.contentService.list();
    this.uploadServerURL = environment.uploadServerURL;
  }

  moreBtnClick = function (url: String) {
    this.router.navigateByUrl(url);
  };
}
