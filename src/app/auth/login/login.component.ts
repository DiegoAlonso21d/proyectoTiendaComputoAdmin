import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global.constans';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: any = FormGroup;

  responseMessage: any;

  token = localStorage.getItem('token');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,

    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    var formData = this.loginForm.value;

    var data = {
      email: formData.email,
      password: formData.password,
    };

    this.usuarioService.login(data).subscribe(
      (response: any) => {
        console.log(response);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard']);
      },

      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
          console.log(error);
        }
        this.snackbarService.showSnackbar('Credenciales incorrectas', 'Error');
      }
    );
  }
}
