import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  dishes = [];
  resturants =[] ;
  chefs=[];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getDishes().subscribe(res => {
      console.log(res);
      
      this.dishes=[...res.dishes];
    });
    this.appService.getResturants().subscribe(res => {
      console.log(res);
      
      this.resturants=[...res.resturants];
    });
    this.appService.getChefs().subscribe(res => {
      console.log(res);
      
      this.chefs=[...res.chefs];
    });
  }

  removeChef(chef){
    console.log('removing: ',chef);
    
  }

}
