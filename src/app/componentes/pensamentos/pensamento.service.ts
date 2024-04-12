import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Pensamento } from './pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favorito?: boolean) {

    const itensPorPagina = 2;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina);

    if (filtro.trim().length > 2) {
      params = params
        .set("q", filtro)
    }

    if (favorito) {
      params = params
        .set("favorito", true)
    }

    // return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=2`)
    return this.http.get<Pensamento[]>(this.API, { params })

  }

  listarTodos() {
    return this.http.get<Pensamento[]>(this.API)
  }

  listarFavoritos() {
    let params = new HttpParams().set("favorito", true)
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  criar(pensamento: Pensamento) {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento) {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  excluir(id: number) {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number) {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

  mudarFavorito(pensamento: Pensamento) {
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }

}
