import { ApolloServer } from "@apollo/server";
import schema from "./prisma/schema.prisma";
import x from "../node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node";
if (process.env.NODE_ENV !== "production") {
    console.debug(schema, x);
}
import { startServerAndCreateLambdaHandler, handlers, } from "@as-integrations/aws-lambda";
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => "world",
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
export const graphqlHandler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler());
//# sourceMappingURL=server.js.map