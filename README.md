# Sistema de Gestão de Solicitações

Este é um projeto Full-Stack desenvolvido como resolução de um desafio técnico para vaga de desenvolvedor. O sistema permite o gerenciamento completo (CRUD) de solicitações, com interface amigável e um dashboard dinâmico de status.

## Funcionalidades
- **Criar Solicitação:** Cadastro de novas demandas com validação de campos obrigatórios (Título e Status).
- **Listar Solicitações:** Visualização em tempo real de todas as solicitações cadastradas.
- **Atualizar Status:** Botão de ação rápida para concluir uma solicitação com um clique (atualiza para "Concluída").
- **Excluir:** Remoção de solicitações do sistema com alerta de confirmação.
- **Dashboard Resumo (Diferencial):** Contadores dinâmicos no topo da tela que exibem a quantidade exata de solicitações "Pendentes" e "Concluídas" em tempo real.

## Tecnologias Utilizadas

**Back-end:**
- C# 
- .NET 8.0 (ASP.NET Core Web API)
- Entity Framework Core (Banco de dados em memória `InMemory` para facilitar os testes da avaliação)
- CORS configurado para integração com o Front-end.

**Front-end:**
- React (via Vite)
- JavaScript
- Hooks (`useState`, `useEffect`)
- Comunicação assíncrona com `fetch` API.

---

## Como executar o projeto localmente

### Pré-requisitos
Para rodar este projeto, você precisará ter instalado em sua máquina:
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)

### Passo 1: Rodando o Back-end (API)
1. Abra o terminal e navegue até a pasta do Back-end:
   ```bash
   cd Backend
   ```
2. Execute o projeto em C#:
  ```bash
   dotnet run
   ```
3. A API estará rodando em http://localhost:5175. (Deixe este terminal aberto).

### Passo 2: Rodando o Front-end (Interface)
1. Abra um novo terminal e navegue até a pasta do Front-end:
   ```bash
   cd Frontend
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do React:
   ```bash
   npm run dev
   ```

4. Acesse no seu navegador: http://localhost:5173.

## Autor
Desenvolvido por João Pedro de Sousa Silva.
