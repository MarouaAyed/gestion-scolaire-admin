import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // Mark as standalone component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
})
export class LoginComponent implements OnInit {
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('test');
      if (email && password) {
        // Ensure both are defined
        this.authService.login(email, password).subscribe(
          (response) => {
            console.log('Login successful', response);
            localStorage.setItem('token', response['authorisation'].token);
            if (response['user'].is_admin) {
              this.router.navigate(['admin/dashboard']);
              console.log('router dashboard');
            } else {
              console.error('Login failed');
            }
          },
          (error) => {
            console.error('Login error', error);
          }
        );
      } else {
        console.error('Email or password is missing');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
