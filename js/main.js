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

var hourDropdown = '<option value="00">12am</option>';
var minuteDropdown = '<option value="00">00</option>';

function addTimeDropdowns () {
	for ( let i = 1; i < 24; i++ ) {
    let display = i < 12 ? `${i}am` : `${i%12}pm`;
    if ( i === 0) {
      display = '12am';
    }
    if (i === 12) {
      display = '12pm';
    }
    let value = i;
    if (i < 10) {
      value = `0${i}`;
    }
    hourDropdown = hourDropdown + '<option value="' + value + '">' + display + '</option>';
	};

	for ( let i = 1; i < 60; i++ ) {
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
	$('.auto_timer tbody').append('<tr class="timer_row"><td class="set_time">12:00<span> AM</span></td><td class="sound_cell"><select class="sound_choice"><option value="first_call">Call to Activities</option><option value="reveille">Reveille - Wake Up</option><option value="flag_up">To the Colors - Flag Up</option><option value="sticks">Start Sticks</option><option value="flag_down">Retreat - Flag Down</option><option value="taps">Taps</option><select></td><td><button class="play_sound">Play Sound</button></td><td><button class="pause_sound">Pause</button></td><td><select class="hour">' + hourDropdown + '</select> <select class="minute">' + minuteDropdown + '</select></td><td><img class="remove_row" src="img/minus.svg" alt="Add Row" height="24px" width="24px" /></td><td><img class="add_row" src="img/plus.svg" alt="Add Row" height="24px" width="24px" /></td></tr>');
	addClasses('timer_row row_', $('.timer_row'));
};

//remove row function

function removeRow() {
	$(this).parents('tr.timer_row').remove();
	addRowClass();
  setDisplayTimes();
};

//table row actions

$('.auto_timer_wrapper').on('click', '.add_row', addNewRow);

$('table').on('click', ".remove_row", removeRow);

// Play Manual Sound

var manualSound;


function checkManualSound(){
	if ($(".manual_sound_option option:selected").val() == 'first_call') {
		manualSound = document.getElementById('first_call');
	} else if ($(".manual_sound_option option:selected").val() == 'reveille') {
		manualSound = document.getElementById('reveille');
	} else if ($(".manual_sound_option option:selected").val() == 'flag_up') {
		manualSound = document.getElementById('flag_up');
	} else if ($(".manual_sound_option option:selected").val() == 'sticks') {
		manualSound = document.getElementById('sticks');
	} else if ($(".manual_sound_option option:selected").val() == 'flag_down') {
		manualSound = document.getElementById('flag_down');
	} else if ($(".manual_sound_option option:selected").val() == 'taps') {
		manualSound = document.getElementById('taps');
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

function restartManualSound(){
	manualSound.currentTime = 0;
};

$('.play_manual_sound').on('click', playManualSound);
$('.pause_manual_sound').on('click', pauseManualSound);
$('.restart_manual_sound').on('click', restartManualSound);


// add audio components

var thisSound;
var thisAutoSound;
var getAutoSound;

function playAutoSound(){
	if($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'first_call') {
		thisAutoSound = document.getElementById('first_call');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'reveille') {
		thisAutoSound = document.getElementById('reveille');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'flag_up') {
		thisAutoSound = document.getElementById('flag_up');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'sticks') {
		thisAutoSound = document.getElementById('sticks');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'flag_down') {
		thisAutoSound = document.getElementById('flag_down');
	} else if ($(this).parent().siblings('.sound_cell').children('.sound_choice').val() == 'taps') {
		thisAutoSound = document.getElementById('taps');
	} else {
		thisAutoSound = null;
	};
	thisAutoSound.play();
};

function pauseAutoSound(){
	document.getElementById('first_call').pause();
	document.getElementById('reveille').pause();
	document.getElementById('flag_up').pause();
	document.getElementById('sticks').pause();
	document.getElementById('flag_down').pause();
	document.getElementById('taps').pause();
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

		if (rowSound[i] == 'first_call' ){
			rowSoundFile[i] = document.getElementById('first_call');
		} else if ( rowSound[i] == 'reveille' ){
			rowSoundFile[i] = document.getElementById('reveille');
		} else if ( rowSound[i] == 'flag_up'){
			rowSoundFile[i] = document.getElementById('flag_up')
		} else if ( rowSound[i] == 'sticks' ){
			rowSoundFile[i] = document.getElementById('sticks');
		} else if ( rowSound[i] == 'flag_down'){
			rowSoundFile[i] = document.getElementById('flag_down')
		} else if ( rowSound[i] == 'taps' ){
			rowSoundFile[i] = document.getElementById('taps');
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
  const savedTimes = [];
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

    savedTimes.push({
      row: i,
      hour: rowHour[i],
      minute: rowMinute[i],
      sound: rowSound[i],
    });
	};
  localStorage.setItem('campSounds', JSON.stringify(savedTimes));
};

function hydrateTimes() {
  const savedTimes = JSON.parse(localStorage.getItem('campSounds') || []);
  if (savedTimes.length > 0) {
    savedTimes.forEach((time) => { // time = {row, hour, minute, sound}
      const newRow = $('<tr class="timer_row"><td class="set_time">12:00<span> AM</span></td><td class="sound_cell"><select class="sound_choice"><option value="first_call">Call to Activities</option><option value="reveille">Reveille - Wake Up</option><option value="flag_up">To the Colors - Flag Up</option><option value="sticks">Start Sticks</option><option value="flag_down">Retreat - Flag Down</option><option value="taps">Taps</option><select></td><td><button class="play_sound">Play Sound</button></td><td><button class="pause_sound">Pause</button></td><td><select class="hour">' + hourDropdown + '</select> <select class="minute">' + minuteDropdown + '</select></td><td><img class="remove_row" src="img/minus.svg" alt="Add Row" height="24px" width="24px" /></td><td><img class="add_row" src="img/plus.svg" alt="Add Row" height="24px" width="24px" /></td></tr>');
      newRow.find('.hour').val(time.hour);
      newRow.find('.minute').val(time.minute);
      newRow.find('.sound_choice').val(time.sound);
	    element = $('.auto_timer tbody').append(newRow);
      console.log(element);
    })
  }
  addClasses('timer_row row_', $('.timer_row'));
  setDisplayTimes();
}

$('table').on('change', 'select', setDisplayTimes);

$(() => {
  console.log('ready');
  hydrateTimes();
});
