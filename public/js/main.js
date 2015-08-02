$(function () {
	var socket = io();
	socket.on('stream', function(url) {
		$('#stream').attr('src', url);
	});
 	
	socket.emit('start-stream');

	$('.btn').on('mousedown', function () {
		$.get('/command/' + $(this).prop('id'));
	});

	$('.btn').on('mouseup', function () {
		$.get('/command/stop');
	});

	setInterval(function() {
		$.ajax({
			url: '/command/distance',
			method: 'GET',
			dataType: 'json',
			success:function (result) {
				console.log(result);
				$('#distance').text(result.result);
			}
		});
	}, 1000);
});