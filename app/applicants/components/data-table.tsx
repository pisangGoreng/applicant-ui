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
import { useAppDispatch } from "@/app/redux";
import { setSelectedApplicant } from "@/state/applicant";
import { ApplicantRoleAndStatusType, ApplicantsType } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  applicantStatus: ApplicantRoleAndStatusType[];
  applicantRole: ApplicantRoleAndStatusType[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  applicantStatus,
  applicantRole,
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
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

  const handleRowClick = (applicantDetails: ApplicantsType) => {
    dispatch(setSelectedApplicant(applicantDetails));
  };

  const filteringColumn = (
    value: string,
    columnName: "applicantStatus" | "applicantRole"
  ) => {
    table.getColumn(columnName)?.setFilterValue(value === "All" ? "" : value);
  };

  const PaginationSection = () => {
    return (
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
    );
  };

  const FilteringSection = () => {
    return (
      <div className="flex flex-row gap-2">
        <div>
          <p className="mb-2">Job Role</p>
          <Select
            onValueChange={(val) => filteringColumn(val, "applicantRole")}
          >
            <SelectTrigger className="w-48 ring-0 focus:ring-0">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"All"}>All</SelectItem>
              {applicantRole.map(
                ({ id, description }: ApplicantRoleAndStatusType) => (
                  <SelectItem key={id} value={description}>
                    {description}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-2">Status</p>
          <Select
            onValueChange={(val) => filteringColumn(val, "applicantStatus")}
          >
            <SelectTrigger className="w-48 ring-0 focus:ring-0">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"All"}>All</SelectItem>
              {applicantStatus.map(
                ({ id, description }: ApplicantRoleAndStatusType) => (
                  <SelectItem key={id} value={description}>
                    {description}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <FilteringSection />
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

          <PaginationSection />
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
                  onClick={() => handleRowClick(row.original as ApplicantsType)}
                  className="hover:bg-green-200"
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
