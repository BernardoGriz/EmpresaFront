import { MatSnackBar } from '@angular/material/snack-bar';
import { Cargo } from './../models/cargoModels';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http:HttpClient,  private snackBar: MatSnackBar) { }

 // Acesso ao banco de dados
  mostrarTodosCargos(): Observable<Cargo[]> {
    const URL = `${this.baseUrl}/cargo`
    return this.http.get<Cargo[]>(URL)
  }

  cadastroCargo(cargo: Cargo): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo`
    return this.http.post<Cargo>(URL, cargo)
  }

  mostrarCargo(id: string): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo/${id}`
    return this.http.get<Cargo>(URL)
  }

  excluirCargo(id: string): Observable<void> {
    const URL = `${this.baseUrl}/cargo/${id}`
    return this.http.delete<void>(URL)
  }

  editarCargo(cargo: Cargo): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo/${cargo.id_cargo}`
    return this.http.put<Cargo>(URL, cargo)
  }

  atribuirMentor(cargo: Cargo, id_cargo: String, id_mentor: String) {
    const URL = `${this.baseUrl}/cargo/definirMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(URL, cargo)
  }

  mostrarCargosSemMentor():Observable<Cargo[]>{
    const url = `${this.baseUrl}/cargoSemMentor`
    return this.http.get<Cargo[]>(url)
  }

  buscarCargoDoMentor(id_mentor:String):Observable<Cargo>{
    //http://localhost:8080/escola/turma/turma-professor/1
    const url = `${this.baseUrl}/cargo/cargo-mentor/${id_mentor}`
    return this.http.get<Cargo>(url)
  }

  buscarTodosCargos():Observable<any>{
    const url = `${this.baseUrl}/cargo/cargo-mentor`
    return this.http.get<any>(url)
  }

  deixarCargoSemMentor(cargo:Cargo,id_cargo:String, id_mentor:String):Observable<void>{
    //http://localhost:8080/escola/turma/tirarProfessor/3/2
    const url = `${this.baseUrl}/cargo/tirarMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(url,cargo);

  }

  // M??todo referente ao MatSnackBar do Material, para mostrar mensagem quando as fun????es de CRUD funcionarem
  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }
}
