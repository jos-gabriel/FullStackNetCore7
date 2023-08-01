using APIClientes.Data;
using APIClientes.Modelos;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace APIClientes.Repositorio
{
    public class UserRepositorio : IUserRepositorio
    {

        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;
        public UserRepositorio(ApplicationDbContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
            
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
                return CrearToken(user);
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

        private string CrearToken(User user)
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
                            GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
