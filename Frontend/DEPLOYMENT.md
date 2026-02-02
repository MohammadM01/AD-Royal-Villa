# Deployment Guide for adfarmsandresort.com

This guide provides step-by-step instructions for deploying the AD Farms & Resorts Royal Private Villa website to the domain **adfarmsandresort.com**.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Access to your domain registrar (for DNS configuration)
- Hosting platform account (Vercel, Netlify, or custom server)

## Build the Production Bundle

1. **Navigate to the Frontend directory**:

   ```bash
   cd "Z:\Project 4\AD-Royal-Villa\Frontend"
   ```

2. **Install dependencies** (if not already installed):

   ```bash
   npm install
   ```

3. **Build the production bundle**:

   ```bash
   npm run build
   ```

   This will create a `dist` folder containing the optimized production files.

4. **Preview the build locally** (optional):
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides seamless deployment for Vite/React applications with automatic SSL and CDN.

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy**:

   ```bash
   cd "Z:\Project 4\AD-Royal-Villa\Frontend"
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Configure custom domain**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Domains
   - Add `adfarmsandresort.com` and `www.adfarmsandresort.com`
   - Follow DNS configuration instructions

### Option 2: Netlify

1. **Install Netlify CLI**:

   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:

   ```bash
   cd "Z:\Project 4\AD-Royal-Villa\Frontend"
   netlify deploy --prod
   ```

3. **Configure custom domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `adfarmsandresort.com`
   - Follow DNS configuration instructions

### Option 3: Custom Server (Apache/Nginx)

1. **Build the project** (as shown above)

2. **Upload the `dist` folder** to your server:

   ```bash
   scp -r dist/* user@your-server:/var/www/adfarmsandresort.com/
   ```

3. **Configure your web server**:

   **For Nginx** (`/etc/nginx/sites-available/adfarmsandresort.com`):

   ```nginx
   server {
       listen 80;
       server_name adfarmsandresort.com www.adfarmsandresort.com;
       root /var/www/adfarmsandresort.com;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

   **For Apache** (`.htaccess` in the root directory):

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

4. **Set up SSL certificate** (using Let's Encrypt):
   ```bash
   sudo certbot --nginx -d adfarmsandresort.com -d www.adfarmsandresort.com
   ```

## DNS Configuration

Configure your DNS records at your domain registrar:

### For Vercel/Netlify:

- **A Record**: Point `@` to the IP provided by your hosting platform
- **CNAME Record**: Point `www` to your deployment URL

### For Custom Server:

- **A Record**: Point `@` to your server IP address
- **A Record**: Point `www` to your server IP address

**Example DNS Records**:

```
Type    Name    Value                   TTL
A       @       76.76.21.21            3600
A       www     76.76.21.21            3600
```

## Post-Deployment Verification

1. **Check favicon visibility**:
   - Visit https://adfarmsandresort.com
   - Verify the AD Farms favicon appears in the browser tab
   - Check on mobile devices (iOS Safari, Android Chrome)

2. **Test SEO meta tags**:
   - View page source and confirm all meta tags are present
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

3. **Performance check**:
   - Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - Use [GTmetrix](https://gtmetrix.com/)

4. **Cross-browser testing**:
   - Test on Chrome, Firefox, Safari, Edge
   - Verify mobile responsiveness

## Environment Variables (if needed)

If you need to add environment variables:

1. Create `.env.production` file:

   ```env
   VITE_API_URL=https://api.adfarmsandresort.com
   VITE_SITE_URL=https://adfarmsandresort.com
   ```

2. Access in your code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

## Troubleshooting

### Favicon not showing:

- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check browser console for 404 errors
- Verify all favicon files are in the `public` folder

### 404 errors on page refresh:

- Ensure your server is configured for SPA routing (see server configs above)
- Check that `try_files` or `.htaccess` rewrite rules are in place

### Build errors:

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check for TypeScript/ESLint errors: `npm run lint`

## Continuous Deployment (Optional)

Set up automatic deployments from Git:

1. **Push code to GitHub/GitLab**
2. **Connect repository to Vercel/Netlify**
3. **Configure automatic deployments**:
   - Production branch: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`

Every push to `main` will trigger an automatic deployment.

## Support

For deployment issues, contact your hosting provider's support or refer to:

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
