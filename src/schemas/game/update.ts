import { z } from "zod";

const updateGameSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  category: z.string(),
  description: z.string().optional(),
  has_server: z.boolean(),
  has_account: z.boolean(),
});

export { updateGameSchema };
export type UpdateGameSchema = z.infer<typeof updateGameSchema>;
