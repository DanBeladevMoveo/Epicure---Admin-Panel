import { Component, OnInit } from "@angular/core";

import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "app/services/app.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user = { email: "", password: "" };
  error='';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService
  ) {}

  loginForm = this.fb.group({
    email: ["", Validators.compose([Validators.required, Validators.email])],
    password: [
      "",
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });

  ngOnInit(): void {
    const islogin = localStorage.getItem("login");
    if (islogin) {
      this.router.navigateByUrl("dashboard");
    }
  }

  submit(): void {
    this.appService.login(this.loginForm.value).subscribe(
      (res) => {console.log(res);
            localStorage.setItem("login", "true");
            localStorage.setItem('token',res.token)
            this.router.navigateByUrl("dashboard");
      },
      (err) => {
        console.log(err);
        this.error = err.error?.message || err.statusText
      }
    );
  }
}
