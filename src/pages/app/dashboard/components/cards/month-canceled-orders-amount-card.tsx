import { getMonthCanceledOrders } from "@/api/get-month-canceled-orders";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "../skeletons/metric-card-skeleton";

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrders } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrders,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
        <CardTitle className="text-base font-semibold ">Cancelamentos  (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {
          monthCanceledOrders ? (
            <>
              <span className="text-2xl font-bold tracking-tight">{monthCanceledOrders.amount.toLocaleString('pt-BR')}</span>
              <p className="text-xs text-muted-foreground">
                {
                  monthCanceledOrders.diffFromLastMonth <= 0 ?
                    (
                      <>
                        <span className="text-emerald-500 dark:text-emerald-400">{monthCanceledOrders.diffFromLastMonth}%</span> em relação ao mês passado
                      </>
                    ) :
                    (
                      <>
                        <span className="text-rose-500 dark:text-rose-400">+{monthCanceledOrders.diffFromLastMonth}%</span> em relação ao mês passado
                      </>
                    )
                }

              </p>
            </>
          ) : (
            <MetricCardSkeleton />
          )
        }

      </CardContent>
    </Card>
  );
}