import React from "react";

function Header({ title, subtitle }) {
  return (
    <header style={{ textAlign: "center", marginBottom: 20 }}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </header>
  );
}

export default Header;