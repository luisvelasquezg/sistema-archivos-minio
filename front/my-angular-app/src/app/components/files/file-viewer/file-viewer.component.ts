import { Component, Input, OnChanges } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnChanges {
  @Input() filename: string = '';
  fileUrl: string = '';
  fileType: string = '';
  safeUrl: SafeResourceUrl = '';

  constructor(private fileService: FileService, private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    if (this.filename) {
      this.fileUrl = this.fileService.getFileUrl(this.filename);
      this.fileType = this.fileService.getFileType(this.filename);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl);
    }
  }
}