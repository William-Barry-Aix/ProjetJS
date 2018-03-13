<?php
include 'DbConnect.php';

class UserManage extends DbConnect
{
    public function verify($email, $password)
    {
        try {
            $dbLink = $this->connect();
            $request = $dbLink->prepare(
                'SELECT Id, Nickname, Mail, Password '.
                'FROM users '.
                'WHERE Mail = :mail');
            $request->bindValue(':mail', $email, PDO::PARAM_STR);
            $request->execute();
            if ($request->rowCount()) {
                $request->setFetchMode(PDO::FETCH_OBJ);
                $result = $request->fetch();
                if (password_verify($password, $result->Password)){
                    $_SESSION['userPseudo'] = $result->Pseudo;
                    $_SESSION['userId'] = $result->Id;
                    return true;
                }
            }
            return false;
        }
        catch (PDOException $e){
            echo 'Erreur : ' , $e->getMessage(), PHP_EOL;
            return false;
        }

    }
}