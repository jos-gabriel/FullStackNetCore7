import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-cliente',
  templateUrl: './delete-cliente.component.html',
  styleUrls: ['./delete-cliente.component.css']
})
export class DeleteClienteComponent {

  id: any;

  cliente = {
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: ''
  }

  constructor(
    private service:ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    this.service.getCliente(this.id).subscribe((data: any) =>{
      console.log(data)

      this.cliente.nombres = data.result.nombres
      this.cliente.apellidos = data.result.apellidos
      this.cliente.direccion = data.result.direccion
      this.cliente.telefono = data.result.telefono

    })

  }

  cancel(){

  }

  confirmar(){
    
  }

}
