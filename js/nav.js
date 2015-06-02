$(function(){

	//hide things
	$('.content').hide();
	$('#home-streams').show();

	var navoptions = {};
	navoptions['home'] = ['streams', 'notifications', 'share', 'stuff', 'profile', 'settings']
	navoptions['streams'] = ['recipes', 'activities', 'goods']
	navoptions['recipes'] = ['create', 'join']//, '_recipe']
	navoptions['recipe'] = ['instructions', 'nutrition']
	navoptions['goods'] = ['create', 'join', '_good']
	navoptions['activities'] = ['create', 'join', '_activity']

	var treeNav = ['home'];
	var treeHtml = ['home'];

	$('#navme').click(function(){
		$('#siblings').toggleClass('extended');
		$('#parents').toggleClass('extended');
		$('#siblings').height('auto');
		$('#parents').height('auto');

	});

	var hideParentsSiblings = function(){
		$('#siblings').toggleClass('extended');
		$('#parents').toggleClass('extended');
		$('#siblings').height(0);
		$('#parents').height(0); 
	};

	var generalAppend = function(to, nav, text){
		nav = nav.toLowerCase();
		text = text.toUpperCase();
		$(to).append('<li nav=' + nav +'>' + text +'</li>');
	};

	var addSiblings = function(next){
		var i=0;
		$('#siblings').html('');
		if(next in navoptions){
			for(i=0; i<navoptions[next].length; i++){
				generalAppend('#siblings', navoptions[next][i], navoptions[next][i]);
			}
		}
		$('#siblings li').unbind().click(siblingClick);
		$('#parents li').unbind().click(parentClick);
	};

	var navigateTo = function(next){
		$('.content').hide();
		var i=0;
		var navto = '#';
		for(i=0;i<treeNav.length;i++){
			navto+= treeNav[i]+ '-'
		}
		navto += next;
		navto = navto.toLowerCase();
		$(navto).show();
	};

	var siblingNav = function(nextnav, nexthtml){
		var i=0;
		var curnav = $('#navme').attr('nav');
		var curhtml = $('#navme').html();
		treeNav.push(curnav);
		treeHtml.push(curhtml);
		$('#navme').html(nexthtml);
		$('#navme').attr('nav', nextnav);
		generalAppend('#parents', curnav, curhtml);
		addSiblings(nextnav);
		navigateTo(nextnav);
	}

	var siblingClick = function(){
		var nextNav = $(this).attr('nav');
		var nextHtml = $(this).html();
		hideParentsSiblings();
		siblingNav(nextNav, nextHtml);
	};

	$('#siblings li').click(siblingClick);

	var parentClick = function(){
		var i= 0;
		var nextNav = $(this).attr('nav');
		var nextHtml = $(this).html();
		$('#navme').html(nextHtml);
		$('#navme').attr('nav', nextNav);
		hideParentsSiblings();	
		var toSlice = treeNav.indexOf(nextNav);
		treeNav = treeNav.slice(0,toSlice);
		treeHtml = treeHtml.slice(0,toSlice);
		$('#parents').html('');
		for(i=0;i<treeNav.length;i++){
			generalAppend('#parents', treeNav[i], treeHtml[i]);
		}
		addSiblings(nextNav);
		navigateTo(nextNav);
	};


	$('#parents li').click(parentClick);

	var navigateByLink = function(nextnav, nexthtml){
		siblingNav(nextnav, nexthtml);
	}

	var addRecipeTitleToPages = function(recipe){
		$('#home-streams-recipes-recipe').attr('curRecipe', recipe);
		$('#home-streams-recipes-recipe-nutrition').attr('curRecipe', recipe);
		$('#home-streams-recipes-recipe-instructions').attr('curRecipe', recipe);
	}

	$('#home-streams-recipes .recipe').click(function(){
		var recipe = $(this).find('.recipe-title').html();
		navigateByLink('recipe',recipe);
		addRecipeTitleToPages(recipe);
		$('#home-streams-recipes-recipe').html(recipe + ' recipe details');
		// do an ajax using recipe and populate html 
	});

});