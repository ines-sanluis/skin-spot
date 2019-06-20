import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  constructor(private router: Router) {
    }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    switch(event.key){
      case "a":case"A": this.router.navigateByUrl('/analizar'); break;
      case "r":case"R": this.router.navigateByUrl('/reportar'); break;
    }
  }
}
