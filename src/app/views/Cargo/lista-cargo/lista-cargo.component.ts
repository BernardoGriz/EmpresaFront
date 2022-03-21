import { MentorService } from 'src/app/servicos/mentor.service';
import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cargo',
  templateUrl: './lista-cargo.component.html',
  styleUrls: ['./lista-cargo.component.css']
})
export class ListaCargoComponent implements OnInit {

  cargos:any = []

  constructor(private cargoService:CargoService,
              private mentorService:MentorService,
              private router: Router) { }

  ngOnInit(): void {
    this.mostrarTodasCargos();
  }

  mostrarTodasCargos(){
    this.cargoService.buscarTodosCargos().subscribe(resultado =>{
      //this.cargos = resultado;
      console.log("aqui")
      console.log(this.cargos)

      resultado.forEach((cargo: any[]) => {

        let cargoComMentor: any ={
          id_cargo:'',
          car_nome:'',
          car_atribuicao: '',
          id_mentor:'',
          mentor_nome:'',
          mentor_cargo:''
        }

        cargoComMentor.id_cargo = cargo[0]
        cargoComMentor.car_nome = cargo[1]
        cargoComMentor.car_atribuicao = cargo[2]
        if(cargo[3] != null){
          cargoComMentor.id_mentor = cargo[3]
          cargoComMentor.mentor_nome = cargo[4]
          cargoComMentor.mentor_cargo = cargo[5]
        }else{
          cargoComMentor.id_mentor = 0
          cargoComMentor.mentor_nome = "----"
          cargoComMentor.mentor_cargo = "----"
        }


        this.cargos.push(cargoComMentor)
        //console.log(this.cargos)

      });


    })


  }

  navegarCadastroCargo(){
    this.router.navigate(['/cadastrarCargo'])
  }

  deletarCargo(id:any){

  }



}
