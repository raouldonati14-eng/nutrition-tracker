export default function Header({ title, subtitle }) {
  return (
    <header style={{ textAlign: "CENTER", marginBottom: 20 }}>
      <h1 style={{ fontSize: "2.5rem", margin: 0 }}>{title}</h1>
      {subtitle && (
        <p style={{ marginTop: 8, color: "#555" }}>{subtitle}</p>
      )}
    </header>
  );
}