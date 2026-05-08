using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.CompressorDto
{
    public class CompressorPostDto
    {
        [Required]
        [StringLength(30)]
        public string Modelo { get; set; } = String.Empty;

        [Required]
        [StringLength(15)]
        public string Marca { get; set; } = String.Empty;

        public int? VoltagemNacional { get; set; }

        public int? Frequencia { get; set; }

        public decimal? Corrente { get; set; }

        public decimal? CorrenteMotorY { get; set; }

        public decimal? CorrenteMotorYY { get; set; }

        public decimal? VolumeDeslocamento { get; set; }

        public int? Rotacao { get; set; }
    }
}
