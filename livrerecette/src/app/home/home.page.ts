import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private http: HttpClient, private  route: Router){
    }
 cat = new Array();
 repas = new Array();

  ngOnInit() {
    this.http.get('http://localhost:3000/repas/type').subscribe((response: any[]) => {
        console.log(response);
        this.cat = response;
      });
    this.http.get('http://localhost:3000/repas').subscribe((response: any[]) => {
      console.log(response);
      this.repas = response;
    });
  }


  list(id)
  {
    console.log(id);
    this.route.navigate(['/liste/' + id]);
  }
}
