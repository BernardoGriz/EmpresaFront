import { Funcionario } from './../../../models/funcionarioModels';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicao-funcionario',
  templateUrl: './edicao-funcionario.component.html',
  styleUrls: ['./edicao-funcionario.component.css']
})
export class EdicaoFuncionarioComponent implements OnInit {

  funcionario: Funcionario = {
    func_nome: "",
    func_cidade: ""
  }

  id_cargo: any = "";

  constructor(private funcionarioService: FuncionarioService, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.funcionario.id_func = this.route.snapshot.paramMap.get('id_funcionario')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
  }

  ngOnInit(): void {
    this.buscarFunc()
  }

  buscarFunc() {
    this.funcionarioService.buscarUmFuncionario(this.funcionario.id_func).subscribe((resultado) => {
      this.funcionario = resultado;
    })
  }

  editarFunc() {
    if (this.id_cargo != 0) {
      this.funcionarioService.editarFuncionario(this.funcionario, this.funcionario.id_func, this.id_cargo).subscribe({
        complete: () => {
          this.funcionarioService.mensagem("Funcionário editado com sucesso!")
          this.location.back();
        },
        error: () => {
          this.funcionarioService.mensagem("Erro ao editar funcionário.")
          this.location.back();
        },
        next: () => console.log("Funcionário editado.")
      })
    } else {
      this.funcionarioService.editarFuncSemCargo(this.funcionario, this.funcionario.id_func).subscribe({
        complete: () => {
          this.funcionarioService.mensagem("Funcionário editado com sucesso!")
          this.location.back();
        },
        error: () => {
          this.funcionarioService.mensagem("Erro ao editar funcionário.")
          this.location.back();
        },
        next: () => console.log("Funcionário editado.")
      })
    }
  }


}
