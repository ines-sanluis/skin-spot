import { Component, OnInit, HostListener } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analizar',
  templateUrl: './analizar.component.html',
  styleUrls: ['./analizar.component.css'],
})

export class AnalizarComponent implements OnInit {
  private selectedFile: File = null;
  private imgURL: any;
  public message: string = null;
  private paso_descripcion = "Subir imaxe";
  private detalle = "Escolle a imaxe que queres analizar";
  private paso: number;
  private puntos = [];

  constructor(private http: HttpClient, private router: Router) {
      this.debuxar = this.debuxar.bind(this);
    }

  ngOnInit() {
    this.paso = 1;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    console.log("Tecla "+event.key+" presionada");
    switch(event.key){
      case "Enter":
        if (this.paso == 1){
          let button = document.getElementById("fileInput");
          button.click();
        }else if(this.paso == 2) this.onUpload();
        break;
      case "c":case"C":
        if (this.paso == 2) this.onCancel();
        break;
      case "i":case"I": this.router.navigateByUrl('/index'); break;
      case "r":case"R": this.router.navigateByUrl('/reportar'); break;
      case "b":case"B": this.onBorrar();
    }
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
    this.cargarImaxeCanvas();
    //Cambiar paso
    this.paso_descripcion = "Seleccionar rexión de interese";
    this.paso = 2;
    this.detalle = "Coa axuda do botón esquerdo, debuxa sobre a imaxe"
  }
    /*Codigo upload para enviar a imaxe ao backend*/
  onUpload(){
    console.log("Cargando imaxe "+this.selectedFile.name+"...");
    var fd = new FormData();
    fd.append('imaxe', this.selectedFile, this.selectedFile.name);
    this.http.post("http://localhost:5000/file-upload", fd).subscribe(
      res => {
        console.log(res);
        let requestOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
        this.http.post("http://localhost:5000/canvas-roi", this.puntos, requestOptions).subscribe(
          res => {
            console.log(res);
            this.router.navigateByUrl('/results');
          });
      });
  }

  onCancel(){
    this.selectedFile = null;
    this.message = null;
    this.paso_descripcion = "Subir imaxe";
    this.paso = 1;
    this.puntos = [];
  }

  onBorrar(){
    this.puntos = [];
    this.cargarImaxeCanvas();
  }

  cargarImaxeCanvas(){
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      var lenzo : any = document.getElementById("lenzo");
      var contexto = lenzo.getContext("2d");
      this.imgURL = reader.result;
      lenzo.addEventListener("mousedown", this.debuxar, false);
      var background = new Image();
      background.src = this.imgURL;
      background.onload = function () {
        contexto.drawImage(background,0,0, lenzo.width, lenzo.height);
      };
    }
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
