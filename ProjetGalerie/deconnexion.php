<?php
session_start();
if(isset($_SESSION['admin']) && $_SESSION['admin'] == true)
{
		session_unset();
		session_destroy();
		if(isset($_POST['categorie']))
		{
			header('Location: imageCategorie.php?deconnexion=ok');
		}
		else
		{
			header('Location: index.php?deconnexion=ok');
		}
}
else
{
	header('Location: index.php?deconnexion=lol');
}
?>