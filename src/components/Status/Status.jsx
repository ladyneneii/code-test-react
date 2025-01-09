import React from "react";

const Status = ({ status }) => {
  const statusColor = {
    upcoming: "info",
    success: "success",
    failed: "danger",
  };
  return (
    <div className={`launch__status launch__status--${statusColor[status]}`}>
      {status}
    </div>
  );
};

export default Status;
