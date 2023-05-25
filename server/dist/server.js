"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const audits_1 = __importDefault(require("./routes/audits"));
const database_config_1 = __importDefault(require("./config/database.config"));
database_config_1.default.sync().then(() => {
    console.log("connect to db");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", users_1.default);
app.use("/audits", audits_1.default);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
//# sourceMappingURL=server.js.map