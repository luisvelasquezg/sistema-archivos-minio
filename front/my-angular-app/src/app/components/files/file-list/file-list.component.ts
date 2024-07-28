import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit, OnDestroy {
  files: any[] = [];
  loading: boolean = false;
  private fileUploadSubscription: Subscription = new Subscription();

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.loadFiles();
    this.fileUploadSubscription = this.fileService.fileUploaded$.subscribe(() => {
      this.loadFiles();
    });
  }

  ngOnDestroy(): void {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
  }

  loadFiles(): void {
    this.loading = true;
    this.fileService.getFiles().subscribe({
      next: (data) => {
        this.files = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar archivos:', error);
        this.loading = false;
      }
    });
  }

  downloadFile(filename: string): void {
    this.fileService.downloadFile(filename).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al descargar el archivo:', error);
      },
      complete: () => {
        console.log('Descarga completada');
      }
    });
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}