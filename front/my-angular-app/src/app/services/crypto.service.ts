import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private secretKey = 'mySecretKey123'; // Clave secreta para cifrar/descifrar

  constructor() { }

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'tuClave') {
        console.log('El valor de localStorage ha cambiado:', event.newValue);
      }
    });

    // En Angular
    // const event2 = new CustomEvent('dataUpdate', { detail: { data: 'miData' } });
    // window.dispatchEvent(event2);

  }



  encryptData(data: any): string {
    const dataToEncrypt = JSON.stringify({ data });
    console.log('dataToEncrypt:', dataToEncrypt);
    const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, this.secretKey).toString();
    console.log('encrypted:', encrypted);
    return encrypted;
  }

  // decryptData(encryptedData: string): any {
  decryptData(encryptedData: any): any {
    try {
      // const decrypted = CryptoJS.AES.decrypt(encryptedData, this.secretKey).toString(CryptoJS.enc.Utf8);
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.secretKey);

      // const decrypted = CryptoJS.enc.Base64.parse(encryptedData);
      // .toString(CryptoJS.enc.Utf8);
      console.log('decrypted:', decrypted);
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
      console.log('decryptedData:', decryptedData);
      if (!decrypted) {
        throw new Error('Decryption failed');
      }
      // const jsonObject = JSON.parse(decryptedData);
      // console.log('jsonObject:', jsonObject);
      return JSON.parse(decryptedData).data;
      // return 'decriptado';
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null; // o manejar el error de otra manera
    }

    // const decrypted = CryptoJS.AES.decrypt(encryptedData, this.secretKey).toString(CryptoJS.enc.Utf8);
    // // console.log('decrypted:', decrypted);

    // const jsonObject = {
    //   "iv": "iv",
    //   "salt": "salt",
    //   "ct": "ct"
    // };
    // console.log('jsonObject:', jsonObject);
    // return JSON.parse(decrypted);
  }
}
