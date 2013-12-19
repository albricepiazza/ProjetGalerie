<?php 
session_start();
if(isset($_SESSION['admin']) && $_SESSION['admin'] == true)
{
	// controller categorie
	$existeDeja = 0;
	if(isset($_POST['addCategorie']) && $_POST['addCategorie']!='')
	{
		
		$categorie = $_POST['addCategorie'];

		// on regarde si la categorie existe deja
		$dirname = 'categorie/';
		$dir = opendir($dirname); 

		while($file = readdir($dir)) {
			if($file != '.' && $file != '..')
			{
				if($categorie == $file)
				{	
					$existeDeja = 1;
				}
			}
		}
		closedir($dir);
		// sinon on cré le dossier

		if($existeDeja == 0)
		{
			$structure = './categorie/'.$categorie;

			if (!mkdir($structure, 0, true)) {
				die('Echec lors de la création des répertoires...');
			}
			touch($structure."/".$categorie.".txt");
			$contenu = '$nomController = '.$categorie."\r\n";
			$h = fopen($structure."/".$categorie.".txt", "a");
			fwrite($h, $contenu);
			fclose($h);
			$msg = "La catégorie ".$categorie." a été créé";
			//$msg = utf8_decode($msg);
			echo $msg;

		}
		else
		{
			$msg = "La catégorie ".$categorie." existe déjà";
			//$msg = utf8_decode($msg);
			echo $msg;
		}
	}
	if(isset($_POST['rmCategorie']) && $_POST['rmCategorie']!='')
	{
		$categorie = $_POST['rmCategorie'];
		
		$dirname = 'categorie/';
		effacer($dirname.$categorie);
		$msg = "La catégorie ".$categorie." a été éffacé";
		//$msg = utf8_decode($msg);
		echo $msg;
	}
	
}
else
{
	$msg = "Vous n'êtes pas administrateur";
	//$msg = utf8_decode($msg);
	echo $msg;
}


	function effacer($fichier) {
		if (file_exists($fichier)) {
			if (is_dir($fichier)) {
				$id_dossier = opendir($fichier); 
				while($element = readdir($id_dossier)) {
					if ($element != "." && $element != "..") {
						effacer($fichier."/".$element);
					}
				}
				closedir($id_dossier);
				rmdir($fichier);
			} else {
				unlink($fichier);
			}
		}
	}
?>