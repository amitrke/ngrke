import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FileuploadService } from '../services/fileupload.service';
import { UserService } from '../services/user.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEntity } from '../entity/user.entity';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-subpic',
  templateUrl: './subpic.component.html',
  styleUrls: ['./subpic.component.scss']
})
export class SubpicComponent implements OnInit {

  constructor(
    private fileUploadService: FileuploadService,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) { }

  @Output() navToTabIndex = new EventEmitter<number>();
  fileToUpload: File = null;
  firstFormGroup: FormGroup;
  fileUploaded = false;
  user: UserEntity;

  ngOnInit() {
    if (this.userService.cachedUser) {
      this.user = this.userService.cachedUser;
    }
    this.userService.cachedUserChange.subscribe(value => {
      this.user = value;
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  updateFilesList() {
    // if (this.user != null) {
    //   this.fileUploadService.listFiles(this.user.id).subscribe(data => {
    //     this.fileUploadService.imageListCache = data;
    //   }, error => {
    //     console.log(error);
    //   });
    // }
  }

  async onSubmit(form: NgForm) {
    const fileName = `${environment.env}/up/usr/${this.user.id}/${this.fileToUpload.name}`;
    const base64Image = await this.toBase64(this.fileToUpload);

    try {
      const response = await this.fileUploadService.postFile(base64Image, fileName, this.fileToUpload);
      if (response && response.data) {
        this.snackBar.open('Image uploaded', undefined, {
          duration: 3000,
        });
        const user = await this.userService.getCurrUser();
        this.userService.setCachedUser(user.data.user);
        this.navToTabIndex.emit(1);
      } else {
        this.snackBar.open(`Image upload failed:${response.errors[0].message}`, undefined, {
          duration: 6000,
        });
        console.error(response);
      }
    } catch (err) {
      this.snackBar.open('Image upload failed', undefined, {
        duration: 6000,
      });
      console.error(err);
    }
  }

  toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}
