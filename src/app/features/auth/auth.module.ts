import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
