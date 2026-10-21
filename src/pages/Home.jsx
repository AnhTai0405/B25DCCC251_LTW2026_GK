import React from 'react';

const Home = ({ events, loading, error }) => {
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  const totalEvents = events.length;
  const totalRegistered = events.reduce((sum, ev) => sum + ev.registered, 0);
  const fullEventsCount = events.reduce((count, ev) => count + (ev.registered >= ev.capacity ? 1 : 0), 0);

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <p>Tổng số sự kiện: {totalEvents}</p>
      <p>Tổng số lượt đăng ký: {totalRegistered}</p>
      <p>Số sự kiện đã đầy: {fullEventsCount}</p>
    </div>
  );
};

export default Home;