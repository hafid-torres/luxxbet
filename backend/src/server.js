import express from 'express';
import cors from 'cors';

// Criação do app Express
const app = express();
const PORT = 8080;

// Configuração CORS
app.use(cors({
  origin: 'http://localhost:3000', // endereço do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Permitir JSON no corpo das requisições
app.use(express.json());

// Rota de teste para o perfil
app.get('/api/profile', (req, res) => {
  // Normalmente aqui você pegaria os dados do usuário pelo JWT
  res.json({
    id: 1,
    username: "usuario_teste",
    email: "teste@luxxybet.com"
  });
});

// Rota de teste para transações
app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1, type: "deposit", amount: 100, status: "Concluído", date: "2025-09-02" },
    { id: 2, type: "withdraw", amount: 50, status: "Pendente", date: "2025-09-02" }
  ]);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
