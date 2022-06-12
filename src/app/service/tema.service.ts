import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

token = {
  headers: new HttpHeaders().set('Authorization', environment.token)
}

  constructor(private http: HttpClient) { }

getAllTemas(): Observable<Tema[]> {
  return this.http.get<Tema[]>('https://julioblog.herokuapp.com/temas', this.token)
}

getTemaById(id: number): Observable<Tema> {
  return this.http.get<Tema>(`https://julioblog.herokuapp.com/temas/${id}`, this.token )
}

getByNomeTema(nome: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(`https://julioblog.herokuapp.com/temas/descricao/${nome}`, this.token)
  }

postTema(tema: Tema): Observable<Tema> {
  return this.http.post<Tema>('https://julioblog.herokuapp.com/temas', tema, this.token )
}

putTema(tema: Tema): Observable<Tema> {
  return this.http.put<Tema>('https://julioblog.herokuapp.com/temas', tema, this.token )
}

deleteTema(id: number) {
  return this.http.delete(`https://julioblog.herokuapp.com/temas/${id}`, this.token )
}

}
