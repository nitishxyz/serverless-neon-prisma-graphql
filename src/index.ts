import { Elysia } from "elysia";
import { apollo, gql } from "@elysiajs/apollo";

const app = new Elysia()
  .use(
    apollo({
      typeDefs: gql`
        type Book {
          title: String
          author: String
        }

        type Query {
          books: [Book]
        }
      `,
      resolvers: {
        Query: {
          books: () => {
            return [
              {
                title: "Elysia",
                author: "saltyAom",
              },
            ];
          },
        },
      },
    })
  )
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
