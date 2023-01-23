import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { CardPatientComponent } from './card-patient/card-patient.component';
import { CardStatisticComponent } from './card-statistic/card-statistic.component';

@NgModule({
  declarations: [MainComponent, CardPatientComponent, CardStatisticComponent],
  imports: [CommonModule, HomeRoutingModule, CustomMaterialModule],
})
export class HomeModule {}
