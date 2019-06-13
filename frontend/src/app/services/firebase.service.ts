import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Problema } from '../classes/problema';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  public problemas : AngularFireList<Problema>;
  constructor(private db: AngularFireDatabase) {
    this.problemas = db.list<Problema>('/problemas');
}
  public reportProblem(asunto, descripcion){
    let p = new Problema(asunto, descripcion);
    this.problemas.push(p);
  }

}
