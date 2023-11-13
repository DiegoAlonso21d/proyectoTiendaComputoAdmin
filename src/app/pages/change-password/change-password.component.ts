import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  oldPassword = true;
  newPassword = true;
  confirmPassword = true;

  changePasswordForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  validateSubmit(): void {
    // Valida que ninguno de los campos esté vacío
    if (!this.changePasswordForm.valid) {
      return;
    }

    // Valida que la nueva contraseña y la contraseña de confirmación sean iguales
    const newPassword = this.changePasswordForm.get('newPassword').value;
    const confirmPassword =
      this.changePasswordForm.get('confirmPassword').value;
    if (newPassword !== confirmPassword) {
      this.showAlert('Las contraseñas no coinciden');
      return;
    }

    // Si todo es correcto, realiza la acción deseada
    // ...

    this.handlePasswordChangeSubmit();
  }

  handlePasswordChangeSubmit() {
    var formData = this.changePasswordForm.value;

    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    this.usuarioService.changePassword(data).subscribe(
      (response: any) => {
        this.snackbarService.showSnackbar(
          'Contraseña cambiada exitosamente',
          'Exito'
        );

        this.changePasswordForm.reset();
      },
      (error: any) => {
        console.log(error);
        this.snackbarService.showSnackbar('Error', 'Error');
      }
    );
  }

  showAlert(message: string) {
    // Puedes usar cualquier librería de alertas que desees, como SweetAlert2 o Toastr
    // Aquí hay un ejemplo de cómo usar SweetAlert2
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }
}
