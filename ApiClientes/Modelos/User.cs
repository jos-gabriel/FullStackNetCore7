﻿using System.ComponentModel.DataAnnotations;

namespace APIClientes.Modelos
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswoedSalt { get; set; }
    }
}
