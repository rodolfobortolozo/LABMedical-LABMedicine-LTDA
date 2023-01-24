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
  inputSearch: string = '';

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.getAllPatient();
  }

  getAllPatient(): void {
    this.patientService
      .getAllPatient()
      .subscribe((patient: Patient[]) => (this.patients = patient));
  }

  getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  search(search: string): void {
    if (search === '') {
      this.getAllPatient();
    }
    this.patients = this.patients.filter((patient: Patient) => {
      let pat =
        patient.nome?.toLowerCase() +
        patient.email?.toLocaleLowerCase() +
        patient.id;
      return String(pat).includes(search.toLowerCase());
    });
  }
}
