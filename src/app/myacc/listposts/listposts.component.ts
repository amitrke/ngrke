import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-listposts',
  templateUrl: './listposts.component.html',
  styleUrls: ['./listposts.component.scss']
})
export class ListpostsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private contentService: ContentService
  ) { }

  contentList: UserService[] = [];

  ngOnInit() {
    if (this.userService.cachedUser != null) {
    }
  }

  fetchData() {
    // this.contentService.list()
  }

}
