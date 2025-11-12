import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Nút Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer px-3 py-2 rounded-md transition-colors duration-200",
                "hover:bg-gray-100 hover:text-black",
                page === 1 && "pointer-events-none opacity-50 hover:bg-transparent"
              )}
            />
          </PaginationItem>

          {/* Các nút số trang */}
          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => p !== page && handlePageChange(p)}
                  className={cn(
                    "cursor-pointer px-3 py-1 rounded-md transition-colors duration-200",
                    p === page
                      ? "bg-primary text-white" // trang đang active
                      : "hover:bg-gray-100 text-gray-800" // hover hiệu ứng
                  )}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Nút Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={cn(
                "cursor-pointer px-3 py-2 rounded-md transition-colors duration-200",
                "hover:bg-gray-100 hover:text-black",
                page === totalPages &&
                  "pointer-events-none opacity-50 hover:bg-transparent"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
