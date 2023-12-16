import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IImage } from '../../data/models/image';
import { ImageService } from '../../data/image.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mi-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackBar: MatSnackBar,
              private imageService: ImageService){}
              
  url!: FormControl;
  title!: FormControl;
  updatedImage!: IImage;
  ngOnInit(): void {
    this.updatedImage = {...this.data};
    this.url = new FormControl(this.updatedImage.url, [Validators.required]);
    this.title = new FormControl(this.updatedImage.title, [Validators.required]);
    
  }

  
  getErrorMessageTitle() {
    return this.url.hasError('required') ? 'You must enter a title' : '';
  }
  getErrorMessageUrl() {
    return this.url.hasError('required') ? 'You must enter a url' : '';
  }
  
  save(): void {
    if(this.url.valid && this.title.valid && this.url.value && this.title.value){
      this.updatedImage.url = this.url.value;
      this.updatedImage.title = this.title.value;
      this.imageService.updateImage(this.updatedImage).subscribe(
        (data: IImage) => this.updateSuccess(data),
        (err: any) => this.updateFailure(err)
      )
      this.dialogRef.close(this.updatedImage);
    }
  }
  updateSuccess(data: IImage){
    console.log(data);
    this.data.title = data.title;
    this.data.url = data.url;
    this.openSnackBar("Image updated successfully.", "Dismiss");

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  updateFailure(err: any){
    console.log(err);
    this.openSnackBar("Failed to update image", "Dismiss  ");
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }
}
