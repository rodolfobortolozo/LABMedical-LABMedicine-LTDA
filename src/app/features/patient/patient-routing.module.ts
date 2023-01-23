import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { AddEditComponent } from './add-edit-patient/add-edit.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
