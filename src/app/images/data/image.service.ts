import { Injectable } from "@angular/core";
import { IImage } from "./models/image";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private imagesUrl = 'http://jsonplaceholder.typicode.com/photos';
    constructor(private http: HttpClient) {}

    getImages(): Observable<IImage[]>{
        return this.http.get<IImage[]>(this.imagesUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    getImageById(id: number): Observable<IImage>{
        return this.http.get<IImage>(this.imagesUrl+'/'+id).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    addImage(newImage: IImage): Observable<IImage>{
        return this.http.post<IImage>(this.imagesUrl, newImage, {headers: new HttpHeaders({
            'Content-Type':'application/json'
        })}
        );
    }

    updateImage(updatedImage: IImage): Observable<IImage>{
        return this.http.put<IImage>(this.imagesUrl+'/'+updatedImage.id, updatedImage, {headers: new HttpHeaders({
            'Content-Type':'application/json'
        })}
        );
    }

    deleteImage(imageId: number): Observable<void>{
        return this.http.delete<void>(this.imagesUrl+'/'+imageId);
    }

    private handleError(error: HttpErrorResponse){
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${error.error.message}`;
        } else {
            errorMessage = `Server returned code: ${error.status}, error message is ${error.message}`;
        }
        return throwError(() => errorMessage);
    }
}