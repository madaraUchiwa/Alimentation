import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})


export class DetailsPage implements OnInit {
    repas = [];
    listeIngred = [];
    recetEtap = [];
  constructor(private http: HttpClient, private param: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.getRecette(this.param.snapshot.paramMap.get('id'));
  }

  getRecette(id) {
      this.http.get('http://localhost:3000/details/repas/' + id).subscribe((response: any[]) => {
          console.log(response['0']);
          this.repas = response['0'];
          this.listeIngred = response[0]['ingredient'].split('.');
          this.recetEtap = response[0]['recette'].split('.');
          console.log(response[0]['ingredient'].split('.'));
      });
  }

  accueil() {
      this.route.navigate(['/home']);
  }
}
