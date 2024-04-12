import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Output() evento: EventEmitter<any> = new EventEmitter<any>()

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular!',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: false
  }

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
  }

  larguraPensamento() {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string {
    if(this.pensamento.favorito) {
      return 'ativo'
    }
    return 'inativo'
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe()
    this.evento.emit()

  }

}
