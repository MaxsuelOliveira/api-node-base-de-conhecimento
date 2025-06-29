require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.clear();
  console.log(`[online] - http://localhost:${PORT}`);
  console.log(`[info]   - Acesse a documentação em http://localhost:${PORT}/api-docs`);
});
