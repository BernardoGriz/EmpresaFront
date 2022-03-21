import { Funcionario } from './../../../models/funcionarioModels';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-funcionario-do-cargo',
  templateUrl: './lista-funcionario-do-cargo.component.html',
  styleUrls: ['./lista-funcionario-do-cargo.component.css']
})

export class ListaFuncionarioDoCargoComponent implements OnInit {

  id_cargo: any
  funcionarios:Funcionario[] =[]

  constructor(private funcionarioService:FuncionarioService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_turma')
    this.mostrarFuncionariosDoCargo()
  }

  mostrarFuncionariosDoCargo(){
    this.funcionarioService.buscarFuncionarioCargo(this.id_cargo).subscribe(resultado =>{
      this.funcionarios = resultado
      console.log(this.funcionarios)
    })
  }

}
