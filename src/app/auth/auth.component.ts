import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const request = this.loginForm.value;

      this.authService.login(request).subscribe(
        response => {
          console.log('Login successful', response);
          // Redirect or perform additional actions on successful login
        },
        error => {
          console.error('Login failed', error);
          // Handle login error (e.g., display error message)
        }
      );
    }
  }

}
