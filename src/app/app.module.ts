import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { ThumbnailComponent } from './images/thumbnail.component';
import { RouterModule } from '@angular/router';
import { ImageDetailComponent } from './images/modals/image-detail/image-detail.component';
import { ImageListComponent } from './images/image-list.component';
import { ImageDetailGuard } from './images/image-detail.guard';
import { UploadComponent } from './images/modals/upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './images/modals/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { DeleteComponent } from './images/modals/delete/delete.component';
import { ScrollNearEndDirective } from './shared/scroll-near-end.directive';
import { ModalContainerComponent } from './shared/routable-modal';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailComponent,
    ImageDetailComponent,
    ImageListComponent,
    UploadComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: ':id', 
        canActivate: [ImageDetailGuard],
        component: ModalContainerComponent
      }
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    ScrollNearEndDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
