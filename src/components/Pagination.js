import React from "react";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Pagination = ({ page, setPage, totalCharacters, itemsPerPage }) => {
  const totalPages = Math.ceil(totalCharacters / itemsPerPage);

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page > 2) {
        pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      } else {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <Box sx={{ pt: 12, pb: 10 }} display="flex" justifyContent="center">
      <HStack spacing={2}>
        <IconButton
          sx={{ borderRadius: "100%" }}
          icon={<ArrowBackIcon />}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        />
        {generatePageNumbers().map((pageNumber, index) =>
          typeof pageNumber === "number" ? (
            <Button
              key={index}
              onClick={() => handleClick(pageNumber)}
              isActive={page === pageNumber}
              variant={page === pageNumber ? "solid" : "outline"}
              colorScheme={page === pageNumber ? "blue" : "gray"}
              sx={{ borderRadius: "100%" }}
            >
              {pageNumber}
            </Button>
          ) : (
            <Button
              key={index}
              disabled
              variant="outline"
              sx={{ borderRadius: "100%" }}
            >
              {pageNumber}
            </Button>
          )
        )}
        <IconButton
          sx={{ borderRadius: "100%" }}
          icon={<ArrowForwardIcon />}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        />
      </HStack>
    </Box>
  );
};

export default Pagination;
