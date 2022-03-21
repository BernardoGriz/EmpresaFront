import { ListaGeralFuncionariosComponent } from './views/Funcionario/lista-geral-funcionarios/lista-geral-funcionarios.component';
import { AtribuirCargoComponent } from './views/Funcionario/atribuir-cargo/atribuir-cargo.component';
import { ExclusaoBoletoComponent } from './views/Boleto/exclusao-boleto/exclusao-boleto.component';
import { EdicaoBoletoComponent } from './views/Boleto/edicao-boleto/edicao-boleto.component';
import { CadastroBoletoComponent } from './views/Boleto/cadastro-boleto/cadastro-boleto.component';
import { EdicaoMentorComponent } from './views/Mentor/edicao-mentor/edicao-mentor.component';
import { ExclusaoMentorComponent } from './views/Mentor/exclusao-mentor/exclusao-mentor.component';
import { CadastroMentorComponent } from './views/Mentor/cadastro-mentor/cadastro-mentor.component';
import { AtribuirCargoDoMentorComponent } from './views/Mentor/atribuir-cargo-do-mentor/atribuir-cargo-do-mentor.component';
import { MentorDoCargoComponent } from './views/Mentor/mentor-do-cargo/mentor-do-cargo.component';
import { ListaMentorComponent } from './views/Mentor/lista-mentor/lista-mentor.component';
import { EdicaoFuncionarioComponent } from './views/Funcionario/edicao-funcionario/edicao-funcionario.component';
import { CadastroFuncionarioComponent } from './views/Funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaFuncionarioComponent } from './views/Funcionario/lista-funcionario/lista-funcionario.component';
import { CadastroCargoComponent } from './views/Cargo/cadastro-cargo/cadastro-cargo.component';
import { EdicaoCargoComponent } from './views/Cargo/edicao-cargo/edicao-cargo.component';
import { ExclusaoCargoComponent } from './views/Cargo/exclusao-cargo/exclusao-cargo.component';
import { ExclusaoFuncionarioComponent } from './views/Funcionario/exclusao-funcionario/exclusao-funcionario.component';
import { ListaCargoComponent } from './views/Cargo/lista-cargo/lista-cargo.component';
import { HomeComponent } from './templates/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletoMentorComponent } from './views/Boleto/boleto-mentor/boleto-mentor.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent},

  //Rotas Cargo
  {path: "cargo", component: ListaCargoComponent},
  {path: "excluirCargo/:id_cargo", component: ExclusaoCargoComponent},
  {path: "editarCargo/:id_cargo", component: EdicaoCargoComponent},
  {path: "cadastrarCargo", component: CadastroCargoComponent},

  //Rotas Funcionário
  {path: "funcCargo/:id_cargo", component: ListaFuncionarioComponent},
  {path: "cadastrarFunc", component: CadastroFuncionarioComponent},
  {path: "editarFunc/:id_funcionario/:id_cargo", component: EdicaoFuncionarioComponent},
  {path: "excluirFunc/:id_funcionario", component: ExclusaoFuncionarioComponent},
  {path: "funcionario/atribuirCargo/:id_funcionario/:id_cargo", component: AtribuirCargoComponent},
  {path: "funcionario", component: ListaGeralFuncionariosComponent},

  //Rotas Mentor
  {path: "mentores", component: ListaMentorComponent},
  {path: "mentor/:id_cargo", component: MentorDoCargoComponent}, //ProfessorDaTurma
  {path: "mentor/atribuirCargo/:id_mentor", component: AtribuirCargoDoMentorComponent},
  {path: "mentores/cadastrar", component: CadastroMentorComponent},
  {path: "mentores/excluir/:id_mentor", component: ExclusaoMentorComponent},
  {path: "mentores/editar/:id_mentor/:id_cargo", component: EdicaoMentorComponent},

  //Rotas Boleto
  {path:"boleto/cadastro/:id_mentor", component:CadastroBoletoComponent},
  {path:"boleto/edicao/:codigo/:id_mentor", component:EdicaoBoletoComponent},
  {path:"boleto/exclusao/:codigo/:id_mentor", component:ExclusaoBoletoComponent},
  {path:"boleto/lista/:id_mentor", component:BoletoMentorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
