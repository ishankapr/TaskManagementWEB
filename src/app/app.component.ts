import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(private authService: AuthService, private router: Router){

  }
  headerTitle = 'Tasks Management Web';

  logout() {
      localStorage.removeItem('loginInfo');
      this.router.navigate(['/login']);
  }

  isLogedIn(){
    return this.authService.IsLoggedIn()
  }
}
