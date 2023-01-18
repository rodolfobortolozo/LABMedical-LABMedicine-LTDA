import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultRoutingModule } from './consult-routing.module';
import { AddEditConsultComponent } from './add-edit-consult/add-edit-consult.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';

@NgModule({
  declarations: [AddEditConsultComponent],
  imports: [
    CommonModule,
    ConsultRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class ConsultModule {}
