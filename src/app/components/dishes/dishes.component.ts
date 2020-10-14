import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getDishes().subscribe(res => {
      console.log(res);
      
      this.dishes=[...res.dishes.filter(element => !element.deleted)];
    });
  }

  removeDish(dish){
    this.appService.removeDish(dish).subscribe(res=>{
      console.log('removing: ',dish);
      this.dishes = this.dishes.filter(dish=> dish._id!==res._id);
    })
    
  }

  add(){
    this.appService.addDish().subscribe(res=>{
      console.log(res);
      this.dishes.push(res);
    })
}
}
