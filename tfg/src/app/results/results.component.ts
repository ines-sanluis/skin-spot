import { Component, OnInit } from '@angular/core';
import {ShowResultsService} from '../services/show-results.service';
import {DataService} from '../services/data.service';

import {Data} from '../classes/Data';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private arquivo: File = null;
  private analises: Data[] = null;
  private analise: Data = null;

  constructor(private showResults: ShowResultsService, private dataService: DataService) { }

  ngOnInit() {
    this.arquivo = this.showResults.getFile();
    this.dataService.getDataId("IMD002").subscribe(analises => this.analises = analises); //atipico
    // this.dataService.getDataId("IMD058").subscribe(analises => this.analises = analises); //melanoma
    // this.dataService.getDataId("IMD003").subscribe(analises => this.analises = analises); //tipico
    this.analise = this.analises[0];
  }

}
