import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from "./clientes/clientes.component";
import { NgModule } from "@angular/core";

// route
const routes:Routes = [
    {path:'', component: ClientesComponent},
    {path:'clientes', component: ClientesComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule{}