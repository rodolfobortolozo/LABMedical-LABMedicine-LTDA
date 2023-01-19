import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exam } from 'src/app/shared/model/exam';
import { Patient } from 'src/app/shared/model/patient';
import { PatientService } from '../../patient/patient.service';
import { ExamService } from '../exam.service';

@Component({
  selector: 'lab-add-edit-exam',
  templateUrl: './add-edit-exam.component.html',
  styleUrls: ['./add-edit-exam.component.scss'],
})
export class AddEditExamComponent {
  patients: Patient[];
  exam = {} as Exam;

  formExam: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.getAllPatient();
    this.createForm(this.exam);
  }

  getAllPatient(): void {
    this.patientService
      .getAllPatient()
      .subscribe((patients: Patient[]) => (this.patients = patients));
  }

  createForm(exam: Exam) {
    this.formExam = this.formBuilder.group({
      id: exam.id,
      idPatient: exam.idPatient,
      exame: exam.exame,
      dtaExame: exam.dtaExame,
      horaExame: exam.horaExame,
      tipo: exam.tipo,
      laboratorio: exam.laboratorio,
      url: exam.url,
      resultado: exam.resultado,
    });
  }

  clearForm() {
    this.formExam.reset();
    this.exam = {} as Exam;
  }

  onSubmit() {
    this.saveExam(this.formExam.value);
  }

  saveExam(exam: Exam) {
    this.examService.saveExam(exam).subscribe(() => this.clearForm());
  }
}
