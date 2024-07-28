import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000';
  // private fileUploadedSource = new Subject<void>();
  private fileChangedSource = new Subject<void>();

  // fileUploaded$ = this.fileUploadedSource.asObservable();
  fileChanged$ = this.fileChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<{ message: string }>(`${this.apiUrl}/upload`, formData)
      .pipe(
        // tap(() => this.fileUploadedSource.next())
        tap(() => this.fileChangedSource.next())
      );
  }

  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/files`);
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${filename}`, { responseType: 'blob' });
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${filename}`)
      .pipe(
        tap(() => this.fileChangedSource.next())
      );
  }

  deleteMultipleFiles(filenames: string[]): Observable<any> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/delete-multiple`, { filenames })
      .pipe(
        tap(() => this.fileChangedSource.next())
      );
  }


  // Previsualization of files
  getFileUrl(filename: string): string {
    return `${this.apiUrl}/view/${filename}`;
  }

  getFileType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension && ['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
    } else if (extension === 'pdf') {
      return 'pdf';
    } else if (extension && ['txt', 'csv', 'json'].includes(extension)) {
      return 'text';
    } else if (extension && ['mp4', 'webm', 'ogg'].includes(extension)) {
      return 'video';
    } else if (extension && ['mp3', 'wav'].includes(extension)) {
      return 'audio';
    }
    return 'other';
  }
  // End of previsualization of files

}