import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  private selectedFile: File = null;
  private imgURL: any;
  public message: string = null;
  private paso_descripcion = "Subir imaxe";
  private paso: number;
  private puntos = [];

  constructor(private http: HttpClient) {
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
      console.log(this.selectedFile.name)
      var fd = new FormData();
      fd.append('imaxe', this.selectedFile, this.selectedFile.name);
      this.http.post("http://localhost:5000/file-upload", fd).subscribe(res => {console.log(res);});

      fd = new FormData();
      var myJsonString = JSON.stringify(this.puntos);
      fd.append('puntos', myJsonString);
      this.http.post("http://localhost:5000/canvas-roi", fd).subscribe(res => {console.log(res);});

      // console.log(fd.get('imaxe'));
      // console.log(fd.get('puntos'));
      //results = this.http.get(...results...)
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
    contexto.arc(x, y, 5, 0, 2*Math.PI);
    contexto.stroke();
    contexto.fill();
    if (Object.keys(this.puntos).length){
        let punto_old = this.puntos[this.puntos.length - 1];
        let x_old = punto_old[0];
        let y_old = punto_old[1];
        contexto.beginPath();
        contexto.moveTo(x_old, y_old);
        contexto.lineTo(x, y);
        contexto.stroke();
      }
      this.puntos.push(punto);
    }

}
