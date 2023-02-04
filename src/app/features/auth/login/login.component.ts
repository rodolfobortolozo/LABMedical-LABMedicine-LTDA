import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/model/user';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'lab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup;
  user = {} as User;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  createForm(user: User) {
    this.formLogin = this.formBuilder.group({
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.senha, [Validators.required]],
      rememberMe: '',
    });

    this.rememberMe();
  }

  onSubmit() {
    const email = this.formLogin.get('email')?.value;
    const passowrd = this.formLogin.get('password')?.value;
    const rememberMe = this.formLogin.get('rememberMe')?.value;

    if (this.formLogin.valid) {
      this.authService.login(email, passowrd).subscribe((ret) => {
        if (ret[0]?.sucesso === true) {
          this.notificationService.openSnackBar(
            `Seja Bem-Vindo ${ret[0].nome}`
          );

          if (rememberMe) {
            localStorage.setItem('savedUserEmail', email);
          } else {
            localStorage.removeItem('savedUserEmail');
          }
        } else {
          this.notificationService.openSnackBar('Usuário ou Senha Inválidos');
        }
      });
    }
  }

  openAddUser() {
    this.dialog.open(AddEditUserComponent);
  }

  rememberMe(): void {
    const email = localStorage.getItem('savedUserEmail');

    if (email) {
      this.formLogin.get('email')?.setValue(email);
      this.formLogin.get('rememberMe')?.setValue(true);
    }
  }

  ngOnInit() {
    this.createForm(this.user);
  }

  alterPassword() {
    this.notificationService.openSnackBar('Funcionalidade em Construção!');
  }
}
