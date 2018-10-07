import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FileuploadService } from '../services/fileupload.service';
import { UserService } from '../services/user.service';

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
    const fileName = 'users/' + this.userService.cachedUser.id + '/' + this.fileToUpload.name;
    this.fileUploadService.postFile(this.fileToUpload, fileName).subscribe(data => {
        this.fileUploaded = true;
        form.resetForm();
      }, error => {
        console.log(error);
      });
  }
}
