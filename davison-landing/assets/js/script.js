//@codekit-prepend "libs/modernizr-latest.js", "libs/jquery-1.9.1.js";

/**
 * Add Modernizr test for box sizing
 */
Modernizr.addTest("boxsizing", function(){
	return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7);
});

/**
 * Change the width of all elements to account for border-box
 */
$(function(){
	if(!($('html').hasClass('boxsizing'))){
		$('*').each(function(){
			if($(this).css('display')=='block'){
				var f, a, n;
				f = $(this).outerWidth();
				a = $(this).width();
				n = a-(f-a);
				$(this).css('width', n);
			}
		});
	}
});


$(function(){
	//$('figure.responsive').picture({ container : $('#content') });
	$els = $('.widget.documentation article, .widget.download article, .widget.faq article, .widget.ticket article, .widget.announcement article');
	if($els.length !== 0) $els.equalHeights();

	$('.bracketBox, .bracketBoxCls').hide();
	$('.bracketBoxOpn').click(function(){
		$('#' + $(this).attr('rel')).slideDown();
		$(this).hide().next('.bracketBoxCls').show();
		return false;
	});
	$('.bracketBoxCls').click(function(){
		$('#' + $(this).attr('rel')).slideUp();
		$(this).hide().prev('.bracketBoxOpn').show();
		return false;
	});
	$('[href="#reply"]').click(function(){
		$('#mt_reply').focus();
	});

	// Lazy load avatars from gravatar
	$('[data-gravatar-hash]').prepend(function(){
		var hash = $(this).data('gravatar-hash');
		var size = 66;
		return '<img width="'+size+'" height="'+size+'" src="http://www.gravatar.com/avatar.php?size='+size+'&gravatar_id=' + hash + '&d=' + window.site_url + '/assets/images/placeholder.png">'
	})

	// Close a hardcoded element and add a cookie
	$('.close_hardcoded').click(function(){
		$parent = $(this).parent().parent();
        var id = $(this).data('id');
        $.ajax({
            url: window.site_url + '/api/hide-hardcoded/' + id,
            success: function(data, status){
                $parent.fadeOut();
            },
            error: function(jqXHR, textStatus, errorThrown){
                // Do nothing 
            }
        });
		return false;
	});

	// Close and announcement and add a cookie
    $('.close_announcement').click(function(){
        $parent = $(this).parent().parent();
        var id = $(this).data('id');
        $.ajax({
            url: window.site_url + '/api/hide-announcement/' + id,
            success: function(data, status){
                $parent.fadeOut();
            },
            error: function(jqXHR, textStatus, errorThrown){
                // Do nothing 
            }
        });
        return false;
    });

	// Live FAQ lookup
	$('input#summary').keyup(function(){
		var term = $(this).val().replace(/ /gi,'|');
		console.log(term);
		$.ajax({
			url: window.site_url + '/api/faqs/' + term,
			dataType: "json",
	        success: function(data, status, jqXHR){
	        	if(Object.keys(data).length > 0){
		        	var string = '';
		        	$.each(data, function(index, item){
		        		string += '<li><a data-icon="C" href="' + item.link + '">' + item.question + '</a></li>'
	 				});
	 				$('.sidebar_widget').fadeIn();
	 				$('.sidebar_widget ul').html(string);
	 			}else{
	 				$('.sidebar_widget').fadeOut();
	 			}
			},
			error: function(jqXHR, textStatus, errorThrown){
				// Do nothing 
	        }
		});
	});

	/*$clicked = undefined;
	$('#mt_form_submit').bind('click', function(){
		$clicked  = $(this);
	});*/

	// Quick validate reply form and submit with ajax. If success load the comment in.
	$('#mt_reply_form').bind('submit', function(e){
		if($('textarea#mt_reply', this).val() === '')
		{
			alert('You need to enter a reply.');
			return false;
        }
		/*if($clicked.attr('id') === 'mt_form_submit')
		{
			$clicked = undefined;
			if($('textarea#mt_reply', this).val() === '')
			{
				alert('You need to enter a reply.');
	        }
	        else
	        {
	            var data = $(this).serialize();
	            var url = $(this).attr('action');
	            var comment = $('textarea#mt_reply', this).val();
	            var $html = $('.comment:first').clone();
	            $.ajax({
	                url: url,
	                type: 'post',
	                dataType: "json",
	                data: data,
	                success: function(data, status, jqXHR){
	                    $html.hide();
	                    $html.find('.member div:last-child, .member div:nth-last-child(2)').remove();
	                    $html.find('.widget').html(data.ticket);
	                    $('#content >div >div.title').before($html);
	                    $html.slideDown();
	                    $('textarea#mt_reply').val('');
	                    $('#form_holder').html(data.form);
	                },
	                error: function(jqXHR, textStatus, errorThrown){
	                	console.log(textStatus);
	                    alert('Sorry your comment could not be saved. Please try again.')
	                }
	            });
	        }
			return false;
		}*/
	});

	$('.announcement_close').click(function(){
		
		return false;
	});

	$('.show_terms').click(function(){
		$('#modal_holder').fadeIn();
		return false;
	});

	$('.close_modal').click(function(){
		$('#modal_holder').fadeOut();
		return false;
	});
});

(function($){
	$.fn.equalHeights = function(args){
		if(this.length !== 0){
			this.each(function(){
				$el = $('>*', this);
				var height = 0;
				$el.each(function(){
					$this = $(this);
					if($this.outerHeight() > height) height = $this.outerHeight();
				});
				$el.outerHeight(height);
			});
		}
	};
})(jQuery);