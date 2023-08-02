import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteService } from './cliente.service';
import { AppRouterModule } from './app-router.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

  declarations: [
    AppComponent,
    ClientesComponent,
    HeaderComponent,
    FooterComponent,
    CrearClienteComponent
  ],

  imports: [  
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule
  ],

  providers: [ClienteService],
  bootstrap: [AppComponent]

})

export class AppModule { }
