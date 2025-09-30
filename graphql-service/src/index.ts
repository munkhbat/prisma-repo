import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";

// apollo plugins
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// apollo cache
import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import Keyv from "keyv";

// express
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
// import cookieParser from 'cookie-parser';
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";
import * as http from "http";
import i18n from "i18n";
import path from "path";

// local imports
import resolvers from "./data/resolvers";
import typeDefs from "./data/schemas";
import { contextDataSources } from "./dataSources";
import { authRoleDirective, authLoginDirective, getUser } from "./directives/index";
import { authTokenMiddleware, localeMiddleware } from "./middleware";

// routes
import routes from "./routes";

dotenv.config();
const { PORT } = process.env;

interface MyContext {
  token?: String;
}

const apolloServerStart = async (): Promise<void> => {
  const app = express();
  const httpServer = http.createServer(app);

  i18n.configure({
    locales: ["mn", "en"],
    defaultLocale: "mn",
    directory: path.join(__dirname, "/locales"),
    objectNotation: true,
  });

  const { authRoleDirectiveTransformer } = authRoleDirective("auth", getUser);
  const { authLoginDirectiveTransformer } = authLoginDirective("auth_login");

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  schema = authRoleDirectiveTransformer(schema);
  schema = authLoginDirectiveTransformer(schema);

  const server = new ApolloServer<MyContext>({
    schema,
    cache: new KeyvAdapter(new Keyv()),
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginCacheControl({
        defaultMaxAge: 1,
        calculateHttpHeaders: true,
      }),
    ],
    formatError: (formattedError: any, err: any) => {
      if (formattedError.extensions.code === "UNAUTHORIZED") {
        return {
          message: err.message,
        };
      }

      return formattedError;
    },
    validationRules: [depthLimit(7, { ignore: [/_trusted$/, "idontcare"] })],
  });
  await server.start();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // app.use(cookieParser());
  app.use(i18n.init);
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT"],
    }),
    expressMiddleware(server, {
      context: async ({ req }): Promise<object> => {
        // Run middleware in parallel for better performance
        const [user, lang] = await Promise.all([
          authTokenMiddleware(req),
          localeMiddleware(req),
        ]);

        const dataSources = await contextDataSources(user);

        return {
          user: user || null,
          lang,
          dataSources,
        };
      },
    })
  );

  // Routes
  app.use(routes);

  await new Promise((resolve: any) => {
    console.log(`🚀 Server ready at: localhost:${PORT}/graphql`);
    return httpServer.listen({ port: PORT }, resolve);
  });
};

apolloServerStart();
