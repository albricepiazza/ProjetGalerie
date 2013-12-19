<?php 
session_start();
chmod("../ProjetGalerie", 0755);
$categorie = $_COOKIE['categorie'];
$cheminImg= "categorie/".$categorie."/";
include('listerImg.php');
$chemin= "categorie/";
include('listerDir.php');
?>
<html>
	<head>
		<title>Image par catégorie | Projet Galerie</title>
		<?php
			include('header.php');
		?>
	</head>
	<div class="lesCategories">
		<?php
		for($nbr=0;$nbr<count($tabCategorie);$nbr++)
		{
			echo "<span class='laCat'>".$tabCategorie[$nbr]."</span>";
		}
		?>
	</div>
	<?php
	if (isset($_SESSION['admin']) && $_SESSION['admin'] == true)
	{
		echo "<body class='admin'>";
	}
	else
	{
		echo "<body>";

	}
	
	if(isset($_GET['up']))
	{
		if($_GET['up'] == "on")
		{
			$up = "Votre image a été upload";
		}
		if($_GET['up'] == "off")
		{
			$up = "Votre image n'a pas été upload, un problème a été rencontré";
		}
		if($_GET['up'] == "taille")
		{
			$up = "Votre image n'a pas été upload, la taille de votre image est trop volumineuse";
		}
		if($_GET['up'] == "extention")
		{
			$up = "Votre image n\'a pas été upload,Vous devez uploader un fichier de type png, gif, jpg, jpeg";
		}
		if($_GET['up'] == "noad")
		{
			$up = "Vous n'êtes pas administrateur";
		}
	}
	
	?>
		<div id="page">
			<header>
				<h1>Images par catégorie</h1>
				<a href="index.php"><h3>Catégorie</h3></a>
			</header>
			<div class="info">
				<?php
				if(isset($_GET['up']))
				{
					echo $up;
				}
				?>
			</div>
			<div class="ui-widget">
				<label for="Recherche">Rechercher catégorie: </label>
				<input id="Recherche">
				<div class="valeurAutocompletion">
				</div>
			</div>
			<div class="deconnexion"
			<?php
			if (!isset($_SESSION['admin']))
			{ 
				echo "style='display:none;'";
			}
			?>
			>
			
				<form method="POST" id="formulaire_deconnexion" action="deconnexion.php">
					<input type="hidden" name="categorie" value="caty"/>
					<input type="submit" value="Deconnexion"/>
				</form>
			</div>
			<div class="connexion"
			<?php
			if (isset($_SESSION['admin']) && $_SESSION['admin'] == true)
			{
				echo "style='display:none;'";
			}
			?>
			>
				<input type="text" class="identifiant" id="identifiant" name="identifiant" placeholder="Identifiant"/>
				<input type="password" class="motDePasse" id="motDePasse" name="motDePasse" placeholder="Mot de passe"/>
				<button class="buttonConnexion"  >Connexion</button>
			</div>
			<a href="#?w=500" rel="popupAjouterImage" class="poplight ajouterImage">Ajouter une image</a>
			<div id="popupAjouterImage" class="popup_block">
				<form id="ajouterImage" method="POST" action="controllerImage.php" enctype="multipart/form-data">
					 Image : <input type="file" name="avatar">
					 <input type="hidden" name="cheminImg" value="<?php echo $cheminImg; ?>" />
					 <input type="hidden" name="categorie" value="<?php echo $categorie; ?>" /><br/>
					 <input type="text" name="nomImage"  placeholder="Nom de votre image"/><br/>
					 <input type="text" name="titleImage"  placeholder="Titre de votre image"/><br/>
					 <textarea  type="text" name="descriptionImage"  placeholder="Description de votre image"></textarea >
					 <input type="submit" name="envoyer" value="Envoyer le fichier">
				</form>
			</div>			
			<div class="laGalerieCategorie">
				<div class="galerieCategorie">
				<?php 
				if(isset($tabImage))
				{
					for($i=0;$i<count($tabImage);$i++)
					{
					?>
						
							<div class="image_galerie">
								<div class="categorie_galerie">
									<img class="categorie_galerie " src="<?php echo $cheminImg.$tabImage[$i]; ?>" id="<?php echo $tabImage[$i]; ?>">
									<?php
										$file = $cheminImg.$categorie.".txt";
										$data = file($file);
										$searchDescription = '$descriptionImage_'.$tabImage[$i]." = ";
										$searchTitle = '$titleImage_'.$tabImage[$i]." = ";
										for($j = 0, $c = count($data); $j < $c; $j++)
										{
											if(strpos($data[$j],$searchDescription) === 0)
												echo '<div class="description">'.substr($data[$j], strlen($searchDescription)).'</div>';
													
											if(strpos($data[$j], $searchTitle) === 0)
												echo '<div class="titre">'.substr($data[$j], strlen($searchTitle)).'</div>';
										}
									?>
								</div>
							</div>
							
						
					<?php
					}
				}
				?>
				</div>
			</div>
			<div id="popupSupprimerImage" class="popup_block">
				<div>Êtes-vous sûre de vouloir supprimer l'image ?</div>
				<input class="buttonOui" type="button" value="Oui"/>
				<input class="buttonNon" type="button" value="Non"/>
			</div>
		</div>
	</body>
</html>