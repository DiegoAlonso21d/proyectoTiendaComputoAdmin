import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/global.constans';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  password = true;
  confirmPassword = true;

  registerForm: any = FormGroup;

  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombres: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],

      telefono: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateSubmit() {
    if (
      this.registerForm.controls['password'].value !=
      this.registerForm.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.registerForm.value;

    var data = {
      nombres: formData.nombres,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password,
    };

    this.usuarioService.signup(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackbarService.showSnackbar(this.responseMessage, '');
      this.router.navigate([""])
    });
  }
}
