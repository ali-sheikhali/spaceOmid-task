import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  const rows = 5; // تعداد ردیف اسکلتون

  return (
    <table className="min-w-full border mt-4 animate-pulse">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="p-2 border">عملیات</th>
          <th className="p-2 border">آواتار</th>
          <th className="p-2 border">نام</th>
          <th className="p-2 border">نام خانوادگی</th>
          <th className="p-2 border">ایمیل</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="p-2 text-center border">
              <Skeleton className="h-6 w-20 rounded" />
            </td>
            <td className="p-2 text-center border">
              <Skeleton className="h-10 w-10 rounded-full" />
            </td>
            <td className="p-2 text-center border">
              <Skeleton className="h-6 w-24 rounded" />
            </td>
            <td className="p-2 text-center border">
              <Skeleton className="h-6 w-28 rounded" />
            </td>
            <td className="p-2 text-center border">
              <Skeleton className="h-6 w-40 rounded" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
