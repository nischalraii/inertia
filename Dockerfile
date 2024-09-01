FROM php:8.3

# Install system dependencies and PHP extensions
RUN apt-get update -y && apt-get install -y \
    openssl \
    zip \
    unzip \
    git \
    nodejs \
    npm \
    && docker-php-ext-install pdo

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy the application code
COPY . /app

# Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Install Node.js dependencies and build assets
RUN npm install && npm run build

# Set proper permissions for the Laravel application

# Expose port 8181 and start the server
CMD php artisan serve --host=0.0.0.0 --port=8181
EXPOSE 8181
