import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'my-angular-app';
  title = 'Sistema de Archivos con MinIO';

  onFileUploaded(): void {
    // Recargar la lista de archivos
    const fileListComponent = document.querySelector('app-file-list');
    if (fileListComponent) {
      (fileListComponent as any).loadFiles();
    }
  }
}
