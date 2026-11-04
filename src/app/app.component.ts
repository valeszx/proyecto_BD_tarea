import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Cliente } from './models/cliente';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly clienteService = inject(ClienteService);

  title = 'Comercializadora';

  cliente: Cliente = this.crearClienteVacio();
  mensaje = '';
  mensajeTipo: 'success' | 'error' | '' = '';

  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.cargarClientes();
  }

  private cargarClientes(alTerminar?: () => void): void {
    this.clienteService.consultar().subscribe({
      next: lista => {
        this.clientes = lista;
        alTerminar?.();
      },
      error: err => this.mostrarMensaje(this.extraerError(err, 'No se pudo consultar los clientes.'), 'error')
    });
  }

  guardarCliente(): void {
    const campos = [
      this.cliente.nombres,
      this.cliente.apellidos,
      this.cliente.identificacion,
      this.cliente.telefono,
      this.cliente.correo,
      this.cliente.direccion
    ];

    if (campos.some(campo => !campo.trim())) {
      this.mostrarMensaje('Complete todos los campos obligatorios.', 'error');
      return;
    }

    const nuevoCliente: Cliente = {
      ...this.cliente,
      nombres: this.cliente.nombres.trim(),
      apellidos: this.cliente.apellidos.trim(),
      identificacion: this.cliente.identificacion.trim(),
      telefono: this.cliente.telefono.trim(),
      correo: this.cliente.correo.trim(),
      direccion: this.cliente.direccion.trim(),
      estado: true
    };

    this.clienteService.guardar(nuevoCliente).subscribe({
      next: respuesta => {
        this.cliente = this.crearClienteVacio();
        this.cargarClientes(() =>
          this.mostrarMensaje(`Cliente ${respuesta.idCliente} guardado correctamente.`, 'success')
        );
      },
      error: err => this.mostrarMensaje(this.extraerError(err, 'No se pudo guardar el cliente.'), 'error')
    });
  }

  consultarClientes(): void {
    this.cargarClientes(() =>
      this.mostrarMensaje(`Se consultaron ${this.clientes.length} clientes registrados.`, 'success')
    );
  }

  private extraerError(err: unknown, porDefecto: string): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'No se pudo conectar con el API (verifique que esté en ejecución, el certificado HTTPS y CORS).';
      }
      return err.error?.mensaje ?? porDefecto;
    }
    return porDefecto;
  }

  limpiarFormulario(): void {
    this.cliente = this.crearClienteVacio();
    this.mensaje = '';
    this.mensajeTipo = '';
  }

  private crearClienteVacio(): Cliente {
    return {
      nombres: '',
      apellidos: '',
      identificacion: '',
      telefono: '',
      correo: '',
      direccion: '',
      estado: true
    };
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = texto;
    this.mensajeTipo = tipo;
  }
}
