import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowResultsService {

  private arquivo: File = null;

  constructor() { }

  setFile(selectedFile: File){
    this.arquivo = selectedFile;
  }

  getFile(): File{
    return this.arquivo;
  }
}
