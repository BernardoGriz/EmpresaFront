import { FormBuilder } from '@angular/forms';
import { Cargo } from './../../../models/cargoModels';
import { CargoService } from './../../../servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exclusao-cargo',
  templateUrl: './exclusao-cargo.component.html',
  styleUrls: ['./exclusao-cargo.component.css']
})
export class ExclusaoCargoComponent implements OnInit {

  cargo:Cargo={
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService: CargoService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarUmCargo()
  }

  mostrarUmCargo(){
    this.cargoService.mostrarCargo(this.cargo.id_cargo).subscribe((resultado) =>{
      this.cargo = resultado
      console.log(this.cargo)
    })
  }

  excluirCargo(){
    this.cargoService.excluirCargo(this.cargo.id_cargo).subscribe({
      complete: () => {
        alert("Cargo excluído com sucesso."),
        this.router.navigate([`/cargo`])
      },
      error: () => {
        alert("Erro ao excluir cargo."),
        this.router.navigate([`/cargo`])
      },
      next: () =>{ console.log("Cargo cadastrado")}
    })
  }

  cancelarExclusao(){
    this.router.navigate(['/cargo'])
  }


}
