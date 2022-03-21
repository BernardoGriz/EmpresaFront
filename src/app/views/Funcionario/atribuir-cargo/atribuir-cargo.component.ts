import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Funcionario } from './../../../models/funcionarioModels';
import { Cargo } from './../../../models/cargoModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atribuir-cargo',
  templateUrl: './atribuir-cargo.component.html',
  styleUrls: ['./atribuir-cargo.component.css']
})
export class AtribuirCargoComponent implements OnInit {

  cargos: Cargo[] = []
  cargoEscolhido: any = []
  id_cargo: any
  id_funcionario: any
  cargoDoFunc: any = []

  funcionario: Funcionario = {
    func_nome: '',
    func_cidade: ''
  }

  constructor(private cargoService: CargoService,
    private funcService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,  private location: Location) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    console.log(this.id_cargo)
    this.buscarTodosCargos()
    this.mostrarFuncionario()
    this.buscarCargo()
  }

  buscarTodosCargos() {
    this.cargoService.mostrarTodosCargos().subscribe(resultado => {
      this.cargos = resultado
    })
  }

  mostrarCargo() {
    console.log(this.cargoEscolhido)
  }

  mostrarFuncionario() {
    this.funcService.buscarUmFuncionario(this.id_funcionario).subscribe(resultado => {
      this.funcionario = resultado
    })
  }

  buscarCargo() {
    this.cargoService.mostrarCargo(this.id_cargo).subscribe(resultado => {
      this.cargoEscolhido = resultado
      console.log(this.cargoDoFunc)
    })
  }

  atribuirCargo() {
    this.funcService.atribuirCargo(this.cargoEscolhido, this.id_funcionario).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo atribuído com sucesso")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao atribuir cargo.")
        this.location.back()
      },
      next: () => { console.log("Cargo atribuído com sucesso") }

    });
  }

  deixarFuncSemCargo() {
    this.funcService.deixarFuncionarioSemCargo(this.funcionario, this.id_funcionario).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo desvinculado com sucesso")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("ERRO: o cargo não foi retirado do funcionário")
        this.location.back()
      },
      next: () => { console.log("Funcionário editado com sucesso") }

    });

  }

}
