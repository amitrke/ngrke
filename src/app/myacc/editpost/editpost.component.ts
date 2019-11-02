import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { ContentEntity } from '../../entity/content.entity';
import { ContentService } from '../../services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEntity } from '../../entity/user.entity';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit, OnChanges {

  public imageList: string[] = [];

  @Input() selectedTabIndex: number;
  @Output() navToTabIndex = new EventEmitter<number>();

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService,
    private contentService: ContentService,
    public snackBar: MatSnackBar
  ) { }

  model = new ContentEntity(undefined, undefined, undefined, 100);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTabIndex'] && this.selectedTabIndex && this.selectedTabIndex === 2) {
      console.log('Edit post tab selected');
      if (this.imageList.length !== this.fileUploadService.imageListCache.length) {
        this.imageList = this.fileUploadService.imageListCache;
      }

      if (this.contentService.editObject.id !== undefined) {
        this.model = this.contentService.editObject;
        this.contentService.editObject = new ContentEntity(undefined, undefined, undefined, undefined);
      }
    }
  }

  ngOnInit() {
    if (this.userService.cachedUser) {
      this.model.userId = this.userService.cachedUser._id;
      this.imageList = this.fileUploadService.imageListCache;
    } else {
      this.userService.cachedUserChange.subscribe(value => {
        this.model.userId = value._id;
        this.imageList = this.fileUploadService.imageListCache;
      });
    }
  }

  onSubmit() {
    this.contentService.save(this.model).subscribe(data => {
      this.model = new ContentEntity(undefined, undefined, undefined, 100);
      this.snackBar.open('Content uploaded', undefined, {
        duration: 2000,
      });
      this.navToTabIndex.emit(3);
    },
    error => {
      console.log(error);
    });
  }
  // get diagnostic() { return JSON.stringify(this.model); }
}
