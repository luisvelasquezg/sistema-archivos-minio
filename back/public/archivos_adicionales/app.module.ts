import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { HttpClientModule } from '@angular/common/http';
import { FileListComponent } from './file-list.component';
import { FileUploadComponent } from './file-upload.component';
import { FileViewerComponent } from './file-viewer.component';
import { FileService } from './file.service';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule
  ],
  declarations: [
    FileListComponent,
    FileUploadComponent,
    FileViewerComponent
  ],
  providers: [
    FileService
  ],
  entryComponents: [
    FileListComponent,
    FileUploadComponent,
    FileViewerComponent
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() { }
}