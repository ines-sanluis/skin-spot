import { Component, OnInit } from '@angular/core';
import {BackendApiService} from '../services/backend-api.service';
import {Analise} from '../classes/analise.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

   private analise: Analise = null;
   private imgURL: any = null;
   private banda_l : any = null;
   private banda_a : any = null;
   private banda_b : any = null;
   private loading : boolean = true;
   constructor(private http : HttpClient) { }
   ngOnInit() {
     //this.dataService.getDataId("IMD002").subscribe(analises => this.analises = analises); //atipico
     // this.dataService.getDataId("IMD058").subscribe(analises => this.analises = analises); //melanoma
     // this.dataService.getDataId("IMD003").subscribe(analises => this.analises = analises); //tipico

     //this.analise = new Analise("IMD057","Dysplastic Nevus","Melanoma",0,"AT","A","A","A","A","","","","X","","X");
     //this.analise = new Analise("IMD057","","Atypical Nevus",0,"AT","A","A","A","A","","","","X","","X");
    this.imgURL = "assets/images/mascara.png";
     this.http.get("http://localhost:5000/get-results").subscribe(res => {
       this.banda_l = res["banda_l"];
       this.banda_a = res["banda_a"];
       this.banda_b = res["banda_b"];
       this.loading = false;
     });
     //console.log(this.banda);

     this.analise = new Analise("IMD057","","Common Nevus",0,"AT","A","A","A","A","","","","X","","X");
   }

}
