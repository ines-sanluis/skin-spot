import { Component, OnInit } from '@angular/core';
import {ShowResultsService} from '../services/show-results.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;

  constructor(private showResults: ShowResultsService) { }

  ngOnInit() {
  }

  /*Obter acceso ao arquivo*/
  onFileChanged(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  /*Codigo upload*/
  onUpload(){
    this.showResults.setFile(this.selectedFile);
    console.log("FILE LOGGED: "+this.showResults.getFile().name);
    //this.http seria o HttpClient inxectado
    /*
    this.http.post('my-backend.com/file-upload', this.selectedFile).subscribe(...)
    */
  }
}
