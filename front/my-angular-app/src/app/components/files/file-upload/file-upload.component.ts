import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  // @Output() fileUploaded = new EventEmitter<void>();

  selectedFile: File | null = null;
  uploading: boolean = false;
  uploadProgress: number = 0;
  processingFile: boolean = false;

  constructor(private fileService: FileService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.uploadProgress = 0;
    this.processingFile = false;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.uploading = true;
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
            if (this.uploadProgress === 100) {
              console.log('Procesando archivo...');
              this.processingFile = true;
            }
          } else if (event.type === HttpEventType.Response) {
            console.log(event.body.message);
            this.selectedFile = null;
            this.uploading = false;
            this.processingFile = false;
            this.uploadProgress = 0;
          }
        },
        error: (error) => {
          console.error('Error al subir el archivo:', error);
          this.uploading = false;
          this.processingFile = false;
          this.uploadProgress = 0;
        }
      });
    }
  }

  // uploadFile(): void {
  //   if (this.selectedFile) {
  //     this.uploading = true;
  //     this.fileService.uploadFile(this.selectedFile).subscribe({
  //       next: (response) => {
  //         console.log('Archivo subido con éxito:', response.message);
  //         this.uploading = false;
  //         this.selectedFile = null;
  //         // this.fileUploaded.emit();
  //         // Aquí puedes agregar lógica adicional, como actualizar la lista de archivos
  //       },
  //       error: (error) => {
  //         console.error('Error al subir el archivo:', error);
  //         this.uploading = false;
  //       },
  //       complete: () => {
  //         console.log('Subida completada');
  //         this.uploading = false;
  //       }
  //     });
  //   }
  // }
}