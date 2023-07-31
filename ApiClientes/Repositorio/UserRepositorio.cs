using APIClientes.Data;
using APIClientes.Modelos;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace APIClientes.Repositorio
{
    public class UserRepositorio : IUserRepositorio
    {

        private readonly ApplicationDbContext _db;
        public UserRepositorio(ApplicationDbContext db)
        {
            _db = db;
            
        }
        public async Task<string> Login(string userName, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(
                x => x.UserName.ToLower().Equals(userName.ToLower()));
            if (user == null) 
            {
                return "nouser";
            }
            else if (!VerificarPasswordHash(password, user.PasswordHash, user.PasswoedSalt))
            {
                return "wrongpassword";
            }
            else
            {
                return "ok";
            }
        }

        public async Task<int> Register(User user, string password)
        {
            try
            {
                if (await UserExiste(user.UserName))
                {
                    return -1;
                }
                CrearPasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswoedSalt = passwordSalt;

                await _db.Users.AddAsync(user);
                await _db.SaveChangesAsync();
                return user.Id;
            }
            catch (Exception)
            {

                return -500;
            }
        }

        public async Task<bool> UserExiste(string userName)
        {
            if (await _db.Users.AnyAsync(x => x.UserName.ToLower().Equals(userName.ToLower())))
            {
                return true;
            }
            return false;
        }

        private void CrearPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) 
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerificarPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}
