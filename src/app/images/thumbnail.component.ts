import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IImage } from "./data/models/image";
import { Router } from "@angular/router";

@Component({
    selector: 'mi-image',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ThumbnailComponent {
    @Input() image!: IImage;
    highlighted: boolean = false;
    opacity: number = 1;
    constructor(private router: Router){}

    mouseEnter() {
        this.highlighted = true;
        this.opacity = .5;
        console.log("mose enter");
    }
    mouseLeave() {
        this.highlighted = false;
        this.opacity = 1;
        console.log("mose leave");
    }
    onClick() {
        this.router.navigate([this.image.id]);
    }
}