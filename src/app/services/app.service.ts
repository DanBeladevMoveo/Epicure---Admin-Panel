import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class AppService {
  base_url = "http://localhost:3000";
  catalog_url = `${this.base_url}/catalog`;
  constructor(private http: HttpClient) {}

  getDishes(): Observable<any> {
    return this.http.get<any>(`${this.catalog_url}/dish`);
  }

  getResturants(): Observable<any> {
    return this.http.get<any>(`${this.catalog_url}/resturant`);
  }

  getChefs(): Observable<any> {
    return this.http.get<any>(`${this.catalog_url}/chef`);
  }

  addResturant(): Observable<any> {
    const body = {
      name: "Dan",
      chef: "5f86c58f9c4a1b978399d1dc",
      url: "/assets/epicure.png",
    };
    return this.http.post<any>(`${this.catalog_url}/resturant`, body);
  }
  addDish(): Observable<any> {
    const body = {
      name: "Dan",
      resturant: {
        chef: "5f871512c68a9ea233acad8d",
        name: "Claro",
        url: "/assets/claro.png",
        __v: 0,
        _id: "5f871518c68a9ea233acad92",
      },
      price: 40,
      description: "stam description",
      image: "/assets/epicure.png",
    };
    return this.http.post<any>(`${this.catalog_url}/dish`, body);
  }

  removeResturant(resturant): Observable<any> {
    const { _id } = resturant;
    return this.http.delete<any>(`${this.catalog_url}/resturant/${_id}`);
  }

  removeDish(dish): Observable<any> {
    const { _id } = dish;
    return this.http.delete<any>(`${this.catalog_url}/dish/${_id}`);
  }

  removeChef(chef): Observable<any> {
    const { _id } = chef;
    return this.http.delete<any>(`${this.catalog_url}/chef/${_id}`);
  }
  addChef(chefinfo): Observable<any> {
    return this.http.post<any>(`${this.catalog_url}/chef`, chefinfo);
  }

  login(userinfo): Observable<any> {
    return this.http.post<any>(`${this.base_url}/users/login`, userinfo);
  }

  editChef(chefid,chefinfo): Observable<any> {
    console.log(chefinfo);
    // return of(chefinfo);
    return this.http.put<any>(`${this.catalog_url}/chef/${chefid}`, chefinfo);
  }
}
