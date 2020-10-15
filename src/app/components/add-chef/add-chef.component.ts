import { Component, Inject, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppService } from "app/services/app.service";

@Component({
  selector: "app-add-chef",
  templateUrl: "./add-chef.component.html",
  styleUrls: ["./add-chef.component.css"],
})
export class AddChefComponent implements OnInit {
  error = "";
  isEdit = false;
  isCreate = false;
  submitted = false;
  chefForm = this.fb.group({
    name: ["", Validators.compose([Validators.required])],
    image: ["", Validators.compose([Validators.required])],
    about: [
      "",
      Validators.compose([Validators.required, Validators.maxLength(1000)]),
    ],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<AddChefComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.isEdit = true;
      this.chefForm = !this.isEdit
        ? this.fb.group({
            name: ["", Validators.compose([Validators.required])],
            image: ["", Validators.compose([Validators.required])],
            about: [
              "",
              Validators.compose([
                Validators.required,
                Validators.maxLength(100),
              ]),
            ],
          })
        : this.fb.group({
            name: [this.data.name, Validators.compose([Validators.required])],
            image: [this.data.image, Validators.compose([Validators.required])],
            about: [this.data.about,  Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),],
          });
    }
    this.isCreate = !this.isEdit;
  }

  ngOnInit(): void {
    console.log("data", this.data);
    const islogin = localStorage.getItem("login");
    if (islogin) {
      this.router.navigateByUrl("dashboard");
    }
  }
  editChef(){
    this.appService.editChef(this.data._id,this.chefForm.value).subscribe(
      (res) => {
        console.log(res);
        alert("chef was changed");
        this.dialogRef.close();
        this.router.navigateByUrl("chefs");
      },
      (err) => {
        console.log(err);
        this.error = err.error?.message || err.statusText;
      }
    );
  }
  createChef(){
    this.appService.addChef(this.chefForm.value).subscribe(
      (res) => {
        console.log(res);
        alert("chef created");
        this.dialogRef.close();
        this.router.navigateByUrl("chefs");
      },
      (err) => {
        console.log(err);
        this.error = err.error?.message || err.statusText;
      }
    );
  }

  submit(): void {
    if(this.isEdit){
      this.editChef()
    }
    else{
      this.createChef()
    }
  }
}
