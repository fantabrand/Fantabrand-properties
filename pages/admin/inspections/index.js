import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import AdminLayout from "../../../components/admin/AdminLayout";
import styles from "../../../styles/AdminTable.module.css";

export default function Inspections() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const { data } = await supabase
      .from("inspections")
      .select("*")
      .order("created_at", { ascending: false });

    setRequests(data || []);
  }

  return (
    <AdminLayout>

      <h1>Inspection Requests</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </AdminLayout>
  );
}