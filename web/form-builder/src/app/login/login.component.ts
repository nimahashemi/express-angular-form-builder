import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtService } from '../_services/jwt.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: string = '';

  constructor(private authService: AuthService, private storageService: StorageService, private jwtService: JwtService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUser().username;
    }
  }

  async onSubmit(): Promise<void> {
    const { username, password } = this.form;

    (await this.authService.login(username, password)).subscribe({
      next: (data: any) => {
        const userData = this.jwtService.decodeToken(data.token);
        data = { ...data, username: userData.username, userId: userData.userId  };
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = this.storageService.getUser().username;
        this.reloadPage();
      },
      error: (err: { error: { message: string; }; }) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  

}

