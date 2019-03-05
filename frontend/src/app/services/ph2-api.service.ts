import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Data} from '../classes/data';
import {Analise} from '../classes/analise.model';
import {DATASET} from '../../assets/mock-data';
import {Observable, of} from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class Ph2ApiService {

  constructor(private http: HttpClient) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getFullDatabase(): Observable<Analise[]>{
    return this.http.get<Analise[]>("http://localhost:5000/ph2dataset/todas").catch(Ph2ApiService._handleError);
  }

  getCommonNevus(): Observable<Analise[]>{
    return this.http.get<Analise[]>("http://localhost:5000/ph2dataset/common_nevus").catch(Ph2ApiService._handleError);
  }

  getAtypicalNevus(): Observable<Analise[]>{
    return this.http.get<Analise[]>("http://localhost:5000/ph2dataset/atypical_nevus").catch(Ph2ApiService._handleError);
  }

  getMelanoma(): Observable<Analise[]>{
    return this.http.get<Analise[]>("http://localhost:5000/ph2dataset/melanoma").catch(Ph2ApiService._handleError);
  }




}
