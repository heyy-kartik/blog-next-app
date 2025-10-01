import { Resend } from "resend";

// Initialize Resend with error checking
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNewBlogNotification = async (blog, subscribers) => {
  try {
    // Validate inputs
    if (!blog || !subscribers || subscribers.length === 0) {
      throw new Error("Invalid blog data or no subscribers");
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    // Get base URL from environment or use localhost for development
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const emailData = {
      from: "Your Blog <noreply@yourdomain.com>", // Change this to your verified domain
      to: subscribers.map((sub) => sub.email),
      subject: `New Blog Post: ${blog.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Blog Post</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">🎉 New Blog Post Published!</h2>
            
            <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #3498db; margin-top: 0;">${blog.title}</h3>
              <p style="color: #555; font-size: 16px; margin: 15px 0;">${blog.description}</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${baseUrl}/blog/${blog._id}" 
                   style="background: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  📖 Read Full Article
                </a>
              </div>
            </div>
            
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #888; font-size: 12px;">
                You're receiving this because you subscribed to our blog updates.
                <br>
                <a href="${baseUrl}/unsubscribe?token={{unsubscribeToken}}" style="color: #888;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log("Sending email to:", subscribers.length, "subscribers");
    const result = await resend.emails.send(emailData);
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Test function to send a single email
export const sendTestEmail = async (testEmail) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    const emailData = {
      from: "Your Blog <noreply@yourdomain.com>",
      to: [testEmail],
      subject: "Test Email from Your Blog",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2> Email System Test</h2>
          <p>If you're reading this, your email system is working correctly!</p>
          <p>This is a test email sent from your blog application.</p>
        </div>
      `,
    };

    const result = await resend.emails.send(emailData);
    console.log("Test email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending test email:", error);
    throw error;
  }
};
