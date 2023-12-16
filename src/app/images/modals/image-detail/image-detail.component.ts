import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage } from '../../data/models/image';
import { Subscription } from 'rxjs';
import { ImageService } from '../../data/image.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mi-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private imageService: ImageService,
              private dialogRef: MatDialogRef<ImageDetailComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {};
  sub!: Subscription;
  displayedImage: IImage| undefined;
  errorMessage: string ='';
  image: IImage | undefined;

  ngOnInit(): void {
    const id = Number(this.data);
    this.sub = this.imageService.getImageById(id).subscribe({
      next: image => this.image=image,
      error: err => this.errorMessage = err
    });
  }
  ngOnDestroy():void {
    this.sub.unsubscribe;
    this.router.navigate(['']);
  }

  onBack(): void {
    this.dialogRef.close();
  }
  onDelete(): void {
    let dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed', result);
      if(this.image && result)
        this.imageService.deleteImage(this.image.id).subscribe(
          (data: void) => {
            this.openSnackBar("Successfully deleted image.","Dismiss");
            this.onBack();
          },
          (err: any) => {
            this.openSnackBar("Failed to delete image.","Dismiss");
          }
      )
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onEdit(): void{
    let dialogRef = this.dialog.open(EditComponent, {data: this.image});
    dialogRef.afterClosed().subscribe(result =>{
    });
  }

hovered: boolean = false;
onMouseLeave() {
  this.hovered = false;
}
onMouseEnter() {
  this.hovered = true;
}
}
