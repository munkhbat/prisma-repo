import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import i18n from "i18n";
import morgan from "morgan";
import path from "path";
import router from "./routes";
dotenv.config();
const { PORT, SERVICE_NAME } = process.env;

const app = express();

i18n.configure({
  locales: ["mn", "en"],
  defaultLocale: "mn",
  directory: path.join(__dirname, "/locales"),
  updateFiles: false,
  objectNotation: true,
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(i18n.init);

app.use(router);

app.get("/", (req, res) => {
  res.send(`hello! - ${SERVICE_NAME}`);
});

const server: http.Server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`listening on port for ${SERVICE_NAME}:${PORT}`);
});
