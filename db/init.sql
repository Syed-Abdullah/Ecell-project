-- Ecell Database Initialization Script

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    specs JSONB DEFAULT '{}',
    image_url TEXT,
    badge VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price_estimate NUMERIC(10, 2) NOT NULL,
    turnaround_time VARCHAR(100),
    description TEXT,
    features JSONB DEFAULT '[]',
    icon_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_requests (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    service_type VARCHAR(255) NOT NULL,
    device_details TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Products
INSERT INTO products (name, category, price, stock, description, specs, image_url, badge) VALUES
('UltraVision 27" 4K IPS Monitor', 'Monitors', 299.99, 12, 'Crisp 4K UHD display with 144Hz refresh rate, HDR400, and ultra-thin bezels.', '{"Resolution": "3840x2160", "Refresh Rate": "144Hz", "Panel": "IPS", "Response Time": "1ms"}', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', 'Bestseller'),
('ProCurve 34" Ultrawide Gaming Monitor', 'Monitors', 449.99, 5, 'Immersive 1500R curved display with Quantum Dot color and FreeSync Premium.', '{"Resolution": "3440x1440", "Refresh Rate": "165Hz", "Curve": "1500R", "Panel": "VA"}', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60', 'New'),
('HyperSpeed HDMI 2.1 Cable (2m)', 'Cables', 14.99, 50, 'Supports 8K@60Hz and 4K@120Hz with 48Gbps bandwidth and braided nylon casing.', '{"Length": "2 meters", "Standard": "HDMI 2.1", "Bandwidth": "48 Gbps", "Material": "Braided Nylon"}', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60', 'Popular'),
('Braided DisplayPort 1.4 Cable (3m)', 'Cables', 18.99, 35, 'Gold-plated connectors supporting up to 32.4 Gbps bandwidth and HBR3 audio/video.', '{"Length": "3 meters", "Standard": "DisplayPort 1.4", "Resolution": "8K UHD"}', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60', NULL),
('Ecell Titan Pro Gaming Desktop', 'Desktop', 1299.99, 4, 'Intel Core i7-13700K, RTX 4070 12GB, 32GB DDR5 RAM, 1TB NVMe Gen4 SSD.', '{"CPU": "i7-13700K", "GPU": "RTX 4070", "RAM": "32GB DDR5", "Storage": "1TB NVMe"}', 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60', 'Top Performance'),
('Ecell WorkStation Silent Tower', 'Desktop', 899.99, 6, 'AMD Ryzen 7 5700G, 16GB RAM, 512GB NVMe + 2TB HDD, Sound-dampened chassis.', '{"CPU": "Ryzen 7 5700G", "RAM": "16GB DDR4", "Storage": "512GB SSD + 2TB HDD"}', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=60', 'Office Choice'),
('Seagate IronWolf 4TB NAS Hard Drive', 'HDD', 94.99, 20, '7200 RPM enterprise-grade 3.5-inch SATA HDD optimized for 24/7 NAS performance.', '{"Capacity": "4TB", "Speed": "7200 RPM", "Interface": "SATA 6Gb/s", "Cache": "256MB"}', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', NULL),
('Western Digital Red Pro 8TB HDD', 'HDD', 189.99, 10, 'High-capacity storage designed for heavy multi-user workload environments.', '{"Capacity": "8TB", "Speed": "7200 RPM", "Interface": "SATA 6Gb/s", "Cache": "256MB"}', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', NULL),
('Samsung 990 PRO 2TB NVMe M.2 SSD', 'SSD', 169.99, 25, 'PCIe 4.0 NVMe SSD reaching lightning read speeds up to 7450 MB/s with heatsink.', '{"Capacity": "2TB", "Read Speed": "7450 MB/s", "Write Speed": "6900 MB/s", "Form Factor": "M.2 2280"}', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', 'High Speed'),
('Crucial BX500 1TB 2.5" SATA SSD', 'SSD', 64.99, 30, 'Reliable 2.5-inch SATA SSD upgrade for desktop computers and laptops.', '{"Capacity": "1TB", "Read Speed": "540 MB/s", "Interface": "SATA III"}', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60', 'Budget Pick'),
('SanDisk Extreme PRO 128GB USB 3.2 Pendrive', 'Pendrives', 29.99, 40, 'Solid state USB flash drive performance with read speeds up to 420MB/s in durable metal case.', '{"Capacity": "128GB", "Interface": "USB 3.2 Gen 1", "Read Speed": "420 MB/s"}', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60', NULL),
('Kingston DataTraveler 64GB Metal Drive', 'Pendrives', 12.99, 60, 'Capless, ultra-compact zinc die-cast housing with fast USB 3.2 Gen 1 transfers.', '{"Capacity": "64GB", "Interface": "USB 3.2", "Body": "Zinc Metal"}', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60', NULL);

-- Seed Software Services
INSERT INTO services (title, category, price_estimate, turnaround_time, description, features, icon_name) VALUES
('BIOS & Firmware Flashing', 'Software Solutions', 25.00, 'Same Day (2-4 hrs)', 'Professional EEPROM & SPI motherboard BIOS flashing, corrupt firmware recovery, and CPU upgrade preparation.', '["Motherboard BIOS update & recovery", "GPU VBIOS flashing", "Router/Modem firmware customization", "Brick recovery via SPI programmer"]', 'Zap'),
('OS Installation & Drivers', 'Software Solutions', 35.00, 'Same Day (2-3 hrs)', 'Complete clean installation of Windows 11/10 or Linux distributions with full chip-set driver optimization.', '["Clean OS Installation & Activation", "Motherboard, GPU & Audio drivers setup", "Essential utility suite installation", "Debloating & performance tuning"]', 'Cpu'),
('Custom Software Setup & Diagnostics', 'Software Solutions', 40.00, '1-2 Days', 'Deep diagnostic scan for malware, thermal throttling analysis, and specialized software suite configuration.', '["System health audit & stress test", "Malware & bloatware elimination", "Custom software & IDE setup", "OS cloning to new NVMe SSD"]', 'Wrench'),
('Disk Formatting & Partitioning', 'Software Solutions', 20.00, 'Same Day (1 hr)', 'Safe low-level disk formatting, GPT/MBR partition scheme setup, and bad sector surface scanning.', '["Low-level zero-fill format", "GPT/MBR partition layout creation", "RAID array setup", "Drive health SMART analysis"]', 'HardDrive');
