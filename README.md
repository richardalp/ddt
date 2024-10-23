# DDT Machine Management System

A comprehensive machine management system built with Laravel and Bootstrap.

## Setup Guide

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL or MariaDB
- Node.js and NPM

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ddt-machine-management
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure Database**
   - Create a new MySQL database
   - Update `.env` file with your database credentials:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

6. **Run Migrations**
   ```bash
   php artisan migrate
   ```

7. **Build Assets**
   ```bash
   npm run build
   ```

8. **Start the Server**
   ```bash
   php artisan serve
   ```

### Default Login Credentials
- Username: admin@example.com
- Password: password

### Production Deployment

1. **Server Requirements**
   - PHP 8.1+
   - MySQL/MariaDB
   - Nginx or Apache
   - SSL Certificate (recommended)

2. **Upload Files**
   - Upload all files to your web server
   - Set proper permissions:
     ```bash
     chmod -R 755 storage bootstrap/cache
     ```

3. **Environment Configuration**
   - Configure `.env` for production
   - Set `APP_ENV=production`
   - Set `APP_DEBUG=false`
   - Update database credentials

4. **Final Steps**
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Maintenance

- **Database Backup**
  ```bash
  php artisan backup:run
  ```

- **Clear Cache**
  ```bash
  php artisan cache:clear
  ```

- **Update Application**
  ```bash
  git pull
  composer install
  php artisan migrate
  npm install
  npm run build
  ```

### Security Considerations
- Keep Laravel and all packages updated
- Use strong passwords
- Enable HTTPS
- Regular backups
- Monitor logs

### Support
For support, please contact support@example.com