import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-geral-funcionarios',
  templateUrl: './lista-geral-funcionarios.component.html',
  styleUrls: ['./lista-geral-funcionarios.component.css']
})
export class ListaGeralFuncionariosComponent implements OnInit {

  funcionarios:any = []
  id_cargo: any = ""

  constructor(private funcionarioService: FuncionarioService,
    private route:ActivatedRoute,
    private router:Router) {
      this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!
  }

  ngOnInit(): void {
    this.mostrarTodosFuncs()
  }

  mostrarTodosFuncs() {
    this.funcionarioService.buscarTodosFuncs().subscribe((resultado) => {

      resultado.forEach((func: any[]) => {

        let funcsECargos: any = {
          id_func: "",
          func_nome: "",
          func_cidade: "",
          id_cargo: "",
          car_nome: "",
          car_atribuicao: ""
        }

        funcsECargos.id_func = func[0]
        funcsECargos.func_nome = func[1]
        funcsECargos.func_cidade = func[2]
        if (func[3] != null) {
          funcsECargos.id_cargo = func[3]
          funcsECargos.car_nome = func[4]
          funcsECargos.car_atribuicao = func[5]
        } else {
          funcsECargos.id_cargo = "0"
          funcsECargos.car_nome = "----"
          funcsECargos.car_atribuicao = "----"
        }

        this.funcionarios.push(funcsECargos)
        console.log(funcsECargos)
      });

    })
  }












}









