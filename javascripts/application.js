
$(document).ajaxSend(function(event, request, settings) { 
  if (typeof(window._token) == "undefined") return;
	
  settings.data = settings.data || "";
  settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(window._token);
});

$.fn.extend({
	color_picker: function(fun){
		var self = $(this);
		var target_input = $("#"+self.attr("input"));
		self.find('.item').live("click", function () {
			self.find('.item').removeClass('selected');
			$(this).addClass('selected');
			target_input.val($(this).attr("val"));
			fun($(this).attr("val"));
			return false;
		});
	},
});

$(document).ready(function () {
	$("#inspector").accordion();
	$('#select_shirt_color').color_picker(function (val) {
		$('#shirt').css({
			'background-image': "url(images/shirts_base/"+val+".jpg)"
		});
	});
	
	$(brushes).each(function () {
		var div = $('<div>');
		div.addClass('brush');
		var loader = new Image();
		var src = "images/brushes/" + this.image;
		
		loader.onload = function () {
			var img = $('<img>')
			img.attr("src", src);
			div.append(img)
		}
		$('#brushes').append(div);
		loader.src = src;
	});
	
	$('#brushes').find('div').draggable({
		appendTo: 'body',
		revert: true,
		helper: 'clone',
		cursor: 'move'
	});
	
	$("#shirt > div").droppable({
		accept: '.brush',
		hoverClass: 'over',
		drop: function(event, ui) {
			var brush = ui.draggable.find('img').clone();
			brush.removeClass('brush');
			//var canvas = $('<canvas>');
			var img = new Image();
			var self = $(this);
			img.onload = function () {
				//canvas.attr("width", img.width).attr("height", img.height);
				//var ctx = canvas[0].getContext('2d');
				//ctx.globalCompositeOperation = 'destination-out';
				//ctx.drawImage(img,0,0);
				brush.draggable({
					cursor: 'move',
					containment: '#shirt',
					//stack: { group: 'products' }
				});
				brush.css({
					'position': 'absolute'
				});
				self.append(brush);
			}
			img.src = brush.attr("src");
		}
	});
});

