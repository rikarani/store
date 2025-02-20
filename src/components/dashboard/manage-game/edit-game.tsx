"use client";

import { FC } from "react";
import { Game } from "@prisma/client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Checkbox } from "@heroui/checkbox";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Tab, Tabs } from "@heroui/tabs";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";

import { updateGame } from "@/actions/game/update";

type Props = {
  game: Game | null;
};

const schema = z
  .object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    category: z.string(),
    description: z.string().optional(),
    has_server: z.boolean(),
  })
  .required();

export const EditGame: FC<Props> = ({ game }) => {
  const { register, handleSubmit, control, formState } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      id: game?.id || "",
      name: game?.name || "",
      code: game?.code || "",
      category: game?.category || "",
      description: game?.description || "",
      has_server: game?.has_server,
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    const response = await updateGame(data);

    console.log({ response });
  }

  return (
    <Tabs aria-label="Edit Game" size="sm">
      <Tab key="general" title="General" className="w-full">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card fullWidth>
            <CardHeader>Informasi Umum</CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row">
                <Input
                  {...register("name")}
                  type="text"
                  label="Nama Game"
                  isRequired
                  isDisabled={formState.isSubmitting}
                />
                <Input {...register("code")} type="text" label="Kode Game" isReadOnly isDisabled />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { value, ...f } }) => (
                    <Select {...f} selectedKeys={[value]} label="Kategori" isDisabled={formState.isSubmitting}>
                      <SelectItem key="game">Game</SelectItem>
                      <SelectItem key="other">Other</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <Textarea
                {...register("description")}
                label="Deskripsi Game"
                placeholder="lorem ipsum dolor sit amet"
                isDisabled={formState.isSubmitting}
              />
              <Checkbox
                {...register("has_server")}
                defaultSelected={game?.has_server}
                isDisabled={formState.isSubmitting}
              >
                Punya Server
              </Checkbox>
            </CardBody>
            <Divider />
            <CardFooter className="justify-end">
              <Button isLoading={formState.isSubmitting} type="submit" color="primary">
                Update
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </Tab>
    </Tabs>
  );
};
