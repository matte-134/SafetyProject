import db from "./config/database.config";
db.sync({ force: true })
  .then(() => {
    console.log("Database reset complete.");
    process.exit(0); // Exit the script after synchronization
  })
  .catch((error) => {
    console.error("An error occurred while resetting the database:", error);
    process.exit(1); // Exit the script with an error code
  });
