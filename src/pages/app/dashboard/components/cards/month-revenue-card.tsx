import { Card, CardHeader, CardTitle, CardContent } from "@/common/components/ui/card";
import { DollarSign } from "lucide-react";

export interface MonthRevenueCardProps {

}

export function MonthRevenueCard(props: MonthRevenueCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
        <CardTitle className="text-base font-semibold ">Receita total  (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 1228,78</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span> em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}