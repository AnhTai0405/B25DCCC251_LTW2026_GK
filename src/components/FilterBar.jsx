import React from 'react';

const FilterBar = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div>
      <label htmlFor="search-input">Tìm kiếm</label>
      <input 
        id="search-input"
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Tìm kiếm theo tên sự kiện" 
      />

      <label htmlFor="filter-select">Tình trạng</label>
      <select id="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="Tất cả">Tất cả</option>
        <option value="Còn chỗ">Còn chỗ</option>
        <option value="Đã đầy">Đã đầy</option>
      </select>
    </div>
  );
};

export default FilterBar;