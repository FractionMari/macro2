// This code is based on examples from the Diff Cam Engine:
// https://github.com/lonekorean/diff-cam-engine
// Licence:

/* Copyright (c) 2016 Will Boyd

This software is released under the MIT license: http://opensource.org/licenses/MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, merge, 
publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Denne versjonen er fra 27. mai 2021. Ryddet og stablet.
// 18. mai: Forsøker å få det til å låte smoothere.Trigger attack-release i stedet for en kontinuerlig tone.

// 9. sept 2021: Forbedrer det lydlige
// Tone JS variables:

    
    ///////// TONE.JS VARIABLES ///////////
    const gainNode = new Tone.Gain().toDestination();
    const pingPong = new Tone.PingPongDelay().connect(gainNode);
    const pitchShift = new Tone.PitchShift().connect(gainNode);
    const freeverb = new Tone.Reverb().connect(gainNode);
freeverb.dampening = 1000;
    const phaser = new Tone.Phaser({
      frequency: 15,
      octaves: 2,
      baseFrequency: 300
    }).connect(gainNode);
    const synth = new Tone.Synth({
        oscillator: {
          type: "sine"
        },
        envelope: {
            attack: 0.1,
            decay: 0.3,
            sustain: 0.4,
            release: 0.5,
        }
      })
    const synth2 = new Tone.Synth({
        oscillator: {
          type: "sine3"
        },
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.4,
          release: 0.8,
        }/* ,
        filterEnvelope: {
          attack: 0.01,
          decay: 0.7,
          sustain: 0.1,
          release: 0.8,
          baseFrequency: 300,
          octaves: 4
        } */
      })
  //  const synth3 = new Tone.PluckSynth();
    const synth3 = new Tone.Synth({
        oscillator: {
          type: "sine6"
        },
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.4,
          release: 0.5,
        }/* ,
        filterEnvelope: {
          attack: 0.001,
          decay: 0.7,
          sustain: 0.1,
          release: 0.8,
          baseFrequency: 300,
          octaves: 4
        } */
      });

    const synth5 = new Tone.MembraneSynth().connect(gainNode);
    const synth6 = new Tone.MetalSynth({
        envelope: {
            attack: 0.9,
            decay: 0.6,
            sustain: 0.4,
            release: 0.5,
          },
       volume: -6
    }
    ).connect(gainNode);

        // hi hat patterns:
        let hiPattern = [];
        const hiPattern1 = ["E1", ["0"], "F1"];
        const hiPattern2 = ["G2", ["C2", "C2", "C2"]];
        const hiPattern3 = ["G2", "F2", "A4", ["0", "234"]];

        // function for random number:
/*     function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      
      console.log(getRandomInt(3));

    if (getRandomInt(3) == 0)
        hiPattern = hiPattern1;
    if (getRandomInt(3) == 1)
        hiPattern = hiPattern2;
    else
        hiPattern = hiPattern3;
 */

    

    var pattern5 = new Tone.Sequence(function(time, note){
        synth5.triggerAttackRelease(note, 0.9);
    }, ["C1", "C1", "E4", ["C2", "C2"], "C1", "C1", "F2", "F2"]);
    pattern5.start();
    pattern5.mute = true;



    gainNode.gain.value = 0.5;
    

Tone.Transport.bpm.value = 60;



  // Random tone generator 

  // Defining frequencies

  const freq = note => 2 ** (note / 12) * 440; 
// // pentatone scales:

 // const notes = [4, 7, 9, 12, 14, 16]; 
 // const notes2 = [-5 , -3, 0,  4, 7, 9]; 
 // const notes3 = [-13 ,-10, -8, -5, -3 ,0]; 

