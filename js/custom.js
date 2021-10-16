

$(document).on('click', '.ReserveDatePickerItemsLeftData.OpenDay', function () {
	if ($('.ReserveDatePickerItemsLeftData').hasClass('CHODY')) {
		$('.ReserveDatePickerItemsLeftData.CHODY').removeClass('CHODY');
	}

	$('.ReserveDatePickerItemsRightReserveBtn').removeClass('ActiveBtn');

	$('.ReserveDatePickerItemsRightReserveBtn').addClass('deActiveBtn');

	$(this).addClass('CHODY');

})
