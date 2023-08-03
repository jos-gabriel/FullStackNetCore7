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

  constructor(
    private service:ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    this.service.getCliente(this.id).subscribe((data: any) =>{
      console.log(data)
    })

  }

}
