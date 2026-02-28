import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {

  const supabase = await createClient();


  /* ================= GET USER ================= */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/login");
  }


  /* ================= FETCH SAVED PROPERTIES ================= */

  const { data: savedProperties, error: savedError } = await supabase
    .from("saved_properties")
    .select(`
      id,
      properties (
        id,
        title,
        location,
        image_url
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (savedError) {
    console.error("Saved properties error:", savedError);
  }


  /* ================= FETCH INSPECTION REQUESTS ================= */

  const { data: inspections, error: inspectionError } = await supabase
    .from("inspection_requests")
    .select(`
      id,
      preferred_date,
      status,
      properties (
        id,
        title,
        location
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (inspectionError) {
    console.error("Inspection fetch error:", inspectionError);
  }


  return (

    <div style={{ padding: "40px", color: "#fff" }}>

      {/* ================= HEADER ================= */}

      <div style={{ marginBottom: "20px" }}>
        <LogoutButton />
      </div>


      {/* ================= SAVED PROPERTIES ================= */}

      <h2 style={{
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "15px"
      }}>
        Saved Properties ❤️
      </h2>

      {!savedProperties?.length && (
        <p style={{ color: "#aaa" }}>
          You have no saved properties yet.
        </p>
      )}

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "50px"
      }}>

        {savedProperties?.map((item) => {

          const property = item.properties;

          return (

            <div
              key={item.id}
              style={{
                width: "260px",
                background: "rgba(255,255,255,0.95)",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                backdropFilter: "blur(6px)"
              }}
            >

              {property?.image_url && (
                <img
                  src={property.image_url}
                  alt={property.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover"
                  }}
                />
              )}

              <div style={{ padding: "15px" }}>

                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111"
                }}>
                  {property?.title}
                </h3>

                <p style={{
                  color: "#444",
                  marginTop: "5px"
                }}>
                  📍 {property?.location}
                </p>

              </div>

            </div>

          );

        })}

      </div>


      {/* ================= INSPECTION REQUESTS ================= */}

      <h2 style={{
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "15px"
      }}>
        Inspection Requests 📅
      </h2>

      {!inspections?.length && (
        <p style={{ color: "#aaa" }}>
          You have no inspection bookings yet.
        </p>
      )}

      <div>

        {inspections?.map((inspection) => {

          const property = inspection.properties;

          return (

            <div
              key={inspection.id}
              style={{
                background: "rgba(255,255,255,0.95)",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "15px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                backdropFilter: "blur(6px)"
              }}
            >

              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111"
              }}>
                {property?.title}
              </h3>

              <p style={{
                color: "#444",
                marginTop: "5px"
              }}>
                📍 {property?.location}
              </p>

              <p style={{
                marginTop: "5px",
                color: "#333"
              }}>
                📅 {new Date(inspection.preferred_date).toLocaleDateString()}
              </p>

              <p style={{
                marginTop: "8px",
                fontWeight: "600",
                color:
                  inspection.status === "approved"
                    ? "#16a34a"
                    : inspection.status === "rejected"
                    ? "#dc2626"
                    : "#7c3aed"
              }}>
                Status: {inspection.status}
              </p>

            </div>

          );

        })}

      </div>


    </div>

  );

}