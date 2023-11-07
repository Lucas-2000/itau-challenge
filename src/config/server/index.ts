import { Elysia } from "elysia";
import { transactionRoutes } from "../../routes/transactionsRoutes.routes";
import swagger from "@elysiajs/swagger";

const app = new Elysia();

//app routes
app.use(transactionRoutes);

//plugins
app.use(
  swagger({
    path: "/v2/swagger",
  })
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
