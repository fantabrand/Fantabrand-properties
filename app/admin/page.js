import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"
import AdminInspectionActions from "@/components/AdminInspectionActions"

export default async function AdminPage() {

  const supabase = await createClient()


  /* ================= AUTH ================= */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) redirect("/login")

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  if (profileError || !profile || profile.role !== "admin") {
    redirect("/")
  }


  /* ================= FETCH INSPECTION REQUESTS ================= */

  const { data: inspections, error } = await supabase
  .from("inspection_requests")
  .select(`
    id,
    preferred_date,
    status,
    property_id,
    properties (
      id,
      title,
      location
    )
  `)
  .order("created_at", { ascending: false });

console.log("Inspection requests:", inspections);


  return (

    <div style={{ padding: "40px" }}>

      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Fantabrand Admin Dashboard
      </h1>

      <p style={{ marginTop: "10px", color: "#666" }}>
        Logged in as: {user.email}
      </p>

      <div style={{ marginTop: "20px" }}>
        <LogoutButton />
      </div>


      {/* ================= INSPECTION REQUESTS ================= */}

      <div style={{ marginTop: "50px" }}>

        <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
          Inspection Requests 📅
        </h2>

        {!inspections?.length && (
          <p style={{ marginTop: "15px" }}>
            No inspection requests yet.
          </p>
        )}

        <div style={{ marginTop: "20px" }}>

          {inspections?.map((inspection) => {

            const property = inspection.properties

            return (

              <div
                key={inspection.id}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                }}
              >

                <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                  {property?.title}
                </h3>

                <p style={{ color: "#555", marginTop: "5px" }}>
                  📍 {property?.location}
                </p>

                <p style={{ marginTop: "5px" }}>
                  📅 {inspection.preferred_date} {/* ✅ FIXED */}
                </p>

                <p style={{
                  marginTop: "5px",
                  fontWeight: "600",
                  color:
                    inspection.status === "approved"
                      ? "green"
                      : inspection.status === "rejected"
                      ? "red"
                      : "#6a0dad"
                }}>
                  Status: {inspection.status}
                </p>


                {/* ACTION BUTTONS */}
                <AdminInspectionActions
                  inspectionId={inspection.id}
                  currentStatus={inspection.status}
                />


              </div>

            )

          })}

        </div>

      </div>

    </div>

  )
}