import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteInterface } from '../interfaces/ClienteInterface';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarClienteComponent } from '../actualizar-cliente/actualizar-cliente.component';
import { Router } from '@angular/router';

@Component({

  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
  
})

export class ClientesComponent {

  dataSource: any = []
  displayedColumns: string[] = [
    'nombres',
    'apellidos',
    'direccion',
    'telefono',
    'acciones'
  ]

  constructor(
    private service: ClienteService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.service.getClientes().subscribe((data:any) => {
      this.dataSource = new MatTableDataSource<ClienteInterface>(data.result as ClienteInterface[])
    },
    (errorData) => this.router.navigate(['/login']))

  }

  aplicarFiltro(filtro: any) {
    this.dataSource.filter = filtro.target.value.trim().toLowerCase()
  }

  actualizarCliente(cliente: ClienteInterface){
    console.log(cliente)

    this.dialog.open(ActualizarClienteComponent, {
      data: {
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        id: cliente.id
      }
    })
  }

}
