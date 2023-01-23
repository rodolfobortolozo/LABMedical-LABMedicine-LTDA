import { Component } from '@angular/core';
import { Patient } from 'src/app/shared/model/patient';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'lab-card-patient',
  templateUrl: './card-patient.component.html',
  styleUrls: ['./card-patient.component.scss'],
})
export class CardPatientComponent {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.getAllPatient();
  }

  getAllPatient(): void {
    this.patientService
      .getAllPatient()
      .subscribe((patient: Patient[]) => (this.patients = patient));
  }
}
