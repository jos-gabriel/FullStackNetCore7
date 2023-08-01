import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  constructor(private service: ClienteService) {
  }

  ngOnInit(): void {

    this.service.getClientes().subscribe((data:any) => {
      console.log(data)
    })

  }

}
