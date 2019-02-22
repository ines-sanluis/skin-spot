import { Component, OnInit } from '@angular/core';
import {Data} from '../classes/data';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-ph2data',
  templateUrl: './ph2data.component.html',
  styleUrls: ['./ph2data.component.css']
})

export class Ph2DataComponent implements OnInit {
  datos: Data[];
  diagnoses: Array<String>  = ["Todas", "Common Nevus", "Atypical Nevus", "Melanoma"];
  cores: Array<String> = ["White", "Red", "Light brown", "Dark brown", "Blue gray", "Black"];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

/*Recuperar todos os datos da base de datos*/
  getData(): void{
    this.dataService.getAllData().subscribe(datos => this.datos = datos);
  }

 /*Filtrar a taboa polo tipo de diagnose*/
  cambioFiltroDiagnose(selectedDiagnose){
    if(selectedDiagnose == "All")   this.dataService.getAllData().subscribe(datos => this.datos = datos);
    else this.dataService.getDataDiagnose(selectedDiagnose).subscribe(datos => this.datos = datos);
  }

}
