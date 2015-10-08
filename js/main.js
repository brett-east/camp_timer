// Get current time
var currentTime;
var hours;
var minutes;
var seconds;

function getCurrentTime(){

currentTime = new Date();
  hours = currentTime.getHours();
  minutes = currentTime.getMinutes();
  seconds = currentTime.getSeconds();


  if (minutes < 10) {
  minutes = "0" + minutes;
  };
  
  if (seconds < 10) {
	  seconds = "0" + seconds;
  };
  
};

function setCurrentTime(){
	getCurrentTime();
	$('#current_time').html(hours + ":" + minutes + ":" + seconds);
}

setCurrentTime();

setInterval(setCurrentTime, 1000);



  
// Insert hour and minute dropdown function

var hourDropdown = '<option value="00">00</option>';
var minuteDropdown = '<option value="00">00</option>';

function addTimeDropdowns () {
	for ( var i = 1; i < 24; i++ ) {
			if ( i < 10) {
				i = '0' + i;
			}
			hourDropdown = hourDropdown + '<option value="' + i + '">' + i + '</option>';
	};
	
	for ( var i = 1; i < 60; i++ ) {
			if ( i < 10) {
				i = '0' + i;
			}
			minuteDropdown = minuteDropdown + '<option value="' + i + '">' + i + '</option>';
	};
};

addTimeDropdowns ();

$('.hour').html(hourDropdown);
$('.minute').html(minuteDropdown);

//add new row class function

var timerRowArray = [];

function addRowClass(){
	timerRowArray = $('.timer_row');
	for ( i = 0; i < timerRowArray.length; i++ ) {
		$(timerRowArray[i]).removeClass().addClass('timer_row row_' + i);
	};
	
};


var newClassesArray = [];

function addClasses(newClassName, elementType){
	timerRowArray = elementType;
	for ( i = 0; i < timerRowArray.length; i++ ) {
		$(timerRowArray[i]).removeClass().addClass(newClassName + i);
	};
	
};



//add new row function

function addNewRow() {
	$(this).parents('tr.timer_row').after('<tr class="timer_row"><td class="set_time">12:00<span> AM</span></td><td class="sound_cell"><select class="sound_choice"><option value="long_ring">Long Ring</option><option value="ping">Ping</option><option value="alarm_ring">Alarm Ring</option><select></td><td><button class="play_sound">Play Sound</button></td><td><button class="pause_sound">Pause</button></td><td><select class="hour">' + hourDropdown + '</select> <select class="minute">' + minuteDropdown + '</select></td><td><img class="remove_row" src="img/minus.svg" alt="Add Row" height="24px" width="24px" /></td><td><img class="add_row" src="img/plus.svg" alt="Add Row" height="24px" width="24px" /></td></tr>');
	addClasses('timer_row row_', $('.timer_row'));
};

//remove row function

function removeRow() {
	$(this).parents('tr.timer_row').remove();
	addRowClass();
};

//table row actions

$('table').on('click', ".add_row", addNewRow);

$('table').on('click', ".remove_row", removeRow);

// Play Manual Sound

var manualSound;


function checkManualSound(){
	if ($(".manual_sound_option option:selected").val() == 'long_ring') {
		manualSound = document.getElementById('long_ring');
	} else if ($(".manual_sound_option option:selected").val() == 'ping') {
		manualSound = document.getElementById('ping');
	} else if ($(".manual_sound_option option:selected").val() == 'alarm_ring') {
		manualSound = document.getElementById('alarm_ring');
	} else {
		manualSound = null;
	}
};



function playManualSound(){
	checkManualSound();
	manualSound.play();
};

function pauseManualSound(){
	manualSound.pause();
};

$('.play_manual_sound').on('click', playManualSound);
$('.pause_manual_sound').on('click', pauseManualSound);


// add audio components

var thisSound;
var thisAutoSound;
var getAutoSound;

function playAutoSound(){
	if($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'long_ring') {
		thisAutoSound = document.getElementById('long_ring');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'ping') {
		thisAutoSound = document.getElementById('ping');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'alarm_ring') {
		thisAutoSound = document.getElementById('alarm_ring');
	} else {
		thisAutoSound = null;
	};
	thisAutoSound.play();
};

function pauseAutoSound(){
	document.getElementById('long_ring').pause();
	document.getElementById('ping').pause();
	document.getElementById('alarm_ring').pause();
};

$('table').on('click', '.play_sound', playAutoSound);

$('table').on('click', '.pause_sound', pauseAutoSound);


function getRowTimes() {
	timerRowArray = $('.timer_row');
	for ( var i = 0; i < timerRowArray.length; i++ ) {
		var rowHour = [];
		var rowMinute = [];
		var rowSound = [];
		var rowSoundFile = [];
		rowHour[i] = $('.row_' + [i]).find('.hour option:selected').val();
		rowMinute[i] = $('.row_' + [i]).find('.minute option:selected').val();
		rowSound[i] = $('.row_' + [i]).find('.sound_choice option:selected').val();

		if ( rowSound[i] == 'long_ring' ){
			rowSoundFile[i] = document.getElementById('long_ring');
		} else if ( rowSound[i] == 'ping' ){
			rowSoundFile[i] = document.getElementById('ping');
		} else if ( rowSound[i] == 'alarm_ring'){
			rowSoundFile[i] = document.getElementById('alarm_ring')
		}
		if ( rowHour[i] == hours && rowMinute[i] == minutes && seconds == '00' ){
			rowSoundFile[i].play();
		};
	};
};


setInterval(getRowTimes, 1000);

// Set displayed time

function setDisplayTimes() {
	timerRowArray = $('.timer_row');
	for ( var i = 0; i < timerRowArray.length; i++ ) {
		var rowHour = [];
		var rowMinute = [];
		var rowSound = [];
		var rowSoundFile = [];
		rowHour[i] = $('.row_' + [i]).find('.hour option:selected').val();
		rowMinute[i] = $('.row_' + [i]).find('.minute option:selected').val();
		rowSound[i] = $('.row_' + [i]).find('.sound_choice option:selected').val();
		if ( rowHour[i] < 12 && rowHour[i] > 0 ){
			$('.row_' + [i]).find('.set_time').html(rowHour[i] + ':' + rowMinute[i] + '<span> AM</span>');
		} else if ( rowHour[i] == 12 ){
			$('.row_' + [i]).find('.set_time').html('12:' + rowMinute[i] + '<span> PM</span>');
		}
		else if ( rowHour[i] > 12 ){
			rowHour[i] = rowHour[i] - 12;
			$('.row_' + [i]).find('.set_time').html(rowHour[i] + ':' + rowMinute[i] + '<span> PM</span>');
		} else if ( rowHour[i] == 0 ){
			$('.row_' + [i]).find('.set_time').html('12:' + rowMinute[i] + '<span> AM</span>');
		};
		
	};
};

$('table').on('change', 'select', setDisplayTimes);

//setInterval(setDisplayTimes, 1000);

