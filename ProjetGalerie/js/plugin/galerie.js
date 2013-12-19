(function($)
{
	$.fn.galerie = function(params)
	{
		
		/** Initialisation des parametres **/
		var settings = $.extend({
            miniatureWidth		: null,
            miniatureHeight		: null,
            grandWidth			: null,
			grandHeight			: null
		}, params);
		
		/** Creation de la galerie et des composants **/
		var elementDeclencheur = $(this);
		if(elementDeclencheur.find('img').size() != 0)
		{
			elementDeclencheur.prepend('<div class="galerieJS"></div>');
			$('.galerieJS').prepend('<div class="contentMiniGalerieJS"></div>');
			$('.contentMiniGalerieJS').prepend('<div class="miniatureGalerieJS"></div>');
			$('.contentMiniGalerieJS').append('<div class="compteurGalerieJS">compteurGalerieJS</div>');
			$('.galerieJS').append('<div class="contentGrandGalerieJS"></div>');
			$('.contentGrandGalerieJS').append('<span class="imageGrandGalerieJS"></span>');
			$('.contentGrandGalerieJS').prepend('<span class="navigationDroiteGalerieJS"></span>');
			$('.contentGrandGalerieJS').prepend('<span class="navigationGaucheGalerieJS"></span>');
			$('.contentGrandGalerieJS').prepend('<span class="descriptionGalerieJS"></span>');
			$('.galerieJS').append('<div class="supprimerMiniImageGalerie"></div>');
			
			
			/** Class Image pour remplir le tableau **/
			function Image(block, url)
			{
				this.block = block;
				this.url = url;
			}
			
			/** Insertion des images dans la galerie + compteur **/
			var tabImage = [];
			var compteurImage = 1;
			elementDeclencheur.find('img').each(function()
			{
				if($(this).attr('id') != '')
				{
					$('.miniatureGalerieJS').append('<div class="imageMiniatureGalerie '+compteurImage+'"><img src="'+$(this).attr('src')+'" id="'+$(this).attr('id')+'" /></div>');
					if($(this).parent().find('.titre').text() != '')
						$('.imageMiniatureGalerie.'+compteurImage).append('<div class="titreImageMiniatureGalerie">'+$(this).parent().find('.titre').text()+'</div>');
					if($(this).parent().find('.description').text() != '')
					$('.imageMiniatureGalerie.'+compteurImage).append('<div class="descriptionImageMiniatureGalerie">'+$(this).parent().find('.description').text()+'</div>');
				}
				else
				{
					$('.miniatureGalerieJS').append('<div class="imageMiniatureGalerie"><img src="'+$(this).attr('src')+'"/></div>');
				}
				$(this).parent().parent().detach();
				tabImage.push(new Image($('.imageMiniatureGalerie.'+compteurImage),$(this).attr('src')));
				compteurImage++;
			});
			
			/** Affichage du compteur **/
			$('.compteurGalerieJS').html('<span class="numeroImage">1</span>/'+tabImage.length);
			
			/** Declaration des variables **/
			var blockImageMiniature = $('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS');
			var blockImageGrand = $('.galerieJS .contentGrandGalerieJS .imageGrandGalerieJS'); 
			
			/** fonction qui affiche les titres et descriptions des images **/
			function affichageTitreEtDescription(blockImage)
			{
				$('.titreGalerieJS, .descriptionGalerieJS').remove();
				if(blockImage.find('.titreImageMiniatureGalerie').size() != 0)
				{
					$('.contentGrandGalerieJS').prepend('<span class="titreGalerieJS"></span>');
					$('.titreGalerieJS').html(blockImage.find('.titreImageMiniatureGalerie').text());
				}
				if(blockImage.find('.descriptionImageMiniatureGalerie').size() != 0)
				{
					$('.contentGrandGalerieJS').prepend('<span class="descriptionGalerieJS"></span>');
					$('.descriptionGalerieJS').html(blockImage.find('.descriptionImageMiniatureGalerie').text());
				}
			}
			
			
			/** Affichage par default de la premiere image en grand **/
			blockImageGrand.html(blockImageMiniature.find('.imageMiniatureGalerie:first-child img').clone());
			affichageTitreEtDescription(blockImageMiniature.find('.imageMiniatureGalerie:first-child'));
			blockImageMiniature.find('.imageMiniatureGalerie:first-child img').addClass('active');
			
			/** Au click miniature - Affichage en grand **/
			blockImageMiniature.find('img').click(function()
			{
				var imageClique = $(this);
				
				blockImageGrand.fadeOut(350,function()
				{
					blockImageGrand.html("<img src='"+imageClique.attr('src')+"' />");
					blockImageGrand.fadeIn(400);
				});
				supprimerClasseActive();
				$(this).addClass('active');
				for(cpt=0;cpt<tabImage.length;cpt++)
				{
					if(tabImage[cpt].url == $(this).attr('src'))
					{
						$('.numeroImage').text((cpt+1));
					}
				}
				affichageTitreEtDescription(imageClique.parent());
				changerStyleGrand(settings.grandWidth, settings.grandHeight);
			});
			
			/** fonction supprimer classe active miniature **/
			function supprimerClasseActive()
			{
				blockImageMiniature.find('img').each(function()
				{
					if($(this).hasClass('active'))
					{
						$(this).removeClass('active')
						return;
					}
				});
			}
			
			/** Changer style images miniatures **/
			function changerStylePetit(widthMini, heightMini)
			{
				if(widthMini != null)
				{
					if(heightMini != null)
					{
						$('.miniatureGalerieJS').find('.imageMiniatureGalerie').each(function()
						{
							$(this).find('img').css('width',widthMini);
							$(this).find('img').css('height',heightMini);
						});
					}
					else
					{
						$('.miniatureGalerieJS').find('.imageMiniatureGalerie').each(function()
						{
							$(this).find('img').css('width',widthMini);
						});
					}
				}
				else
				{
					if(heightMini != null)
					{
						$('.miniatureGalerieJS').find('.imageMiniatureGalerie').each(function()
						{
							$(this).find('img').css('height',heightMini);
						});
					}
				}
			}
			/** Changer style grande image **/
			function changerStyleGrand(widthMini, heightMini)
			{
				var image_grande = $('.contentGrandGalerieJS').find('.imageGrandGalerieJS img');
				if(widthMini != null)
				{
					if(heightMini != null)
					{
						image_grande.css('width',widthMini);
						image_grande.css('height',heightMini);
					}
					else
					{
						image_grande.css('width',widthMini);
					}
				}
				else
				{
					if(heightMini != null)
					{
						image_grande.css('height',heightMini);
					}
				}
			}
			
			/** Changement du style en fonction des parametres passés **/
			changerStylePetit(settings.miniatureWidth, settings.miniatureHeight);
			changerStyleGrand(settings.grandWidth, settings.grandHeight);
			
			/** Click fleche navigation **/
			
			$('.navigationDroiteGalerieJS, .navigationGaucheGalerieJS').click(function()
			{
				var objetClique = $(this);
				var numeroImage = $('.numeroImage').text();
				if(objetClique.attr('class') == 'navigationDroiteGalerieJS')
				{
					if(numeroImage == tabImage.length)
					{
						supprimerClasseActive();
						blockImageGrand.fadeOut(350,function()
						{
							blockImageGrand.html("<img src='"+tabImage[0].url+"' />");
							blockImageGrand.fadeIn(400);
						});
						trouverImageMiniature(tabImage[0].url);
						$('.numeroImage').text('1');
						affichageTitreEtDescription(tabImage[0].block);
						changerStyleGrand(settings.grandWidth, settings.grandHeight);
					}
					else
					{
						supprimerClasseActive();
						blockImageGrand.fadeOut(350,function()
						{
							blockImageGrand.html("<img src='"+tabImage[numeroImage].url+"' />");
							blockImageGrand.fadeIn(400);
						});
						trouverImageMiniature(tabImage[numeroImage].url);
						$('.numeroImage').text((parseInt(numeroImage)+1));
						affichageTitreEtDescription(tabImage[numeroImage].block);
						changerStyleGrand(settings.grandWidth, settings.grandHeight);
					}
				}
				else
				{
					if(numeroImage == '1')
					{
						supprimerClasseActive();
						blockImageGrand.fadeOut(350,function()
						{
							blockImageGrand.html("<img src='"+tabImage[((tabImage.length)-1)].url+"' />");
							blockImageGrand.fadeIn(400);
						});
						changerStyleGrand(settings.grandWidth, settings.grandHeight);
						trouverImageMiniature(tabImage[((tabImage.length)-1)].url);
						affichageTitreEtDescription(tabImage[((tabImage.length)-1)].block);
						$('.numeroImage').text(''+tabImage.length);
					}
					else
					{
						supprimerClasseActive();
						blockImageGrand.fadeOut(350,function()
						{
							blockImageGrand.html("<img src='"+tabImage[(numeroImage-2)].url+"' />");
							blockImageGrand.fadeIn(400);
						});
						changerStyleGrand(settings.grandWidth, settings.grandHeight);
						trouverImageMiniature(tabImage[(numeroImage-2)].url);
						affichageTitreEtDescription(tabImage[(numeroImage-2)].block);
						$('.numeroImage').text((parseInt(numeroImage)-1));
					}
				}
			});
			
			/** Trouver image miniature pour mettre classe active **/
			
			function trouverImageMiniature(sourceImage)
			{
				blockImageMiniature.find('.imageMiniatureGalerie').each(function()
				{
					if($(this).find('img').attr('src') == sourceImage)
					{
						$(this).find('img').addClass('active');
						return;
					}
				});
			}
		}
		else
		{
			elementDeclencheur.prepend("<div class='pasDePhoto'>Il n'y a pas de photo.</div>");
		}
		/** Passage souris sur supprimerImage **/
		$('.galerieJS .contentMiniGalerieJS .miniatureGalerieJS .imageMiniatureGalerie').mouseenter(function()
		{
			$(this).find('img').addClass('hover');
		}).mouseleave(function()
		{
			$(this).find('img').removeClass('hover');
		});
		
		var $gallery = $( ".miniatureGalerieJS" );
		var $trash = $( ".supprimerMiniImageGalerie .zoneSuppression" );
		$( ".imageMiniatureGalerie", $gallery ).draggable({
		  cancel: "a.ui-icon", // clicking an icon won't initiate dragging
		  revert: "invalid", // when not dropped, the item will revert back to its initial position
		  containment: "document",
		  helper: "clone",
		  cursor: "move"
		});
		$trash.droppable({
		  accept: ".miniatureGalerieJS > .imageMiniatureGalerie",
		  drop: function( event, ui ) {
			deleteImage( ui.draggable );
		  }
		});
		$gallery.droppable({
		  accept: ".supprimerMiniImageGalerie > .zoneSuppression > .gallery > .imageMiniatureGalerie",
		  drop: function( event, ui ) {
			recycleImage( ui.draggable );
		  }
		});
		
		function deleteImage( $item )
		{
		  $item.fadeOut(function() {
			var $list = $( "ul", $trash ).length ?
			  $( "ul", $trash ) :
			  $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );
	 
			$item.find( "a.ui-icon-trash" ).remove();
			$item.appendTo( $list ).fadeIn();
		  });
		}
		
		function recycleImage( $item ) {
		  $item.fadeOut(function() {
			$item
			  .find( "a.ui-icon-refresh" )
				.remove()
			  .end()
			  .css( "height", "80px")
			  .find( "img" )
			  .end()
			  .appendTo( $gallery )
			  .fadeIn();
		  });
		}
		
		function viewLargerImage( $link )
		{
		  var src = $link.attr( "href" ),
			title = $link.siblings( "img" ).attr( "alt" ),
			$modal = $( "img[src$='" + src + "']" );
	 
		  if ( $modal.length ) {
			$modal.dialog( "open" );
		  } else {
			var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
			  .attr( "src", src ).appendTo( "body" );
			setTimeout(function() {
			  img.dialog({
				title: title,
				width: 400,
				modal: true
			  });
			}, 1 );
		  }
		}
		
		$( ".miniatureGalerieJS > .imageMiniatureGalerie" ).click(function( event ) {
		  var $item = $( this ),
			$target = $( event.target );
	 
		  if ( $target.is( "a.ui-icon-trash" ) ) {
			deleteImage( $item );
		  } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
			viewLargerImage( $target );
		  } else if ( $target.is( "a.ui-icon-refresh" ) ) {
			recycleImage( $item );
		  }
	 
		  return false;
		});
		/** return this pour continuer la chaine **/
		return this;
	}
})(jQuery);