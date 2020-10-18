import { Component, Inject, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppService } from "app/services/app.service";
@Component({
  selector: "app-add-resturant",
  templateUrl: "./add-resturant.component.html",
  styleUrls: ["./add-resturant.component.css"],
})
export class AddResturantComponent implements OnInit {
  error = "";
  isEdit = false;
  isCreate = false;
  submitted = false;
  foods = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];
  chefs = [];
  resturantForm = this.fb.group({
    name: ["", Validators.compose([Validators.required])],
    url: ["", Validators.compose([Validators.required])],
    chef: ["", Validators.compose([Validators.required])],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<AddResturantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.isEdit = true;
      this.resturantForm = !this.isEdit
        ? this.fb.group({
            name: ["", Validators.compose([Validators.required])],
            url: ["", Validators.compose([Validators.required])],
            chef: ["", Validators.compose([Validators.required])],
          })
        : this.fb.group({
            name: [this.data.name, Validators.compose([Validators.required])],
            url: [this.data.url, Validators.compose([Validators.required])],
            chef: [this.data.chef._id, Validators.compose([Validators.required])],
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
    this.appService.getChefs().subscribe((chefs) => {
      console.log(chefs);
      this.chefs = chefs.chefs.filter((chef) => chef.deleted !== true);
    });
  }

  chefChanged(event) {
    console.log("changed ", event);
    console.log("form value ", this.resturantForm.value);
  }
  editResturant() {
    this.appService
      .editResturant(this.data._id, this.resturantForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          alert("resturants was changed");
          this.dialogRef.close();
          this.router.navigateByUrl("resturants");
        },
        (err) => {
          console.log(err);
          this.error = err.error?.message || err.statusText;
        }
      );
  }
  createResturant() {
    debugger
    this.appService.addResturant(this.resturantForm.value).subscribe(
      (res) => {
        console.log(res);
        alert("resturants created");
        this.dialogRef.close();
        this.router.navigateByUrl("resturants");
      },
      (err) => {
        console.log(err);
        this.error = err.error?.message || err.statusText;
      }
    );
  }

  submit(): void {
    if (this.isEdit) {
      this.editResturant();
    } else {
      this.createResturant();
    }
  }
}
