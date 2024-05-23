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


export interface RevenueChartProps {

}

const data = [                                         //10³
  { date: "10/12", revenue: Math.floor(Math.random() * 1e3) },
  { date: "11/12", revenue: Math.floor(Math.random() * 1e3) },
  { date: "12/12", revenue: Math.floor(Math.random() * 1e3) },
  { date: "13/12", revenue: Math.floor(Math.random() * 1e3) },
  { date: "14/12", revenue: Math.floor(Math.random() * 1e3) },
  { date: "15/12", revenue: Math.floor(Math.random() * 1e3) },
  { date: "16/12", revenue: Math.floor(Math.random() * 1e3) }
];

export function RevenueChart(props: RevenueChartProps) {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              dy={16}
            />violet

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

            <Line type="linear" strokeWidth={2} dataKey={"revenue"} stroke={colors.orange['500']} />

          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}