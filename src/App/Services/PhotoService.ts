import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Observer } from "rxjs/Rx";
import { RequestOptions, Http } from "@angular/http";

@Injectable()
export class PhotoService {

    public constructor(
        private http: Http
    ) {
    }

    private getWithOptions(url: string) {
        let options = new RequestOptions();
        return this.http.get(url);
    }

    private _libraryCache: Library[];

    public getLibraries(): Observable<Library[]> {
        return Observable.create((observer: Observer<Library[]>) => {
            if (this._libraryCache) {
                observer.next(this._libraryCache);
                observer.complete();
            }
            else {
                this.getWithOptions(`/Photos/Data/libraries.json`).subscribe(
                    x => {
                        let res: { data: Library[] } = x.json()
                        this._libraryCache = res.data;
                        observer.next(this._libraryCache);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                        observer.complete();
                    }
                );
            }
        });
    }

    public getLibraryInfo(libraryPath: string): Observable<Library> {
        return Observable.create((observer: Observer<Library>) => {
            this.getLibraries().subscribe(libs => {
                for (let lib of libs) {
                    if (lib.path === libraryPath) {
                        observer.next(lib);
                        observer.complete();
                        break;
                    }
                }
            });
        });
    }

    public getPhotos(libraryPath: string): Observable<string[]> {
        return Observable.create((observer: Observer<string[]>) => {
            this.getWithOptions(`/Photos/Data/${libraryPath}/files.txt`).subscribe(
                x => {
                    let res = x.text().trim().split("\n")
                    observer.next(res);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                    observer.complete();
                }
            );
        });
    }

}

export class Library {
    public name: string;
    public path: string;
    public thumbnail: string;
    public description: string;
}