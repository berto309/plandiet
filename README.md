# PlanDiet — Local Installation Guide

> Three-tier clinical nutrition platform · Laravel 11 · PHP 8.3 · React + InertiaJS · MySQL 8 · Laragon

---

## Contents

- [Prerequisites](#prerequisites)
- [1. Install Laragon](#1-install-laragon)
- [2. Configure Laragon for PHP 8.3 and MySQL 8](#2-configure-laragon-for-php-83-and-mysql-8)
- [3. Copy folder to root directory](#3-copy-folder-to-root-directory)
- [4. Install PHP dependencies](#4-install-php-dependencies)
- [5. Install Node dependencies and build assets](#5-install-node-dependencies-and-build-assets)
- [6. Environment setup](#6-environment-setup)
- [7. Database setup](#7-database-setup)
- [8. Configure the queue worker](#8-configure-the-queue-worker)
- [9. Verify everything works](#9-verify-everything-works)
- [10. Seed demo data](#10-seed-demo-data)
- [Daily workflow](#daily-workflow)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Windows | 10 or 11 | Laragon runs on Windows only |
| Laragon | 6.0+ | Full edition (includes Apache, MySQL, PHP) |
| PHP | 8.3 | Via Laragon — see step 2 |
| MySQL | 8.0 | Bundled with Laragon |
| Composer | 2.x | Bundled with Laragon |
| Node.js | 20 LTS | Download separately from nodejs.org |

---

## 1. Install Laragon

1. Download **Laragon Full** from [laragon.org/download](https://laragon.org/download/) (choose the `laragon-wamp.exe` full installer).
2. Run the installer — accept all defaults. Laragon installs to `C:\laragon` by default.
3. Launch **Laragon** from the Start menu or desktop shortcut.
4. Click **Start All** in the Laragon control panel. You should see Apache and MySQL turn green.
5. Visit `http://localhost` in your browser — you should see the Laragon welcome page.

> **Tip:** Right-click the Laragon system tray icon → **Preferences** → set the document root to `C:\laragon\www` if it is not already set.

---

## 2. Configure Laragon for PHP 8.3 and MySQL 8

### Switch to PHP 8.3

1. In Laragon, right-click the tray icon → **PHP** → **Version** → select **8.3.x** (if not listed, click **Add/Remove** to download it).
2. Click **Start All** again to apply the change.
3. Open a terminal (**Menu → Terminal** or press `Alt+T`) and confirm:

```bash
php -v
# Should output: PHP 8.3.x
```

### Enable required PHP extensions

1. In Laragon, right-click tray → **PHP** → **Extensions** and make sure these are enabled (ticked). These are usually enabled so you can skip this step:

```
php_pdo_mysql
php_mbstring
php_openssl
php_tokenizer
php_xml
php_ctype
php_fileinfo
php_bcmath
php_curl
php_zip
php_intl
```

2. Restart Laragon (**Stop All** then **Start All**) after enabling extensions.

### Confirm MySQL 8 is running

In the Laragon terminal:

```bash
mysql -u root -e "SELECT VERSION();"
# Should output: 8.x.x
```

If MySQL requires a password, the default Laragon root password is empty — just press Enter when prompted.

---

## 3. Copy folder to root directory
 - Copy the plandiet project folder containing the code.

 - Open Laragon, Click on Menu → Laragon → Root and paste the plandiet project folder in the **www** directory



Laragon automatically picks up any folder in `C:\laragon\www` and creates a virtual host for it. PlanDiet will be available at `http://plandiet.test` (Laragon uses `.test` by default).

> If the `.test` domain does not resolve, right-click the Laragon tray → **Preferences** → **Virtual Hosts** → set domain suffix to `test`, then click **Apply**.

---

## 4. Install PHP dependencies

Open command prompt and type `cd C:\laragon\www\plandiet` 

```bash
composer install
```

This installs all packages from `composer.json` including:

- `laravel/framework` 11.x
- `spatie/laravel-medialibrary` — Media management package
- `prism-php/prism` — AI SDK
- `laravel/tinker`, `laravel/pint`, `phpunit/phpunit`

> If Composer is not found, run `C:\laragon\bin\composer\composer.bat install` or add `C:\laragon\bin\composer` to your Windows PATH.

---

## 5. Install Node dependencies and build assets

```bash
# Install Node packages (React, InertiaJS, Tailwind, Vite)
npm install

# Build frontend assets for development
npm run dev
```

Keep `npm run dev` running in a separate terminal window while you develop — Vite will hot-reload when you change frontend files.

For a one-off production build (not needed for local development):

```bash
npm run build
```

---

## 6. Environment setup

### Copy the example file

```bash
cp .env.example .env
```

### Generate the application key

```bash
php artisan key:generate
```

### Edit `.env`

Open `.env` in any editor (VS Code, Notepad++) and set these values:

```env
# Application
APP_NAME="PlanDiet"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://plandiet.test

# Database — Laragon defaults
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=plandiet
DB_USERNAME=root
DB_PASSWORD=

# Queue — use database driver so the worker survives restarts
QUEUE_CONNECTION=database

# Google Gemini 
GEMINI_API_KEY=sk-ant-api03-your-key-here
GEMINI_MODEL="gemini-3.6-flash"
MEAL_MAX_TOKENS=4096
MEAL_CANDIDATES_PER_SLOT=5

# Media
MEDIA_DISK=public

# Mail (use Laragon's built-in MailHog for local testing)
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_FROM_ADDRESS="noreply@plandiet.test"
MAIL_FROM_NAME="PlanDiet"

# Session
SESSION_DRIVER=database
SESSION_LIFETIME=120
```

> **Where to get your Google Gemini API key:** Go to [aistudio.google.com](aistudio.google.com), go to **API Keys**, and create a new key. Paste it as the value of `GEMINI_API_KEY` in the .env file.

---

## 7. Database setup

### Create the database

Right-click the Laragon system tray icon → **Preferences** → set the document root to `C:\laragon\www` if it is not already set.

In the Laragon terminal:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS plandiet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Or open **phpMyAdmin** at `http://localhost/phpmyadmin`, log in as `root` (no password), and create a database named `plandiet`.

### Run migrations

```bash
php artisan migrate
```

This creates all tables: `users`, `practitioner_profiles`, `nutrition_rules`, `meal_plans`, `meal_plan_items`, `jobs` (for the queue), and more.

### Create the sessions and jobs tables

```bash
php artisan session:table
php artisan queue:table
php artisan migrate
```

---

## 8. Configure the queue worker

Sending of emails runs in the background via Laravel queues to avoid HTTP timeouts.

### For local development — run the worker manually

Open a **third terminal** (keep the first for general commands, the second running `npm run dev`) and run:

```bash
php artisan queue:work 
```



---

## 9. Verify everything works

Run through this checklist top to bottom:

```bash
# PHP version correct
php -v

# Laravel is working
php artisan about

# Database connection works
php artisan db:show

# All migrations ran
php artisan migrate:status

# Prism / AI SDK installed
php artisan tinker --execute="echo class_exists('Prism\Prism\Facades\Prism') ? 'Prism OK' : 'Prism missing';"



Visit `http://plandiet.test` in your browser. You should see the PlanDiet landing page.

---

## 10. Seed demo data

Run the seeders in this exact order (each seeder depends on the previous one):

```bash
# 1. Platform admin (Dr. Amir Hassan) and clinical rule templates
php artisan db:seed --class=SuperAdminSeeder
php artisan db:seed --class=RuleTemplateSeeder

# 2. Practitioners (Sarah Okonkwo, Dr. Amir as practitioner)
php artisan db:seed --class=PractitionerSeeder

# 3. All 127 demo clients
php artisan db:seed --class=ClientSeeder

# 4. Nutrition rules for all 127 clients
php artisan db:seed --class=NutritionRuleSeeder


Or run all seeders at once (if you have a `DatabaseSeeder` that calls them in order):

```bash
php artisan db:seed
```

### Demo login credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `admin@plandiet.com` | `123456` |
| Practitioner | `sarah@plandiet.com` | `123456` |
| Client | `fatima@plandiet.com` | `123456` |

---

## Daily workflow

Each time you sit down to develop:

**Terminal 1 — Vite (frontend hot reload):**
```bash
cd C:\laragon\www\plandiet
npm run dev
```


**Terminal 3 — Artisan commands as needed:**
```bash
cd C:\laragon\www\PlanDiet
php artisan migrate          # after adding a new migration
php artisan cache:clear      # if rules are not updating
php artisan config:clear     # after changing .env values
php artisan route:list       # to inspect registered routes
php artisan tinker           # interactive REPL
```

Make sure Laragon is running (**Start All** is green) before opening any of the terminals.

---

## Troubleshooting

### `http://plandiet.test` does not load

- Confirm Laragon is running and Apache is green.
- Right-click tray → **Preferences** → **Virtual Hosts** → domain suffix must be `test`.
- Right-click tray → **Apache** → **Reload** to pick up the new virtual host.
- If still failing, try `http://localhost/plandiet/public` as a fallback.

### `Class "PDO" not found` or database errors

- Ensure `php_pdo_mysql` is enabled in Laragon → PHP → Extensions.
- Restart Laragon after enabling it.

### `SQLSTATE[HY000] [1045] Access denied`

- Your `DB_PASSWORD` in `.env` does not match the MySQL root password.
- In Laragon the default root password is empty — set `DB_PASSWORD=` (nothing after the equals sign).

### Migrations fail with `Table 'plandiet.x' doesn't exist`

- Run `php artisan migrate:fresh` to reset and re-run all migrations from scratch. **This deletes all data.**



### `ANTHROPIC_API_KEY` errors / Prism exceptions

- Confirm the key is correct in `.env` — no trailing spaces or quotes.
- Run `php artisan config:clear` after editing `.env`.
- Test the key directly:
  ```bash
  php artisan tinker
  > \Prism\Prism\Facades\Prism::text()->using(\Prism\Prism\Enums\Provider::Gemini, 'gemini-3.6-flash')->withMaxTokens(10)->withPrompt('Say hi')->asText()->generate()->text
  ```

### Frontend changes not appearing

- Make sure `npm run dev` is still running.
- Hard refresh the browser (`Ctrl+Shift+R`) to bypass cached assets.
- If Vite shows errors, run `npm install` again and restart `npm run dev`.

### `php artisan queue:work` exits immediately

- Check that the `jobs` table exists: `php artisan migrate:status | findstr jobs`.
- If missing: `php artisan queue:table && php artisan migrate`.

---

