# User Drive - File Management System

**User Drive** is a web-based file management system that allows users to upload, store, and manage their files securely. It offers an easy-to-use interface, where users can upload and download files, organize their storage, and maintain privacy. It uses **Express.js** as the backend, **MongoDB** for database storage, and **EJS** for rendering dynamic views.

## Features

- **User Authentication**: Allows users to register, log in, and manage their accounts.
- **File Upload**: Securely upload and store files on the platform.
- **File Management**: Organize, download, and delete files from the user drive.
- **Secure Storage**: Files are stored with security measures, ensuring user privacy.
- **Responsive Design**: The platform is optimized for use on both desktop and mobile devices.
- **Social Media Sharing**: The platform supports Open Graph meta tags for social media sharing.

## Technologies Used

- **Node.js** and **Express.js**: Backend API and server.
- **MongoDB**: NoSQL database for storing user and file data.
- **EJS**: Templating engine to render dynamic HTML pages.
- **JWT (JSON Web Token)**: For user authentication and session management.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: For cloud storage of files (optional for production).
- **Flowbite** and **TailwindCSS**: For frontend styling and responsive design.
- **Remix Icons**: For UI icons.
- **dotenv**: For managing environment variables.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local or remote instance)
- **Git** (for version control)

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/user-drive.git
cd user-drive
