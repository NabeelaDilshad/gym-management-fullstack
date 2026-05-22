CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    age INTEGER NOT NULL,
    address TEXT NOT NULL,
    health_issue TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive')),
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photo_url TEXT,
    emergency_contact VARCHAR(20)
);

CREATE TABLE fees (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    payment_date DATE NOT NULL,
    amount INTEGER NOT NULL,
    remaining_amount INTEGER DEFAULT 0,
    membership_plan INTEGER NOT NULL CHECK (membership_plan IN (1, 3, 6, 12)),
    start_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_method VARCHAR(20)
        CHECK (payment_method IN ('cash', 'upi', 'card', 'bank')),
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('paid', 'pending', 'partial', 'expired')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fee_member
        FOREIGN KEY (member_id)
        REFERENCES members(id)
        ON DELETE CASCADE
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    attendance_date DATE NOT NULL,
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'absent'
        CHECK (status IN ('present', 'absent')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT attendance_unique
        UNIQUE (member_id, attendance_date),

    CONSTRAINT fk_attendance_member
        FOREIGN KEY (member_id)
        REFERENCES members(id)
        ON DELETE CASCADE
);