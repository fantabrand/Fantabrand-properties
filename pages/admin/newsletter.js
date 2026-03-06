import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import AdminLayout from "../../components/admin/AdminLayout";
import styles from "../../styles/AdminNewsletter.module.css";

export default function AdminNewsletter() {

  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function fetchSubscribers() {

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setSubscribers(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  function exportCSV() {

    const headers = ["Email", "Date Joined"];

    const rows = subscribers.map((s) => [
      s.email,
      new Date(s.created_at).toLocaleString(),
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");

    document.body.appendChild(link);

    link.click();
  }

  async function deleteSubscriber(id) {

    if (!confirm("Delete this subscriber?")) return;

    await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    fetchSubscribers();
  }

  async function sendAnnouncement() {

    if (!subject || !message) {
      alert("Please enter subject and message");
      return;
    }

    setSending(true);

    try {

      const res = await fetch("/api/send-announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject,
          message
        })
      });

      const data = await res.json();

      if (res.ok) {

        alert("Announcement sent to all subscribers!");

        setSubject("");
        setMessage("");

      } else {

        alert(data.error);

      }

    } catch (error) {

      alert("Error sending announcement");

    }

    setSending(false);
  }

  return (

    <AdminLayout>

      <div className={styles.container}>

        <h1>Newsletter Subscribers</h1>

        {/* EMAIL ANNOUNCEMENT BOX */}

        <div style={{marginBottom:"40px"}}>

          <h2>Send Estate Announcement</h2>

          <input
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e)=>setSubject(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px"
            }}
          />

          <textarea
            placeholder="Write announcement..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            rows="6"
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px"
            }}
          />

          <button
            onClick={sendAnnouncement}
            disabled={sending}
          >

            {sending ? "Sending..." : "Send Estate Announcement"}

          </button>

        </div>


        {/* ACTIONS */}

        <div className={styles.actions}>
          <button onClick={exportCSV}>
            Export CSV
          </button>
        </div>


        {/* SUBSCRIBERS TABLE */}

        {loading ? (

          <p>Loading subscribers...</p>

        ) : (

          <table className={styles.table}>

            <thead>

              <tr>
                <th>Email</th>
                <th>Date Joined</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {subscribers.map((sub) => (

                <tr key={sub.id}>

                  <td>{sub.email}</td>

                  <td>
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>

                  <td>

                    <button
                      className={styles.delete}
                      onClick={() => deleteSubscriber(sub.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </AdminLayout>

  );
}