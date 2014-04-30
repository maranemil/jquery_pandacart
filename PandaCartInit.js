/**
 * jQuery PandaCart Initialization
 * @author Emil Maran - (maran-emil.de)
 
 * @description Creates then events control and initialization of the cart, 
 *              on the client side.
 *
 */


//$(document).ready(function(){

		$(function() {

			var PandaCart = $(document).PandaCart({
				AppName:     "PandaCart",
				AppVersion:  "1.0",
				AppAuthor:   "Emil Maran",
				AppWebsite:  "maran-emil.de",
				AppQtyLimit: 5
			});

			///////////////////////////////////////////////////////////////////////////
			//
			// addCart Event
			//
			///////////////////////////////////////////////////////////////////////////

			$('.addCart').bind("click", function(){
		
				var ProdIdNr = $(this).attr("data-prod-id");
				var ProdName = $(this).attr("data-prod-name");
				var ProdPnkt = $(this).attr("data-prod-price");

				$.addCart(ProdIdNr,ProdName,ProdPnkt);

			});

			///////////////////////////////////////////////////////////////////////////
			//
			// removeCart Event
			//
			///////////////////////////////////////////////////////////////////////////

			$('.removeCart').bind("click", function(){
				//console.log ( $(this).attr("data-prod-name"))
				var ProdIdNr = $(this).attr("data-prod-id");
				$.removeCart(ProdIdNr);
			});
			
			// init cart
			$.addCart('6','Audi A1','250');
			$.cleanCart();			
			

        });