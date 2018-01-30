import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {

  public content: ContentEntity;

  constructor(
    private contentService: ContentService
  ) { 
    this.content = new ContentEntity('a', 'a', 'a', 'a', 'a');
  }

  ngOnInit() {
    this.content = this.contentService.get('iitr');
  }
}
