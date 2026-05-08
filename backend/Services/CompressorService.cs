using backend.Data.Context;
using backend.Domain;
using backend.Dtos.CompressorDto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CompressorService
    {
        // Injetando contexto para a instância context
        private readonly AppDbContext _context;
        public CompressorService(AppDbContext context)
        {
            _context = context;
        }

        // Método GetAll
        public async Task<IEnumerable<Compressor>> GetAllAsync()
        {
            var compressores = await _context.Compressores.ToListAsync();
            return compressores;

        }

        // Método GetItem
        public async Task<Compressor?> GetItemAsync(int id)
        {
            var compressor = await _context.Compressores.FindAsync(id);
            return compressor;
        }

        // Método Post
        public async Task<Compressor> CreateAsync(CompressorPostDto dto)
        {
            var compressor = new Compressor
            {
                Modelo = dto.Modelo,
                Marca = dto.Marca,
                VoltagemNacional = dto.VoltagemNacional,
                Frequencia = dto.Frequencia,
                Corrente = dto.Corrente,
                CorrenteMotorY = dto.CorrenteMotorY,
                CorrenteMotorYY = dto.CorrenteMotorYY,
                VolumeDeslocamento = dto.VolumeDeslocamento,
                Rotacao = dto.Rotacao
            };
            _context.Compressores.Add(compressor);
            await _context.SaveChangesAsync();
            return compressor;
        }

        // Método Patch
        public async Task<Compressor> UpdateAsync(int id, CompressorPatchDto dto)
        {
            var compressor = await _context.Compressores.FindAsync(id);

            if (compressor == null)
                return null;

            if (dto.Modelo != null)
                compressor.Modelo = dto.Modelo;

            if (dto.Marca != null)
                compressor.Marca = dto.Marca;

            if (dto.VoltagemNacional.HasValue)
                compressor.VoltagemNacional = dto.VoltagemNacional;

            if (dto.Frequencia.HasValue)
                compressor.Frequencia = dto.Frequencia;

            if (dto.Corrente.HasValue)
                compressor.Corrente = dto.Corrente;

            if (dto.CorrenteMotorY.HasValue)
                compressor.CorrenteMotorY = dto.CorrenteMotorY;

            if (dto.CorrenteMotorYY.HasValue)
                compressor.CorrenteMotorYY = dto.CorrenteMotorYY;

            if (dto.VolumeDeslocamento.HasValue)
                compressor.VolumeDeslocamento = dto.VolumeDeslocamento;

            if (dto.Rotacao.HasValue)
                compressor.Rotacao = dto.Rotacao;

            await _context.SaveChangesAsync();

            return compressor;
        }
    }
}
