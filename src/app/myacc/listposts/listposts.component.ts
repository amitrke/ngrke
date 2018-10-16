import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';
import { MatTabChangeEvent } from '@angular/material';
import { ContentEntity } from '../../entity/content.entity';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-listposts',
  templateUrl: './listposts.component.html',
  styleUrls: ['./listposts.component.scss']
})
export class ListpostsComponent implements OnInit, OnChanges  {

  constructor(
    private userService: UserService,
    private contentService: ContentService
  ) { }

  @Input() tabChangeEvent: MatTabChangeEvent;

  contentList: UserService[] = [];
  
  public uploadServerURL: string;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabChangeEvent'] && this.tabChangeEvent && this.tabChangeEvent.index === 3) {
      this.fetchData();
    }
  }

  ngOnInit() {
    this.uploadServerURL = environment.uploadServerURL;
    if (this.userService.cachedUser != null) {
      this.fetchData();
    }
  }

  fetchData() {
    const content = new ContentEntity(undefined, undefined, undefined, undefined, undefined);
    content.userId = this.userService.cachedUser.id;
    this.contentService.search(content).subscribe(data => {
      this.contentList = data;
    }, error => {
      console.log(error);
    });
  }

}
