import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage implements OnInit {

  constructor(private param: ActivatedRoute, private http: HttpClient, private route: Router) { }
 categorie = [];
 listeRepas = [];
  ngOnInit() {
    console.log(this.param.snapshot.paramMap.get('id'));
    this.getCat(this.param.snapshot.paramMap.get('id'));
    this.getRepas(this.param.snapshot.paramMap.get('id'));
  }

  // recupere la categorie
  getCat(id) {
    this.http.get('http://localhost:3000/repas/type/' + id).subscribe((response: any[]) => {
        console.log(response);
        this.categorie = response['0'];
      });
  }

  // recupere les plats
  getRepas(id) {
    this.http.get('http://localhost:3000/liste/repas/type/' + id).subscribe((response: any[]) => {
      console.log(response);
      this.listeRepas = response;
    });
  }
    // details sur le repas
  recetteRepas(id) {
      console.log(id);
      this.route.navigate(['details/' + id]);
  }
}
