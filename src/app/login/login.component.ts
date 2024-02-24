import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
[x: string]: any;

  loginForm: FormGroup;
  loginInfo: any;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }else{
      this.loginForm.markAllAsTouched();
    }

    const request = this.loginForm.value;
    this.authService.login(request)
    .pipe(first())
    .subscribe({
      next: (val) => {
        this.loginInfo = val;
        localStorage.setItem('loginInfo', this.loginInfo);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err)
      },
    })

  }

}
