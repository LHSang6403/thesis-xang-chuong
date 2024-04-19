"use client";

import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import { Banknote, HandCoins, MapPin, Map } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import { useQuery } from "@tanstack/react-query";
import formatCurrency from "@/utils/functions/formatCurrency";
import useDatePicker from "@/zustand/useDatePicker";
import { DateRangePicker } from "@components/Picker/RangeDate/DateRangePicker";
import formatDate from "@/utils/functions/formatDate";

export default function Dashboard() {
  const { from, to } = useDatePicker();

  // const { data: orders, isLoading: isOrdersLoading } = useQuery({
  //   queryKey: ["orders", from, to],
  //   queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
  //   staleTime: 1000 * 60 * 5,
  // });

  // const calculateTotalOrderPrice = (orders) => {
  //   return (
  //     orders?.data?.reduce((total, order) => total + order.total_price, 0) ?? 0
  //   );
  // };

  // const countOrdersByProvince = (orders) => {
  //   const ordersByProvince = {};

  //   orders?.data?.forEach((order) => {
  //     const { province } = order;
  //     ordersByProvince[province] = (ordersByProvince[province] || 0) + 1;
  //   });

  //   return ordersByProvince;
  // };

  // const hoChiMinhOrdersCount =
  //   countOrdersByProvince(orders)?.["Thành phố Hồ Chí Minh"] ?? 0;
  // const haNoiOrdersCount =
  //   countOrdersByProvince(orders)?.["Thành phố Hà Nội"] ?? 0;
  // const ordersByProvince = countOrdersByProvince(orders);

  // let maxOrdersProvince = "Không có";
  // let maxOrdersCount = 0;

  // for (const province in ordersByProvince) {
  //   if (ordersByProvince[province] > maxOrdersCount) {
  //     maxOrdersCount = ordersByProvince[province];
  //     maxOrdersProvince = province;
  //   }
  // }

  // const totalOrderPrice = calculateTotalOrderPrice(orders);

  return (
    <main className="flex w-full flex-col gap-4 px-4 pb-4 xl:col-span-3 sm:gap-2 sm:px-2 sm:pb-2 sm:pt-2">
      <div className="flex h-fit w-full flex-row items-center justify-between lg:flex-col lg:gap-2">
        <h1 className="font-medium">
          Data from {formatDate(from)} to {formatDate(to)}
        </h1>
        <div className="lg:w-full">
          <DateRangePicker showCompare={false} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1 sm:gap-2">
        <DataCard
          title="Total revenue"
          // data={formatCurrency(totalOrderPrice).toString()}
          data={"1,000,000,000"}
          previousData="Profit: 300,000,000"
          icon={<Banknote className="text-muted-foreground h-4 w-4" />}
          isLoading={false}
        />
        <DataCard
          title="Highest province"
          // data={maxOrdersCount.toString() + " đơn"}
          data={"1,000,000"}
          previousData={"Ho Chi Minh City"}
          icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
          isLoading={false}
        />
        <DataCard
          title="North side"
          // data={hoChiMinhOrdersCount.toString() + " đơn"}
          data={"1,000,000"}
          previousData="Total trips"
          icon={<MapPin className="text-muted-foreground h-4 w-4" />}
          isLoading={false}
        />
        <DataCard
          title="South side"
          // data={haNoiOrdersCount.toString() + " đơn"}
          data={"500,000"}
          previousData="Total trips"
          icon={<Map className="text-muted-foreground h-4 w-4" />}
          isLoading={false}
        />
      </div>
      <div className="">
        <RevenueBarChart />
      </div>
    </main>
  );
}
