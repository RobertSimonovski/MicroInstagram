import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mi-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor (private dialogRef: MatDialogRef<DeleteComponent>){}
  dismiss(){
    this.dialogRef.close(false);
  }
  deleteImage(){
    this.dialogRef.close(true);    
  }
}
