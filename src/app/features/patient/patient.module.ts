import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { PatientRoutingModule } from './patient-routing.module';
import { AddEditComponent } from './add-edit-patient/add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListMedicalRecordComponent } from './list-medical-record/list-medical-record.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientMedicalRecordComponent } from './patient-medical-record/patient-medical-record.component'; // Importar os Pipes

@NgModule({
  declarations: [AddEditComponent, ListMedicalRecordComponent, PatientMedicalRecordComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [CustomMaterialModule],
})
export class PatientModule {}
