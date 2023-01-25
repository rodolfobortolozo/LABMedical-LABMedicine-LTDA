import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'lab-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent {
  user = {} as User;

  formUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  createform(user: User) {
    this.formUser = this.formBuilder.group({
      id: [user.id],
      nome: [user.nome, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      senha: [user.senha, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.createform(this.user);
  }

  clearForm() {
    this.formUser.reset();
    this.user = {} as User;
  }

  saveUser(user: User) {
    this.authService.saveUser(user).subscribe(() => {
      this.notificationService.openSnackBar('Usuário Cadastrado com Sucesso');
      this.clearForm();
    });
  }

  onSubmit() {
    if (this.formUser.valid) {
      return this.saveUser(this.formUser.value);
    }
  }
}
