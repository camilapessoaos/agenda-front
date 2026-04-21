```markdown
# 📅 Agenda App - Frontend

Interface web para o aplicativo de agenda de contatos. Desenvolvido com HTML, CSS e JavaScript puro, com recursos de Progressive Web App (PWA).

## 🚀 Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- PWA (Service Worker + Web App Manifest)

## 📋 Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- **Opcional**: Servidor HTTP local (recomendado para testes com a API)

## 🔧 Como Executar

### Opção 1 - Execução direta (apenas visualização)

```bash
# Clone o repositório
git clone https://github.com/camilapessoaos/agenda-front.git

# Acesse a pasta
cd agenda-front

# Abra o arquivo index.html no seu navegador
Opção 2 - Com servidor local (recomendado)
bash
# Clone o repositório
git clone https://github.com/camilapessoaos/agenda-front.git

# Acesse a pasta
cd agenda-front

# Usando live-server (precisa do Node.js)
npx live-server .

# Ou usando Python (se tiver Python instalado)
python -m http.server 8000
Acesse http://localhost:8000 no navegador.

🔗 Configuração da API
O frontend precisa se comunicar com o backend (agenda-back). Verifique no arquivo app.js se as URLs das requisições estão apontando para o endpoint correto:

javascript
// Exemplo de configuração (ajuste conforme necessário)
const API_URL = 'http://localhost:3000/api';
Certifique-se de que o backend esteja rodando antes de utilizar o frontend.

📂 Estrutura do Projeto
text
agenda-front/
├── index.html           # Estrutura principal da página
├── style.css            # Estilos e layout da aplicação
├── app.js               # Lógica da aplicação (requisições API, manipulação do DOM)
├── manifest.json        # Configuração do PWA (ícone, nome, tema)
└── service-worker.js    # Service Worker para funcionamento offline e cache
📱 Progressive Web App (PWA)
Este frontend possui funcionalidades PWA:

Manifest.json: Permite instalar o app no dispositivo

Service Worker: Habilita cache e acesso offline parcial

Tema e ícones: Configuráveis via manifest

Para testar o PWA:

Acesse com Chrome/Edge

Clique no ícone de instalar na barra de endereço (ou menu)

O app será instalado como um aplicativo nativo

🎨 Funcionalidades
Listagem de contatos

Adicionar novo contato

Editar contato existente

Excluir contato

Interface responsiva

Suporte a PWA

🐛 Possíveis Problemas e Soluções
Problema	Solução
Frontend não carrega contatos	Verifique se o backend está rodando em http://localhost:3000
Erro de CORS	Configure o backend para aceitar requisições do frontend (ex: usando middleware cors)
Service Worker não registra	Acesse via HTTPS ou localhost (requerimento de segurança)
CSS não carrega	Verifique se o caminho do arquivo style.css está correto no index.html
🤝 Como Contribuir
Faça um fork do projeto

Crie uma branch (git checkout -b feature/melhoria)

Commit suas alterações (git commit -m 'Adiciona melhoria')

Push para a branch (git push origin feature/melhoria)

Abra um Pull Request

📝 Licença
Projeto educacional - livre para uso e modificação.

👩‍💻 Autora
Camilapessoaos - GitHub
