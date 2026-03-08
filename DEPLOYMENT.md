# Rogue Workers Static Pages - Deployment Guide

This project is a React Single Page Application (SPA) built with Vite. It needs to be built into static files before being served by a web server. 

Because it uses client-side routing (`react-router-dom`), the web server must be configured to route all traffic to `index.html` to avoid 404 errors when users refresh or navigate directly to a subpage like `/login`.

---

## 1. Environment & Supabase Setup
Before building the project for production, you must provide your Supabase credentials and configure OAuth.

### Setting up the `.env` file
1. Create a file named `.env` in the root of the project directory (beside `package.json`).
2. Add your Supabase URL and Publishable Key:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
```
*(You can use the provided `.env.example` as a template).*

### Configuring Google OAuth in Supabase
To make the "Continue with Google" buttons work, you **must** link Google Auth to your Supabase project:
1. Go to your [Google Cloud Console](https://console.cloud.google.com/) and create OAuth 2.0 Client credentials. 
2. Get your **Client ID** and **Client Secret**.
3. In your Google Cloud Console, under "Authorized redirect URIs", add your Supabase project's redirect URL: `https://<project-id>.supabase.co/auth/v1/callback`
4. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
5. Navigate to **Authentication** -> **Providers**.
6. Enable the **Google** provider and paste in your Google Client ID and Client Secret.
7. Save the configuration. 

*If this is not configured, clicking the Google Login button on the frontend will result in an error or do nothing.*

---

## 2. Building the Project
Once your `.env` is configured, install the dependencies and build the application:

```bash
npm install
npm run build
```

The output will be placed in the `dist` folder. **These files inside `dist` are the only files you need to deploy.**

---

## 3. Server Configuration

### Option A: Nginx Configuration
If you are using Nginx to serve the site, you need to configure it to serve the `dist` directory and fall back to `index.html`.

Here is a sample virtual host configuration (e.g., `/etc/nginx/sites-available/rogueworkers`):

```nginx
server {
    listen 80;
    server_name www.yourdomain.com yourdomain.com;

    # The path where you copied your `dist` folder 
    root /var/www/rogueworkers/dist;
    
    # What file to look for
    index index.html;

    location / {
        # Try to serve the exact file, then a directory, else fallback to index.html
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets aggressively
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public";
    }
}
```

### Option B: Apache Configuration
If you are using Apache, you must enable the `mod_rewrite` module to handle the client-side routing.

1. Ensure the module is enabled: `sudo a2enmod rewrite`
2. Configure your Virtual Host (e.g., `/etc/apache2/sites-available/rogueworkers.conf`):

```apache
<VirtualHost *:80>
    ServerName www.yourdomain.com
    ServerAlias yourdomain.com
    
    # The path where you copied your `dist` folder
    DocumentRoot /var/www/rogueworkers/dist

    <Directory /var/www/rogueworkers/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Rewrite Rules for React Router (SPA fallback)
        RewriteEngine On
        # If the requested file or directory does not exist...
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        # ...then route to index.html
        RewriteRule . /index.html [L]
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Alternatively, if `AllowOverride All` is set, you can just place an `.htaccess` file directly inside the compiled `dist/` directory:

#### `dist/.htaccess`
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 4. Strategic Architecture: Why Supabase?
For a commercial application like Rogue Workers, relying on Supabase natively (rather than linking a custom backend database to external auth providers) offers massive strategic advantages for growth, cost, and data security:

### 1. Unified Authentication & Identity
By routing everything—including Google Auth—through Supabase, the platform maintains a single source of truth (`auth.users`). You don't have to build complex logic to merge accounts or track users across a custom backend and an external OAuth provider. Supabase handles the cryptographic verification of Google's tokens and instantly issues secure JWTs for your application. If you later want to add LinkedIn or GitHub login, it requires zero architecture changes.

### 2. Built-in Security & Data Protection (RLS)
Supabase utilizes PostgreSQL's native **Row Level Security (RLS)**. Because Supabase handles the authentication JWT, the database instantly knows *exactly* which user is making a query. This means you can write simple SQL rules preventing unauthorized access at the database level.

### 3. Preventing Data Scraping for Cheaper
A major threat to platforms like levels.fyi is automated scraping of proprietary salary data. 
*   Setting up a custom enterprise-grade API gateway to block scraping on a traditional architecture is expensive and complex. 
*   With Supabase, you can leverage native rate limiting, edge network protections, and strict RLS policies to ensure only verified, authenticated users can read sensitive salary records. You secure the data at the lowest possible level (the database) for a fraction of the cost of building a custom API fortress.

### 4. Speed to Market vs. Custom Infrastructure
Messing with a custom production database setup (e.g., raw RDS, ArgoCD, custom Express/Go APIs, Redis caching) costs thousands of dollars a month in DevOps time and absolute infrastructure costs. Supabase provides an enterprise-ready PostgreSQL instance, a real-time API, and an authentication server immediately out of the box. This allows the team to focus entirely on product features and data quality rather than backend plumbing, accelerating the path to commercial viability.
