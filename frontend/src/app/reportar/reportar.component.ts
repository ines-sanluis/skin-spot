import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent implements OnInit {

  private asunto : string;
  private descripcion : string;

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.asunto);
    console.log(this.descripcion);
    this.firebaseService.reportProblem(this.asunto, this.descripcion);
  }

}
