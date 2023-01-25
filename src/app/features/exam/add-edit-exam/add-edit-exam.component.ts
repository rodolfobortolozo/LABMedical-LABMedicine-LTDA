import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/shared/model/exam';
import { Patient } from 'src/app/shared/model/patient';
import { NotificationService } from 'src/app/shared/service/notification.service';
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

  examId: any;

  formExam: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllPatient();
    this.createForm(this.exam);

    this.examId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.examId != null) {
      this.getExamById(this.examId);
    }
  }

  getAllPatient(): void {
    this.patientService
      .getAllPatient()
      .subscribe((patients: Patient[]) => (this.patients = patients));
  }

  createForm(exam: Exam) {
    this.formExam = this.formBuilder.group({
      id: [exam.id],
      idPatient: [exam.idPatient, [Validators.required]],
      exame: [
        exam.exame,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      dtaExame: [exam.dtaExame, [Validators.required]],
      horaExame: exam.horaExame,
      tipo: [exam.tipo, [Validators.minLength(4), Validators.maxLength(32)]],
      laboratorio: [
        exam.laboratorio,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ],
      ],
      url: [exam.url],
      resultado: [
        exam.resultado,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(1024),
        ],
      ],
    });
  }

  clearForm() {
    this.formExam.reset();
    this.exam = {} as Exam;
  }

  onSubmit() {
    if (this.examId != null) {
      return this.updateExam(this.formExam.value);
    }
    return this.saveExam(this.formExam.value);
  }

  saveExam(exam: Exam) {
    this.examService.saveExam(exam).subscribe(() => this.clearForm());
  }

  updateExam(exam: Exam) {
    this.examService.updateExam(exam).subscribe(() => {
      this.notificationService.openSnackBar('Exame Alterado');
    });
  }

  getExamById(id: number) {
    this.examService
      .getExamById(id)
      .subscribe((res) => this.formExam.patchValue(res));
  }

  deleteExam(id: Number) {
    this.examService
      .deleteExam(id)
      .subscribe(() => this.notificationService.openSnackBar('Exame Excluido'));
  }
}
