(function($)
{
	$(document).ready(function()
	{
		/** Appel du plugin galerie avec des parametres **/
		$('.galerieCategorie').galerie(
		{
			miniatureWidth: '120px',
			miniatureHeight: '80px',
			grandWidth: '100%',
			grandHeight: ''
		});
		
		/** Ajout image "plus" pour ajouter une categorie **/
		function imageAjouterUneCategorie()
		{
			
			$('.image_galerie.ajouterCat').remove();
			$('.galerie').append('<div class="image_galerie ajouterCat">'+
									'<div class="categorie_galerie ajouterCat">'+
									'<span class="ajouterCategorie"></span>'+
									'</div>'+
									'</div>');
		}
		imageAjouterUneCategorie();
		/** passage de la souris sur ajouterCategorie **/
		function passageSourisAjouterCategorie()
		{
			$(this).animate({
				backgroundColor: "rgb(211, 211, 211)"
			}, 400);
		}
		function enleverSourisAjouterCategorie()
		{
			if($(this).find('.form input[type=text]').attr('value') == "")
			{
				$(this).animate({
					backgroundColor: "transparent"
				}, 400);
				if($(this).find('.form').size() != 0)
				{
					$(this).find('.form').animate({
						opacity: 0
					},400,function()
					{
						$(this).parent().find('span.ajouterCategorie').css('display','');
						$(this).remove();
					});
				}
			}
		}
		$('.galerie .image_galerie.ajouterCat').bind('mouseenter', passageSourisAjouterCategorie);
		$('.galerie .image_galerie.ajouterCat').bind('mouseleave', enleverSourisAjouterCategorie);
		
		/** fonction click sur ajouterCategorie **/
		function ajouterCategorie()
		{
			$(this).find('span.ajouterCategorie').css('display','none');
			if($(this).find('.form').size() == 0)
			{
				$(this).prepend('<div class="form">'+
								'<input type="text" class="addCategorie" id="addCategorie" name="addCategorie" placeholder="nom de la catégorie">'+
								'<button class="creerCategorie">Creer la catégorie</button>'+
								'</div>');
			}
		}
		$('.galerie .image_galerie .categorie_galerie.ajouterCat').bind('click',ajouterCategorie);
		
		/** Ajouter bouton supprimer avant chaque image **/
		function ajoutSuppressionCategorie()
		{
			$('.galerie img').before('<span class="supprimerCategorie"><a rel="popupSupprimerCategorie" class="poplight" href="#?w=500"></a></span>');
		}
		ajoutSuppressionCategorie();
		
		/** afficher croix suppression au passage de la souris **/
		function passageSourisCategorie()
		{
			$(this).find('.categorie_galerie .supprimerCategorie').animate({
				'opacity': '1'
			}, 100, function()
			{
				$(this).find('a').css('display','block');
			});
		}
		function enleverSourisCategorie()
		{
			$(this).find('.categorie_galerie .supprimerCategorie').animate({
				'opacity': '0'
			}, 100, function()
			{
				$(this).find('a').css('display','');
			});
		}
		$('.galerie .image_galerie').bind('mouseenter',passageSourisCategorie);
		$('.galerie .image_galerie').bind('mouseleave',enleverSourisCategorie);
		
		/** Ajouter bouton supprimer avant chaque image (suppression mini image) **/
		function ajoutSuppressionMiniImage()
		{
			$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS img').before('<span class="supprimerMiniImage"></span>');
		}
		ajoutSuppressionMiniImage();
		
		/** Associer image au bouton supprimer **/
		function lienPopUpSupprimerImageMiniature()
		{
			$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS .imageMiniatureGalerie').each(function()
			{
				$(this).find('span.supprimerMiniImage').append('<a rel="popupSupprimerImage" class="poplight" href="#?w=500" id="controllerImage.php?rmImage='+$(this).find('img').attr('id')+'&categorie='+$("form#ajouterImage input[name=categorie]").attr('value')+'&chemin='+$("form#ajouterImage input[name=chemin]").attr('value')+'"></a>');
			});
		}
		lienPopUpSupprimerImageMiniature();

		/** afficher croix suppression au passage de la souris **/
		function passageSourisImage()
		{
			$(this).find('.supprimerMiniImage').animate({
				'opacity': '1'
			}, 100, function()
			{
				$(this).find('a').css('display','block');
			});
		}
		function enleverSourisImage()
		{
			$(this).find('.supprimerMiniImage').animate({
				'opacity': '0'
			}, 100, function()
			{
				$(this).find('a').css('display','');
			});
		}
		$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS .imageMiniatureGalerie').bind('mouseenter',passageSourisImage);
		$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS .imageMiniatureGalerie').bind('mouseleave',enleverSourisImage);
		
		/** POPUP Ajouter image / POPUP Supprimer image **/
		function clickSurLienPopUp()
		{
			var popID = $(this).attr('rel'); //Trouver la pop-up correspondante
			var popURL = $(this).attr('href'); //Retrouver la largeur dans le href
			var leLienClique = $(this);

			/** Attribuer url au bouton oui et non ( suppression ) **/
			if(popID == 'popupSupprimerImage')
			{
				// Requete ajax pour supprimer une image
				$( ".buttonOui" ).live("click",function(){
				var tabNomImage=[];
				$('.zoneSuppression .imageMiniatureGalerie').each(function()
				{
					tabNomImage.push($(this).find('img').attr('id'));
				});
			
/* 					var rmImage = leLienClique.parents().find('img').attr('id');
 */					var categorie = $("form#ajouterImage input[name=categorie]").attr('value');
					var chemin = $("form#ajouterImage input[name=cheminImg]").attr('value');
					$.ajax({
					   type: "POST",
					   url: "\controllerImage.php",
					   data: "rmImage="+tabNomImage+"&categorie="+categorie+"&chemin="+chemin,
					   success: function(msg){
							$(".laGalerieCategorie").empty();
							$(".zoneSuppression").empty();
							deplierBlockSupprimer();
							$(".laGalerieCategorie").load("imageCategorie.php .galerieCategorie");
							$('.info').html('<p>'+msg+'</p>');
						}
					});
						$('#fade , .popup_block').fadeOut(function() {
						$('#fade, a.close').remove();  //...ils disparaissent ensemble
					});
				});
			}
			// Requete ajax pour supprimer une categorie
			if(popID == 'popupSupprimerCategorie')
			{
				// Requete ajax pour supprimer une image
				$( ".buttonOui" ).live("click",function(){
					var rmCategorie = leLienClique.parent().parent().parent().attr('id');
					$.ajax({
					   type: "POST",
					   url: "\controllerCategorie.php",
					   data: "rmCategorie="+rmCategorie,
					   success: function(msg){
							$(".containGalerie").empty();
							$(".containGalerie").load("index.php .galerie");
							$('.info').html('<p>'+msg+'</p>');
						}
					});
						$('#fade , .popup_block').fadeOut(function() {
						$('#fade, a.close').remove();  //...ils disparaissent ensemble
					});
				});
			}
			//Récupérer les variables depuis le lien
			var query= popURL.split('?');
			var dim= query[1].split('&amp;');
			var popWidth = dim[0].split('=')[1]; //La première valeur du lien

			//Faire apparaitre la pop-up et ajouter le bouton de fermeture
			$('#' + popID).fadeIn().css({
				'width': Number(popWidth)
			}).prepend('<a href="#" class="close"><img src="images/supprimer.png" class="btn_close" title="Fermer" alt="Fermer" /></a>');

			//Récupération du margin, qui permettra de centrer la fenêtre - on ajuste de 80px en conformité avec le CSS
			var popMargTop = ($('#' + popID).height() + 80) / 2;
			var popMargLeft = ($('#' + popID).width() + 80) / 2;

			//On affecte le margin
			$('#' + popID).css({
				'margin-top' : -popMargTop,
				'margin-left' : -popMargLeft
			});

			//Effet fade-in du fond opaque
			$('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
			//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
			$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

			return false;
		}
		//Lorsque vous cliquez sur un lien de la classe poplight et que le href commence par #
		$('a.poplight[href^=#]').bind('click', clickSurLienPopUp);

		
		//Fermeture de la pop-up et du fond
		$('a.close, #fade, input.buttonNon').live('click', function() { //Au clic sur le bouton ou sur le calque...
			$('#fade , .popup_block').fadeOut(function() {
				$('#fade, a.close').remove();  //...ils disparaissent ensemble
			});
			return false;
		});
		
		/** Requete Ajax - Ajouter Categorie **/
		$( ".creerCategorie" ).live("click",function(){
		var addCategorie = $(".addCategorie").val();
			$.ajax({
			   type: "POST",
			   url: "controllerCategorie.php",
			   data: "addCategorie="+addCategorie,
			   success: function(msg){
					$(".containGalerie").empty();
					$(".containGalerie").load("index.php .galerie");
					$('.info').html('<p>'+msg+'</p>');
		   }
		 });
		});
		
		/** Requete Ajax - Supprimer Categorie **/
		$( ".supprimerCategorie" ).live("click",function(){
			var rmCategorie = $(this).parent().find('.nomCategorie .laCategorie').text();
			alert(rmCategorie);
			$.ajax({
			   type: "POST",
			   url: "controllerCategorie.php",
			   data: "rmCategorie="+rmCategorie,
			   success: function(msg){
					$(".containGalerie").empty();
					$(".containGalerie").load("index.php .galerie");
					$('.info').html('<p>'+msg+'</p>');
				}
		 });
		});
		
		/** Requete Ajax - Click sur bouton connexion **/
		var connect = false;
		$( ".buttonConnexion" ).click(function(){
			var motDePasse = $(".motDePasse").val();
			var identifiant = $(".identifiant").val();
			$.ajax({
			   type: "POST",
			   url: "connexion.php",
			   data: "identifiant="+identifiant+"&motDePasse="+motDePasse,
			   success: function(msg){
					connect = true;
					$('.info').html('<p>'+msg+'</p>');
					$(".cmd").empty();
					$(".cmd").load("imageCategorie.php .cmdCont");
					if(msg == "Connexion réussi")
					{
						$('.connexion').hide();
						$('.deconnexion').show();
					}
					if(msg == "Connexion avorté")
					{
						$('.connexion').show();
						$('.deconnexion').hide();
					}
		   }
		 });
		});
		
		/** Requete AJAX - Aller dans une categorie **/
		$( ".image_galerie, .valeurAutocompletion .valeur" ).live("click",function(){
			if($( ".image_galerie" ).find('input').attr('id') != "addCategorie")
			{
				var goCategorie = $(this).attr('id');
				$.ajax({
				   type: "POST",
				   url: "controllerImage.php",
				   data: "goCategorie="+goCategorie,
				   success: function(msg){
						window.location = 'imageCategorie.php';
				}
				});
			}
		});
		
		/** Autocompletion sur les categories **/
		function rechercherValeur()
		{
			var tabCategorie = [];
			$('.lesCategories .laCat').each(function()
			{
				tabCategorie.push($(this).text());
			});
			
			var valeurRecherche = $(this).attr('value');
			$('.valeur').remove();
			if(valeurRecherche != "")
			{
				for(i=0;i<tabCategorie.length;i++)
				{
					if(tabCategorie[i].indexOf(valeurRecherche) != -1 && tabCategorie[i].indexOf(valeurRecherche) == 0)
					{
						$('.valeurAutocompletion').prepend("<span class='valeur' id="+tabCategorie[i]+">"+tabCategorie[i]+"</span>");
					}
				}
			}
		}
		$("#Recherche").bind('keyup',rechercherValeur);
		/** On vide la champ recherche au lancement de la page **/
		$("#Recherche").attr('value','');
		
		/** Deplier block pour supprimer categorie **/
		function deplierBlockSupprimer()
		{
			$('.suppr.commande').unbind('click');
			if($('.supprimerMiniImageGalerie').hasClass('present'))
			{
				$('.supprimerMiniImageGalerie').animate({
					'left': '-200px'
				}, 300,function()
				{
					$(this).removeClass('present');
					$('.suppr.commande').bind('click',deplierBlockSupprimer);
				});
			}
			else
			{
				$('.supprimerMiniImageGalerie').animate({
					'left': '0'
				}, 300,function()
				{
					$(this).addClass('present');
					$('.suppr.commande').bind('click',deplierBlockSupprimer);
				});
			}
		}
		$('.suppr.commande').bind('click',deplierBlockSupprimer);
		
		/** Re-affecter fonction après requete Ajax **/
		$(document).ajaxComplete(function(event)
		{
			if(!connect)
			{
				$('.galerieCategorie').galerie(
				{
					miniatureWidth: '120px',
					miniatureHeight: '80px',
					grandWidth: '100%',
					grandHeight: ''
				});
			}
			
			imageAjouterUneCategorie();
			$('.galerie .image_galerie.ajouterCat').bind('mouseenter', passageSourisAjouterCategorie);
			$('.galerie .image_galerie.ajouterCat').bind('mouseleave', enleverSourisAjouterCategorie);
			$('.galerie .image_galerie .categorie_galerie.ajouterCat').bind('click',ajouterCategorie);
			ajoutSuppressionCategorie();
			$('.galerie .image_galerie').bind('mouseenter',passageSourisCategorie);
			$('.galerie .image_galerie').bind('mouseleave',enleverSourisCategorie);
			ajoutSuppressionMiniImage();
			$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS .imageMiniatureGalerie').bind('mouseenter',passageSourisImage);
			$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS .imageMiniatureGalerie').bind('mouseleave',enleverSourisImage);
			lienPopUpSupprimerImageMiniature();
			$('a.poplight[href^=#]').bind('click', clickSurLienPopUp);
			$("#Recherche").bind('keyup',rechercherValeur);
			$('.suppr.commande').bind('click',deplierBlockSupprimer);
		});
		
	});
})(jQuery);