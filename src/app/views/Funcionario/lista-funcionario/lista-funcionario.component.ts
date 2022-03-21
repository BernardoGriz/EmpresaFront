import { Funcionario } from './../../../models/funcionarioModels';
import { FuncionarioService } from './../../../servicos/funcionario.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.css']
})
export class ListaFuncionarioComponent implements OnInit {

  id_cargo: string = ''
  funcionario: Funcionario[] = []

  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!;
    this.buscarFuncionarioCargo()
  }

  buscarFuncionarioCargo(){
    this.funcionarioService.buscarFuncionarioCargo(this.id_cargo).subscribe((resultado)=>{
      this.funcionario = resultado;
    })
  }

}
