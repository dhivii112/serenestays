CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
