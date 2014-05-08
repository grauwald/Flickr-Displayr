function FlickrDisplayr() {
	var self = this;
	
	var base_url =  "https://api.flickr.com/services/rest";
	var method = "flickr.people.getPhotos";
	var api_key = "4da62db9e6167a25f10a62fa05cc9938"; 	// get your own key: https://www.flickr.com/services/apps/create/apply/
	var user_id = "23730220%40N08";
	var page = 0;
	var totalPages;
	
	var $wrapper;
	
	var init = function () {
		console.log('Hello Flickr Displayr!!!');
		$wrapper= $('#wrapper');
		
		loadImageData(1);
		
	}
	

	
	var loadImageData = function (_page){
		page = _page;
		
		var URL = base_url+"/?method="+method+"&api_key="+api_key+"&user_id="+user_id+"&page="+page+"&format=json&jsoncallback=?";
		
		console.log('Loading Image Data', URL);

		try{ $.getJSON(URL, parseImageData); } 
		catch(e) {console.log(e);}
	}
	
	var parseImageData = function(data){
		console.log('Received Image Data', data);

		if(!totalPages) totalPages = parseInt(data.photos.total);
		var photoArray = data.photos.photo;

		for(var index=0; index<photoArray.length; index++) {

			var photo = photoArray[index];
			
			// construct image URL: http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
			// see: https://www.flickr.com/services/api/misc.urls.html
			var URL = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg';
			console.log('new photo', URL);
			
			var $photo = $('<div class="photo" />'); // construct photo div
			$photo.css('background-image', 'url('+URL+')'); // put image as background
			
			$photo.click(function(){
				$(this).toggleClass('active');
			});
			
			$wrapper.append($photo); // add to HTML display
		}

	}

	init();
}

