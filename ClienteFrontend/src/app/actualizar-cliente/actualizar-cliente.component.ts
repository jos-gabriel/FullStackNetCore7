import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {

  form: FormGroup;
  id: number;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ActualizarClienteComponent>,
              private service: ClienteService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) private data: {
                nombres: string
                apellidos: string
                direccion: string
                telefono: string
                id: number
              }) {
                this.id = data.id
                this.form = fb.group({
                  nombres: [data.nombres, Validators.required],
                  apellidos: [data.apellidos, Validators.required],
                  direccion: [data.direccion, Validators.required],
                  telefono: [data.telefono, Validators.required]
                })
              }

  cerrar(){
    this.dialogRef.close()
  }

  guardar(){

    this.form.value.id = this.id
    this.service.actualizarCliente(this.id, this.form.value).subscribe((data) => {
      
      this.router.navigate(['/clientes'])
      window.location.reload()

    })
    this.dialogRef.close()

  }
}