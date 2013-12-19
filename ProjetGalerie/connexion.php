<?php
session_start();
$identifiant = $_POST['identifiant'];
$motDePasse = $_POST['motDePasse'];
$user = "user";
$bdd = "projet_galerie";

$connexion = mysql_connect('localhost', 'root', 'root')or die("erreur de connexion au serveur");

mysql_select_db($bdd) or die("erreur de connexion a la base de donnees");

$query = "SELECT identifiant,motDePasse FROM $user WHERE identifiant = '$identifiant'";

$result = mysql_query($query);
$connexionOk = 0;
while($row = mysql_fetch_row($result)){
$identifiantBd = $row[0];

$motDePasseBd = $row[1];


if($identifiantBd == $identifiant && $motDePasseBd == $motDePasse)
{
	$connexionOk = 1;
	$_SESSION['admin'] = true;
	mysql_close($connexion);
	echo "Connexion réussi";
}
}
if($connexionOk == 0)
{
	mysql_close($connexion);
	echo "Connexion avortée";
}
?>