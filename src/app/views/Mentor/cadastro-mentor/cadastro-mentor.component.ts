import { HttpClient } from '@angular/common/http';
import { CargoService } from 'src/app/servicos/cargo.service';
import { MentorService } from './../../../servicos/mentor.service';
import { Mentor } from './../../../models/mentorModels';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-mentor',
  templateUrl: './cadastro-mentor.component.html',
  styleUrls: ['./cadastro-mentor.component.css']
})
export class CadastroMentorComponent implements OnInit {

  idMentorCadastrado: any
  mentorCadastrado: boolean = false

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  foto !: any

  constructor(private mentorService: MentorService, private cargoService: CargoService, private http: HttpClient, private location: Location) {

  }

  ngOnInit(): void {
  }

  cadastrarMentor() {
    this.mentorService.cadastrarMentor(this.mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Mentor cadastrado com sucesso")
        this.mentorService.buscarMentorPeloCpf(`${this.mentor.mentor_cpf}`).subscribe((res) => {
          console.log(res)
          this.idMentorCadastrado = res.id_mentor
          this.mentorCadastrado = true
        })
        // this.location.back() Não redireciona pq precisamos cadastrar foto ainda
      },
      error: () => {
        this.cargoService.mensagem("Erro ao cadastrar o mentor")
        // this.location.back() Não redireciona pq precisamos cadastrar foto ainda
      },
      next: () => { console.log("Mentor cadastrado.") }

    });
  }

  importarImg(event: any) {

    // Se o usuário selecionar um arquivo e
    // Se estiver na posição 0 (o multifiles permite que sejam importados diversos arquivos, que serão registrados em array)
    if(event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      console.log(this.foto)

      // variável que aramazena os seguintes atributos -- nome do atributo: , valor do atributo:
      // é como se estivessemos criando um obj
      const formData = new FormData

      // dentro do formData, criamos um atributo que chama foto e atribuímos a ele o conteúdo da variável foto
      formData.append("foto", this.foto)

      const cpf: string = this.mentor.mentor_cpf + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/envio/${this.idMentorCadastrado}?cpf=${cpf}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso."),
      })
      this.cargoService.mensagem("Imagem anexada ao(à) mentor(a)")
      this.location.back();
    }
  }

}
