"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export function PaginationControls({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent>
          {/* قبلی */}
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.max(currentPage - 1, 1));
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            >
              قبلی
            </PaginationLink>
          </PaginationItem>

          {/* شماره صفحه فعلی */}
          <PaginationItem>
            <span className="px-4 py-2">{currentPage}</span>
          </PaginationItem>

          {/* بعدی */}
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                );
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            >
              بعدی
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
