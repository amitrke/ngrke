import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { ContentEntity } from '../../entity/content.entity';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {

  public imageList: string[];

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService,
    private contentService: ContentService
  ) { }

  model = new ContentEntity(undefined, undefined, undefined, undefined, 100);

  ngOnInit() {
    if (this.userService.cachedUser != null) {
      this.model.userId = this.userService.cachedUser.id;
      const folder = this.fileUploadService.uploadBaseFolder + this.userService.cachedUser.id;
      this.fileUploadService.listFiles(folder).subscribe(data => {
        this.imageList = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onSubmit() {
    console.log('Form submit');
    this.contentService.save(this.model).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
  // get diagnostic() { return JSON.stringify(this.model); }
}
