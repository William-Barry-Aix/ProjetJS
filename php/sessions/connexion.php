<?php
include_once '../UserManage.php';
session_start();

$resultat = new stdClass();
$resultat->raison = '';
$db = new UserManage();

if ($resultat->valide != true) {
    if (isset($_POST['identifiant'])
        && isset($_POST['mot_de_passe'])) {
        if ($db->verify($_POST['identifiant'], $_POST['mot_de_passe'])) {
            $resultat->valide = true;
        } else {
            $resultat->valide = false;
            $resultat->raison = 'Identifiant ou mot de passe invalide.';
        }
    }
}else{

}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($resultat);
