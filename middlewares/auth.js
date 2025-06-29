const { verifyToken } = require("../utils/jwt");

// Middleware para autenticar qualquer usuário
async function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Cabeçalho de autorização ausente ou malformado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Erro na autenticação. Token inválido ou expirado." });
  }
}

// Middleware para verificar se é administrador
function is_admin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  if (req.user.is_admin !== true) {
    return res
      .status(403)
      .json({
        error: "Acesso negado. Privilégios de administrador são necessários.",
      });
  }

  next();
}

module.exports = { auth, is_admin };
