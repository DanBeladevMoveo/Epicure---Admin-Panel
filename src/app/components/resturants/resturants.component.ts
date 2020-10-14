import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-resturants',
  templateUrl: './resturants.component.html',
  styleUrls: ['./resturants.component.css']
})
export class ResturantsComponent implements OnInit {
  resturants =[] ;

  constructor(private appService: AppService) { }

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

  add(){
    this.appService.addResturant().subscribe(res=>{
      console.log(res);
      this.resturants.push(res);
    })
    
  }
}
