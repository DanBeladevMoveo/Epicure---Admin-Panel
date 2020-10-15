import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "app/services/app.service";
@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  user = { email: "", password: "" };
  error='';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService
  ) {}

  dishForm = this.fb.group({
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
    this.appService.login(this.dishForm.value).subscribe(
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
