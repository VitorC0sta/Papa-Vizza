export type OrderStatusType = "pending" | "canceled" | "processing" | "delivering" | "delivered";

export interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMap: Record<OrderStatusType, { text: string, color: string }> = {
  pending: { text: 'Pendente', color: 'bg-slate-400' },
  canceled: { text: 'Cancelado', color: 'bg-rose-500' },
  delivered: { text: 'Entregue', color: 'bg-emerald-500' },
  delivering: { text: 'Em entrega', color: 'bg-amber-500' },
  processing: { text: 'Em preparo', color: 'bg-amber-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  const { text, color } = orderStatusMap[status];

  return (
    <div className="flex items-center gap-2">
      <span data-testid="badge" className={`h-2 w-2 rounded-full ${color}`} />
      <span className="font-medium text-muted-foreground">{text}</span>
    </div>
  );
}