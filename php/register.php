<?php
/**
 * User Registration Handler
 * Handles user registration with improved security and validation
 */

// Configuration
$config = [
    'db_host' => 'localhost',
    'db_username' => 'root',
    'db_password' => '',
    'db_name' => 'vegetable_store'
];

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * Database connection with error handling
 */
function getDatabaseConnection($config) {
    try {
        $conn = new mysqli(
            $config['db_host'], 
            $config['db_username'], 
            $config['db_password'], 
            $config['db_name']
        );
        
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        
        $conn->set_charset("utf8");
        return $conn;
        
    } catch (Exception $e) {
        error_log("Database connection error: " . $e->getMessage());
        return false;
    }
}

/**
 * Validate input data
 */
function validateInput($data) {
    $errors = [];
    
    // Name validation
    if (empty(trim($data['name']))) {
        $errors[] = "Name is required";
    } elseif (strlen(trim($data['name'])) < 2) {
        $errors[] = "Name must be at least 2 characters long";
    }
    
    // Email validation
    if (empty(trim($data['email']))) {
        $errors[] = "Email is required";
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    // Password validation
    if (empty($data['password'])) {
        $errors[] = "Password is required";
    } elseif (strlen($data['password']) < 6) {
        $errors[] = "Password must be at least 6 characters long";
    }
    
    // Password confirmation
    if ($data['password'] !== $data['repass']) {
        $errors[] = "Passwords do not match";
    }
    
    return $errors;
}

/**
 * Check if email already exists
 */
function emailExists($conn, $email) {
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $exists = $result->num_rows > 0;
    $stmt->close();
    return $exists;
}

/**
 * Register new user
 */
function registerUser($conn, $data) {
    $name = trim($data['name']);
    $email = trim($data['email']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $created_at = date('Y-m-d H:i:s');
    
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $password, $created_at);
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        $stmt->close();
        return $user_id;
    } else {
        $stmt->close();
        return false;
    }
}

/**
 * Send JSON response
 */
function sendResponse($success, $message, $data = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Main execution
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get database connection
    $conn = getDatabaseConnection($config);
    if (!$conn) {
        sendResponse(false, "Database connection failed. Please try again later.");
    }
    
    // Get and sanitize input data
    $input_data = [
        'name' => $_POST['name'] ?? '',
        'email' => $_POST['email'] ?? '',
        'password' => $_POST['password'] ?? '',
        'repass' => $_POST['repass'] ?? ''
    ];
    
    // Validate input
    $validation_errors = validateInput($input_data);
    if (!empty($validation_errors)) {
        sendResponse(false, implode(", ", $validation_errors));
    }
    
    // Check if email already exists
    if (emailExists($conn, $input_data['email'])) {
        sendResponse(false, "An account with this email already exists.");
    }
    
    // Register user
    $user_id = registerUser($conn, $input_data);
    if ($user_id) {
        sendResponse(true, "Account created successfully! You can now sign in.", ['user_id' => $user_id]);
    } else {
        sendResponse(false, "Registration failed. Please try again.");
    }
    
    $conn->close();
} else {
    sendResponse(false, "Invalid request method.");
}
?>