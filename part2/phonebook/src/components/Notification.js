import React from "react";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  switch (type) {
    case "notification":
      return <div className="notification">{message}</div>;
    case "error":
      return <div className="error">{message}</div>;
    default:
  }
};

export default Notification;
