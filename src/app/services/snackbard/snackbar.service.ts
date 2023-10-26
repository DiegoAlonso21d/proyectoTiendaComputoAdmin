import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import SweetAlert from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor() {}

  showSnackbar(message: string, action: string) {
    if (action === 'error') {
      Swal.fire({
        title: '¡Aviso!',
        text: message,
        confirmButtonText: action,
        position: 'top',
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: '¡Aviso!',
        text: message,
        confirmButtonText: action,
        position: 'top',
        timer: 2000,
      });
    }
  }
}
