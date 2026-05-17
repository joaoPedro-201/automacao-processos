using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SolicitacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SolicitacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetSolicitacoes()
        {
            var lista = _context.Solicitacoes.ToList();
            
            return Ok(lista); 
        }

        [HttpPost]
        public IActionResult CriarSolicitacao(Solicitacao novaSolicitacao)
        {
            if(string.IsNullOrWhiteSpace(novaSolicitacao.Titulo)|| string.IsNullOrWhiteSpace(novaSolicitacao.Status))
            {
                return BadRequest("Erro: Os campos 'título' e 'status' são obrigatórios e não podem estar vazios.");
            }

            _context.Solicitacoes.Add(novaSolicitacao);
            _context.SaveChanges();

            return Ok(novaSolicitacao);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarStatus(int id, Solicitacao solicitacaoAtualizada)
        {
            var solicitacaoExistente = _context.Solicitacoes.Find(id);

            if(solicitacaoExistente is null)
            {
                return NotFound("Solicitação não encontrada.");
            }
            
            if(string.IsNullOrWhiteSpace(solicitacaoAtualizada.Status))
            {
                return BadRequest("Erro: 'status está vazio.'");
            }

            solicitacaoExistente.Status = solicitacaoAtualizada.Status;
            
            _context.SaveChanges();

            return Ok(solicitacaoExistente);
        }
    }
}