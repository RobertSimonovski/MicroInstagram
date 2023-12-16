import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from './images/modals/upload/upload.component';
import { IImage } from './images/data/models/image';

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MicroInstagram';
  constructor(private dialog: MatDialog){}
  upload(): void {
    let dialogRef = this.dialog.open(UploadComponent);
    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed', result);
      
    });
  }
}
