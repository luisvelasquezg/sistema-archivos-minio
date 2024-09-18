import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  getData() {
    return 'Data from Angular Service';
  }
}