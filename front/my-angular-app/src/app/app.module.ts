import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FileUploadComponent } from './components/file-upload2/file-upload2.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { FileListComponent } from './components/files/file-list/file-list.component';
// import { FileUploadComponent } from './components/files/file-upload/file-upload.component';
// import { FileViewerComponent } from './components/files/file-viewer/file-viewer.component';

// Módulos
import { FilesModule } from './components/files/files.module';

@NgModule({
  declarations: [
    AppComponent,
    // FileUploadComponent,
    // FileListComponent,
    // FileViewerComponent
  ],
  imports: [
    BrowserModule,
    FilesModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
