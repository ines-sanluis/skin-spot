import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  public sendFile(arquivo : File){
    console.log("Cargando imaxe "+arquivo.name);
    var fd = new FormData();
    fd.append('imaxe', arquivo, arquivo.name);
    this.http.post("http://localhost:5000/file-upload", fd).subscribe(res => {console.log(res);});
  }

  public sendPoints(points : Array<Array<number>>){
    let requestOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    this.http.post("http://localhost:5000/canvas-roi", points, requestOptions).subscribe(res => {console.log(res);});
  }

  public getBandaLab() : any{
    let banda = null;
    banda = this.http.get("http://localhost:5000/get-results").subscribe(res => { return res; } );
    return banda;
  }


}
