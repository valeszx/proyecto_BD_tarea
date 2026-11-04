import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente, GuardarClienteRespuesta } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7294/api/clientes';

  // GET api/clientes
  consultar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // POST api/clientes
  guardar(cliente: Cliente): Observable<GuardarClienteRespuesta> {
    return this.http.post<GuardarClienteRespuesta>(this.apiUrl, cliente);
  }

  // GET api/clientes/probar-conexion
  probarConexion(): Observable<{ conectado: boolean; servidor: string; baseDatos: string }> {
    return this.http.get<{ conectado: boolean; servidor: string; baseDatos: string }>(
      `${this.apiUrl}/probar-conexion`
    );
  }
}
