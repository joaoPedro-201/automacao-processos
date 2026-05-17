namespace Backend.Models
{
    public class Solicitacao
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Solicitante { get; set; }
        public string? Status { get; set; }
    }
}