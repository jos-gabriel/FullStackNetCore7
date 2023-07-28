﻿using APIClientes.Modelos;
using Microsoft.EntityFrameworkCore;

namespace APIClientes.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        public DbSet<Cliente> Clientes { get; set; }
    }
}