// diatonic scales 
  const notes = [4, 6, 8, 9, 11, 13]; 
  const notes2 = [-5, -3, -2,  0, 2, 3]; 
  const notes3 = [-15 ,-13, -12, -10, -8 , -7]; 

   // const notes3 = [-8, -5, -3 ,0, 2, 4,  7, 9, 12, 14, 16, 19]; 

  let randomArray = [];
  let randomArray2 = [];
  let randomArray3 = [];
  let randomHiHatArray = [];
  function createRandomness() {
    for (var i = 0; i < 16; i += 1) {

      const randomNote = () => notes[Math.random() * notes.length | 0]; 
  
      let random = freq(randomNote());
      randomArray.push(random);
  
  
      const randomNote2 = () => notes[Math.random() * notes2.length | 0]; // the bitwise Or does the same as Math.floor
     let random2 = freq(randomNote2());
     randomArray2.push(random2);
  
     const randomNote3 = () => notes[Math.random() * notes3.length | 0]; // the bitwise Or does the same as Math.floor
     let random3 = freq(randomNote3());
     randomArray3.push(random3);
     
     // creating a random rhythm
     function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
     let random4 = getRandomInt(10)

      if (random4 > 4)
      randomHiHatArray.push((random + " " + random2).split(" "));
      if (random4 == 1)
      randomHiHatArray.push((random3 + " " + random3 + " " + random3).split(" "));
      else
      randomHiHatArray.push(random)

  };

  console.log(randomHiHatArray);
  var pattern6 = new Tone.Sequence(function(time, note){
    synth6.triggerAttackRelease(note, 0.9);
}, randomHiHatArray);
pattern6.start();
  
  }



/// DiffCam Variables:



