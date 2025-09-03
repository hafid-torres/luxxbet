// SpinnerOverlay.js
import React from "react";
import "./SpinnerOverlay.css";

function SpinnerOverlay({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default SpinnerOverlay;
