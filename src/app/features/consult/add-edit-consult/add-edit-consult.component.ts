import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Consult } from 'src/app/shared/model/consult';
import { Patient } from 'src/app/shared/model/patient';
import { PatientService } from '../../patient/patient.service';
import { ConsultService } from '../consult.service';

@Component({
  selector: 'lab-add-edit-consult',
  templateUrl: './add-edit-consult.component.html',
  styleUrls: ['./add-edit-consult.component.scss'],
})
export class AddEditConsultComponent {
  patients: Patient[];
  consult = {} as Consult;

  formConsult: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private consultService: ConsultService
  ) {}

  ngOnInit(): void {
    this.createForm(this.consult);
    this.getAllPatient();
  }

  getAllPatient(): void {
    this.patientService
      .getAllPatient()
      .subscribe((patients: Patient[]) => (this.patients = patients));
  }

  createForm(consult: Consult) {
    this.formConsult = this.formBuilder.group({
      id: consult.id,
      idPatient: consult.idPatient,
      motivo: consult.motivo,
      dtaConsulta: consult.dtaConsulta,
      horaConsulta: consult.horaConsulta,
      descricao: consult.medicacao,
      medicacao: consult.medicacao,
      dosagem: consult.dosagem,
    });
  }

  clearForm() {
    this.formConsult.reset();
    this.consult = {} as Consult;
  }

  onSubmit() {
    this.saveConsult(this.formConsult.value);
  }

  saveConsult(consult: Consult) {
    this.consultService.saveConsult(consult).subscribe(() => this.clearForm());
  }
}
