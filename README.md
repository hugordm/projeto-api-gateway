# 🌤️ Dashboard de Previsão do Tempo

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Endpoints da API](#endpoints-da-api)
- [Autor](#autor)

---

## 🎯 Visão Geral

Aplicação web que permite visualizar **informações meteorológicas em tempo real e verificar cotação de moeda** ao clicar em qualquer ponto do mapa. O projeto consome a API's públicas:
[OpenWeather](https://openweathermap.org/) para obter dados de temperatura, umidade e vento;
[Frankfurter](https://frankfurter.dev/) busca o histórico de valorização do dólar desde janeiro de 2026;
[ClaudeHaiku](https://www.anthropic.com/claude/haiku) para gerar uma frase de análise em português;

![Site](index.png)

## 🛠️ Tecnologias Utilizadas

### Gerenciamento
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
| **@anthropic-ai/sdk** | SDK oficial da API do Claude (Anthropic) |
| **ClaudeHaiku** | Cotação Moeda |
| **OpenWeather** | Dados meteorológicos |
| **OpenStreetMap** | Mapas interativos |


---

## 📁 Estrutura do Projeto

projeto-clima/
│
├── backend/
│ ├── controllers/
│ │ └── climaController.js 
│ ├── services/
│ │ └── climaService.js 
│ ├── routes/
│ │ └── climaRoutes.js 
│ ├── server.js 
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── CardClima.jsx # Componente principal
│ │ ├── services/
│ │ │ └── api.js # Configuração do Axios
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
└── README.md

## ✨ Funcionalidades

- ✅ **Mapa interativo** com Leaflet/OpenStreetMap
- ✅ Clique no mapa para buscar dados do clima
- ✅ Exibição de **temperatura, umidade e vento**
- ✅ Previsão para o **dia seguinte**
- ✅ **Indicação visual** do local selecionado
- ✅ **Layout responsivo** com Tailwind CSS
- ✅ **Integração com API** externa 
- ✅ **Arquitetura limpa** 

## 📋 Pré-requisitos

- Node.js (versão 16+)
- React
- Express
- Fetch/Axios (APIs externas)
- HTML/CSS
- API de alguma IA (Inteligência Artificial)

## 📡 Endpoints da API
| Método | Endpoint | Descrição |
|------------|------------|------------|
| **GET** | /dashboard | Busca dados do clima |
| **GET** | /historico | Busca dados do moeda |

## 📡 👨‍💻 Autores

![Site](/New%20prjeto%20Final/projeto-api-gateway/img/gabriel-abat.jpeg)
### Geovane Ramos
Linkedin: https://www.linkedin.com/in/geovane-ramos
### Gabriel Abat
Linkedin: https://www.linkedin.com/in/gabriel-abat

![Site](/New%20prjeto%20Final/projeto-api-gateway/img/geovane-ramos.jpeg)
### Geovane Ramos
Linkedin: https://www.linkedin.com/in/geovane-ramos

![Site](/New%20prjeto%20Final/projeto-api-gateway/img/hugo-correia.jpeg)
### Hugo Correia
Linkedin: www.linkedin.com/in/hugo-correia-silva-97-o6

![Site](/New%20prjeto%20Final/projeto-api-gateway/img/hugo-melo.jpeg)
### Hugo Melo
Linkedin: https://www.linkedin.com/in/hugo-melo-dev

