<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$dbname = "csapatrecept_db"; 
$username = "csapatrecept_db"; 
$password = "Titkostanulas,09"; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
} catch (PDOException $e) {
    die(json_encode(["error" => $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM kategoria");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
    case 'POST':
        $stmt = $pdo->prepare("INSERT INTO kategoria (nev) VALUES (:nev)");
        $stmt->execute(['nev' => $input['nev']]);
        echo json_encode(["id" => $pdo->lastInsertId(), "nev" => $input['nev']]);
        break;
    case 'PUT':
        $stmt = $pdo->prepare("UPDATE kategoria SET nev = :nev WHERE id = :id");
        $stmt->execute(['nev' => $input['nev'], 'id' => $input['id']]);
        echo json_encode(["success" => true]);
        break;
    case 'DELETE':
        $stmt = $pdo->prepare("DELETE FROM kategoria WHERE id = :id");
        $stmt->execute(['id' => $_GET['id']]);
        echo json_encode(["success" => true]);
        break;
}
?>