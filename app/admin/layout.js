"use client";

import "./admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h2>Fantabrand Admin</h2>

        <nav>
          <a href="/admin">Dashboard</a>
          <a href="/admin/properties">Properties</a>
          <a href="/admin/properties/add">Add Property</a>
          <a href="/admin/inquiries">Inquiries</a>
          <a href="/">View Website</a>
        </nav>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
