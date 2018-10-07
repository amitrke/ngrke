import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FileuploadService } from '../services/fileupload.service';
import { UserService } from '../services/user.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-subpic',
  templateUrl: './subpic.component.html',
  styleUrls: ['./subpic.component.scss']
})
export class SubpicComponent implements OnInit {

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService
  ) { }

  fileToUpload: File = null;
  firstFormGroup: FormGroup;
  fileUploaded = false;

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(form: NgForm) {
    const fileName = this.fileUploadService.uploadBaseFolder + this.userService.cachedUser.id + '/' + this.fileToUpload.name;
    this.fileUploadService.postFile(this.fileToUpload, fileName).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
        }
      },
      (err) => {
        console.log('Upload Error:', err);
      }, () => {
        console.log('Upload done');
      }
    );
  }
}
