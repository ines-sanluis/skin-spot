import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  selectedFile: File = null;
  public imagePath;
  imgURL: any;
  public message: string = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /*Obter acceso ao arquivo*/
  onFileChanged(event){
    this.message = null;
    if(event.target.files.length == 0)  return;
    //Comprobar que se sube unha imaxe
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Só se admiten imaxes";
      return;
    }
    this.selectedFile = <File> event.target.files[0];
    //Obter url
    var reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {this.imgURL = reader.result;}
  }

  /*Codigo upload para enviar a imaxe ao backend*/
  onUpload(){
    console.log(this.selectedFile.name)
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post("http://localhost:5000/file-upload", fd).subscribe(res => {console.log(res);});
  }
}
