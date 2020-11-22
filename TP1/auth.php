<?php
session_start();
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] === "POST") {
    $code = "1478";

    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    $testCode = $code === $decoded['code'];

    if($testCode === true) {
        $_SESSION['auth'] = true;
    }

    echo json_encode(['code' => $testCode]);
} else {
    echo json_encode(['connected' => isset($_SESSION['auth'])]);
}


