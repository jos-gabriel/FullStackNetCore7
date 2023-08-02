import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})

export class CrearClienteComponent {

  constructor(private service: ClienteService,
              private router: Router) { }

  clienteForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required)
  })

  onSubmit() {
    let form = this.clienteForm.value
    this.service.crearCliente(form).subscribe((data:any) => {
      alert('Cliente Creado');
      this.router.navigate(['/clientes']);
    })
  }

}
