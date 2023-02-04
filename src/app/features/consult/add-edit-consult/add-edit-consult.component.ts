import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
      idPatient: [consult.idPatient, [Validators.required]],
      motivo: [
        consult.motivo,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      dtaConsulta: [moment(), [Validators.required]],
      horaConsulta: [moment().format('HH:mm'), [Validators.required]],
      descricao: [
        consult.descricao,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024),
        ],
      ],
      medicacao: [consult.medicacao],
      dosagem: [
        consult.dosagem,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(256),
        ],
      ],
    });
  }

  clearForm() {
    this.formConsult.reset();
    this.consult = {} as Consult;
  }

  onSubmit() {
    if (this.formConsult.valid) {
      if (this.consultId != null) {
        return this.updateConsult(this.formConsult.value);
      }
      return this.saveConsult(this.formConsult.value);
    }
  }

  saveConsult(consult: Consult) {
    if (this.formConsult.valid) {
      this.consultService.saveConsult(consult).subscribe(() => {
        this.notificationService.openSnackBar('Consulta Cadastrada');
        this.clearForm();
      });
    }
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
