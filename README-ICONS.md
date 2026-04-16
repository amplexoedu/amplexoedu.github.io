Gerar ícones raster (PNG/WebP)

1) Instale dependências (Node.js + npm deve estar instalado):

```powershell
npm install
```

2) Gere os ícones a partir de `imgs/logo.svg`:

```powershell
npm run icons
```

Isso criará em `imgs/`:
- `icon-192.png`
- `icon-512.png`
- `icon-192.webp`
- `icon-512.webp`

O `manifest.json` já referencia esses arquivos.
