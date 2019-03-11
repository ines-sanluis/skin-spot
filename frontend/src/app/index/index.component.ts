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

  constructor(private http: HttpClient) { }

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
    reader.onload = (_event) => {this.imgURL = reader.result;}
    //Cambiar paso
    this.paso_descripcion = "Analizar imaxe";
    this.paso = 2;
  }


    /*Codigo upload para enviar a imaxe ao backend*/
    onUpload(){
      console.log(this.selectedFile.name)
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post("http://localhost:5000/file-upload", fd).subscribe(res => {console.log(res);});
      //results = this.http.get(...results...)
    }

    onCancel(){
      this.selectedFile = null;
      this.message = null;
      this.paso_descripcion = "Subir imaxe";
      this.paso = 1;
    }

}
