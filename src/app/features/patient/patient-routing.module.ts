import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { AddEditComponent } from './add-edit-patient/add-edit.component';
import { ListMedicalRecordComponent } from './list-medical-record/list-medical-record.component';
import { PatientMedicalRecordComponent } from './patient-medical-record/patient-medical-record.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'add',
        title: 'LABMedical - Cadastrar Paciente',
        component: AddEditComponent,
      },
      {
        path: 'edit/:id',
        title: 'LABMedical - Alterar Paciente',
        component: AddEditComponent,
      },
      {
        path: 'medical-record',
        title: 'LABMedical - Prontuário',
        component: ListMedicalRecordComponent,
      },
      {
        path: 'medical-record/:id',
        title: 'LABMedical - Prontuário do Pacient',
        component: PatientMedicalRecordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
