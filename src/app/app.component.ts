import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Cliente {
  idCliente?: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  correo: string;
  direccion: string;
  estado: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Comercializadora';

  cliente: Cliente = this.crearClienteVacio();
  mensaje = '';
  mensajeTipo: 'success' | 'error' | '' = '';

  clientes: Cliente[] = [
    { idCliente: 1, nombres: 'Ana María', apellidos: 'López Pérez', identificacion: '1012345678', telefono: '3001234567', correo: 'ana.lopez@correo.com', direccion: 'Cra. 10 # 20-30', estado: true },
    { idCliente: 2, nombres: 'Carlos Andrés', apellidos: 'Ruiz Gómez', identificacion: '1023456789', telefono: '3012345678', correo: 'carlos.ruiz@correo.com', direccion: 'Calle 15 # 8-12', estado: true },
    { idCliente: 3, nombres: 'María Fernanda', apellidos: 'Torres Díaz', identificacion: '1034567890', telefono: '3023456789', correo: 'maria.torres@correo.com', direccion: 'Av. Central 45-21', estado: true },
    { idCliente: 4, nombres: 'José Luis', apellidos: 'Martínez Silva', identificacion: '1045678901', telefono: '3034567890', correo: 'jose.martinez@correo.com', direccion: 'Cra. 5 # 40-18', estado: true },
    { idCliente: 5, nombres: 'Laura Daniela', apellidos: 'Ramírez Castro', identificacion: '1056789012', telefono: '3045678901', correo: 'laura.ramirez@correo.com', direccion: 'Calle 72 # 11-09', estado: true }
  ];

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

    const correoExiste = this.clientes.some(
      item => item.correo.toLowerCase() === this.cliente.correo.trim().toLowerCase()
    );
    const identificacionExiste = this.clientes.some(
      item => item.identificacion === this.cliente.identificacion.trim()
    );

    if (correoExiste || identificacionExiste) {
      this.mostrarMensaje('La identificación o el correo ya se encuentran registrados.', 'error');
      return;
    }

    const nuevoCliente: Cliente = {
      ...this.cliente,
      idCliente: Math.max(0, ...this.clientes.map(item => item.idCliente ?? 0)) + 1,
      nombres: this.cliente.nombres.trim(),
      apellidos: this.cliente.apellidos.trim(),
      identificacion: this.cliente.identificacion.trim(),
      telefono: this.cliente.telefono.trim(),
      correo: this.cliente.correo.trim(),
      direccion: this.cliente.direccion.trim(),
      estado: true
    };

    this.clientes = [...this.clientes, nuevoCliente];
    this.mostrarMensaje(`Cliente ${nuevoCliente.idCliente} guardado correctamente.`, 'success');
    this.cliente = this.crearClienteVacio();
  }

  consultarClientes(): void {
    this.mostrarMensaje(`Se consultaron ${this.clientes.length} clientes registrados.`, 'success');
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
