import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
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
    private formBuilder: FormBuilder
  ) {}

  createForm(user: User) {
    this.formLogin = this.formBuilder.group({
      email: user.email,
      password: user.senha,
    });
  }

  onSubmit() {
    const email = this.formLogin.get('email')?.value;
    const passowrd = this.formLogin.get('password')?.value;
    this.authService.login(email, passowrd).subscribe((ret) => {
      console.log('Rodolfo' + ret.nome);
    });
  }

  teste() {
    this.authService
      .login('rodolfobortolozo@gmail.com', '123456')
      .subscribe((ret) => {
        console.log('Rodolfo' + ret.nome);
      });
  }

  ngOnInit() {
    this.createForm(this.user);
  }
}
