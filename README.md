# 🌤️ Dashboard de Previsão do Tempo e Cotação de Moedas

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Fluxograma do projeto](#fluxograma-do-projeto)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Endpoints da API](#endpoints-da-api)
- [Tratamento de Erros](#tratameto-de-erros)
- [Como Instalar e Rodar Localmente](#como-instalar-e-rodar-localmente)
- [Como Testar](#como-testar)
- [Deploy (Produção)](#deploy-produção)
- [Segurança](#segurança)
- [Autores](#autores)



## 🎯 Visão Geral

Aplicação web que permite visualizar **informações meteorológicas em tempo real e verificar cotação de moeda** ao clicar em qualquer ponto do mapa. O projeto consome a API's públicas:
[OpenWeather](https://openweathermap.org/) para obter dados de temperatura, umidade e vento;
[Frankfurter](https://frankfurter.dev/) busca o histórico de valorização do dólar desde janeiro de 2026;
[ClaudeHaiku](https://www.anthropic.com/claude/haiku) para gerar uma frase de análise em português;

![Site](index.png)

## 🛠️ Tecnologias Utilizadas

### Gerenciamento do projeto
| Tecnologia | Finalidade |
|------------|------------|
| **GitHub** | Hospegadem de código |
| **Meet** | Reuniões por videochamada |
| **Trello** | Controle de atividades |

### Front-end
| Tecnologia | Finalidade |
|------------|------------|
| **Axios** | Requisições HTTP |
| **Framer-motion** | Biblioteca de animações |
| **Leaflet** | Biblioteca de mapas interativos |
| **Lucide-react** | Biblioteca de ícones |
| **React** | Biblioteca para construção da interface |
| **React-dom** | Conecta o React ao navegador |
| **React-Leaflet** | Integração do Leaflet com React |
| **React-router-dom** | Sistema de navegação entre páginas |
| **Recharts** | Biblioteca de gráficos |
| **Tailwind CSS** | Estilização utilitária |
| **Vite** | Build e dev server |

### Back-end
| Tecnologia | Finalidade |
|------------|------------|
| **Axios** | Requisições para APIs externas |
| **CORS** | Liberação de acesso entre domínios |
| **dotenv** | Gerencia variáveis de ambiente |
| **Express** | Framework para criação da API |
| **Node.js** | Ambiente de execução JavaScript |
| **Nodemon** | Recarregamento automático do servidor |


### APIs Externas
| API | Finalidade |
|-----|------------|
| **ClaudeHaiku** | Geração de insights em linguagem natural |
| **OpenWeather** | Dados meteorológicos |
| **Frankfurter** | Cotação de moedas |
| **OpenStreetMap** | Mapas interativos |

## 📡 Documentação URL
| Método | URL | Função |
|------------|------------|------------|
| 1	| open-meteo.com	| 🌤️ Clima por coordenadas
| 2	| openweathermap.org	| 🌤️ Clima por cidade
| 3	| openweathermap.org/geo	| 📍 Converter cidade em coordenadas
| 4	| brasilapi.com.br	| 📅 Feriados nacionais
| 5	| exchangerate-api.com	| 💰 Taxas de câmbio
| 6	| frankfurter.app	| 📈 Histórico de cotações
| 7	| localhost:8000/api/clima	| 🌤️ Clima do mapa
| 8	| localhost:8000/api/geocoding	| 📍 Geocodificação
| 9	| localhost:8000/api/historico	| 📈 Histórico de cotações
| 10 | localhost:8000/api/insight	| 🤖 Análise com IA
| 11 | localhost:8000/api/chat	| 💬 Chat com IA
| 12 | localhost:8000/api/dashboard	| 📊 Dados combinados

## 📁 Fluxograma do Projeto

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


## ✨ Funcionalidades

- ✅ **Mapa interativo** com Leaflet/OpenStreetMap
- ✅ Exibição de **temperatura, umidade e vento**
- ✅ Previsão para o **dia seguinte**
- ✅ **Indicação visual** do local selecionado
- ✅ **Layout responsivo** com Tailwind CSS
- ✅ **Integração com API** externa 
- ✅ **Arquitetura limpa** 
- ✅ **Insight gerado por IA** com análise do clima e câmbio em linguagem natural
- ✅ **Calendário integrado** para visualização de datas
- ✅ **Assistente de IA** para perguntas e análises em linguagem natural
- ✅ **Múltiplas moedas** disponíveis para consulta
- ✅ **Conversor de moedas** em tempo real


## 📋 Pré-requisitos

- Node.js (versão 16+)
- React
- Express
- Fetch/Axios (APIs externas)
- HTML/CSS
- API de alguma IA (Inteligência Artificial)

---

## 📡 Endpoints da API
| Método | Endpoint | Descrição |
|------------|------------|------------|
| **GET** | /api/dashboard | Busca dados do clima |
| **GET** | /api/historico | Busca dados do moeda |

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

## ⚠️ Tratamento de Erros

O sistema foi desenvolvido para ser resiliente:
- Se a API de Clima falhar, o back-end ainda busca os dados de Moedas
- Se a API de Moedas falhar, o back-end ainda busca os dados de Clima
- Em ambos os casos, a IA gera o insight com os dados disponíveis
- O front-end exibe uma mensagem amigável caso algum dado esteja indisponível

## ▶️ Como Instalar e Rodar Localmente

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



## ☁️ Deploy (Produção)

### Back-end — Render
O servidor está hospedado no Render e disponível em:
```
https://projeto-api-gateway.onrender.com
```

Endpoint principal:
```
https://projeto-api-gateway.onrender.com/api/dashboard?cidade=SaoPaulo&moeda=BRL
```

### Front-end — Vercel
A interface está disponível publicamente em:
```
https://projeto-api-gateway-topaz.vercel.app
```

> Para rodar localmente, siga as instruções da seção "Como Instalar e Rodar" acima.


## 🔒 Segurança

- O arquivo `.env` com as chaves das APIs **nunca é enviado para o GitHub**
- O `.gitignore` garante que dados sensíveis fiquem apenas na máquina local
- O CORS está configurado para aceitar requisições apenas do front-end React
- A API de Moedas (Frankfurter) é pública e não requer autenticação
- As chaves de API ficam apenas no back-end, **nunca expostas no front-end**


## 👨‍💻 Autores


<img src="./img/gabriel-abat.jpeg" width="250" height="300" style="border-radius: 15px" alt="Gabriel Abat"/>

### Gabriel Abat
Responsabilidade: Front-end React (Estrutura e componentes)

Linkedin: https://www.linkedin.com/in/gabriel-abat

---

<img src="./img/geovane-ramos.jpeg" width="250" height="300" style="border-radius: 15px" alt="Geovane Ramos"/>

### Geovane Ramos
Integração, CORS e Documentação

Linkedin: https://www.linkedin.com/in/geovane-ramos

---

<img src="./img/hugo-correia.jpeg" width="250" height="300" style="border-radius: 15px" alt="Hugo Correia"/>

### Hugo Correia
Pesquisa e testes das APIs externas

Linkedin: https://www.linkedin.com/in/hugo-correia-silva-97-o6

---

<img src="./img/hugo-melo.jpeg" width="250" height="300" style="border-radius: 15px" alt="Hugo Melo"/>

### Hugo Melo
Back-end BFF (Node.js + Express + Claude Haiku)

Linkedin: https://www.linkedin.com/in/hugo-melo-dev

---

<img src="./img/caio-henrique.jpeg" width="250" height="300" alt="Caio Henrique"/>

### Caio Henrique
Front-end React (Visual e estilização)

Linkedin: https://www.linkedin.com/in/caio-guedes-03a334270/

---

<img src="./img/marian-lopes.jpeg" width="250" height="300" alt="Marian Lopes"/>

### Marian Lopes
Front-end React (Estrutura e visual)

Linkedin: https://www.linkedin.com/in/marian-lopes-258ab0348

---
Projeto Final · Curso Full Stack · Soul Code + Accenture · 2026
