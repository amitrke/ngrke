import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-listpics',
  templateUrl: './listpics.component.html',
  styleUrls: ['./listpics.component.scss']
})
export class ListpicsComponent implements OnInit {

  public imageList: string[];
  public uploadServerURL: string;

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.fileUploadService.imageListCache.length === 0) {
      this.updateFilesList();
    }
    this.uploadServerURL = environment.uploadServerURL;
  }

  updateFilesList() {
    if (this.userService.cachedUser != null) {
      const folder = this.fileUploadService.uploadBaseFolder + this.userService.cachedUser.id;
      this.fileUploadService.listFiles(folder).subscribe(data => {
        this.imageList = data;
        this.fileUploadService.imageListCache = data;
      }, error => {
        console.log(error);
      });
    }
  }

  onDelete(fileName: string) {
    this.fileUploadService.delete(fileName).subscribe(data => {
      this.updateFilesList();
    }, error => {
      console.log(error);
    });
  }
}
