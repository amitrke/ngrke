import { Component, OnInit, OnChanges, DoCheck, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { ContentEntity } from '../../entity/content.entity';
import { ContentService } from '../../services/content.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit, OnChanges {

  public imageList: string[] = [];

  @Input() tabChangeEvent: MatTabChangeEvent;

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService,
    private contentService: ContentService,
    public snackBar: MatSnackBar
  ) { }

  model = new ContentEntity(undefined, undefined, undefined, undefined, 100);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabChangeEvent'] && this.tabChangeEvent && this.tabChangeEvent.index === 2) {
      if (this.imageList.length !== this.fileUploadService.imageListCache.length) {
        this.imageList = this.fileUploadService.imageListCache;
      }
    }
  }

  ngOnInit() {
    if (this.userService.cachedUser != null) {
      this.model.userId = this.userService.cachedUser.id;
      this.imageList = this.fileUploadService.imageListCache;
    }
  }

  onSubmit() {
    this.contentService.save(this.model).subscribe(data => {
      this.model = new ContentEntity(undefined, undefined, undefined, undefined, 100);
      this.snackBar.open('Content uploaded', undefined, {
        duration: 2000,
      });
    },
    error => {
      console.log(error);
    });
  }
  // get diagnostic() { return JSON.stringify(this.model); }
}
