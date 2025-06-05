'use client';
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function UsersTable({ users, onEdit, onDelete }) {
  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        header: 'عملیات',
        accessorKey: 'actions',
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => onEdit(row.original)}
            >
              ویرایش
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => onDelete(row.original.id)}
            >
              حذف
            </button>
          </div>
        ),
      },
      {
        header: 'آواتار',
        accessorKey: 'avatar',
        cell: ({ getValue }) => (
          <img src={getValue()} alt="avatar" className="w-10 h-10 rounded-full" />
        ),
      },
      {
        header: 'نام',
        accessorKey: 'first_name',
      },
      {
        header: 'نام خانوادگی',
        accessorKey: 'last_name',
      },
      {
        header: 'ایمیل',
        accessorKey: 'email',
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
    <table className="min-w-full border mt-4">
      <thead className="bg-gray-200 text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2 text-center border">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 text-center border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
