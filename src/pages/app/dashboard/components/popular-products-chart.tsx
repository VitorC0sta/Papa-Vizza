import { Card, CardHeader, CardTitle, CardContent } from "@/common/components/ui/card";
import { BarChart } from "lucide-react";
import { ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import colors from "tailwindcss/colors";

export interface PopularProductsChartProps {

}

const data = [                                         //10³
  { product: "Pepperoni", amount: Math.floor(Math.random() * 20) },
  { product: "Mussarela", amount: Math.floor(Math.random() * 20) },
  { product: "4 Queijos", amount: Math.floor(Math.random() * 20) },
  { product: "Franbacon", amount: Math.floor(Math.random() * 20) },
  { product: "Lombinho", amount: Math.floor(Math.random() * 20) },
];

const COLORS = [
  colors.rose[500],
  colors.amber[500],
  colors.violet[500],
  colors.sky[500],
  colors.emerald[500]
]

export function PopularProductsChart(props: PopularProductsChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              innerRadius={65}
              outerRadius={86}
              cx="50%"
              cy="50%"
              strokeWidth={8}
            >
              {data.map((_, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80" />
              })
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}