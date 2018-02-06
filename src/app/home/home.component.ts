import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contentList$: Observable<ContentEntity[]>;


  constructor(
    private router: Router,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentList$ = this.contentService.list();
  }

  moreBtnClick = function (url: String) {
    this.router.navigateByUrl(url);
  };
}
