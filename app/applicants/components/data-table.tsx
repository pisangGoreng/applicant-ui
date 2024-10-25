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
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setSelectedApplicant } from "@/state/applicant";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  applicantStatus: any;
  applicantRole: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  applicantStatus,
  applicantRole,
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const selectedApplicant = useAppSelector(
    ({ applicant }) => applicant.selectedApplicant
  );

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

  const handleFiltering = (
    value: string,
    type: "applicantStatus" | "applicantRole"
  ) => {
    table.getColumn(type)?.setFilterValue(value === "All" ? "" : value);
  };

  const handleRowClick = (applicantDetails: any) => {
    console.log("applicantDetails ", applicantDetails);
    dispatch(setSelectedApplicant(applicantDetails));
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex flex-row gap-2">
          <div>
            <p className="mb-2">Job Status</p>
            <Select
              onValueChange={(value) =>
                handleFiltering(value, "applicantStatus")
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"All"}>All</SelectItem>
                {applicantRole.map(
                  ({
                    id,
                    description,
                  }: {
                    id: string;
                    description: string;
                  }) => (
                    <SelectItem key={id} value={description}>
                      {description}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2">Job Role</p>
            <Select
              onValueChange={(value) => handleFiltering(value, "applicantRole")}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"All"}>All</SelectItem>
                {applicantStatus.map(
                  ({
                    id,
                    description,
                  }: {
                    id: string;
                    description: string;
                  }) => (
                    <SelectItem key={id} value={description}>
                      {description}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border min-h-fit">
        <div className="flex flex-row justify-between items-center px-2 ">
          <Input
            placeholder="Search name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm focus-visible:ring-offset-0 focus-visible:ring-0"
          />

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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
