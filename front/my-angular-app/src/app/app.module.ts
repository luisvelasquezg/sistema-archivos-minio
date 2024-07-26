import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FileUploadComponent } from './components/file-upload2/file-upload2.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FileListComponent } from './components/files/file-list/file-list.component';
import { FileUploadComponent } from './components/files/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
