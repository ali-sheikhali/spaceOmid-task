"use client";
import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function UsersTable({ users, onEdit, onDelete }) {
  const router = useRouter();

  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        header: "عملیات",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center">
            <button
              className=" text-white px-2 py-1 rounded cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row.original);
              }}
            >
              <MdOutlineEdit color="black" size={20} />
            </button>
            <button
              className="  text-white px-2 py-1 rounded cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row.original.id);
              }}
            >
              <FaRegTrashAlt color="red" />
            </button>
          </div>
        ),
      },
      {
        header: "آواتار",
        accessorFn: (row) => row?.avatar ?? "",
        cell: ({ getValue }) => (
          <div className="flex justify-center items-center">
            <img
              src={getValue()}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        ),
      },
      {
        header: "نام",
        accessorKey: "first_name",
      },
      {
        header: "نام خانوادگی",
        accessorKey: "last_name",
      },
      {
        header: "ایمیل",
        accessorKey: "email",
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border border-gray-400 mt-4 overflow-x-scroll sm:overflow-x-hidden overflow-y-hidden">
      <table className="min-w-full ">
        <thead className="bg-gray-200 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-center border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50"
              onClick={() => router.push(`/users/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 text-center border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
