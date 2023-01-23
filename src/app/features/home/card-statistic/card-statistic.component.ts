import { Component } from '@angular/core';
import { Consult } from 'src/app/shared/model/consult';
import { Exam } from 'src/app/shared/model/exam';
import { Patient } from 'src/app/shared/model/patient';
import { ConsultService } from '../../consult/consult.service';
import { ExamService } from '../../exam/exam.service';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'lab-card-statistic',
  templateUrl: './card-statistic.component.html',
  styleUrls: ['./card-statistic.component.scss'],
})
export class CardStatisticComponent {
  patient: Patient[] = [];
  consult: Consult[] = [];
  exam: Exam[] = [];

  constructor(
    private servicePatient: PatientService,
    private serviceConsult: ConsultService,
    private serviceExam: ExamService
  ) {}

  ngOnInit() {
    this.getAllPatient();
    this.getAllConsult();
    this.getAllExam();
  }

  getAllPatient(): void {
    this.servicePatient
      .getAllPatient()
      .subscribe((patient: Patient[]) => (this.patient = patient));
  }

  getAllConsult(): void {
    this.serviceConsult
      .getAllConsult()
      .subscribe((consult: Consult[]) => (this.consult = consult));
  }

  getAllExam(): void {
    this.serviceExam
      .getAllExam()
      .subscribe((exam: Exam[]) => (this.exam = exam));
  }
}
