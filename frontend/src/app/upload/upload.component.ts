import { Component, OnInit } from '@angular/core';
import {ShowResultsService} from '../services/show-results.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /*Obter acceso ao arquivo*/
  onFileChanged(event){
    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
  }

  /*Codigo upload para enviar a imaxe ao backend*/
  onUpload(){
    console.log(this.selectedFile.name)
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post("http://localhost:5000/file-upload", fd).subscribe(res => {console.log(res);});
  }
}
