import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardHeader, CardTitle, CardContent } from "@/common/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Loader2 } from "lucide-react";
import { ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from "recharts";
import colors from "tailwindcss/colors";

const COLORS = [
  colors.rose[500],
  colors.amber[500],
  colors.violet[500],
  colors.sky[500],
  colors.emerald[500]
]

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts
  })

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {
          popularProducts ?
            (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart style={{ fontSize: 12 }}>
                  <Pie
                    data={popularProducts}
                    dataKey="amount"
                    nameKey="product"
                    innerRadius={65}
                    outerRadius={86}
                    cx="50%"
                    cy="50%"
                    strokeWidth={8}
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180
                      const radius = 12 + innerRadius + (outerRadius - innerRadius)
                      const x = cx + radius * Math.cos(-midAngle * RADIAN)
                      const y = cy + radius * Math.sin(-midAngle * RADIAN)

                      return (
                        <text
                          x={x}
                          y={y}
                          className="fill-muted-foreground text-xs"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {popularProducts[index].product.length > 12
                            ? popularProducts[index].product.substring(0, 12).concat('...')
                            : popularProducts[index].product}{' '}
                          ({value})
                        </text>
                      )
                    }}
                  >
                    {popularProducts.map((_, index) => {
                      return <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80" />
                    })
                    }
                  </Pie>
                </PieChart>
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