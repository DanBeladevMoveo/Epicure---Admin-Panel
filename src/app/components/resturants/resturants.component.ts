import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { AddResturantComponent } from '../add-resturant/add-resturant.component';

@Component({
  selector: 'app-resturants',
  templateUrl: './resturants.component.html',
  styleUrls: ['./resturants.component.css']
})
export class ResturantsComponent implements OnInit {
  resturants =[] ;

  constructor(private appService: AppService,private dialog: MatDialog ) { }

  ngOnInit() {
    this.appService.getResturants().subscribe(res => {
      console.log(res);
      this.resturants=[...res.resturants.filter(element => !element.deleted)];
    });
  }

  removeResturant(resturant){
    this.appService.removeResturant(resturant).subscribe(res=>{
      this.resturants = this.resturants.filter(resturant=> resturant._id!==res._id);
    })
    
  }
  editResturant(resturant){
    console.log(resturant);
    this.dialog.open(AddResturantComponent,{
      data: resturant
    });
  }
    

  add(){
    this.dialog.open(AddResturantComponent);
  }
}
