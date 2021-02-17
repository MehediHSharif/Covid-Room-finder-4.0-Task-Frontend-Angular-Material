import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  submitted = false;
  hide = true;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,30}'
          ),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  registerUser(data) {
    this._auth.registerUser(data).subscribe(
      (res) => {
        this._router.navigate(['/login']);
        console.log(res);
        console.log(true);
      },
      (err) => console.log(err)
    );
  }
}
