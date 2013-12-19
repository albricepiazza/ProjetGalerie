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
			<div class="connexion">
			<?php
			if (!isset($_SESSION['admin']))
			{
			?>
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
								include('listerImg.php');
							?>
							<img class="categorie_galerie " src="<?php echo $cheminImg.$tabImage[0]; ?>">
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

