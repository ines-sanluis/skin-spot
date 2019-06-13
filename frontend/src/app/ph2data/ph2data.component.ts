import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Ph2ApiService} from '../services/ph2-api.service';
import {Analise} from '../classes/analise.model';

@Component({
  selector: 'app-ph2data',
  templateUrl: './ph2data.component.html',
  styleUrls: ['./ph2data.component.css']
})

export class Ph2DataComponent implements OnInit {
  datosLista: Analise[];
  datosListaSubs: Subscription;
  loading : boolean;

  diagnoses: Array<String>  = ["Todas", "Common Nevus", "Atypical Nevus", "Melanoma"];
  cores: Array<String> = ["White", "Red", "Light brown", "Dark brown", "Blue gray", "Black"];

  constructor(private datosApi: Ph2ApiService) { }

  ngOnInit() {
    this.loading = false;
    this.datosListaSubs = this.datosApi.getFullDatabase().subscribe((res: Analise[]) => {
      this.datosLista = res;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.datosListaSubs.unsubscribe();
  }

 // Filtrar a taboa polo tipo de diagnose
  filtrarDiagnose(diagnose){
    switch(diagnose){
      case this.diagnoses[1]: { //Common Nevus
        this.datosListaSubs = this.datosApi.getCommonNevus().subscribe((res: Analise[]) => {
          this.datosLista = res;
        });
        break;
      }
      case this.diagnoses[2]: { //Atypical Nevus
        this.datosListaSubs = this.datosApi.getAtypicalNevus().subscribe((res: Analise[]) => {
          this.datosLista = res;
        });
        break;
      }
      case this.diagnoses[3]: { //Melanoma
        this.datosListaSubs = this.datosApi.getMelanoma().subscribe((res: Analise[]) => {
          this.datosLista = res;
        });
        break;
      }
      default: { //Todas
        this.datosListaSubs = this.datosApi.getFullDatabase().subscribe((res: Analise[]) => {
          this.datosLista = res;
        });
        break;
      }
    } //switch
  } //filtrarDiagnose

}
