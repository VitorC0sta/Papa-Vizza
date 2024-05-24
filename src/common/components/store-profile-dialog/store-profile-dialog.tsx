import { getManagedRestaurant } from "@/api/get-managed";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";

export interface StoreProfileDialogProps {

}

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});
export function StoreProfileDialog(props: StoreProfileDialogProps) {
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })


  type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

  const {register, description} = useForm();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Perfil da loja
        </DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis a ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">Nome</Label>
            <Input className="col-span-3" id="name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">Descrição</Label>
            <Textarea className="col-span-3" id="description" />
          </div>

        </div>

        <DialogFooter>
          <Button variant="ghost" type="button">Cancelar</Button>
          <Button type="submit" variant="success">Salvar</Button>
        </DialogFooter>
      </form>

    </DialogContent>
  );
}