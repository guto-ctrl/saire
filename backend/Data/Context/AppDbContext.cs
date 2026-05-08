using Microsoft.EntityFrameworkCore;
using backend.Domain;

namespace backend.Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base( options )
        {
        }

        public DbSet<Compressor>? Compressores { get; set; }
    }
}
