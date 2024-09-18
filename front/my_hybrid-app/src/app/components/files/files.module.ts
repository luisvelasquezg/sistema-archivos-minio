import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { FileListComponent } from './file-list/file-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';

// Servicios
import { FileService } from './services/file.service';


@NgModule({
  declarations: [
    FileListComponent,
    FileUploadComponent,
    FileViewerComponent
  ],
  exports: [
    FileListComponent,
    FileUploadComponent,
    FileViewerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    FileService
  ]
})
export class FilesModule { }
