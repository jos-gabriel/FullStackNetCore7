import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from "./clientes/clientes.component";
import { NgModule } from "@angular/core";
import { CrearClienteComponent } from "./crear-cliente/crear-cliente.component";

// route
const routes:Routes = [
    {path: '', component: ClientesComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'crear-cliente', component: CrearClienteComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule{}