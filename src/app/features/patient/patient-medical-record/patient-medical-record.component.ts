import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consult } from 'src/app/shared/model/consult';
import { Exam } from 'src/app/shared/model/exam';
import { Patient } from 'src/app/shared/model/patient';
import { ConsultService } from '../../consult/consult.service';
import { ExamService } from '../../exam/exam.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'lab-patient-medical-record',
  templateUrl: './patient-medical-record.component.html',
  styleUrls: ['./patient-medical-record.component.scss'],
})
export class PatientMedicalRecordComponent {
  patient = {} as Patient;
  exams: Exam[];
  consults: Consult[];

  patientId: any;

  constructor(
    private patientService: PatientService,
    private examService: ExamService,
    private consultService: ConsultService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPatient(this.patientId);
    this.getExamByPatient(this.patientId);
    this.getConsultByPatient(this.patientId);
  }

  getPatient(patientId: number): void {
    this.patientService
      .getPatientById(patientId)
      .subscribe((patient: Patient) => (this.patient = patient));
  }

  getExamByPatient(patientId: number): void {
    this.examService
      .getExamByPatientId(patientId)
      .subscribe((exam: Exam[]) => (this.exams = exam));
  }

  getConsultByPatient(patientId: number): void {
    this.consultService
      .getExamByPatientId(patientId)
      .subscribe((consults: Consult[]) => (this.consults = consults));
  }

  getDate(input: any) {
    return new Date(input);
  }
}
