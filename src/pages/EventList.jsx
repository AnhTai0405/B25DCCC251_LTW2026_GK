import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import EventTable from '../components/EventTable';

const EventList = ({ events, loading, error, onRegister, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tất cả');

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  const filteredEvents = events.filter(ev => {
    const matchSearch = ev.name.toLowerCase().includes(search.toLowerCase());
    const isFull = ev.registered >= ev.capacity;
    let matchFilter = true;
    if (filter === 'Còn chỗ') matchFilter = !isFull;
    if (filter === 'Đã đầy') matchFilter = isFull;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <FilterBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <p>Tìm thấy {filteredEvents.length} sự kiện</p>
      {filteredEvents.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <EventTable events={filteredEvents} onRegister={onRegister} onDelete={onDelete} />
      )}
    </div>
  );
};

export default EventList;