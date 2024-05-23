import { Helmet } from "react-helmet-async";
import { MonthRevenueCard } from "./components/cards/month-revenue-card";
import { MonthOrdersAmountCard } from "./components/cards/month-orders-amaunt-card copy";
import { DayOrdersAmountCard } from "./components/cards/day-orders-amount-card";
import { MonthCanceledOrdersAmountCard } from "./components/cards/month-canceled-orders-amount-card";
import { RevenueChart } from "./components/revenue-chart";
import { PopularProductsChart } from "./components/popular-products-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
