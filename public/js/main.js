$(function () {
	var socket = io();
	
	$('#camera-stream-img').prop('src', 'http://' + location.hostname + ':8080/?action=stream');
 	
	socket.emit('start-stream');

	$('.btn').on('mousedown touchstart', function () {
		socket.emit('engines', $(this).prop('id'));
	});

	$('.btn').on('mouseup touchend', function () {
		socket.emit('engines', 'stop');
	});

});
