// seoHelpers.js

// Escapa caracteres especiais para evitar XSS
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Gera as metatags SEO com base no artigo
function getSEOHeadTags(artigo) {
  const {
    titulo = "",
    descricao = "",
    imagem = "https://example.com/default-thumbnail.jpg",
    url = "",
    video,
  } = artigo;

  const safeTitulo = escapeHtml(titulo);
  const safeDescricao = escapeHtml(descricao);
  const safeUrl = escapeHtml(url);
  const safeThumb = escapeHtml(imagem);

  const isYouTube =
    typeof video === "string" &&
    (video.includes("youtube.com/watch") || video.includes("youtu.be/"));

  const isMP4 = typeof video === "string" && video.endsWith(".mp4");

  let metaTags = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitulo}</title>
    <meta name="description" content="${safeDescricao}" />
    <meta property="og:title" content="${safeTitulo}" />
    <meta property="og:description" content="${safeDescricao}" />
    <meta property="og:image" content="${safeThumb}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:type" content="article" />
    <link rel="canonical" href="${safeUrl}" />
  `;

  if (isYouTube) {
    const match = video.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    const youtubeId = match?.[1];
    if (youtubeId) {
      const embed = `https://www.youtube.com/embed/${youtubeId}`;
      const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
      const ytThumb = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

      metaTags += `
        <meta property="og:site_name" content="YouTube" />
        <meta property="og:url" content="${watchUrl}" />
        <meta property="og:image" content="${ytThumb}" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:video:url" content="${embed}" />
        <meta property="og:video:secure_url" content="${embed}" />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@youtube" />
        <meta name="twitter:title" content="${safeTitulo}" />
        <meta name="twitter:description" content="${safeDescricao}" />
        <meta name="twitter:image" content="${ytThumb}" />
        <meta name="twitter:player" content="${embed}" />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        <link rel="image_src" href="${ytThumb}" />
        <link rel="alternate" type="application/json+oembed" href="https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
          watchUrl
        )}" />
      `;
    }
  }

  if (isMP4) {
    metaTags += `
      <meta property="og:type" content="video.other" />
      <meta property="og:video" content="${video}" />
      <meta property="og:video:type" content="video/mp4" />
      <meta property="og:video:width" content="640" />
      <meta property="og:video:height" content="360" />
      <meta name="twitter:card" content="player" />
      <meta name="twitter:title" content="${safeTitulo}" />
      <meta name="twitter:description" content="${safeDescricao}" />
      <meta name="twitter:image" content="${safeThumb}" />
      <meta name="twitter:player" content="${video}" />
      <meta name="twitter:player:width" content="640" />
      <meta name="twitter:player:height" content="360" />
    `;
  }

  return metaTags;
}

// Template da página SEO com redirecionamento
function templateSeo(res, artigo) {
  const { url = "" } = artigo;
  const seoTags = getSEOHeadTags(artigo);

  const template = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        ${seoTags}
        <meta http-equiv="refresh" content="1; url=${escapeHtml(url)}" />
      </head>
      <body>
        <p>Redirecionando para <a href="${escapeHtml(url)}">${escapeHtml(url)}</a>...</p>
      </body>
    </html>
  `;

  return res.status(200).send(template);
}

// Página para artigo não encontrado
function notFound(res) {
  const titulo = "Conteúdo não encontrado";
  const descricao = "O conteúdo solicitado não existe ou foi removido.";
  const imagem = "https://example.com/notfound.png"; // thumbnail default
  const url = `https://codeia.com.br/artigo-nao-encontrado`;

  const fallbackSEO = `
    <meta charset="UTF-8" />
    <title>${escapeHtml(titulo)}</title>
    <meta name="description" content="${escapeHtml(descricao)}" />
    <meta property="og:title" content="${escapeHtml(titulo)}" />
    <meta property="og:description" content="${escapeHtml(descricao)}" />
    <meta property="og:image" content="${escapeHtml(imagem)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta http-equiv="refresh" content="2; url=${escapeHtml(url)}" />
  `;

  return res.status(404).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        ${fallbackSEO}
      </head>
      <body>
        <h1>404 - Artigo não encontrado</h1>
        <p>Você será redirecionado para nossa página inicial...</p>
      </body>
    </html>
  `);
}

export { templateSeo, getSEOHeadTags, notFound };
