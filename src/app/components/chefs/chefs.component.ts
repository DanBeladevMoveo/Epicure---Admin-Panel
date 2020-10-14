import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefs=[];
  constructor(private appService: AppService) { }

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

  add(){
    this.appService.addChef().subscribe(res=>{
      console.log(res);
      this.chefs.push(res);
    })
  }
}
