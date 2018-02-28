<?php

session_start();

// Détruit toutes les variables de sessions
$_SESSION = array();

// Si vous voulez détruire complètement la sessions, effacez également
// le cookie de sessions.
// Note : cela détruira la sessions et pas seulement les données de sessions !
if (ini_get("sessions.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finalement, on détruit la sessions.
session_destroy();
