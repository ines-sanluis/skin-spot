import { Component, OnInit, HostListener } from '@angular/core';
import {BackendApiService} from '../services/backend-api.service';
import {Analise} from '../classes/analise.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { saveAs } from 'file-saver';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

   private imgURL: any = null;
   private banda_l : any = null;
   private banda_a : any = null;
   private banda_b : any = null;
   private prediccion : any = null;
   private loading : boolean = true;
   private erros : boolean = false;
   private erro : any = null;
   constructor(private http : HttpClient, private router: Router) { }
   ngOnInit() {
     this.http.get("http://localhost:5000/get-results").subscribe(res => {
        this.banda_l = res["banda_l"];
        this.banda_a = res["banda_a"];
        this.banda_b = res["banda_b"];
        this.prediccion = res["prediccion"];
        this.loading = false;
      },
      error => {
          this.loading = false;
          this.erros = true;
          this.erro = error;
        });
    this.imgURL = "assets/images/mascara.png";
   }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
       let key = event.key;
       console.log("Tecla "+event.key+" presionada");
       switch(event.key){
         case "Enter":
           if (!this.loading && !this.erros) this.onExport();
           else if(this.erros) this.onReintentar();
           break;
          case "i":case"I": this.router.navigateByUrl('/index'); break;
          case "a":case"A": this.router.navigateByUrl('/analizar'); break;
          case "r":case"R": this.router.navigateByUrl('/reportar'); break;
       }
     }
   onExport(){
     var FileSaver = require('file-saver');
     let string = "Diagnose predita: "+this.prediccion+"\nBanda L: "+this.banda_l+"\nBanda A: "+this.banda_a+"\nBanda B: "+this.banda_b;
     var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
     FileSaver.saveAs(blob, "resultado.txt");
  }

  onReintentar(){
    this.loading = true;
    this.erros = false;
    this.http.get("http://localhost:5000/get-results").subscribe(res => {
       this.banda_l = res["banda_l"];
       this.banda_a = res["banda_a"];
       this.banda_b = res["banda_b"];
       this.loading = false;
     },
     error => {
         this.loading = false;
         this.erros = true;
         this.erro = error;
       });
  }
}