var DiffCamEngine = (function() {

    // GLOBAL variables
	var stream;					// stream obtained from webcam
	var video;					// shows stream
	var captureCanvas;			// internal canvas for capturing full images from video
	var captureContext;			// context for capture canvas
    var initSuccessCallback;	// called when init succeeds
	var initErrorCallback;		// called when init fails
	var startCompleteCallback;	// called when start is complete
    var captureInterval;		// interval for continuous captures
	var captureIntervalTime;	// time between captures, in ms
	var captureWidth;			// full captured image width
	var captureHeight;			// full captured image height  
	var isReadyToDiff;			// has a previous capture been made to diff against?
	var pixelDiffThreshold;		// min for a pixel to be considered significant
	var scoreThreshold;			// min for an image to be considered significant

    // CANVAS 1 VARIABLES:
	var diffCanvas;				// internal canvas for diffing downscaled captures
	var diffContext;			// context for diff 
    var motionCanvas;			// receives processed diff images
    var motionContext;			// context for motion canvas
    var captureCallback;		// called when an image has been captured and diffed
    var diffWidth;				// downscaled width for diff/motion
    var diffHeight;				// downscaled height for diff/motion
    var includeMotionBox;		// flag to calculate and draw motion bounding box
	var includeMotionPixels;	// flag to create object denoting pixels with motion

    // CANVAS 2 VARIABLES:
	var diffCanvas2;			// internal canvas for diffing downscaled captures BEHOLD
	var diffContext2;			// context for diff canvas. BEHOLD
    var motionCanvas2;			// receives processed diff images for the second canvas
    var motionContext2;			// context for motion canvas
	var captureCallback2;		// called when an image has been captured and diffed BEHOLD for å monitore values til HTML
    var diffWidth2;				// downscaled width for diff/motion
    var diffHeight2;			// downscaled height for diff/motion for a second canvas
    var includeMotionBox2;		// flag to calculate and draw motion bounding box
	var includeMotionPixels2;	// flag to create object denoting pixels with motion

	
///////// CANVAS AND WEBCAM OPTIONS /////////////
function init(options) {
        // sanity check
        if (!options) {
            throw 'No options object provided';
        }

        // GLOBAL SETTINGS
        video = options.video || document.createElement('video');
        captureIntervalTime = options.captureIntervalTime || 10;
        captureWidth = options.captureWidth || 900;
        captureHeight = options.captureHeight || 500;
        pixelDiffThreshold = options.pixelDiffThreshold || 32;
        scoreThreshold = options.scoreThreshold || 16;
        initSuccessCallback = options.initSuccessCallback || function() {};
        initErrorCallback = options.initErrorCallback || function() {};
        startCompleteCallback = options.startCompleteCallback || function() {};
        captureCanvas = document.createElement('canvas');
        isReadyToDiff = false;
        video.autoplay = true;
        captureCanvas.width  = captureWidth;
        captureCanvas.height = captureHeight;
        captureContext = captureCanvas.getContext('2d');


        // CANVAS 1 SETTINGS
        motionCanvas = options.motionCanvas || document.createElement('canvas');
        diffWidth = options.diffWidth || 4;
        diffHeight = options.diffHeight || 32;
        includeMotionBox = options.includeMotionBox || false;
        includeMotionPixels = options.includeMotionPixels || false;
        captureCallback = options.captureCallback || function() {};
        diffCanvas = document.createElement('canvas');
        // prep diff canvas
        diffCanvas.width = 1;
        diffCanvas.height = diffHeight;
        diffContext = diffCanvas.getContext('2d');
        // prep motion canvas
        motionCanvas.width = diffWidth;
        motionCanvas.height = diffHeight;
        motionContext = motionCanvas.getContext('2d');


        // CANVAS 2 SETTINGS
        motionCanvas2 = options.motionCanvas2 || document.createElement('canvas2');
        diffWidth2 = options.diffWidth2 || 8;
        diffHeight2 = options.diffHeight2 || 5;
        includeMotionBox2 = options.includeMotionBox2 || false;
        includeMotionPixels2 = options.includeMotionPixels2 || false;
        captureCallback2 = options.captureCallback2 || function() {};
        diffCanvas2 = document.createElement('canvas');
        // prep second diff canvas
        diffCanvas2.width = diffWidth2;
        diffCanvas2.height = diffHeight2;
        diffContext2 = diffCanvas2.getContext('2d');
        // prep second motion canvas
        motionCanvas2.width = diffWidth2;
        motionCanvas2.height = diffHeight2;
        motionContext2 = motionCanvas2.getContext('2d');

        // If making new canvases, remember to update "diffcam.js"

        requestWebcam();

        
    }

function capture() {
    // GLOBAL save a full-sized copy of capture 
    captureContext.drawImage(video, 0, 0, captureWidth, 1);
    isReadyToDiff = true;


    // CANVAS 1:
    // behold  Koden her inne er esssensiell for oppdeling av vinduet
    // diffContext lager nye fraksjoner av canvas. difference og source-over må være likt.
    var captureImageData = captureContext.getImageData(0, 0, captureWidth, 1);
    diffContext.globalCompositeOperation = 'difference';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
    // denne forskjellen er viktig. diffContext2 er essensiell.
    var diffImageData = diffContext.getImageData(0, 0, 2, diffHeight);
    //*** behold */
    // draw current capture normally over diff, ready for next time
    diffContext.globalCompositeOperation = 'source-over';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);

    // CANVAS 2:
    var captureImageData2 = captureContext.getImageData(0, 4, captureWidth, 1);
    diffContext2.globalCompositeOperation = 'difference'; 
    diffContext2.drawImage(video, 0, 0, diffWidth2, diffHeight2);   
    // denne forskjellen er viktig. diffContext2 er essensiell.
    var diffImageData2 = diffContext2.getImageData(0, 4, diffWidth2, 1); // BEHOLD
    //*** behold */
    diffContext2.globalCompositeOperation = 'source-over';
    diffContext2.drawImage(video, 0, 0, diffWidth2, diffHeight2);

    if (isReadyToDiff) {     
        // Canvas 1 (Filter):
        // this is where you place the grid on the canvas
        // for å forklare hvor griden blir satt: det første tallet er y-aksen
        // og de andre tallet er x-aksen. Husk at bildet er speilvendt, 
        // så du teller fra venstre og bort.
        // Husk også at du starter på 0, så 5 blir nederste på y-aksen. Og 0 er borteste på y-aksen.
        var diff = processDiff(diffImageData);
        motionContext.putImageData(diffImageData, 0, 0);
        if (diff.motionBox) {
            motionContext.strokeStyle = '#fff';
            motionContext.strokeRect(
                diff.motionBox.x.min + 0.5,
                diff.motionBox.y.min + 0.5,
                diff.motionBox.x.max - diff.motionBox.x.min,
                diff.motionBox.y.max - diff.motionBox.y.min
            );
        }
        captureCallback({
            imageData: captureImageData,
            score: diff.score,
            hasMotion: diff.score >= scoreThreshold,
            motionBox: diff.motionBox,
            motionPixels: diff.motionPixels,
            getURL: function() {
                return getCaptureUrl(this.imageData);
            },
            checkMotionPixel: function(x, y) {
                return checkMotionPixel(this.motionPixels, x, y)
            }

            
                        
        });

        // Canvas 2 (Oscillator):
        var diff2 = processDiff2(diffImageData2);
        // this is where you place the grid on the canvas
        
        motionContext2.putImageData(diffImageData2, 0, 4);
        if (diff2.motionBox) {
            motionContext2.strokeStyle = '#fff';
            motionContext2.strokeRect(
                diff2.motionBox.x.min + 0.5,
                diff2.motionBox.y.min + 0.5,
                diff2.motionBox.x.max - diff2.motionBox.x.min,
                diff2.motionBox.y.max - diff2.motionBox.y.min
            );
        }
        captureCallback2({
            imageData2: captureImageData2,
            // score2 her for å gi monitoring i HTMLen (husk også å legge til i diffcam1.js )
            score2: diff2.score,
            hasMotion2: diff2.score >= 2,
            motionBox: diff2.motionBox,
            motionPixels: diff2.motionPixels,
        getURL: function() {
            return getCaptureUrl(this.imageData2);
        },
        checkMotionPixel: function(x, y) {
            return checkMotionPixel(this.motionPixels, x, y)
        }      	            
        });
    }
    }

// CANVAS 1 PROCESSING DIFF
// The first one is the Y axis, currently controling a Filter
	function processDiff(diffImageData) {
		
        var rgba = diffImageData.data;
        
		// pixel adjustments are done by reference directly on diffImageData
		var score = 0;
		var motionPixels = includeMotionPixels ? [] : undefined;
        var motionBox = undefined;
      
		for (var i = 0; i < rgba.length; i += 4) {
			var pixelDiff = rgba[i] * 0.9 + rgba[i + 1] * 0.3 + rgba[i + 2] * 0.3;
			var normalized = Math.min(255, pixelDiff * (50 / pixelDiffThreshold));         
			rgba[i] = 0;
			rgba[i + 1] = 0;
            rgba[i + 2] = normalized;
            rgba[i + 3] = normalized;
            //console.log(pixelDiff);
			if (pixelDiff >= pixelDiffThreshold) {
				score++;
				coords = calculateCoordinates(i / 4);
				if (includeMotionBox) {
					motionBox = calculateMotionBox(motionBox, coords.x, coords.y);
				}
				if (includeMotionPixels) {
					motionPixels = calculateMotionPixels(motionPixels, coords.x, coords.y, pixelDiff);	
				}
                //console.log(score * 10)
        //        let tempo = i;
        //        console.log(tempo);

        //        Tone.Transport.bpm.rampTo(tempo, 0.5);
			// A simple volume control:


            var xValue = (i * (-1)) + 249;	
            // Scaling the number with generateScaleFunction
            let filterScale = generateScaleFunction(0, 249, 0, 10);      
            xValue = filterScale(xValue);
            // This is where any value can be controlled by the number "i".
            //var normXvalue = 
            //console.log(((xValue / 10) * -1) + 1);
            pitchShift.pitch = Math.floor(xValue / 2);
            phaser.frequency.value = xValue;
            pingPong.feedback.value = xValue / 10;
            synth6.envelope.attack = xValue / 10;
            synth.envelope.attack = xValue / 10;
            synth2.envelope.attack = xValue / 10;
            synth3.envelope.attack = xValue / 10;
            //phaser.baseFrequency.rampTo(xValue, 0.2);
			}
        }

		return {
			score: xValue, 
			motionBox: score > scoreThreshold ? motionBox : undefined,
			motionPixels: motionPixels
        };  
	}

// CANVAS 2 PROCESSING DIFF
// The second one is the X axis, currently controlling pitch
	function processDiff2(diffImageData2) {
		
		var rgba = diffImageData2.data;
		// pixel adjustments are done by reference directly on diffImageData
		var score = 0;
		var motionPixels = includeMotionPixels2 ? [] : undefined;
		var motionBox = undefined;

        for (var i = 0; 
            i < rgba.length; i += 4) {
			var pixelDiff = rgba[i] * 0.9 + rgba[i + 1] * 0.3 + rgba[i + 2] * 0.3;
			var normalized2 = Math.min(255, pixelDiff * (50 / pixelDiffThreshold));
			rgba[i] = normalized2; // rød
			rgba[i + 1] = 0; // grønn
            rgba[i + 2] = 0; // blå
            rgba[i + 3] = normalized2; // lysstyrke
        
			if (pixelDiff >= pixelDiffThreshold) {
				score++;
				coords = calculateCoordinates(i / 4);
				if (includeMotionBox2) {
					motionBox = calculateMotionBox(motionBox, coords.x, coords.y);
				}
				if (includeMotionPixels2) {
					motionPixels = calculateMotionPixels(motionPixels, coords.x, coords.y, pixelDiff);			
				}

			// using the x coords to change pitch

            // A function for activation of notes:
//console.log(i);


// i vaues from left to right: 28, 24, 20, 16, 12, 8, 5
            if (i == 28)
                synth.connect(freeverb),
                document.getElementById("synth1on").innerHTML =
                "Synth 1: on";
                  
            else if (i == 24)
                synth2.connect(freeverb),
                document.getElementById("synth2on").innerHTML =
                "Synth 2: on";
            else if (i == 20)
                synth3.connect(freeverb),
                document.getElementById("synth3on").innerHTML =
                "Synth 3: on";
             else if (i == 16)
                synth.disconnect(freeverb),
                document.getElementById("synth1on").innerHTML =
                "Synth 1: off";
            else if (i == 12)
                synth2.disconnect(freeverb),
                document.getElementById("synth2on").innerHTML =
                "Synth 2: off";
            else if (i == 8)
                synth3.disconnect(freeverb),
                document.getElementById("synth3on").innerHTML =
                "Synth 3: off";

			}
        }
		return {
			score: i,
			motionBox: score > scoreThreshold ? motionBox : undefined,
			motionPixels: motionPixels
        };
	}




// Functions we don't need to duplicate:
function calculateMotionPixels(motionPixels, x, y, pixelDiff) {
    motionPixels[x] = motionPixels[x] || [];
    motionPixels[x][y] = true;

    return motionPixels;
}
function getCaptureUrl(captureImageData) {
    // may as well borrow captureCanvas
    captureContext.putImageData(captureImageData, 0, 2);
    return captureCanvas.toDataURL();
}
function checkMotionPixel(motionPixels, x, y) {
    return motionPixels && motionPixels[x] && motionPixels[x][y];
}
function getPixelDiffThreshold() {
    return pixelDiffThreshold;
}
function setPixelDiffThreshold(val) {
    pixelDiffThreshold = val;
}
function getScoreThreshold() {
    return scoreThreshold;
}
function setScoreThreshold(val) {
    scoreThreshold = val;
}
return {
    // public getters/setters
    getPixelDiffThreshold: getPixelDiffThreshold,
    setPixelDiffThreshold: setPixelDiffThreshold,
    getScoreThreshold: getScoreThreshold,
    setScoreThreshold: setScoreThreshold,

    // public functions
    init: init,
    start: start,
    stop: stop
};
function calculateCoordinates(pixelIndex) {
    return {
        x: pixelIndex % diffWidth,
        y: Math.floor(pixelIndex / diffWidth)
    };
}
function calculateMotionBox(currentMotionBox, x, y) {
    // init motion box on demand
    var motionBox = currentMotionBox || {
        x: { min: coords.x, max: x },
        y: { min: coords.y, max: y }
    };   

    motionBox.x.min = Math.min(motionBox.x.min, x);
    motionBox.x.max = Math.max(motionBox.x.max, x);
    motionBox.y.min = Math.min(motionBox.y.min, y);
    motionBox.y.max = Math.max(motionBox.y.max, y);

    return motionBox; 
}
function requestWebcam() {
    var constraints = {
        audio: false,
        video: { width: captureWidth, height: captureHeight }
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(initSuccess)
        .catch(initError);

        
}
function initSuccess(requestedStream) {
    const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.3, time);
        // subdivisions are given as subarrays
    }, randomArray).start(0);

    const seq2 = new Tone.Sequence((time, note) => {
       synth2.triggerAttackRelease(note, 0.3, time);
       // subdivisions are given as subarrays
   }, randomArray2).start(0);

   const seq3 = new Tone.Sequence((time, note) => {
       synth3.triggerAttackRelease(note, 0.3, time);
       // subdivisions are given as subarrays
   }, randomArray3).start(0);
    
    Tone.start();
    Tone.Transport.start();
    stream = requestedStream;
    initSuccessCallback();
}
function initError(error) {
    console.log(error);
    initErrorCallback();
}
function start() {
    if (!stream) {
        throw 'Cannot start after init fail';
    }

    // streaming takes a moment to start
    video.addEventListener('canplay', startComplete);
    video.srcObject = stream;
}
function startComplete() {
    video.removeEventListener('canplay', startComplete);
    captureInterval = setInterval(capture, captureIntervalTime);
    startCompleteCallback();
}
function stop() {
    clearInterval(captureInterval);
    video.src = '';
    motionContext.clearRect(0, 0, 1, diffHeight);
    isReadyToDiff = false;
}


})();


/// SCALING functions:
// With this function the values won't go below a threshold 
function clamp(min, max, val) {
    return Math.min(Math.max(min, +val), max);
  }
  
//Scaling any incoming number
function generateScaleFunction(prevMin, prevMax, newMin, newMax) {
var offset = newMin - prevMin,
    scale = (newMax - newMin) / (prevMax - prevMin);
return function (x) {
    return offset + scale * x;
    };
};