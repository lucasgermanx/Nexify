import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ paginationCount, onPageChange }:any) => {
 const [activeItem, setActiveItem] = useState(1);

  const handlePageChange = (pageNumber:number) => {
    setActiveItem(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <Pagination>
      {Array.from({ length: paginationCount }, (_, index) => (
        <Pagination.Item active={index + 1 === activeItem} key={index + 1} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;
