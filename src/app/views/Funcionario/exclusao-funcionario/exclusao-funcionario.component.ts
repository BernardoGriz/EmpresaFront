import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Funcionario } from './../../../models/funcionarioModels';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exclusao-funcionario',
  templateUrl: './exclusao-funcionario.component.html',
  styleUrls: ['./exclusao-funcionario.component.css']
})
export class ExclusaoFuncionarioComponent implements OnInit {

  id_cargo: string = ''

  funcionario:Funcionario = {
    id_func: '',
    func_nome: '',
    func_cidade: ''
  }

  constructor(private funcionarioService:FuncionarioService,
    private route:ActivatedRoute, private router:Router) {

    }

  ngOnInit(): void {

    this.funcionario.id_func = this.route.snapshot.paramMap.get('id_funcionario')
    this.buscarUmFuncionario()
  }

  buscarUmFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.funcionario.id_func).subscribe((resultado) => {
      this.funcionario = resultado
    })

  }

  cancelarExclusao(){
    this.router.navigate(['/funcionario'])
  }

  excluirFuncionario(){
    this.funcionarioService.excluirFuncionario(this.funcionario.id_func).subscribe({
      complete: () => { alert("Funcionario excuído com sucesso")
                        this.router.navigate(['/funcionario'])},
      error: () => { alert("Erro ao excluir o funcionario")
                    this.router.navigate(['/funcionario']) },
      next: () => { console.log("funcionario excluido com sucesso")}

    });
  }


}
