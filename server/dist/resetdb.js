"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("./config/database.config"));
database_config_1.default.sync({ force: true })
    .then(() => {
    console.log("Database reset complete.");
    process.exit(0); // Exit the script after synchronization
})
    .catch((error) => {
    console.error("An error occurred while resetting the database:", error);
    process.exit(1); // Exit the script with an error code
});
//# sourceMappingURL=resetdb.js.map