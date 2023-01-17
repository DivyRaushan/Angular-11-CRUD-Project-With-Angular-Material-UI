import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  hide = true;
  constructor(private api: ApiService, private router: Router) {

  }
  ngOnInit(): void {


  }
  signup = new FormGroup({

    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)])

  })

  signupButton() {
    this.api.postSignUpData(this.signup.value)
      .subscribe({
        next: (res) => {
          this.signup.reset()
          alert("Sign Up Successful")
          this.router.navigate(["login"])
        },
        error: (err) => {
          alert("Something went wrong")
        }
      })


  }

  resetSignUp() {
    this.signup.reset();
  }

  alreadyAccount() {
    this.router.navigate(["login"])
  }

}
