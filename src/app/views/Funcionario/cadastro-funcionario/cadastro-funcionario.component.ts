import { Funcionario } from './../../../models/funcionarioModels';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {

  id_func: string = ''

  funcionario:Funcionario = {
    id_func: '',
    func_nome: '',
    func_cidade: ''
  }

  constructor(private funcionarioService:FuncionarioService, private route: ActivatedRoute,private router:Router) {
    // this.id_func = this.route.snapshot.paramMap.get('id_func')!
  }

  ngOnInit(): void {
    this.id_func = this.route.snapshot.paramMap.get('id_func')!
  }

  cadastrarFuncionario(){
    this.funcionarioService.cadastrarFuncionario(this.funcionario, this.id_func).subscribe({
      complete: () => {alert("Funcionario cadastrado no cargo")
      this.router.navigate([`/funcionario`])},
      error: () => {alert("Aconteceu algum erro no cadastro do funcionário")
      this.router.navigate([`/funcionario`])},
      next: () => {console.log("Funcionário cadastrado")}
    })
  }

}
