import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IImage } from '../../data/models/image';
import { FormControl, Validators } from '@angular/forms';
import { ImageService } from '../../data/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mi-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{
  newImage: IImage = {
    'albumId' : 0,
    "id" : 0,
    'thumbnailUrl' : '',
    'url' : '',
    'title': ''
  };
  constructor(private dialogRef: MatDialogRef<UploadComponent>,
              private imageService: ImageService,
              private _snackBar: MatSnackBar){}
  ngOnInit(): void {
  }
  url = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  getErrorMessageTitle() {
    return this.url.hasError('required') ? 'You must enter a title' : '';
  }
  getErrorMessageUrl() {
    return this.url.hasError('required') ? 'You must enter a url' : '';
  }

  save(): void {
    if(this.url.valid && this.title.valid && this.url.value && this.title.value){
      this.newImage.url = this.url.value;
      this.newImage.title = this.title.value;
      this.imageService.addImage(this.newImage).subscribe(
        (data: IImage) => this.updateSuccess(data),
        (err: any) => this.updateFailure(err)
      )
      this.dialogRef.close(this.newImage);
    }
  }
  updateSuccess(data: IImage){
    this.openSnackBar("Successfully uploaded image", "Dismiss");
  }

  updateFailure(err: any){
    this.openSnackBar("Failed tp upload image", "Dismiss");
  }
  
  dismiss(): void {
    this.dialogRef.close(null);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
