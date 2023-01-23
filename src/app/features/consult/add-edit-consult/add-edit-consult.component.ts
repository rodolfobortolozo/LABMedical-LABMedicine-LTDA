import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consult } from 'src/app/shared/model/consult';
import { Patient } from 'src/app/shared/model/patient';
import { NotificationService } from 'src/app/shared/service/notification.service';
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

  consultId: any;

  formConsult: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private consultService: ConsultService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm(this.consult);
    this.getAllPatient();

    this.consultId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.consultId != null) {
      this.getConsultById(this.consultId);
    }
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
    if (this.consultId != null) {
      return this.updateConsult(this.formConsult.value);
    }
    return this.saveConsult(this.formConsult.value);
  }

  saveConsult(consult: Consult) {
    this.consultService.saveConsult(consult).subscribe(() => this.clearForm());
  }

  updateConsult(consult: Consult) {
    this.consultService.updateConsult(consult).subscribe(() => {
      this.notificationService.openSnackBar('Consulta Alterada');
    });
  }

  getConsultById(id: number) {
    this.consultService
      .getConsultById(id)
      .subscribe((res) => this.formConsult.patchValue(res));
  }

  deleteConsult(id: Number) {
    this.consultService
      .deleteConsult(id)
      .subscribe(() =>
        this.notificationService.openSnackBar('Consulta Excluida')
      );
  }
}
