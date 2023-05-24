import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface Props {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const ExpensePagination = ({
  totalPages,
  currentPage,
  handlePageChange,
}: Props) => {
  const [pageInputValue, setPageInputValue] = useState<number>(
    currentPage || 1
  );
  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      setPageInputValue(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      setPageInputValue(currentPage + 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.valueAsNumber);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let submittedPageNumber = pageInputValue;
    if (pageInputValue < 1) submittedPageNumber = 1;

    if (pageInputValue > totalPages) submittedPageNumber = totalPages;

    handlePageChange(submittedPageNumber);
    setPageInputValue(submittedPageNumber);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AiOutlineLeft
        className="page-form-button"
        onClick={handlePrevClick}
        disabled={currentPage <= 1}
      ></AiOutlineLeft>
      <span>Page: </span>
      <input
        className="page-form-input"
        type="number"
        value={pageInputValue}
        onChange={handleInputChange}
      ></input>
      <span>of {totalPages}</span>
      <AiOutlineRight
        className="page-form-button"
        onClick={handleNextClick}
        disabled={currentPage >= totalPages}
      ></AiOutlineRight>
    </form>
  );
};

export default ExpensePagination;
