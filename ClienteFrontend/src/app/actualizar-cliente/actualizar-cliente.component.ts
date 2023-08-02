import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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


}