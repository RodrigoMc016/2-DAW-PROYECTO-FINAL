
use timeless_flavour;
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance DECIMAL(10, 2),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE feedback (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    email VARCHAR(100) NOT NULL,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    message TEXT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE categories(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);



CREATE TABLE  products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_real DECIMAL(10, 2) NOT NULL,
    price_points INT NOT NULL,
    image_url VARCHAR(255),
    discounted_price DECIMAL(10, 2) DEFAULT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    email VARCHAR(50) NOT NULL,         
    transaction_type VARCHAR(50) NOT NULL DEFAULT 'Compra',
    euros_used DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    points_used DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    address VARCHAR(255) NOT NULL,      
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE user_friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    friend_id INT NOT NULL, 
    friendship_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_friendship UNIQUE (user_id, friend_id) 
);

CREATE TABLE promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount DECIMAL(5, 2) NOT NULL, 
    product_id INT DEFAULT NULL, 
	category_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_name) REFERENCES categories(name) ON DELETE CASCADE
);




