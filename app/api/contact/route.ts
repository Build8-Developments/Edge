import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact Form: ${subject || "General Inquiry"} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #122D8B 0%, #1A4AFF 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #122D8B; width: 120px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #122D8B;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:${email}" style="color: #1A4AFF;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #122D8B;">Company:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${company}</td>
              </tr>
              ` : ""}
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #122D8B;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="tel:${phone}" style="color: #1A4AFF;">${phone}</a>
                </td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; color: #122D8B;">Subject:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${subject || "General Inquiry"}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px;">
              <h3 style="color: #122D8B; margin-bottom: 10px;">Message:</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1A4AFF;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          
          <div style="background: #122D8B; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">
              This email was sent from the Edge Garments website contact form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the customer
    const customerMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Thank you for contacting Edge Garments - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #122D8B 0%, #1A4AFF 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Dear <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for reaching out to Edge Garments. We have received your message and our team will get back to you within 24-48 business hours.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1A4AFF; margin: 20px 0;">
              <h3 style="color: #122D8B; margin: 0 0 15px 0;">Your Message Summary:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
              <p style="margin: 5px 0; color: #666; font-style: italic;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              In the meantime, feel free to explore our services or contact us directly:
            </p>
            
            <ul style="color: #333; line-height: 2;">
              <li>📞 Phone: <a href="tel:+201222493500" style="color: #1A4AFF;">+20 122 249 3500</a></li>
              <li>📧 Email: <a href="mailto:info@edgeforgarments.com" style="color: #1A4AFF;">info@edgeforgarments.com</a></li>
              <li>🌐 Website: <a href="https://edgeforgarments.com" style="color: #1A4AFF;">edgeforgarments.com</a></li>
            </ul>
          </div>
          
          <div style="background: #122D8B; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
              Edge Garments
            </p>
            <p style="color: #ccc; margin: 0; font-size: 12px;">
              Industrial Zone, South of Port Said | 58 Factories Complex, Factory No.65 & No.66
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(customerMailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
