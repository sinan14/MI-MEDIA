import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
})
export class CareerComponent implements OnInit {
  form: FormGroup;
  public showLinks: boolean = false;
  private hasError: boolean = false;
  private emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  public position: string[] = [
    'Web developer',
    'Business Development Excecutive',
    'Digital Marketing Excecutive',
    'Graphic designer',
    'Others',
  ];
  public level: string[] = ['Fresher', 'Experienced'];
  public highestQualificationArray: string[] = ['PG', 'UG'];
  constructor(private _fb: FormBuilder, private _service: UserService) {}

  isValid(controlName: string) {
    return (
      (this.form.get(controlName)!.invalid &&
        this.form.get(controlName)!.touched) ||
      (this.hasError && this.form.get(controlName)!.invalid)
    );
  }
  ngOnInit(): void {
    this.form = this._fb.group({
      position: ['', Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailReg)]],
      level: ['', Validators.required],
      links: [null],
      dob: [null, Validators.required],
      medium: [null, Validators.required],
      phone: [null, [Validators.required]],
      highestQualification: ['', Validators.required],
      experience: [null, Validators.required],
      currentCompanyName: [null],
      expectedSalary: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10000000000000),
        ],
      ],
      resume: [null, Validators.required],
    });

    this.form.get('position').valueChanges.subscribe((val) => {
      this.showLinks = this.position.includes(this.form.get('position').value);
      if (this.showLinks) {
        this.form.controls['links'].setValidators([Validators.required]);
      } else {
        this.form.controls['links'].clearValidators();
      }
      this.form.controls['links'].updateValueAndValidity();
    });
  }
  onChangeResume(event: any) {
    console.log(event.target);
    const file = event.target.files[0];
    this.form.get('resume')!.setValue(file);
  }
  uploadDetails() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.hasError = true;
      console.log(this.hasError);
      return;
    }
    this.hasError = false;
    this.makeFd();
  }
  makeFd() {
    const fd = new FormData();
    fd.append('name', this.form.get('name')!.value);
    fd.append('email', this.form.get('email')!.value);
    fd.append('phone', this.form.get('phone')!.value);
    fd.append('position', this.form.get('position')!.value);
    fd.append('level', this.form.get('level')!.value);
    fd.append(
      'highestQualification',
      this.form.get('highestQualification')!.value
    );
    fd.append('experience', this.form.get('experience')!.value);
    fd.append('currentCompanyName', this.form.get('currentCompanyName')!.value);
    fd.append('expectedSalary', this.form.get('expectedSalary')!.value);
    fd.append('links', this.form.get('links')!.value);
    fd.append('medium', this.form.get('medium')!.value);
    fd.append('dob', this.form.get('dob')!.value);
    fd.append('resume', this.form.get('resume')!.value);
    //@ts-ignore
    console.log(Object.fromEntries(fd));
    this.uploadToDb(fd);
  }
  uploadToDb(fd: any) {
    this._service.uploadResume(fd).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Got it',
          });
        } else {
          // Swal.fire({});
        }
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
}
