CREATE TABLE esms.customer_tbl (
	id BIGINT auto_increment NOT NULL,
	customer_name varchar(100) NOT NULL,
	customer_phone varchar(100) NULL,
	customer_address varchar(100) NULL,
	created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT customer_tbl_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE esms.service_transaction_tbl (
	id BIGINT auto_increment NOT NULL,
	transaction_code VARCHAR(25) NOT NULL UNIQUE,
	customer_id varchar(100) NOT NULL,
	transaction_date DATE NOT NULL,
	status VARCHAR(25) NULL,
	finished_date DATE NULL,
	invoice_date DATE NULL,
	payment_date DATE NULL,
	proof_of_payment BLOB NULL,
	total_payment DECIMAL(22,6),
	created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT service_transaction_tbl_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE esms.service_transaction_dtl_tbl (
	id BIGINT auto_increment NOT NULL,
	transaction_id BIGINT NOT NULL,
	item_name VARCHAR(250) NOT NULL,
	symptom VARCHAR(500) NULL,
	breakdown VARCHAR(500) NULL,
	solution VARCHAR(500) NULL,
	price DECIMAL(22,6),
	created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT service_transaction_dtl_tbl_pk PRIMARY KEY (id),
    CONSTRAINT fk_service_transaction_tbl FOREIGN KEY (transaction_id) REFERENCES service_transaction_tbl(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE esms.service_transaction_dtl_photo_tbl (
	id BIGINT auto_increment NOT NULL,
	transaction_id BIGINT NOT NULL,
	transaction_dtl_id BIGINT NOT NULL,
	photo BLOB NOT NULL,
	caption VARCHAR(50) NULL,
	created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT service_transaction_dtl_photo_tbl_pk PRIMARY KEY (id),
	CONSTRAINT fk_service_transaction_dtl_tbl FOREIGN KEY (transaction_dtl_id) REFERENCES service_transaction_dtl_tbl(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;