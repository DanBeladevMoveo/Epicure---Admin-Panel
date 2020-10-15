import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { AddChefComponent } from '../add-chef/add-chef.component';


@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefs=[];
  constructor(private appService: AppService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.appService.getChefs().subscribe(res => {
      console.log(res);
      
      this.chefs=[...res.chefs.filter(element => !element.deleted)];
    });
  }

  removeChef(chef){
    this.appService.removeChef(chef).subscribe(res=>{
      console.log('removing: ',chef);
      this.chefs = this.chefs.filter(chef=> chef._id!==res._id);
    })
    
  }

  editChef(chef){
    this.dialog.open(AddChefComponent,{
      data: chef
    });
  }

  add(){
       this.dialog.open(AddChefComponent);
  }
}
