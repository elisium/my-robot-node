$(function () {
	var socket = io();
	
	$('#camera-stream-img').prop('src', 'http://' + location.hostname + ':8080/?action=stream');

	$('.btn').on('mousedown touchstart', function () {
		socket.emit('engines', $(this).prop('id'));
	});

	$('.btn').on('mouseup touchend', function () {
		socket.emit('engines', 'stop');
	});

	socket.on('distance', function(rawDistance) {
		if (rawDistance > 0) {
			var distance = rawDistance.toFixed(0);
			$('#distance').text(distance);
		}
	});
	socket.on('accelerometer', function(data) {
		$('#accel-x').text(data.x);
		$('#accel-y').text(data.y);
		$('#accel-z').text(data.z);
	});
});
