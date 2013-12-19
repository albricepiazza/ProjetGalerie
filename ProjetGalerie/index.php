<?php 
session_start();
$chemin= "categorie/";
include('listerDir.php');

?>
<html>
	<head>
		<title>Accueil | Projet Galerie</title>
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
	?>
		<div id="page">
			<header>
				<h1>Projet Galerie photo</h1>
			</header>
			<div class="info"></div>
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
				<form method="GET" id="formulaire_deconnexion" action="deconnexion.php?page=categorie">
					<input type="submit" value="Deconnexion"/>
				</form>
			</div>
			
			<?php
			if (!isset($_SESSION['admin']))
			{
			?>
			<div class="connexion">
				<input type="text" class="identifiant" id="identifiant" name="identifiant" placeholder="Identifiant"/>
				<input type="password" class="motDePasse" id="motDePasse" name="motDePasse" placeholder="Mot de passe"/>
				<button class="buttonConnexion"  >Connexion</button>
			</div>
			<?php 
			}
			?>
			<div class="containGalerie">
				<div class="galerie">
				<?php 
				for($i=0;$i<count($tabCategorie);$i++)
				{
				?>
					<div class="image_galerie" id="<?php echo $tabCategorie[$i]; ?>">
						<div class="categorie_galerie ">
							<?php
								echo "<span class='nomCategorie'>Categorie : <span class='laCategorie'>".$tabCategorie[$i]."</span></span>";
								$cheminImg = $chemin.$tabCategorie[$i]."/";
								include('listerImgCategorie.php');
								
							if($tabImage[0] == "images/no-image.png" || $tabImage[0] == null)
							{
							?>
								<img class="categorie_galerie " src="<?php echo $tabImage[0]; ?>">
							<?php
							}
							else
							{
							?>
								<img class="categorie_galerie " src="<?php echo $cheminImg.$tabImage[0]; ?>">
							<?php
							}
							?>
						</div>
					</div>
				<?php
				}
				?>
				</div>			
			</div>			
		</div>
		<div id="popupSupprimerCategorie" class="popup_block">
			<div>Êtes-vous sûre de vouloir supprimer l'image ?</div>
			<input class="buttonOui" type="button" value="Oui"/>
			<input class="buttonNon" type="button" value="Non"/>
		</div>
	</body>
</html>

