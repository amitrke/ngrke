import { Component, OnInit } from '@angular/core';
import { PhotogalleryService } from '../services/photogallery.service';
import { environment } from '../../environments/environment';
import { PhotogalleryEntity } from '../entity/photogallery.entity';

@Component({
  selector: 'app-photoglry',
  templateUrl: './photoglry.component.html',
  styleUrls: ['./photoglry.component.scss']
})
export class PhotoglryComponent implements OnInit {

  public uploadServerURL: string;
  public galleryList: PhotogalleryEntity[];

  constructor(
    private photogalleryService: PhotogalleryService
  ) { }

  ngOnInit() {
    this.uploadServerURL = environment.uploadServerURL;
    this.photogalleryService.list().subscribe(data => {
      this.galleryList = data;
    }, error => {
      console.log(error);
    });
  }

}
