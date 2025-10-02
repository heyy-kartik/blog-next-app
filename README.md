# Blog App - Next.js

This is a **Next.js** project for a blog application, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Features

- **Dynamic Blog Pages**: Create, read, update, and delete blog posts.
- **Email Subscriptions**: Users can subscribe to receive updates on new blog posts.
- **Admin Dashboard**: Manage blogs, subscriptions, and other data.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **MongoDB Integration**: Data is stored in MongoDB using Mongoose.
- **Clerk Authentication**: Secure user authentication and sign-in.

---

## 🗂️ Project Structure

```plaintext
├── src/
│   ├── app/
│   │   ├── admin/                # Admin dashboard pages
│   │   │   ├── addProduct/       # Add new blog page
│   │   │   ├── bloglist/         # List of blogs
│   │   │   ├── subscription/     # Manage subscriptions
│   │   └── api/                  # API routes
│   │       ├── blog/             # Blog-related APIs
│   │       ├── subscription/     # Subscription-related APIs
│   │       └── test-email/       # Test email API
│   ├── components/               # Reusable components
│   │   ├── Header.tsx            # Header component
│   │   ├── app-sidebar.tsx       # Sidebar for admin
│   │   └── toggle-dark.tsx       # Dark mode toggle
│   ├── lib/                      # Utility libraries
│   │   ├── config/               # Configuration files
│   │   │   └── db.js             # MongoDB connection
│   │   ├── models/               # Mongoose models
│   │   │   ├── blogModel.js      # Blog schema
│   │   │   └── subscriptionModel.js # Subscription schema
│   │   └── email.js              # Email utility functions
│   └── styles/                   # Global styles
├── public/                       # Public assets
│   ├── backgroundBlog.jpg        # Background image for sign-in page
│   └── favicon.ico               # Favicon
├── .env                          # Environment variables
└── [README.md](http://_vscodecontentref_/1)  

---

<hr>
 # Project documentation

🛠️ Getting Started
1. Install Dependencies
Run the following command to install all required dependencies:

2. Set Up Environment Variables
Create a .env.local file in the root directory and add the following:

MONGO_URL=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
3. Run the Development Server
Start the development server:

npm run dev

Open http://localhost:3000 in your browser to view the app.

📦 Features Overview
Blog Management
Add, edit, and delete blogs via the admin dashboard.
View all blogs on the homepage.
Email Subscriptions
Users can subscribe to receive updates.
Admin can manage subscriptions and export subscriber emails.
Authentication
Secure sign-in and sign-up using Clerk.
Dark Mode
Toggle between light and dark themes for better user experience.
📧 Email Notifications
This project uses Resend for sending email notifications. Ensure you have a valid RESEND_API_KEY in your .env.local file.

🛡️ Security
Environment Variables: Sensitive data like API keys and database URLs are stored in .env.local.
Validation: Email and form inputs are validated on both frontend and backend.
Authentication: User authentication is handled securely using Clerk.
🖼️ Screenshots
1. Homepage
<img alt="Homepage" src="https://via.placeholder.com/800x400?text=Homepage+Screenshot">

2. Admin Dashboard
<img alt="Admin Dashboard" src="https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot">

3. Email Subscriptions
<img alt="Subscriptions" src="https://via.placeholder.com/800x400?text=Subscriptions+Screenshot">

📚 Learn More
To learn more about the tools and technologies used in this project, check out the following resources:

Next.js Documentation
MongoDB Documentation
Resend Documentation
Clerk Documentation
🚀 Deployment
The easiest way to deploy your Next.js app is to use Vercel. Follow these steps:

Push your code to a GitHub repository.
Connect your repository to Vercel.
Add your environment variables in the Vercel dashboard.
Deploy your app with one click!