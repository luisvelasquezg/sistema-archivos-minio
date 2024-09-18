import { Component, NgZone } from '@angular/core';
import { CryptoService } from "../../services/crypto.service";
import { enc } from "crypto-js";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {

  storedValue: string | null = null;
  messageFromAngularJS: string = '';
  angularJSOrigin = 'http://localhost:3000'; // Dominio de la app AngularJS


  // constructor(private cryptoService: CryptoService) { }
  constructor(private cryptoService: CryptoService, private ngZone: NgZone) {
    window.addEventListener('message', (event) => {
      if (event.origin !== this.angularJSOrigin) return;

      this.ngZone.run(() => {
        this.messageFromAngularJS = event.data;
      });
    }, false);
  }

  sendMessage() {
    // Para ventanas emergentes
    if (window.opener) {
      window.opener.postMessage('Hola desde Angular', this.angularJSOrigin);
    } else if (window.parent) {
      // Para iframes
      window.parent.postMessage('Hola desde Angular', this.angularJSOrigin);
    }
  }

  // sendMessage() {
  //   localStorage.setItem('angular-message', 'Hola desde Angular');
  //   window.parent.dispatchEvent(new Event('storage'));
  // }

  // onSubmit(): void {
  //   this.mensaje = 'Hola Mundo!';
  //   console.log('mensaje:', this.mensaje);
  // }

  // Comprobar si el almacenamiento local está disponible
  isLocalStorageAvailable() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  setData(key: string, value: string): void {
    try {
      const encryptedData = this.cryptoService.encryptData(value);
      console.log('setData() - encryptedData:', encryptedData);
      console.log('setData() - JSON stringify (encryptedData):', JSON.stringify(encryptedData));
      // localStorage.setItem(key, JSON.stringify(encryptedData));
      localStorage.setItem(key, encryptedData);
      // localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
      // Manejar el error (por ejemplo, si el almacenamiento está lleno)
    }
  }

  getData(key: string): any {
    this.storedValue = null;
    console.log('key:', key);
    const encryptedData = localStorage.getItem(key);
    console.log('encryptedData found:', encryptedData);
    console.log('this.storedValue', this.storedValue);
    if (encryptedData) {
      // const decryptedData = this.cryptoService.decryptData(encryptedData);
      // console.log(decryptedData);
      this.storedValue = this.cryptoService.decryptData(encryptedData);
      console.log('storedValue:', this.storedValue);
    }
    // const data = localStorage.getItem(key);
    // return data ? JSON.parse(data) : null;
  }

  getAllData(): any {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        localStorage.getItem(key);
        console.log(`${key}: ${localStorage.getItem(key)}`);
        const valueObtained = JSON.stringify(this.getData(key));
        console.log(`${key}: ${valueObtained}`);

        // console.log('type:', typeof localStorage.getItem(key));
        // data[key] = this.getData(key);
      }
    }
    console.log(data);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }

  getKeys(): string[] {
    return Object.keys(localStorage);
  }

  getValues(): any[] {
    return Object.values(localStorage);
  }

  getEntries(): [string, any][] {
    return Object.entries(localStorage);
  }

  hasData(key: string): boolean {
    return localStorage.hasOwnProperty(key);
  }

  hasValue(value: any): boolean {
    return Object.values(localStorage).includes(value);
  }

  hasEntry(key: string, value: any): boolean {
    return Object.entries(localStorage).some(([k, v]) => k === key && v === value);
  }

  getLength(): number {
    return localStorage.length;
  }

  isEmpty(): boolean {
    return localStorage.length === 0;
  }

}