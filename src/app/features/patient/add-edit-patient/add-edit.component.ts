import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cep } from 'src/app/shared/model/cep';
import { CepService } from 'src/app/features/patient/cep.service';
import { PatientService } from 'src/app/features/patient/patient.service';
import { Patient } from '../../../shared/model/patient';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Exam } from 'src/app/shared/model/exam';
import { Consult } from 'src/app/shared/model/consult';
import { ExamService } from '../../exam/exam.service';
import { ConsultService } from '../../consult/consult.service';

@Component({
  selector: 'lab-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  patient = {} as Patient;
  retCep = {} as Cep;
  inputCep: string = '';
  mask: string;
  qtdExamConsult: number = 0;
  hidden = false;
  patientId: any;

  formPatient: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private cepService: CepService,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private consultService: ConsultService,
    private notificationService: NotificationService
  ) {}

  retornoCep(): void {
    this.cepService.getCep(this.inputCep).subscribe((cep: Cep) => {
      this.formPatient.patchValue({
        logradouro: cep.logradouro,
        estado: cep.uf,
        cidade: cep.localidade,
        bairro: cep.bairro,
      });
    });
  }

  createForm(patient: Patient) {
    this.formPatient = this.formBuilder.group({
      id: patient.id,
      nome: [
        patient.nome,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      genero: [patient.genero, [Validators.required]],
      dtaNascimento: [patient.dtaNascimento, [Validators.required]],
      nroCpf: [patient.nroCpf, [Validators.required]],
      nroRg: [patient.nroRg, [Validators.required, Validators.maxLength(20)]],
      estadoCivil: [patient.estadoCivil, [Validators.required]],
      telefone: [patient.telefone, [Validators.required]],
      email: [patient.email, [Validators.email]],
      naturalidade: [
        patient.naturalidade,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      convenio: patient.convenio,
      nroCarteira: patient.nroCarteira,
      dtaValidade: patient.dtaValidade,
      telefoneEmergencia: [patient.telefoneEmergencia, [Validators.required]],
      alergia: patient.alergia,
      listaCuidado: patient.listaCuidado,
      cep: [patient.cep, [Validators.required]],
      cidade: [patient.cidade, [Validators.required]],
      estado: [patient.estado, [Validators.required]],
      logradouro: [patient.logradouro, [Validators.required]],
      numero: [patient.numero, [Validators.required]],
      complemento: [patient.complemento, [Validators.required]],
      bairro: [patient.bairro, [Validators.required]],
      pontoReferencia: patient.pontoReferencia,
    });
  }

  ngOnInit(): void {
    this.createForm(this.patient);
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.patientId != null) {
      this.getPatientById(this.patientId);
      this.getExamByPatient(this.patientId);
      this.getConsultByPatient(this.patientId);
    }
  }

  clearForm() {
    //this.patient = {} as Patient;
    this.formPatient.reset();
  }

  onSubmit() {
    if (this.formPatient.valid) {
      if (this.patientId != null) {
        return this.updatePatient(this.formPatient.value);
      }
      return this.savePatient(this.formPatient.value);
    }
  }

  savePatient(patient: Patient) {
    this.patientService.savePatient(patient).subscribe(() => {
      this.clearForm();
      this.notificationService.openSnackBar('Paciente Cadastrado');
    });
  }

  updatePatient(patient: Patient) {
    this.patientService.updatePatient(patient).subscribe(() => {
      this.notificationService.openSnackBar('Paciente Alterado');
    });
  }

  getPatientById(id: number) {
    this.patientService
      .getPatientById(id)
      .subscribe((res) => this.formPatient.patchValue(res));
  }

  deletePatient(id: Number) {
    this.patientService
      .deletePatient(id)
      .subscribe(() =>
        this.notificationService.openSnackBar('Paciente Excluido')
      );
  }

  getExamByPatient(patientId: Number): void {
    this.examService
      .getExamByPatientId(patientId)
      .subscribe((exam: Exam[]) => (this.qtdExamConsult += exam.length));
  }

  getConsultByPatient(patientId: Number): void {
    this.consultService
      .getExamByPatientId(patientId)
      .subscribe(
        (consults: Consult[]) => (this.qtdExamConsult += consults.length)
      );
  }

  //Constantes
  GENEROS = [
    { genero: 'M', descricao: 'Masculino' },
    { genero: 'F', descricao: 'Feminino' },
  ];

  ESTADOCIVIL = [
    { estcivil: 'S', descricao: 'Solteiro' },
    { estcivil: 'C', descricao: 'Casado' },
    { estcivil: 'O', descricao: 'Outro' },
  ];
}
