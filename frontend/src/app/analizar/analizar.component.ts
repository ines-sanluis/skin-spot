import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BackendApiService} from '../services/backend-api.service';

@Component({
  selector: 'app-analizar',
  templateUrl: './analizar.component.html',
  styleUrls: ['./analizar.component.css']
})

export class AnalizarComponent implements OnInit {
  private selectedFile: File = null;
  private imgURL: any;
  public message: string = null;
  private paso_descripcion = "Subir imaxe";
  private paso: number;
  private puntos = [];

  constructor(private backend: BackendApiService, private router: Router) {
      this.debuxar = this.debuxar.bind(this);
    }

  ngOnInit() {
    this.paso = 1;
  }

  /*Obter acceso ao arquivo*/
  onFileChanged(event){
    this.selectedFile = null;
    this.message = null;
    if(event.target.files.length == 0)  return;
    //Comprobar que se sube unha imaxe
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "O arquivo "+event.target.files[0].name+" non é unha imaxe";
      return;
    }
    this.selectedFile = <File> event.target.files[0];
    //Obter url
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      var lenzo : any = document.getElementById("lenzo");
      lenzo.addEventListener("mousedown", this.debuxar, false);
      var contexto = lenzo.getContext("2d");
      var background = new Image();
      background.src = this.imgURL;
      background.onload = function () {
        contexto.drawImage(background,0,0, lenzo.width, lenzo.height);
      };
    }
    //Cambiar paso
    this.paso_descripcion = "Analizar imaxe";
    this.paso = 2;
  }
    /*Codigo upload para enviar a imaxe ao backend*/
  onUpload(){
    this.backend.sendFile(this.selectedFile);
    this.backend.sendPoints(this.puntos);
    this.router.navigateByUrl('/results');
  }

  onCancel(){
    this.selectedFile = null;
    this.message = null;
    this.paso_descripcion = "Subir imaxe";
    this.paso = 1;
    this.puntos = [];
  }

  debuxar(event){
    var lenzo : any = document.getElementById("lenzo");
    var contexto = lenzo.getContext("2d");
    contexto.fillStyle = "red";
    let x = event.pageX - lenzo.offsetLeft;
    let y = event.pageY - lenzo.offsetTop;
    let punto = [x, y];

    contexto.beginPath();
    contexto.arc(x, y, 2, 0, 2*Math.PI);
    contexto.strokeStyle = "#FFFF00";
    contexto.fillStyle = "#FFFF00";
    contexto.stroke();
    contexto.fill();
    if (Object.keys(this.puntos).length){
        let punto_old = this.puntos[this.puntos.length - 1];
        let x_old = punto_old[0];
        let y_old = punto_old[1];
        contexto.beginPath();
        contexto.moveTo(x_old, y_old);
        contexto.lineTo(x, y);
        contexto.strokeStyle = "#FFFF00";
        contexto.lineWidth = 3;
        contexto.stroke();
      }
      this.puntos.push(punto);
    }

  }
