import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor(private api: ApiService, private router: Router) {

  }
  ngOnInit(): void {
    


  }
  login = new FormGroup({

    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordrFormControl: new FormControl('', [Validators.required, Validators.minLength(8)])

  })

  loginButton() {
    console.log(this.login.value.passwordrFormControl)
    this.api.getSignUpData()
      .subscribe({
        next: (res) => {
          const result = res.find((a: any) => {
            return a.emailFormControl === this.login.value.emailFormControl && a.passwordFormControl === this.login.value.passwordrFormControl;
          })

          if (result) {
            alert("Login Successfull")
            // this.api.changeStatus(false)
            // localStorage.setItem("session", "true");
            this.api.setStatusValue(false);
            this.login.reset();
            this.router.navigate(["table"]);
          }
          else {
            alert("User not found !!")
          }
        },
        error: (err) => {
          alert("Something went wrong !!")
        }
      })
  }

  resetLogin() {
    this.login.reset();
  }

  createAccount() {
    this.router.navigate(["signup"])
  }

}
