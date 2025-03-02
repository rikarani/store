import { z } from "zod";

const addFieldSchema = z.object({
  game_id: z.string().uuid().trim(),
  name: z.string().trim(),
  label: z.string().trim(),
  type: z.enum(["text", "dropdown"]),
});

export { addFieldSchema };
export type AddFieldSchema = z.infer<typeof addFieldSchema>;
