var artApp = {};

artApp.apiKey = 'YaGDuREC';

//queries the api with a default search of monkey
artApp.getPieces = function(userChoice){
	$.ajax({
				url: 'https://www.rijksmuseum.nl/api/en/collection',
				method: 'GET',
				dataType: 'jsonp',
				data: {
					key: artApp.apiKey,
					format: 'jsonp',
					q: userChoice
				}
		}).then(function(res) {
		artApp.displayPieces(res.artObjects);
	});
};

//gets the object from getPieces and will display the art while appending
artApp.displayPieces = function(artwork){
	$.each(artwork, function(i, value){
		
		var title = $('<h2>').text( value.longTitle );
		var artist = $('<p>').addClass('artist').text( value.principalOrFirstMaker );
		var image = $('<img>').attr('src', value.webImage.url);
		var artContainer = $('<div>').addClass('piece').append(title, artist, image);
		
		$('#artwork').append(artContainer);
		
	});
}

artApp.updateTitle = function(title){
	$('#page-title span').text(title + 's');
};


artApp.go = function(){
	artApp.getPieces('donkey');
	artApp.updateTitle('Donkey');
	$('#animal').on('change', function(){
		var animal = $(this).val();
		$('#artwork').empty();
		artApp.getPieces(animal);
		artApp.updateTitle(animal);
	});
};


$(function(){
	artApp.go();
});