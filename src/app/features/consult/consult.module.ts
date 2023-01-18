import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultRoutingModule } from './consult-routing.module';
import { AddEditConsultComponent } from './add-edit-consult/add-edit-consult.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';

import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';

@NgModule({
  declarations: [AddEditConsultComponent, SearchPatientComponent],
  imports: [CommonModule, ConsultRoutingModule, CustomMaterialModule],
})
export class ConsultModule {}
