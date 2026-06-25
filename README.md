# 📊 Painel de Dados com Resumo Inteligente (BFF)

Projeto Final — Curso Full Stack | Soul Code + Accenture

Dashboard unificado que consome APIs externas de Clima e Cotação de Moedas,
com resumo gerado automaticamente por Inteligência Artificial (Anthropic Claude Haiku).

---

## 📌 Sobre o Projeto

O back-end funciona como um BFF (Backend for Frontend):
orquestra as chamadas às APIs externas em paralelo, solicita um
resumo em linguagem natural para a IA e entrega tudo
em um único endpoint para o front-end exibir.

Fluxo do projeto:
```
APIs Externas (Clima + Moedas)
        ↓
Back-end BFF (Node.js + Express) hospedado no Firebase
orquestra com Promise.all + chama Claude Haiku (Anthropic)
        ↓
Front-end React hospedado na Vercel
exibe o Dashboard unificado
```

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express (Back-end BFF)
- React + Vite (Front-end)
- Anthropic Claude Haiku (Geração de insights em linguagem natural)
- API de Clima: OpenWeatherMap (https://openweathermap.org/api)
- API de Moedas: Frankfurter (https://api.frankfurter.app) — sem necessidade de chave
- CORS (comunicação segura entre front-end e back-end)
- Firebase Cloud Functions (hospedagem do back-end)
- Vercel (hospedagem do front-end)

---

## ▶️ Como Instalar e Rodar Localmente

### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 1. Clonar o repositório
```bash
git clone https://github.com/hugordm/projeto-api-gateway
cd projeto-api-gateway
```

### 2. Configurar o Back-end
```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend/` com as chaves:
```
ANTHROPIC_API_KEY=sua_chave_aqui
CLIMA_API_KEY=sua_chave_da_openweathermap_aqui
```

> ⚠️ A API de Moedas (Frankfurter) é pública e **não exige chave de acesso**.

Inicie o servidor:
```bash
node app.js
```
O servidor vai rodar em: `http://localhost:8000`

### 3. Configurar o Front-end
Abra um novo terminal e execute:
```bash
cd frontend
npm install
npm run dev
```
O front-end vai rodar em: `http://localhost:5173`

---

## 🔗 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/dashboard | Retorna dados de clima, moedas e insight da IA |

### Exemplo de resposta:
```json
{
  "clima": {
    "cidade": "São Paulo",
    "temperatura": "20°C",
    "condicao": "Nublado"
  },
  "moeda": {
    "base": "USD",
    "BRL": 5.50,
    "EUR": 0.92
  },
  "insight": "Hoje está nublado em SP e o dólar subiu. Pode ser um bom momento para investir no mercado interno."
}
```

---

## ⚠️ Tratamento de Erros

O sistema foi desenvolvido para ser resiliente:
- Se a API de Clima falhar, o back-end ainda busca os dados de Moedas
- Se a API de Moedas falhar, o back-end ainda busca os dados de Clima
- Em ambos os casos, a IA gera o insight com os dados disponíveis
- O front-end exibe uma mensagem amigável caso algum dado esteja indisponível

---

## 🧪 Como Testar

### Testando com o Postman
1. Abra o Postman
2. Crie uma nova requisição GET
3. Digite a URL: `http://localhost:8000/api/dashboard`
4. Clique em Send
5. Verifique se o JSON de resposta contém clima, moeda e insight

### Simulando falha de API
1. Comente temporariamente a chamada da API de Clima no back-end
2. Repita a requisição no Postman
3. Verifique se o sistema ainda responde com moeda e insight parcial

---

## ☁️ Deploy (Produção)

### Back-end — Firebase Cloud Functions
O servidor está hospedado no Firebase e disponível em:
```
[URL a ser preenchida após o deploy]
```

### Front-end — Vercel
A interface está disponível publicamente em:
```
[URL a ser preenchida após o deploy]
```

> Para rodar localmente, siga as instruções da seção "Como Instalar e Rodar" acima.

---

## 🔒 Segurança

- O arquivo `.env` com as chaves das APIs **nunca é enviado para o GitHub**
- O `.gitignore` garante que dados sensíveis fiquem apenas na máquina local
- O CORS está configurado para aceitar requisições apenas do front-end React
- A API de Moedas (Frankfurter) é pública e não requer autenticação
- As chaves de API ficam apenas no back-end, **nunca expostas no front-end**

---

## 👥 Equipe

| Nome | Responsabilidade |
|------|-----------------|
| Hugo Melo | Back-end BFF (Node.js + Express + Claude Haiku) |
| Gabriel Abat | Front-end React (Estrutura e componentes) |
| Caio Henrique | Front-end React (Visual e estilização CSS) |
| Hugo Correia | Pesquisa e testes das APIs externas |
| Geovane Ramos | Integração, CORS e Documentação |
| Marian Lopes | Front-end React (Estrutura e visual) |

---

## 📁 Estrutura do Projeto

```
projeto-api-gateway/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── .env              ← NÃO vai para o GitHub
│   ├── .gitignore        ← protege o .env e node_modules
│   ├── routes/
│   │   └── dashboard.js
│   └── services/
│       ├── dashboardService.js
│       └── apiConfig.js
├── frontend/
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       └── components/
│           ├── Dashboard.jsx
│           ├── Banner.jsx
│           ├── CardClima.jsx
│           └── CardMoeda.jsx
└── README.md
```

---

Projeto Final · Curso Full Stack · Soul Code + Accenture · 2026