import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FileuploadService } from '../../services/fileupload.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { PhotogalleryService } from '../../services/photogallery.service';
import { PhotogalleryEntity } from '../../entity/photogallery.entity';
import { MatSlideToggleChange, MatSnackBar, MatDialog } from '@angular/material';
import { CnfdlgComponent } from '../../cnfdlg/cnfdlg.component';
import { UserEntity } from '../../entity/user.entity';

@Component({
  selector: 'app-listpics',
  templateUrl: './listpics.component.html',
  styleUrls: ['./listpics.component.scss']
})
export class ListpicsComponent implements OnInit, OnChanges {

  public imageList: string[];
  public uploadServerURL: string;
  public galleryList: PhotogalleryEntity[];

  animal: string;
  name: string;

  @Input() selectedTabIndex: number;
  @Output() navToTabIndex = new EventEmitter<number>();

  constructor(
    private fileUploadService: FileuploadService,
    private photogalleryService: PhotogalleryService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.uploadServerURL = environment.uploadServerURL;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTabIndex'] && this.selectedTabIndex && this.selectedTabIndex === 1) {
      console.log('Tab selected list pics');
      this.updateFilesList();
    }
    if (changes['glryChange']) {
      console.log('Gallery change ' + changes['glryChange'].currentValue);
    }
  }

  updateFilesList() {
    const user: UserEntity = this.userService.getCachedUser('user');
    if (user != null) {
      const folder = this.fileUploadService.uploadBaseFolder + user.id;
      this.fileUploadService.listFiles(folder).subscribe(data => {
        this.imageList = data;
        this.fileUploadService.imageListCache = data;
      }, error => {
        console.log(error);
      });

      this.updatePhotogalleryList();
    }
  }

  updatePhotogalleryList() {
    const searchCriteria = new PhotogalleryEntity(undefined);
    const user: UserEntity = this.userService.getCachedUser('user');
      searchCriteria.userId = user.id;
      this.photogalleryService.search(searchCriteria).subscribe(data => {
        this.galleryList = data;
      }, error => {
        console.log(error);
      });
  }

  isGlry(imageURL: string) {
    if (this.galleryList != null ) {
      for (const element of this.galleryList) {
        if (element.imageURL === imageURL) {
          return true;
        }
      }
    }
  }

  onGlryChange(event: MatSlideToggleChange) {
    console.log('Gallery change ' + event.checked + ', Source=' + event.source.id);
    if (event.checked) { // Add to gallery
      const glry = new PhotogalleryEntity(event.source.id);
      const user: UserEntity = this.userService.getCachedUser('user');
      glry.userId = user.id;
      this.photogalleryService.save(glry).subscribe(data => {
        this.updatePhotogalleryList();
        this.snackBar.open('Added to photogallery', undefined, {
          duration: 2000,
        });
      }, error => {
        this.snackBar.open('Error ocurred while adding to photogallery', undefined, {
          duration: 2000,
        });
      });
    } else { // Remove from gallery
      this.removeFromGlry(event.source.id);
    }
  }

  removeFromGlry(imageURL: string) {
    console.log('About to remove from gallery ' + imageURL);
    this.galleryList.forEach(element => {
      if (element.imageURL === imageURL) {
        this.photogalleryService.delete(String(element.id)).subscribe(data => {
          this.updatePhotogalleryList();
          this.snackBar.open('Removed from photogallery', undefined, {
            duration: 2000,
          });
        }, error => {
          this.snackBar.open('Error ocurred while removing from photogallery', undefined, {
            duration: 2000,
          });
        });
      }
    });
  }

  onDelete(fileName: string) {
    const user: UserEntity = this.userService.getCachedUser('user');
    this.name = user.name;
    this.animal = 'you want to delete this file';

    const dialogRef = this.dialog.open(CnfdlgComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.animal = result;
      if (result === 'yes') {
        this.fileUploadService.delete(fileName).subscribe(data => {
          this.updateFilesList();
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
