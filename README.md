# HUB AFROPARCEIROS

Site institucional e e-commerce DNA Guetos desenvolvido com Next.js App Router.

## Executar localmente

```powershell
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Depois abra `http://localhost:3000`.

O catálogo, o blog, o envio de imagens e o checkout precisam das variáveis descritas abaixo.

## Publicar na Vercel

1. Importe o repositório `AllanXarope77/hubafroparceiros` na Vercel.
2. Mantenha o framework como **Next.js** e o diretório raiz como `./`.
3. Conecte uma base **Turso** pela área Storage/Marketplace da Vercel.
4. Crie um armazenamento **Vercel Blob público** para as imagens dos produtos.
5. Cadastre as variáveis de ambiente abaixo para Production, Preview e Development.
6. Faça um novo deploy depois de conectar os serviços.

A Vercel executará automaticamente `npm run build`. O projeto fixa Node.js 22 pelo `package.json`.

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública definitiva, por exemplo `https://seudominio.com.br` |
| `TURSO_DATABASE_URL` | Endereço da base libSQL/Turso |
| `TURSO_AUTH_TOKEN` | Token da base Turso |
| `BLOB_READ_WRITE_TOKEN` | Token criado ao conectar o Vercel Blob |
| `MERCADO_PAGO_ACCESS_TOKEN` | Credencial privada do checkout Mercado Pago |
| `LEGACY_PRODUCT_IMAGES_BASE_URL` | Opcional: endereço do site antigo para imagens salvas anteriormente |

Nunca envie os valores dessas variáveis para o GitHub. Arquivos `.env*` estão bloqueados pelo `.gitignore`.

## Persistência

- Produtos, pedidos e posts são armazenados no Turso.
- As tabelas são preparadas automaticamente no primeiro acesso.
- O catálogo inicial é carregado a partir dos dados já versionados no projeto.
- Novas imagens enviadas pelo editor são armazenadas no Vercel Blob.
- O checkout continua utilizando o Mercado Pago.

## Verificação

```powershell
npm.cmd run lint
npm.cmd run build
```

O build antigo do ambiente Sites foi mantido como `npm run build:sites`, mas o build padrão agora é o Next.js nativo esperado pela Vercel.

