import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/client";
import AdminLayout from "../../../components/admin/AdminLayout";
import styles from "../../../styles/AdminTable.module.css";
import Link from "next/link";

export default function ManageProperties() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    setProperties(data || []);
  }

  async function deleteProperty(id) {
    await supabase.from("properties").delete().eq("id", id);
    fetchProperties();
  }

  return (
    <AdminLayout>

      <h1>Manage Properties</h1>

      <Link href="/admin/add-property" className={styles.addBtn}>
        + Add New Property
      </Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>₦{property.price}</td>
              <td>{property.location}</td>
              <td>

                <Link
                  href={`/admin/edit-property?id=${property.id}`}
                  className={styles.editBtn}
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProperty(property.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </AdminLayout>
  );
}