import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';
import { ContentEntity } from '../../entity/content.entity';
import { environment } from '../../../environments/environment';
import { UserEntity } from '../../entity/user.entity';

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

  @Input() selectedTabIndex: number;
  @Output() navToTabIndex = new EventEmitter<number>();

  contentList: UserService[] = [];
  public uploadServerURL: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTabIndex'] && this.selectedTabIndex && this.selectedTabIndex === 3) {
      console.log('Tab selected list posts');
      this.fetchData();
    }
  }

  ngOnInit() {
    this.uploadServerURL = environment.uploadServerURL;
    if (this.userService.getCachedUser('idtoken') != null) {
      this.fetchData();
    }
  }

  onEditLink(editObject: ContentEntity) {
    this.contentService.editObject = editObject;
    this.navToTabIndex.emit(2);
  }

  fetchData() {
    const content = new ContentEntity(undefined, undefined, undefined, undefined, undefined);
    const user: UserEntity = this.userService.getCachedUser('user');
    content.userId = user.id;
    this.contentService.search(content).subscribe(data => {
      this.contentList = data;
    }, error => {
      console.log(error);
    });
  }
}
