import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowResultsService {

  private arquivo: File = null;

  constructor(private httpClient: HttpClient) { }

  setFile(selectedFile: File){
    this.arquivo = selectedFile;
  }

  getFile(): File{
    return this.arquivo;
  }

  getImage(){
    this.httpClient.get("http://localhost:5000/image").subscribe((res)=>{console.log(res)});
  }
}
