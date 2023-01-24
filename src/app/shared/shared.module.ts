import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { RouterModule } from '@angular/router';
import { LpadPipe } from './pipe/lpad.pipe';
import { CpfPipe } from './pipe/cpf.pipe';

@NgModule({
  declarations: [LayoutComponent, LpadPipe, CpfPipe],
  imports: [CommonModule, CustomMaterialModule, RouterModule],
  exports: [CustomMaterialModule, LpadPipe, CpfPipe],
})
export class SharedModule {}
