import { MatIconModule } from '@angular/material/icon';
import { ExclusaoFuncionarioComponent } from './views/Funcionario/exclusao-funcionario/exclusao-funcionario.component';
import { CadastroFuncionarioComponent } from './views/Funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaFuncionarioComponent } from './views/Funcionario/lista-funcionario/lista-funcionario.component';

import { ListaCargoComponent } from './views/Cargo/lista-cargo/lista-cargo.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HomeComponent} from './templates/home/home.component';

import { CadastroCargoComponent } from './views/Cargo/cadastro-cargo/cadastro-cargo.component';

import { ExclusaoCargoComponent } from './views/Cargo/exclusao-cargo/exclusao-cargo.component';
import { EdicaoCargoComponent } from './views/Cargo/edicao-cargo/edicao-cargo.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EdicaoFuncionarioComponent } from './views/Funcionario/edicao-funcionario/edicao-funcionario.component';
import { ListaGeralFuncionariosComponent } from './views/Funcionario/lista-geral-funcionarios/lista-geral-funcionarios.component';
import { ListaFuncionarioDoCargoComponent } from './views/Funcionario/lista-funcionario-do-cargo/lista-funcionario-do-cargo.component';
import { AtribuirCargoComponent } from './views/Funcionario/atribuir-cargo/atribuir-cargo.component';
import { CadastroMentorComponent } from './views/Mentor/cadastro-mentor/cadastro-mentor.component';
import { EdicaoMentorComponent } from './views/Mentor/edicao-mentor/edicao-mentor.component';
import { ExclusaoMentorComponent } from './views/Mentor/exclusao-mentor/exclusao-mentor.component';
import { ListaMentorComponent } from './views/Mentor/lista-mentor/lista-mentor.component';
import { AtribuirCargoDoMentorComponent } from './views/Mentor/atribuir-cargo-do-mentor/atribuir-cargo-do-mentor.component';
import { MentorDoCargoComponent } from './views/Mentor/mentor-do-cargo/mentor-do-cargo.component';
import { BoletoMentorComponent } from './views/Boleto/boleto-mentor/boleto-mentor.component';
import { CadastroBoletoComponent } from './views/Boleto/cadastro-boleto/cadastro-boleto.component';
import { EdicaoBoletoComponent } from './views/Boleto/edicao-boleto/edicao-boleto.component';
import { ExclusaoBoletoComponent } from './views/Boleto/exclusao-boleto/exclusao-boleto.component';
import { NgxCurrencyModule } from "ngx-currency";
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListaCargoComponent,
    ListaFuncionarioComponent,
    CadastroFuncionarioComponent,
    CadastroCargoComponent,
    ExclusaoFuncionarioComponent,
    ExclusaoCargoComponent,
    EdicaoCargoComponent,
    EdicaoFuncionarioComponent,
    ListaGeralFuncionariosComponent,
    ListaFuncionarioDoCargoComponent,
    AtribuirCargoComponent,
    CadastroMentorComponent,
    EdicaoMentorComponent,
    ExclusaoMentorComponent,
    ListaMentorComponent,
    AtribuirCargoDoMentorComponent,
    MentorDoCargoComponent,
    BoletoMentorComponent,
    CadastroBoletoComponent,
    EdicaoBoletoComponent,
    ExclusaoBoletoComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    NgxCurrencyModule,
    MatSnackBarModule,
    MatIconModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
