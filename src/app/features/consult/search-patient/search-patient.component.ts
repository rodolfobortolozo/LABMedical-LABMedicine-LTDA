import { Component } from '@angular/core';
import { Patient } from 'src/app/shared/model/patient';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'lab-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss'],
})
export class SearchPatientComponent {
  patients: Patient[];

  constructor(private paientService: PatientService) {}

  ngOnInit(): void {
    this.getAllPatient();
  }

  getAllPatient(): void {
    this.paientService
      .getAllPatient()
      .subscribe((patients: Patient[]) => (this.patients = patients));
  }
}
