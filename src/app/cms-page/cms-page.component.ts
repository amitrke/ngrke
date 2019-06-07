import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ContentEntity } from '../entity/content.entity';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {

  public content: any;
  public uploadServerURL: string;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.uploadServerURL = environment.staticContentURL;
    this.contentService.awsGet(id)
      .subscribe(content => this.content = content);
  }
}
