import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Cargo } from './../../../models/cargoModels';
import { CargoService } from './../../../servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.css']
})

export class EdicaoCargoComponent implements OnInit {

  form!: FormGroup

  cargo:Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService: CargoService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarUmCargo()
  }

  mostrarUmCargo(){
    this.cargoService.mostrarCargo(this.cargo.id_cargo).subscribe((resultado)=>{
      this.cargo = resultado;
    })
  }

  editarCargo(){
    this.cargoService.editarCargo(this.cargo).subscribe({
      complete: () => {
        alert("Cargo editado com sucesso"),
        this.router.navigate([`/cargo`])
      },
      error: () => {
        alert("Erro ao cadastrar cargo."),
        this.router.navigate([`/cargo`])
      },
      next: () =>{ console.log("Cargo editado com sucesso")}
    })
  }

  cancelarEdicao(){
    this.router.navigate(['/cargo'])
  }

}
