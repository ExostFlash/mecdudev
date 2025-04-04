<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données envoyées via POST
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $expediteur = "ton_email@example.com"; // L'email de l'expéditeur (toi)
    $subject = "Nouveau message de contact";

    // Préparer les headers pour l'email
    $headers = "From: $expediteur\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Corps du message
    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

    // Envoi de l'email
    if (mail($email, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Message envoyé avec succès !"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi du message."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Requête invalide."]);
}
?>
