<?php

session_start();

$résultat = new stdClass();
$résultat->oui = false;

if (isset($_SESSION['identifiant'])) {
    $résultat->oui = true;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($résultat);
