/*
 * phImage - jQuery Plugin
 * Allows simple creation of using images for placeholders in text fields / textareas
 *
 * Documentation can be found within the files you downloaded or at: https://github.com/cyphix333/phImage
 *
 * Copyright (c) 2015 Brett Marks (ai3 [at] internode.net.au)
 *
 * Version: 1.0 
 * Requires: jQuery v1.7.2+
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	
	$.fn.phImage = function(options) {
		
		// Set our default options whilst taking in any passed by the user
		var settings = $.extend({
			// These are the defaults
			remove_current: true,
			padding: 'default',
			background_position: null,
			background_repeat: 'no-repeat',
		}, options);	
		
		return this.each(function() {
			
			var element = $(this);
			
			// Get our background image
			var bg_image = element.attr('data-ph-image');
			
			if (bg_image) {
				
				if (settings.remove_current) {
					
					// Let's remove the current placeholder text
					element.attr('placeholder', '');
					
					element.on('focus', function(){
						// Remove background image
						element.css("background-image", "none");
					});
					
					element.on('change', function(){
						if (element.val() != '') {
							// Remove background image
							element.css("background-image", "none");							
						}
					});	
					
					element.on('blur', function(){
						// Put background image back?
						if (element.val() == "") {
							element.css("background-image", "url('" + bg_image + "')");
						}
					});
					
				} else {
					
					if (settings.padding != 'default') {
						// Let's set the padding of the element to what was provided
						element.css("padding", settings.padding);
					}
					
				}
				
				/*
					We apply the background image initially below, but only if they have chosen to leave the placeholder text in
					as the placeholder text in (the background image always should show even if the field has a value) OR if they
					have chosen to not show the placeholder text AND the field is empty
				 */
				
				if (!settings.remove_current || element.val() == "") {
					// Now let's set it as the field background
					element.css({"background-image": "url('" + bg_image + "')", "background-repeat": settings.background_repeat});				
				} else {
					element.css("background-repeat", settings.background_repeat);
				}
				
				// Apply background position if provided
				
				if (settings.background_position) {
					element.css("background-position", settings.background_position);
				}
				
			}
			
		});
		
	};
	
}(jQuery));