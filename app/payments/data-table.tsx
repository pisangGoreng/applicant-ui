"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  applicantStatus: any;
  applicantRole: any;
}

const initialData = [
  { id: 1, name: "Alice", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", role: "User", status: "Inactive" },
  { id: 3, name: "Charlie", role: "Admin", status: "Active" },
  { id: 4, name: "David", role: "User", status: "Inactive" },
];

export function DataTable<TData, TValue>({
  columns,
  data,
  applicantStatus,
  applicantRole,
}: DataTableProps<TData, TValue>) {
  const [dataSelect, setDataSelect] = useState(initialData); // Table data state
  const [filter, setFilter] = useState(""); // Dropdown filter state

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleStatusFiltering = (value: string) => {
    table
      .getColumn("applicantStatus")
      ?.setFilterValue(value === "All" ? "" : value);
  };

  const handleRoleFiltering = (value: string) => {
    table
      .getColumn("applicantRole")
      ?.setFilterValue(value === "All" ? "" : value);
  };

  const handleRowClick = (applicantDetails: any) => {
    console.log("applicantDetails ", applicantDetails);
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />

        <Select onValueChange={(value) => handleStatusFiltering(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"All"}>All</SelectItem>
            {applicantStatus.map(
              ({ id, description }: { id: string; description: string }) => (
                <SelectItem key={id} value={description}>
                  {description}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleRoleFiltering(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"All"}>All</SelectItem>
            {applicantRole.map(
              ({ id, description }: { id: string; description: string }) => (
                <SelectItem key={id} value={description}>
                  {description}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
