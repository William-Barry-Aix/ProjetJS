<?php
class DbConnect
{
    function __construct()
    {
    }

    protected function connect()
    {
        try {
            $dbLink = new PDO('mysql:host=mysql-phortfal.alwaysdata.net;dbname=phortfal_projetjs', 'phortfal', '1234');
            $dbLink->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbLink;
        } catch (Exception $e) {
            die('Erreur : ' . $e->getMessage());
        }
    }
}