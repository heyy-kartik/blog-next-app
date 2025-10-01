import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNewBlogNotification = async (blog, subscribers) => {
  try {
    const emailData = {
      from: "'Acme <onboarding@resend.dev>",
      to: subscribers.map((sub) => sub.email),
      subject: `New Blog Post: ${blog.title}`,
      html: `
        <h2>New Blog Post Published!</h2>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <a href="http://localhost:3000/blog/${blog._id}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Read More</a>
        <hr>
       
      `,
    };

    const result = await resend.emails.send(emailData);
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
export const sendTestEmail = async (testEmail) => {
  try {
    // Validate API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    // Validate email
    if (!testEmail || !testEmail.includes("@")) {
      throw new Error("Valid email address is required");
    }

    const emailData = {
      from: "Your Blog Test <noreply@yourdomain.com>",
      to: [testEmail],
      subject: "🧪 Test Email from Your Blog System",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Test Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
            <h2 style="color: #28a745;">✅ Email System Test Successful!</h2>
            <p style="font-size: 16px; color: #555;">
              Congratulations! Your email system is working correctly.
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff;">Test Details:</h3>
              <p><strong>Sent to:</strong> ${testEmail}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>System:</strong> Blog Email Notification System</p>
            </div>
            <p style="color: #666; font-size: 14px;">
              This is a test email to verify your email configuration is working properly.
            </p>
          </div>
        </body>
        </html>
      `,
    };

    console.log("Sending test email to:", testEmail);
    const result = await resend.emails.send(emailData);
    console.log("Test email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending test email:", error);
    throw new Error(`Failed to send test email: ${error.message}`);
  }
};
