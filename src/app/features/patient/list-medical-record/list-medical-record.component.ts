import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/model/patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'lab-list-medical-record',
  templateUrl: './list-medical-record.component.html',
  styleUrls: ['./list-medical-record.component.scss'],
})
export class ListMedicalRecordComponent {
  patients: any = [];

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.getAllPatient();
  }

  getAllPatient() {
    this.patientService
      .getAllPatient()
      .subscribe(
        (patient: Patient[]) =>
          (this.patients = new MatTableDataSource(patient))
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patients.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['id', 'nome', 'convenio', 'acessar'];
}
