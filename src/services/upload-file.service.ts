import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dmzauhdnf/image/upload';
  private uploadPreset = 'theHorrorDatabase';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(this.cloudinaryUrl, formData);
  }
}