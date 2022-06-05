import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

    usuario: Usuario = new Usuario //variáveis acima dos costrutores
    confirmarSenha: string
    tipoUsuario: string
  
    //injeção de dependência. O módulo cadastrar DEPENDE do AuthService
    constructor(
      private authService: AuthService, 
      private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoDoUsuario(event: any) {
    this.tipoUsuario = event.target.value

  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario
    if(this.usuario.senha != this.confirmarSenha){
      alert("Atenção! As senhas não coincidem.")
  } else { 
    this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.router.navigate(["/entrar"])
      alert("Usuário cadastrado com sucesso!")
    }) //sobrescreve o objeto para formato JSON
  }
}
}