import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { ContentEntity } from '../../entity/content.entity';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {

  public imageList: string[];

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService
  ) { }

  model = new ContentEntity(undefined, undefined, undefined, undefined, undefined);

  ngOnInit() {
    if (this.userService.cachedUser != null) {
      const folder = 'users/' + this.userService.cachedUser.id;
      this.fileUploadService.listFiles(folder).subscribe(data => {
        this.imageList = data;
      }, error => {
        console.log(error);
      });
    }
  }

  submitForm() {
    console.log('Form submit');
  }
  // get diagnostic() { return JSON.stringify(this.model); }
}
