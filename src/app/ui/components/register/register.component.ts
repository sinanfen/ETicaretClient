import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["",
        [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      userName: ["",
        [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      email: ["",
        [Validators.required,
        Validators.maxLength(250),
        Validators.email]],
      password: ["",
        [Validators.required,
        Validators.maxLength(16),
        Validators.minLength(5)]],
      passwordConfirm: ["",
        [Validators.required,
        Validators.maxLength(16),
        Validators.minLength(5)]],
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;

        return sifre === sifreTekrar ? null : { notSame: true };
      }
    });
  }

  get component() {
    return this.frm.controls;

  }

  submitted: boolean = false;

  onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid)
      return

  }

}
