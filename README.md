# Portal INEMA

Portal centralizado de acesso a cursos e plataformas educacionais do INEMA.

## WebMCP Origin Trial

- Cadastro oficial: https://developer.chrome.com/origintrials/#/view_trial/4163014905550602241
- Em 30/08/2026, a mesma conta cadastrou `https://www.inema.club`,
  `https://inema.pro` (com subdomínios) e `https://inema.vip` (com subdomínios).
- Os três tokens atuais expiram em 17/11/2026.
- O token do INEMA.club foi emitido para `https://www.inema.club` com
  Third-party matching e é entregue por `/api/webmcp-origin-trial/`.
- O valor fica em `.env.local`/Vercel e não deve ser commitado.

## 🚀 Características

- ✅ **100% HTML/CSS/JS puro** - Sem dependências
- ✅ **Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Busca em tempo real** - Filtre plataformas por nome, descrição ou tags
- ✅ **Design moderno** - Interface limpa e profissional
- ✅ **Pronto para GitHub Pages** - Deploy direto

## 📁 Estrutura do Projeto

```
Portal/
├── index.html      # Estrutura principal do portal
├── styles.css      # Estilos e design responsivo
├── data.js         # Dados dos cursos e plataformas
├── script.js       # Interatividade e funcionalidades
└── README.md       # Este arquivo
```

## 🎨 Personalização

### Editar Plataformas

Abra o arquivo `data.js` e edite o array `platformsData`:

```javascript
{
    id: 1,
    title: "Nome da Plataforma",
    description: "Descrição da plataforma...",
    icon: "📚",  // Emoji do card
    tags: ["Tag1", "Tag2", "Tag3"],
    url: "https://url-da-plataforma.com"
}
```

### Personalizar Cores

Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    /* ... outras cores */
}
```

## 🌐 Deploy no GitHub Pages

### Método 1: Usando a Interface Web

1. Crie um repositório no GitHub
2. Faça upload dos arquivos do portal
3. Vá em **Settings** > **Pages**
4. Em **Source**, selecione a branch `main` e a pasta `/root`
5. Clique em **Save**
6. Aguarde alguns minutos e acesse: `https://seu-usuario.github.io/nome-do-repo/`

### Método 2: Usando Git (Linha de Comando)

```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit: Portal INEMA"

# Adicionar remote
git remote add origin https://github.com/seu-usuario/nome-do-repo.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

Depois, ative o GitHub Pages nas configurações do repositório.

## 🔍 Funcionalidades

### Busca
- Digite no campo de busca para filtrar plataformas
- Pressione `/` para focar no campo de busca
- Pressione `ESC` para limpar a busca

### Cards Interativos
- Hover para efeito de elevação
- Clique para acessar a plataforma
- Tags coloridas para categorização

## 📱 Responsividade

O portal se adapta automaticamente a:
- 📱 **Mobile** (< 480px)
- 📱 **Tablet** (481px - 768px)
- 💻 **Desktop** (> 768px)

## 🛠️ Desenvolvimento Local

Para testar localmente, você pode:

1. **Abrir diretamente no navegador**
   - Basta abrir o arquivo `index.html` no navegador

2. **Usar um servidor local** (recomendado)
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve
   ```
   Depois acesse: `http://localhost:8000`

## ✨ Recursos Adicionais

### Adicionar Novas Plataformas via Console

Abra o console do navegador (F12) e use:

```javascript
PortalINEMA.addPlatform({
    id: 13,
    title: "Nova Plataforma",
    description: "Descrição...",
    icon: "🎯",
    tags: ["Nova", "Tag"],
    url: "#"
});
```

## 📄 Licença

Este projeto é de código aberto para uso educacional.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas!

---

**Portal INEMA** - Desenvolvido com ❤️ para educação

## Descoberta entre sistemas

Ver [docs/DESCOBERTA-ECOSSISTEMA.md](docs/DESCOBERTA-ECOSSISTEMA.md).
