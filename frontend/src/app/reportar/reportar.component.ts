import { Component, OnInit, HostListener } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent implements OnInit {

  private asunto : string;
  private descripcion : string;
  private flag : boolean = true;

  constructor(private firebaseService : FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.asunto);
    console.log(this.descripcion);
    this.firebaseService.reportProblem(this.asunto, this.descripcion);
  }

  pressAsunto(event: any){
    //missing
  }
  pressDescripcion(event : any){
    //missing
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    switch(event.key){
      case "Enter":
        if(this.flag) this.onSubmit();
        break;
      case "c":case"C":
        let button = document.getElementById("botonCancel");
        if(this.flag) button.click();
      break;
      case "i":case"I": if(this.flag) this.router.navigateByUrl('/index'); break;
      case "a":case"A": if(this.flag) this.router.navigateByUrl('/analizar'); break;
    }
  }

  escribir(){
    this.flag = ! this.flag;
  }


}
