# ⚡ Ecell Startup 3-Tier Web Application

Full-stack 3-tier web application built for **Ecell** electronics shop (selling Monitors, Cables, Desktops, HDDs, SSDs, Pendrives) and software solutions business (BIOS Flashing, OS Installation, Diagnostics).

---

## 🏗️ Architecture

1. **Frontend**: Vite + React 18 + Tailwind CSS + JavaScript (`frontend/`)
2. **Backend API**: Node.js + Express REST API (`backend/`)
3. **Database**: PostgreSQL 16 (`db/` + `postgres:16-alpine` Docker container)
4. **Containerization**: Docker Compose (`docker-compose.yml`)

---

## 🚀 How to Run Development Stack

Make sure you have [Docker](https://www.docker.com/) and Docker Compose installed.

```bash
# Navigate to project directory
cd /home/devshaik010/.gemini/antigravity/scratch/ecell-app

# Build and start all 3 tiers simultaneously
docker compose up --build
```

### Access Ports

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **PostgreSQL DB**: `localhost:5432` (`user: ecell_user`, `password: ecell_secret`, `db: ecell_db`)

---

## 📦 Features

- **Hardware Showcase**: Category filtering for Monitors, Cables, Desktops, HDDs, SSDs, and Pendrives with live search and specs breakdown.
- **Shopping Cart**: Interactive cart drawer with tax calculation and checkout flow.
- **Software Solutions Lab**: Service catalog & booking system for:
  - Motherboard BIOS & GPU VBIOS Flashing
  - Windows / Linux OS Installation & Chipset Driver Setup
  - System Diagnostics & Thermal Tuning
  - Low-Level Disk Formatting & Partitioning
- **Database Auto-Seeding**: PostgreSQL database automatically initializes tables and seeds inventory items on first start.


This is a new readme line