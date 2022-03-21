import { MatSnackBar } from '@angular/material/snack-bar';
import { Cargo } from './../models/cargoModels';
import { Funcionario } from '../models/funcionarioModels';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl: string = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  buscarFuncionarioCargo(id_cargo: string):Observable<Funcionario[]>{
    const URL = `${this.baseUrl}/funcionario/busca-funcionario/${id_cargo}`
    return this.http.get<Funcionario[]>(URL)
  }

  buscarTodosFuncs(): Observable<any> {
    const URL = `${this.baseUrl}/funcionario-cargo`
    return this.http.get<any>(URL)
  }

  buscarTodosFuncionarios(): Observable<Funcionario[]> {
    const URL = `${this.baseUrl}/funcionario/`
    return this.http.get<Funcionario[]>(URL)
  }

  buscarUmFuncionario(id_func:string):Observable<Funcionario>{
    const URL = `${this.baseUrl}/funcionario/${id_func}`
    return this.http.get<Funcionario>(URL)
  }
 
  cadastrarFuncionario(funcionario:Funcionario, id_cargo: string):Observable<Funcionario>{
   const URL = `${this.baseUrl}/funcionario?cargo=${id_cargo}`
   return this.http.post<Funcionario>(URL, funcionario)
  }

  editarFuncionario(funcionario:Funcionario, id_func: string, id_cargo: string):Observable<Funcionario>{
    const URL = `${this.baseUrl}/funcionario/${id_func}?cargo=${id_cargo}`
  return this.http.put<Funcionario>(URL, funcionario)
  }

  editarFuncSemCargo(func: Funcionario, id_funcionario:String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionarioSemCargo/${id_funcionario}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  excluirFuncionario(id_func: string): Observable<void> {
    const URL = `${this.baseUrl}/funcionario/${id_func}` //tem que ser igual ao GetMapping do Eclipse
    return this.http.delete<void>(URL)
  }


  buscarIdCargo(id_func: string): Observable<String> {
    const URL = `${this.baseUrl}/funcionario/busca-id-cargo/${id_func}` //tem que ser igual ao GetMapping do Eclipse
    return this.http.get<String>(URL)
  }

  atribuirCargo(cargo:Cargo, id_func:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/inserirCargo/${id_func}`
    return this.http.put<Funcionario>(url,cargo)

  }

  deixarFuncionarioSemCargo(funcionario:Funcionario, id_func:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/deixarSemCargo/${id_func}`
    return this.http.put<Funcionario>(url,funcionario)
  }

  // Método referente ao MatSnackBar do Material, sinaliza mensagem
  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }

}
