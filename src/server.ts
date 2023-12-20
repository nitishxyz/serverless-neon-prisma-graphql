import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// import schema from "./prisma/schema.prisma";
// import x from "../node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node";

// if (process.env.NODE_ENV !== "production") {
//   console.debug(schema, x);
// }

import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

const typeDefs = `#graphql
  type Query {
    fetchUsers: [User]
  }

  type User {
    id: Int!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    published: Boolean!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createDraft(title: String!, content: String!, authorEmail: String!): Post!
    publish(id: Int!): Post
  }
`;

const resolvers = {
  Query: {
    fetchUsers: async () => {
      const users = await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
      return users;
    },
  },
  Mutation: {
    // @ts-expect-error
    createUser: async (parent, args) => {
      const user = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
      return user;
    },
    // @ts-expect-error
    createDraft: async (parent, args) => {
      const post = await prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
        },
      });
      return post;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// This final export is important!

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
