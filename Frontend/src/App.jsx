import { useState, useEffect } from 'react';

function App() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [status, setStatus] = useState('');

  const API_URL = 'http://localhost:5175/solicitacoes';

  const buscarSolicitacoes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSolicitacoes(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  const criarSolicitacao = async (e) => {
    e.preventDefault();
    
    if (!titulo || !status)
    {
      alert("Preencha os campos obrigatórios!")
      return;
    }

    try{
    const response = await fetch(API_URL, { 
      method : 'POST', 
      headers :{ 'Content-Type' : 'application/json'}, 
      body : JSON.stringify({ titulo, solicitante, status }) 
    });

    if(response.ok)
    {
      setTitulo('');
      setSolicitante('');
      setStatus('');

    buscarSolicitacoes();
  } else {
    alert("Erro ao criar solicitação na API.");
  }
} catch (error) {
  console.error("Erro no fetch:", error);
}
  };

  const concluirSolicitacao = async (id, solicitacaoAtual) => {
    try {
      const solicitacaoAtualizada = { 
        ...solicitacaoAtual, 
        status: 'Concluída' 
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method : 'PUT',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(solicitacaoAtualizada)
      });

      if (response.ok)
      {
        buscarSolicitacoes()
      }   
      
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  const qtdPendentes = solicitacoes.filter(sol => sol.status === 'Pendente').length;
  const qtdConcluidas = solicitacoes.filter(sol => sol.status === 'Concluída').length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestão de Solicitações</h1>
      
      {/* Resumo bonûs */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <div style={{ padding: '15px', border: '1px solid white', borderRadius: '8px', background: '#fff3cd' }}>
          <strong>Pendentes: </strong> {qtdPendentes}
        </div>
        <div style={{ padding: '15px', border: '1px solid white', borderRadius: '8px', background: '#d4edda' }}>
          <strong>Concluídas: </strong> {qtdConcluidas}
        </div>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={criarSolicitacao} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Título (Obrigatório)" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Solicitante" 
          value={solicitante} 
          onChange={(e) => setSolicitante(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="">Selecione o Status (Obrigatório)</option>
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button type="submit">Salvar</button>
      </form>

      {/* Tabela de Exibição */}
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Solicitante</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.length === 0 ? (
            <tr><td colSpan="5">Nenhuma solicitação encontrada.</td></tr>
          ) : (
            solicitacoes.map((sol) => (
              <tr key={sol.id}>
                <td>{sol.id}</td>
                <td>{sol.titulo}</td>
                <td>{sol.solicitante}</td>
                <td>{sol.status}</td>
                <td>
                  <button onClick={() => concluirSolicitacao(sol.id, sol)}>
                    Concluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;