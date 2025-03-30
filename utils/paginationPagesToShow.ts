type GetPagesToShowProps = {
  currentPage: number;
  totalPages: number;
};

const getPagesToShow = (props: GetPagesToShowProps) => {
  const { currentPage, totalPages } = props;
  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = 5;
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
    endPage = totalPages;
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};

export default getPagesToShow;
