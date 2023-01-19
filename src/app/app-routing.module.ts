import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'patient',
    loadChildren: () =>
      import('./features/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'consult',
    loadChildren: () =>
      import('./features/consult/consult.module').then((m) => m.ConsultModule),
  },
  {
    path: 'exam',
    loadChildren: () =>
      import('./features/exam/exam.module').then((m) => m.ExamModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
