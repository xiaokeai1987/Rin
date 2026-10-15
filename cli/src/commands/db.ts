import { parseArgs } from "node:util";
import { fixTopField } from "../lib/db-migration";
import { runLocalDbMigrate } from "../tasks/db-migrate-local";

export async function runDbCommand(args: string[]) {
  const [subcommand] = args;
  const { values } = parseArgs({
    args: args.slice(1),
    options: {
      db: { type: "string", default: "rin" },
    },
    strict: false,
  });
  const dbName = (values.db as string) || "rin";

  if (subcommand === "migrate") {
    await runLocalDbMigrate(dbName);
    return;
  }

  if (subcommand === "fix-top-field") {
    await fixTopField("local", dbName);
    return;
  }

  console.log("Database commands:\n  小可爱 db migrate\n  小可爱 db fix-top-field");
}
