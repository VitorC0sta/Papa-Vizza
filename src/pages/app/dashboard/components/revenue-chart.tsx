import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card";
import colors from 'tailwindcss/colors';

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getDailyRevenueInPeriodResponse } from "@/api/get-daily-revenue-in-period";
import { Label } from "@/common/components/ui/label";
import { DateRangePicker } from "@/common/components/ui/date-range-picker";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";


export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })


  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () => getDailyRevenueInPeriodResponse(
      {
        from: dateRange?.from,
        to: dateRange?.to,
      }
    ),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map(chartItem => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {
          dailyRevenueInPeriod ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData} style={{ fontSize: 12 }}>
                <XAxis
                  dataKey={"date"}
                  tickLine={false}
                  axisLine={false}
                  dy={16}
                />

                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tickFormatter={(value: number) =>
                    value.toLocaleString('pt-Br', {
                      style: "currency",
                      currency: "BRL"
                    })
                  }
                />

                <CartesianGrid vertical={false} className="stroke-muted" />

                <Line type="linear" strokeWidth={2} dataKey="receipt" stroke={colors.orange['500']} />

              </LineChart>
            </ResponsiveContainer>

          ) : (
            <div className="flex h-[240] w-full items-center justify-center">
              <Loader2 className="h8 w-8 text-muted-foreground animate-spin" />
            </div>
          )
        }
      </CardContent>
    </Card>
  );
}