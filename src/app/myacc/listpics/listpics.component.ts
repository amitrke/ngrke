import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-listpics',
  templateUrl: './listpics.component.html',
  styleUrls: ['./listpics.component.scss']
})
export class ListpicsComponent implements OnInit {

  public imageList: string[];

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.updateFilesList();
  }

  updateFilesList() {
    if (this.userService.cachedUser != null) {
      const folder = 'users/' + this.userService.cachedUser.id;
      this.fileUploadService.listFiles(folder).subscribe(data => {
        this.imageList = data;
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
