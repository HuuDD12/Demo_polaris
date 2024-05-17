import React from 'react';

interface PaginationProps {
    page: number; // Xác định rõ kiểu dữ liệu của 'page' là number
    totalPage: number;
  }
const PaginationCommon: React.FC<PaginationProps> = ({ page, totalPage }) => {
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
  return (
    <div className="flex items-center h-auto w-full">
        {pages.map((pageNumber) => (
            <button
              onClick={() => {/* Xử lý khi nhấp vào một trang cụ thể */}}
              className={` px-3 py-1 ml-1 border ${page === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
              {pageNumber}
            </button>
        ))}
    </div>
  );
};

export default PaginationCommon;
