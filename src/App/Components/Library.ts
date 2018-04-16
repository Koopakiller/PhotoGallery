import { Component, OnDestroy, OnInit, HostListener, ElementRef, ViewChild } from "@angular/core";
import * as THREE from "three";
import { PhotoService, Library } from "../Services/PhotoService";
import { Subject, Observable } from "rxjs/Rx"
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: "Library.html",
    styleUrls: [
        "Library.less"
    ]
})
export class LibraryComponent implements OnInit, OnDestroy {

    public constructor(
        private _photoService: PhotoService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
    }

    public library: Library;
    public photos: string[];
    public selectedPhoto: string;
    public selectedPhotoPath: string;
    public previousPath: string;
    public nextPath: string;

    public showPhotoList: boolean = true;

    private _parameterSubscription: Subscription;

    public ngOnDestroy() {
        this._parameterSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this._parameterSubscription = this._activatedRoute.params.subscribe(params => {
            let libraryPath = params['library'];
            Observable.zip(
                this._photoService.getPhotos(libraryPath),
                this._photoService.getLibraryInfo(libraryPath))
                .subscribe(([photos, info]) => {
                    this.photos = photos;
                    this.library = info;
                    if (params['photo']) {
                        this.setSelectedPhoto(params['photo']);
                    } else {
                        this.setSelectedPhoto(this.photos[0]);
                    }
                });
        });

    }

    private setSelectedPhoto(photo) {
        this.selectedPhoto = photo;
        this.selectedPhotoPath = `/Photos/Data/${this.library.path}/1280x1280/${this.selectedPhoto}`;

        if (!this.photos) {
            return;
        }

        let index = this.photos.indexOf(this.selectedPhoto);

        if (index - 1 < 0) {
            this.previousPath = null;
        } else {
            this.previousPath = `/Library/${this.library.path}/Photo/${this.photos[index - 1]}`;
        }
        if (index + 1 >= this.photos.length) {
            this.nextPath = null;
        } else {
            this.nextPath = `/Library/${this.library.path}/Photo/${this.photos[index + 1]}`;
        }
    }
}