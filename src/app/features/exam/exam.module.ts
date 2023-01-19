import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { AddEditExamComponent } from './add-edit-exam/add-edit-exam.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';

@NgModule({
  declarations: [AddEditExamComponent],
  imports: [
    CommonModule,
    ExamRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class ExamModule {}
