"use client";

import { FC } from "react";
import { Game } from "@prisma/client";

import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Checkbox } from "@heroui/checkbox";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { addToast } from "@heroui/toast";

import { updateGame } from "@/actions/game/update";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGameSchema, type UpdateGameSchema } from "@/schemas/game/update";

type Props = {
  game: Game | null;
};

export const General: FC<Props> = ({ game }) => {
  const { register, handleSubmit, control, formState } = useForm<UpdateGameSchema>({
    mode: "onChange",
    resolver: zodResolver(updateGameSchema),
    defaultValues: {
      id: game?.id || "",
      name: game?.name || "",
      code: game?.code || "",
      category: game?.category || "",
      description: game?.description || "",
      has_server: game?.has_server,
      has_account: game?.has_account,
    },
  });

  async function onSubmit(data: UpdateGameSchema) {
    const response = await updateGame(data);

    if (response.success) {
      addToast({ title: "Berhasil", description: response.message, color: "success" });
    } else {
      addToast({ title: "Gagal", description: response.message, color: "danger" });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card fullWidth>
        <CardHeader>Informasi Umum</CardHeader>
        <Divider />
        <CardBody className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <Input {...register("name")} type="text" label="Nama Game" isRequired isDisabled={formState.isSubmitting} />
            <Input {...register("code")} type="text" label="Kode Game" isReadOnly isDisabled />
            <Controller
              name="category"
              control={control}
              render={({ field: { value, ...f } }) => (
                <Select {...f} isRequired selectedKeys={[value]} label="Kategori" isDisabled={formState.isSubmitting}>
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
          <div className="space-x-4">
            <Checkbox
              {...register("has_server")}
              defaultSelected={game?.has_server}
              isDisabled={formState.isSubmitting}
            >
              Punya Server
            </Checkbox>
            <Checkbox
              {...register("has_account")}
              defaultSelected={game?.has_account}
              isDisabled={formState.isSubmitting}
            >
              Punya Akun
            </Checkbox>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="justify-end">
          <Button isLoading={formState.isSubmitting} type="submit" color="primary">
            Update
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};
