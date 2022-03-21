import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Boleto } from './../models/boletoModels';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {

  baseUrl: String = "http://localhost:8080/empresa"

  constructor(private http: HttpClient) { }

  listarBoletoDoMentor(id_mentor: String): Observable<Boleto[]> {
    const URL = `${this.baseUrl}/mentor/boleto-mentor/${id_mentor}`
    return this.http.get<Boleto[]>(URL)
  }

  //o inserir do back
  //ok
  cadastrarBoleto(boleto: Boleto, id_mentor: String): Observable<Boleto> {
    const URL = `${this.baseUrl}/mentor/boleto/${id_mentor}`
    return this.http.post<Boleto>(URL, boleto)
  }

  //ok
  pagarBoleto(boleto: Boleto, codigo: string): Observable<Boleto> {
    const URL = `${this.baseUrl}/mentor/quitarBoleto/${codigo}`
    return this.http.put<Boleto>(URL, boleto)
  }
  //ok
  cancelarBoleto(boleto: Boleto, codigo: string): Observable<Boleto> {
    const URL = `${this.baseUrl}/mentor/cancelarBoleto/${codigo}`
    return this.http.put<Boleto>(URL, boleto)
  }
  //ok
  editarBoleto(boleto: Boleto, codigo: string, id_mentor: string): Observable<Boleto> {
    const URL = `${this.baseUrl}/mentor/boleto-editar/${codigo}/${id_mentor}`
    return this.http.put<Boleto>(URL, boleto)
  }

  buscarUmaBoleto(codigo: string):Observable<Boleto>{
    const URL = `${this.baseUrl}/mentor/boleto/${codigo}`
    return this.http.get<Boleto>(URL)
  }
  //ok
  excluirBoleto(codigo: string, id_mentor: string): Observable<Boleto> {
    const URL = `${this.baseUrl}/mentor/boleto-excluir/${codigo}/${id_mentor}`
    return this.http.delete<Boleto>(URL)
  }
}
