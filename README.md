# Hub Afro

HUB digital multipágina para projetos culturais, educacionais e criativos.

## Estrutura

```text
hub-afro/
├── app/                    # Páginas e estilos globais
│   ├── blog/
│   ├── clube-do-livro/
│   ├── contato/
│   ├── loja/
│   ├── palestras/
│   └── podcast/
├── components/
│   ├── layout/             # Navbar, rodapé e estrutura geral
│   └── shared/             # Botões, títulos, animações e blocos reutilizáveis
├── content/                # Menus e conteúdo compartilhado
├── public/                 # Imagens, favicon e imagem social
├── tests/                  # Verificações das páginas publicadas
├── worker/                 # Entrada de publicação do site
└── .openai/                # Configuração de hospedagem
```

## Visualização local

Na pasta do projeto, execute:

```powershell
npm.cmd run dev
```

Depois abra `http://localhost:3000`.

## Verificação

```powershell
npm.cmd test
```

