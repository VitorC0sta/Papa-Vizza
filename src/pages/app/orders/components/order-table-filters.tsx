import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const { register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    }
  });

  interface updateQueryParamsProps {
    state: URLSearchParams;
    key: "orderId" | "customerName" | "status";
    value?: string;
  }

  function updateQueryParams({ state, key, value }: updateQueryParamsProps): void {
    if (value) {
      state.set(key, value);
    } else {
      state.delete(key);
    }
  }

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      updateQueryParams({ state, key: "orderId", value: orderId });
      updateQueryParams({ state, key: "customerName", value: customerName });
      updateQueryParams({ state, key: "status", value: status });

      state.set('page', '1');

      return state
    })

  }
  
  function handleClearFilters() {
    const keys: Array<string> = ["orderId", "customerName", "status"];
    setSearchParams(state => {
      keys.forEach(key => {
        state.delete(key);
      })
      state.delete("page", "1");
      
      return state;
    })
    
    reset({
      orderId: "",
      customerName: "",
      status: "all"
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2" action="">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do pedido" className="h-8 w-auto" {...register('orderId')} />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register('customerName')} />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}>
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Saiu para entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4 mr-2" />
        Filtrar Resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Remover filtros
      </Button>
    </form>
  );
}