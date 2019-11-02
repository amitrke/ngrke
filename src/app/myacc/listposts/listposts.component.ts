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

  contentList: ContentEntity[] = [];
  public uploadServerURL: string;
  user: UserEntity;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTabIndex'] && this.selectedTabIndex && this.selectedTabIndex === 3) {
      console.log('Tab selected list posts');
      this.fetchData();
    }
  }

  async ngOnInit() {
    this.uploadServerURL = environment.staticContentURL;
    if (this.userService.cachedUser) {
      this.user = this.userService.cachedUser;
      await this.fetchData();
    }
    this.userService.cachedUserChange.subscribe(async (value) => {
      this.user = value;
      await this.fetchData();
    });
  }

  onEditLink(editObject: ContentEntity) {
    this.contentService.editObject = editObject;
    this.navToTabIndex.emit(2);
  }

  fetchData = async() => {
    this.contentList = this.userService.cachedUser.posts;
  }
}
