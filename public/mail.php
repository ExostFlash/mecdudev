<?php

use phpmailer\src\PHPMailer;
use phpmailer\src\Exception;

require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Lire le corps de la requête
  $jsonData = file_get_contents("php://input");
  
  // Décoder le JSON en tableau associatif
  $data = json_decode($jsonData, true);

  // Vérifier si la donnée est bien un tableau
  if (is_array($data)) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'mail.teamflash.fr'; // Remplace par ton SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'exostflash@teamflash.fr'; // Ton email d'envoi
        $mail->Password = '@03A3m3yrmm302yr.'; // Ton mot de passe SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 465;

        $mail->setFrom('noreply@teamflash.fr', 'Team Flash - No Reply'); // Expéditeur
        $mail->addAddress($email, $name); // Remplace par l'email du destinataire
        $mail->addReplyTo($email, $name); // Permet de répondre à l'utilisateur

        $mail->isHTML(true);
        $mail->Subject = 'Nouveau message de contact';
        $mail->Body = "<h2>Nom : $name</h2><p>Email : $email</p><p>Message : $message</p>";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès !']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi du message.']);
    }
  } else {
    // Réponse d'erreur
    http_response_code(400);
    echo json_encode(["error" => "Format JSON invalide"]);
  }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
