import { Mentor } from './../models/mentorModels';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http:HttpClient) { }

  buscarUmMentor(id_mentor:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.get<Mentor>(url)
  }

  buscarMentorDoCargo(id_cargo:String):Observable<Mentor>{
    ///mentor-cargo/{id_cargo}
    const url = `${this.baseUrl}/mentor-cargo/${id_cargo}`
    return this.http.get<Mentor>(url)
  }

  buscarMentoresSemCargo():Observable<Mentor[]>{
    //http://localhost:8080/empresa/mentorSemCargo
    const url = `${this.baseUrl}/mentorSemCargo`
    return this.http.get<Mentor[]>(url)
  }

  // buscarTodosMentores():Observable<any>{
  //   const url = `${this.baseUrl}/mentor/mentor-cargo`
  //   return this.http.get<any>(url)
  // }

  buscarMentorPeloCpf(mentor_cpf:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-cpf/${mentor_cpf}`
    return this.http.get<Mentor>(url)
  }

  mostrarTodosMentores(): Observable<any>{
    const URL = `${this.baseUrl}/mentor/mentor-cargo`
    return this.http.get<any>(URL)
  }

  //CADASTRAR - EDITAR - EXCLUIR

  cadastrarMentor(mentor:Mentor):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor`
    return this.http.post<Mentor>(url, mentor)
  }

  excluirMentor(id_mentor: string): Observable<void> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}` //tem que ser igual ao DeleteMapping do Eclipse
    return this.http.delete<void>(URL)
  }

  editarMentor(mentor: Mentor, id_mentor: string, id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

  editarMentorSemCargo(mentor: Mentor, id_mentor:String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentorSemCargo/${id_mentor}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

}
