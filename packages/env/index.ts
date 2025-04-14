import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    PORT: process.env.PORT,
  },
  emptyStringAsUndefined: true,
});
