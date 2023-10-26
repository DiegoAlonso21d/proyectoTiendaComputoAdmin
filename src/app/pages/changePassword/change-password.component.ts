import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { GlobalConstants } from 'src/app/global.constans';

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

  resposeMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  validateSubmit() {
    if (
      this.changePasswordForm.controls['newPassword'].value !=
      this.changePasswordForm.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleChangePasswordSubmit() {
    this.ngxService.start();
    var formData = this.changePasswordForm.value;

    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    this.usuarioService.changePassword(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.resposeMessage = response?.message;
        this.snackbarService.showSnackbar(this.resposeMessage, 'Exitoso');
      },
      (error) => {
        console.log(error);
        this.ngxService.stop();
        if (error.error?.message) {
          this.resposeMessage = error.error?.message;
        } else {
          this.resposeMessage = GlobalConstants.genericError;
        }

        this.snackbarService.showSnackbar(
          this.resposeMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
