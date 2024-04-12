import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((lista) => {
      this.listaPensamentos.push(...lista)
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe((lista) => {
      this.listaPensamentos.push(...lista);
      if(!lista.length) {
        this.haMaisPensamentos = false;
      }
    })
  }

  pesquisarPensamentos() {

    this.paginaAtual = (1);
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })

  }

  listarFavoritos() {
    this.paginaAtual = 1
    this.haMaisPensamentos = true
    this.favoritos = true
    this.pesquisarPensamentos()
  }

  listarTodos() {
    this.paginaAtual = 1
    this.haMaisPensamentos = true
    this.favoritos = false
    this.pesquisarPensamentos()
  }

  removerFavorito(pensamento: Pensamento) {
    if (this.favoritos) {
      this.listaPensamentos.splice(this.listaPensamentos.indexOf(pensamento),1)
      this.service.listarFavoritos().subscribe((lista) => {
        if (lista[this.listaPensamentos.length]){
          this.listaPensamentos.push(lista[this.listaPensamentos.length])
        }        
      })
    }
  }

}
