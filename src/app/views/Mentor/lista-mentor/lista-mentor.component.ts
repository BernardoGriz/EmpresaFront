import { MentorService } from 'src/app/servicos/mentor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-mentor',
  templateUrl: './lista-mentor.component.html',
  styleUrls: ['./lista-mentor.component.css']
})
export class ListaMentorComponent implements OnInit {

    // Variável para armazenar os mentores na tabela
    tabelaMentor: any;

    // sort
    // @ViewChild(MatSort) sort!: MatSort;

    // paginator
    // @ViewChild("paginatorMentor") paginatorFunc!: MatPaginator;
    // estabelecendo breakpoint do paginator
    // bpPaginator: boolean = false;

    mentores: any = []

  constructor(private mentorService: MentorService) { }

  ngOnInit(): void {
    this.mostrarTodosMentores()
  }

  mostrarTodosMentores() {
    this.mentorService.mostrarTodosMentores().subscribe(resultado => {

      console.log(resultado)

      resultado.forEach((mentor: any[]) => {

        let mentorComCargo: any = {
          id_mentor: '',
          mentor_nome: '',
          mentor_cpf: '',
          mentor_cargo: '',
          mentor_foto: '',
          id_cargo: '',
          car_nome: '',
          car_atribuicao: ''
        }


        mentorComCargo.id_mentor = mentor[0]
        mentorComCargo.mentor_nome = mentor[1]
        mentorComCargo.mentor_cargo = mentor[2]
        mentorComCargo.mentor_cpf = mentor[3]
        mentorComCargo.mentor_foto = mentor[4]
        console.log(mentor)
        if (mentor[5] != null) {
          mentorComCargo.id_cargo = mentor[5]
          mentorComCargo.car_nome = mentor[6]
          mentorComCargo.car_atribuicao = mentor[7]
        } else {
          mentorComCargo.id_cargo = "0"
          mentorComCargo.car_nome = "----"
          mentorComCargo.car_atribuicao = "----"
        }
        this.mentores.push(mentorComCargo)
        this.tabelaMentor = this.mentores

        console.log(resultado)



      });


    })
  }



}
