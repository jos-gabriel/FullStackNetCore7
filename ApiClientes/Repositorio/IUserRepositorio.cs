using APIClientes.Modelos;

namespace APIClientes.Repositorio
{
    public interface IUserRepositorio
    {
        //metodos a utilizar
        //retorna un int llamado register encargado de registrar el usuario
        Task<string> Register(User user, string password);
        Task<string> Login(string userName, string password);
        Task<bool>UserExiste(string userName);
    }
}
