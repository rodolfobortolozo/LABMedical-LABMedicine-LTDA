import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { PatientRoutingModule } from './patient-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddEditComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    PatientRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [CustomMaterialModule],
})
export class PatientModule {}
