import { Component } from '@angular/core';
import { IImage } from './data/models/image';
import { ImageService } from './data/image.service';
import { Subscription } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ThumbnailComponent } from './thumbnail.component';
import { ImageDetailComponent } from './modals/image-detail/image-detail.component';

@Component({
  selector: 'mi-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {
  constructor(private imageService: ImageService,
              private dialog: MatDialog) {}
  sub!: Subscription;
  displayedImage: IImage| undefined;
  errorMessage: string ='';
  images: IImage[] = [];
  
  private numberOfItems = 100;

  ngOnInit():void{
    this.sub = this.imageService.getImages().subscribe({
      next: images => this.images=images,
      error: err => this.errorMessage = err
    });
    this.displayedImage = this.images[0];
  }
  ngOnDestryo():void{
    this.sub.unsubscribe;
  }

  displayImage(img: IImage) {
    this.displayedImage=img;
  }
  
  getThumbnails(): IImage[]{
    return this.images.slice(0, this.numberOfItems);
  }

  trackByImg(index: number, item: IImage){
      return item.id;
  }
  trackByRow(index: number, item: IImage[]){
    return item[0].id;
  }

  openImageDialog():void {
    this.dialog.open(ImageDetailComponent,{
      width: '900px'
    })
  }
  onNearEndScroll(): void {
    this.numberOfItems += 50;
  }

 }