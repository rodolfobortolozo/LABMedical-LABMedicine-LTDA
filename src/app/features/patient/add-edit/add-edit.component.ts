import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cep } from 'src/app/core/model/cep';
import { CepService } from 'src/app/core/services/cep.service';
import { PatientService } from 'src/app/features/patient/patient.service';
import { Patient } from '../../../shared/model/patient';

@Component({
  selector: 'lab-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  patient = {} as Patient;
  retCep = {} as Cep;
  inputCep: string = '';

  formPatient: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private cepService: CepService
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
        Validators.required,
        Validators.min(8),
        Validators.max(64),
      ],
      genero: [patient.genero, Validators.required],
      dtaNascimento: [patient.dtaNascimento, Validators.required],
      nroCpf: [patient.nroCpf, Validators.required],
      nroRg: [patient.nroRg, Validators.required, Validators.max(20)],
      estadoCivil: [patient.estadoCivil, Validators.required],
      telefone: [patient.telefone, Validators.required],
      email: patient.telefone,
      naturalidade: [
        patient.naturalidade,
        Validators.required,
        Validators.min(8),
        Validators.max(64),
      ],
      convenio: patient.convenio,
      nroCarteira: patient.nroCarteira,
      dtaValidade: patient.dtaValidade,
      cep: [patient.cep, Validators.required],
      cidade: [patient.cidade, Validators.required],
      estado: [patient.estado, Validators.required],
      logradouro: [patient.logradouro, Validators.required],
      numero: [patient.numero, Validators.required],
      complemento: [patient.complemento, Validators.required],
      bairro: [patient.bairro, Validators.required],
      pontoReferencia: patient.pontoReferencia,
    });
  }

  ngOnInit(): void {
    //this.getAllUser();
    this.createForm(this.patient);
  }

  clearForm() {
    //this.getAllUser();
    this.formPatient.reset();
    this.patient = {} as Patient;
  }

  onSubmit() {
    this.savePatient(this.formPatient.value);
  }

  savePatient(patient: Patient) {
    this.patientService.savePatient(patient).subscribe(() => this.clearForm);
    console.log(patient);
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
