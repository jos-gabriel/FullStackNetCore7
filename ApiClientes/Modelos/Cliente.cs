using System.ComponentModel.DataAnnotations;

namespace APIClientes.Modelos
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public String Nombres { get; set; }
        [Required]
        public String Apellidos { get; set; }
        [Required]
        public String Direccion { get; set; }
        [Required]
        public String Telefono { get; set; }

    }
}
