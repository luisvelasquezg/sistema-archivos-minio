import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload2.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload2',
  templateUrl: './file-upload2.component.html',
  styleUrls: ['./file-upload2.component.css']
})
export class FileUploadComponent2 {
  selectedFile: File | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total!);
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        }
      });
    }
  }
}
