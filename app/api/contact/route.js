import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

export async function POST(req) {
  let client;
  try {
    const mongoUri = process.env.MONGODB_URI;
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL;

    if (!mongoUri || !resendApiKey || !toEmail) {
      return NextResponse.json(
        { error: "Server is not configured for contact submissions" },
        { status: 500 }
      );
    }

    client = new MongoClient(mongoUri);
    const resend = new Resend(resendApiKey);

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Save to DB
    await client.connect();
    const db = client.db("contactDB");
    await db.collection("messages").insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    // Send Email
    await resend.emails.send({
      from: "Avoire Concierge <onboarding@resend.dev>",
      to: toEmail,
      subject: `New Contact — ${subject || "General"}`,
      html: `
  <div style="background:#f3eadf;padding:40px 0;>
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#fffcf9;border:1px solid #dccab8;border-radius:14px;padding:40px;">
      
      <!-- Header -->
      <tr>
        <td style="text-align:center;padding-bottom:30px;">
          <h1 style="margin:0;font-size:28px;letter-spacing:6px;color:#1a1a1a;">
            AVOIRE
          </h1>
          <p style="margin:8px 0 0;color:#5a5a5a;font-size:12px;letter-spacing:2px;">
            CONTACT SUBMISSION
          </p>
        </td>
      </tr>

      <!-- Title -->
      <tr>
        <td style="padding-bottom:25px;">
          <h2 style="margin:0;color:#1a1a1a;font-weight:600;">
            New Client Message
          </h2>
        </td>
      </tr>

      <!-- Fields -->
      ${field("Name", name)}
      ${field("Email", email)}
      ${field("Subject", subject || "General")}
      ${field("Message", message, true)}

      <!-- Footer -->
      <tr>
        <td style="padding-top:35px;text-align:center;">
          <p style="font-size:11px;color:#5a5a5a;letter-spacing:2px;margin:0;">
            AVOIRE PARFUMERIE — CLIENT DESK
          </p>
        </td>
      </tr>

    </table>
  </div>
  `
    });

    function field(label, value, block = false) {
      return `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid #dccab8;">
      <span style="display:block;font-size:11px;letter-spacing:2px;color:#5a5a5a;margin-bottom:6px;">
        ${label.toUpperCase()}
      </span>
      <div style="color:#1a1a1a;font-size:15px;line-height:1.6;">
        ${block ? value.replace(/\n/g, "<br/>") : value}
      </div>
    </td>
  </tr>
  `;
    }
    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}