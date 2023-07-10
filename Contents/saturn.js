//===========================================================================
// IO widget
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================var mainWindowwidthDefault = mainWindow.width;

//resizing variables
var mainWindowwidthDefault = mainWindow.width;
var mainWindowheightDefault = mainWindow.height;

var imagehoffsetDefault = image.hoffset;
var imagevoffsetDefault = image.voffset;
var imagewidthDefault = image.width;
var imageheightDefault = image.height;

var lockAreahoffsetDefault = lockArea.hoffset;
var lockAreavoffsetDefault = lockArea.voffset;
var lockAreawidthDefault = lockArea.width;
var lockAreaheightDefault = lockArea.height;

var pinhoffsetDefault = pin.hOffset;
var pinvoffsetDefault = pin.vOffset;
var pinwidthDefault = pin.width ;
var pinheightDefault = pin.height;

var tingingSound = "Resources/ting.mp3";
var currStamp = "Resources/saturn-dock.png";;
var lock = "Resources/lock.mp3";
var Scale = Number(preferences.maxWidthPref.value) / 100;

var widgetName = "saturn.widget";
var debugFlg = "";

//===========================================
// this function runs on startup
//===========================================
function startup()
{
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }	
    
    mainScreen();
    buildVitality(currStamp);
    resize();
    setmenu();
    settooltip();
    // create the licence window
    createLicence(mainWindow);


    if (preferences.lockTypePref.value == "bathysphere" ) {
       pin.src="Resources/bathysphere.png"; }
    if (preferences.lockTypePref.value == "sputnik" ) {
       pin.src="Resources/sputnik.png"; }
    if (preferences.lockTypePref.value == "soyuz" ) {
       pin.src="Resources/soyuz.png";
    }
    // set the widget lock status if pinned
    if (preferences.widgetLockPref.value === "1") {
		mainWindow.locked = true;
                log ( "Setting the locking pin ",pin.hOffset);
                pin.opacity = 255;
		pin.hOffset = preferences.pinhOffsetPref.value * Scale ;
		pin.vOffset = preferences.pinvOffsetPref.value * Scale ;
    }

}
//=====================
//End function
//=====================


//==============================
// pins the widget in place
//==============================
lockArea.onclick = function () {
//	if (!mainWindow.locked) {
		mainWindow.locked = true;
		preferences.widgetLockPref.value = "1";
		log ( "pin.hOffset ",pin.hOffset);
		log ( "pin.vOffset ",pin.vOffset);
                pin.hOffset = system.event.hOffset - 5;
		pin.vOffset = system.event.vOffset - 5;
		preferences.pinhOffsetPref.value = pin.hOffset;
		preferences.pinvOffsetPref.value = pin.vOffset;
		pin.opacity = 255;
//	}

	if (preferences.soundpref.value === "enable") {
		play(lock, false);
	}
};



//==============================
// unlocks the widget
//==============================
pin.onMouseDown = function () {
	if (mainWindow.locked) {
                mainWindow.locked = false;
	        // this does not work yet
                pin.opacity = 0;
		preferences.widgetLockPref.value = "0";
	}
	if (preferences.soundpref.value === "enable") {
		play(lock, false);
	}
};
//==============================
//
//==============================


//======================================================================================
