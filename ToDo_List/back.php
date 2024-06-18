<?php
require '../config.php';
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM tasks');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO tasks (title, description) VALUES (:title, :description)');
        $stmt->execute(['title' => $input['title'], 'description' => $input['description']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $id = $_GET['id'];
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE tasks SET title = :title, description = :description WHERE id = :id');
        $stmt->execute(['title' => $input['title'], 'description' => $input['description'], 'id' => $id]);
        echo json_encode(['status' => 'success']);
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = :id');
        $stmt->execute(['id' => $id]);
        echo json_encode(['status' => 'success']);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
