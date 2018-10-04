import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileuploadService } from '../services/fileupload.service';

@Component({
  selector: 'app-subpic',
  templateUrl: './subpic.component.html',
  styleUrls: ['./subpic.component.scss']
})
export class SubpicComponent implements OnInit {

  constructor(
    private fileUploadService: FileuploadService
  ) { }

  fileToUpload: File = null;
  firstFormGroup: FormGroup;

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('handleFileInput');
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
}
