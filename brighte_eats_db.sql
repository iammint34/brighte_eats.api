CREATE DATABASE brighte_eats_db
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;
    
CREATE TABLE brighte_eats_db.leads ( 
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(64) NULL,
    name VARCHAR(150) NULL,
    email VARCHAR(150) NULL,
    mobile INT(10) UNSIGNED NULL,
    postcode INT(10) UNSIGNED NULL,
    services VARCHAR(255) NOT NULL,
    UNIQUE INDEX uix_id (id),
    UNIQUE INDEX ix_name (name),
    UNIQUE INDEX ix_email (email),
    UNIQUE INDEX ix_mobile (mobile),
    INDEX ix_postcode (postcode),
    INDEX ix_services (services)
    );