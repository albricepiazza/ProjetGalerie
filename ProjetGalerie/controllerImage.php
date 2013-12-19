<?php
session_start();
if(isset($_SESSION['admin']) && $_SESSION['admin'] == true)
{
	if(isset($_FILES['avatar']))
	{
		chmod("../ProjetGalerie", 0755);
		$dossier = $_POST['cheminImg'];
		$categorie = $_COOKIE['categorie'];
		$nomImage = $_POST['nomImage'];
		$descriptionImage = $_POST['descriptionImage'];
		$titleImage = $_POST['titleImage'];
		$fichier = $nomImage;
		$taille_maxi = 1000000000000000;
		$taille = filesize($_FILES['avatar']['tmp_name']);
		$extensions = array('.png', '.gif', '.jpg', '.jpeg', '.PNG', '.GIF', '.JPG', '.JPEG');
		$extension = strrchr($_FILES['avatar']['name'], '.'); 
		$fichier = $nomImage.$extension;
		//Début des vérifications de sécurité...
		if(!in_array($extension, $extensions)) //Si l'extension n'est pas dans le tableau
		{
			 header('Location: imageCategorie.php?up=extention');
			 $erreur = 'Vous devez uploader un fichier de type png, gif, jpg, jpeg';
		}
		if($taille>$taille_maxi)
		{
			 header('Location: imageCategorie.php?up=taille');
			 $erreur = 'Le fichier est trop gros...';
		}
		if(!isset($erreur)) //S'il n'y a pas d'erreur, on upload
		{
			 //On formate le nom du fichier ici...
			 $fichier = preg_replace('/([^.a-z0-9]+)/i', '-', $fichier);
			 if(move_uploaded_file($_FILES['avatar']['tmp_name'], $dossier.$fichier)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
			 {
					// enregistrer le title et la description de l'image
					$contenuDescription = '$descriptionImage_'.$fichier." = ".$descriptionImage."\r\n";
					$contenuTitle = '$titleImage_'.$fichier." = ".$titleImage."\r\n";
					$contenuImg = "//-------------".$fichier."\r\n";
					$h = fopen($dossier.$categorie.".txt", "a");
					fwrite($h, $contenuImg);
					fwrite($h, $contenuDescription);
					fwrite($h, $contenuTitle);
					fclose($h);
				  echo 'Upload effectué avec succès !';
				  header('Location: imageCategorie.php?up=on');
			 }
			 else //Sinon (la fonction renvoie FALSE)
			 {
				  echo 'Echec de l\'upload !';
				  header('Location: imageCategorie.php?up=off');
			 }
		}
		else
		{
			 echo $erreur;
		}
	}
	if(isset($_POST['rmImage']))
	{
	$nomImage = $_POST['rmImage'];
	$categorie = $_POST['categorie'];
	$dossier = $_POST['chemin'];

	// supression des données description et title de l'image
	$file = $dossier.$categorie.".txt";
	$data = file($file);
	$searchDescription = '$descriptionImage_'.$nomImage." = ";
	$searchTitle = '$titleImage_'.$nomImage." = ";
	$searchImg = "//-------------".$nomImage;
	for($i = 0, $c = count($data); $i < $c; $i++) {
			if(strpos($data[$i],$searchDescription) === 0 || strpos($data[$i], $searchTitle) === 0 || strpos($data[$i], $searchImg) === 0) {
					unset($data[$i]);
			}
	}
	file_put_contents($file, $data);

		if(unlink($dossier.$nomImage))
		{
			echo "L'image ".$nomImage."a été supprimé avec succès";
		}
		else
		{
			echo "L'image ".$nomImage."a n'a pas pu être supprimé";
		}
	}
	
}
else
{
	if(isset($_FILES['avatar']))
	{
		 header('Location: imageCategorie.php?up=noad');
	}
	$msg = "Vous n'êtes pas administrateur";
	//$msg = utf8_decode($msg);
	echo $msg;
}
if(isset($_POST['goCategorie']))
	{
		// setcookie("categorie", "", time() - 3600);
		setcookie("categorie", $_POST['goCategorie']);
	}