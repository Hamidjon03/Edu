// server.js
const app = require("./app");
const seedAdmin = require("./utils/adminSeed");
const sequelize = require("./config/config");
const host = process.env.HOST || "localhost";
// Sync database (jadval avtomatik yaratiladi)
sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, host, async () => {
      console.log(`Server running on port http://${host}:${PORT}`);
      await seedAdmin();
    });
  })
  .catch((err) => console.error("Database sync failed:", err));
