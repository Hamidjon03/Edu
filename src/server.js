// server.js
const app = require('./app');
const { sequelize } = require('./models/index'); 
const host = process.env.HOST || 'localhost';
// Sync database (jadval avtomatik yaratiladi)
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, host, () => console.log(`Server running on port http://${host}:${PORT}`));
  })
  .catch(err => console.error('Database sync failed:', err));
