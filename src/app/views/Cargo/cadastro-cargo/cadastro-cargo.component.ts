import { Cargo } from './../../../models/cargoModels';
import { CargoService } from './../../../servicos/cargo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.css']
})

export class CadastroCargoComponent implements OnInit {


  cargo: Cargo = {
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService: CargoService, private router:Router, private location:Location ) { }

  ngOnInit(): void {
  }

  cadastrarUmCargo(){
    this.cargoService.cadastroCargo(this.cargo).subscribe((resultado) => {
      alert("Cargo cadastrado com sucesso!")
      this.router.navigate(["/cargo"])
    },err =>{
      alert(err.error.message())
    },
    )
  }

  cancelarCadastro(){
    this.router.navigate(['/cargo'])
  }

}
