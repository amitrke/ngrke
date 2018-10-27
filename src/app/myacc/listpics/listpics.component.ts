import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-listpics',
  templateUrl: './listpics.component.html',
  styleUrls: ['./listpics.component.scss']
})
export class ListpicsComponent implements OnInit, OnChanges {

  public imageList: string[];
  public uploadServerURL: string;

  @Input() selectedTabIndex: number;
  @Output() navToTabIndex = new EventEmitter<number>();

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.uploadServerURL = environment.uploadServerURL;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTabIndex'] && this.selectedTabIndex && this.selectedTabIndex === 1) {
      console.log('Tab selected list pics');
      this.updateFilesList();
    }
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
