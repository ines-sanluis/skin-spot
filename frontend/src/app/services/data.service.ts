import { Injectable } from '@angular/core';
import {Data} from '../classes/data';
import {DATASET} from '../../assets/mock-data';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getAllData(): Observable<Data[]>{
    return of(DATASET);
  }

  getDataDiagnose(diagnose: string): Observable<Data[]>{
    return of(DATASET.filter(data => data.diagnosis === diagnose));
  }

  getDataId(id: string):  Observable<Data[]>{
    return of(DATASET.filter(data => data.id === id));
  }

}
