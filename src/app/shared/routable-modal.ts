import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImageDetailComponent } from '../images/modals/image-detail/image-detail.component';

@Component({
  selector: 'app-modal-container',
  template: ''
})
export class ModalContainerComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: any;

  constructor(
    public modalService: MatDialog,
    public route: ActivatedRoute,
    public router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

        console.log("Routable-modals", params['id']);
        this.currentDialog = this.modalService.open(ImageDetailComponent, {data: params['id']});

        this.currentDialog.result.then((_result: any) => {
            router.navigateByUrl('/');
        }, (_reason: any) => {
            router.navigateByUrl('/');
        });
    });
  }

  ngOnDestroy() {
  }
}
