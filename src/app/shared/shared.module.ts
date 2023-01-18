import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, CustomMaterialModule, RouterModule],
  exports: [CustomMaterialModule],
})
export class SharedModule {}
