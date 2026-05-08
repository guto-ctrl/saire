using backend.Dtos.CompressorDto;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CompressoresController : ControllerBase
    {
        // Injetando contexto pra instância service
        private readonly CompressorService _service;
        public CompressoresController(CompressorService service)
        {
            _service = service;
        }

        // Método GetAll
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var compressores = await _service.GetAllAsync();
            return Ok(compressores);
        }

        // Método GetItem
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var compressor = await _service.GetItemAsync(id);
            if (compressor == null)
            {
                return NotFound();
            }
            return Ok(compressor);
        }

        // Método Post
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CompressorPostDto dto)
        {

            var newCompressor = await _service.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetItem),
                new { id = newCompressor.CompressorId },
                newCompressor
            );
            //return Ok(dto);
        }

        // Método Patch
        [HttpPatch]
        public async Task<IActionResult> Patch(int id, [FromBody] CompressorPatchDto dto)
        {
            var compressor = await _service.UpdateAsync(id, dto);

            if (compressor == null)
            {
                return NotFound();
            }

            return Ok(compressor);
        }
    }
}
