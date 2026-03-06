import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: "Subject and message required" });
    }

    // fetch all subscribers
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("email");

    if (error) throw error;

    const emails = subscribers.map((s) => s.email);

    if (emails.length === 0) {
      return res.status(400).json({ error: "No subscribers found" });
    }

    await resend.emails.send({
      from: "Fantabrand Properties <news@fantabrandproperties.com>",
      to: emails,
      subject: subject,
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>${subject}</h2>
          <p>${message}</p>

          <br/>

          <p>
          Fantabrand Properties Limited
          </p>

          <a href="https://fantabrandproperties.com">
          Visit Website
          </a>
        </div>
      `
    });

    return res.status(200).json({ success: true });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: "Failed to send email"
    });

  }
}