//load the AMD modules we need
require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){

  var speed = 10;
  var render_offset = 0;
  var obs_speed = 10;
  var left = 0;
  var speed_left = 0;
  var speed_right = 0;
  var speed_up = 0;
  var elapsed = 0;
  var offset = -1700;
  var points = 50;
  drop_rate = 1;
  climb_power = 100;
  tick = 0;

 locations = {};
 locations["cat"] = {"x":300,"y":50}
 locations["coin"] = {"x":Math.floor(Math.random()*1400),"y":Math.floor(Math.random()*800)}
 bubbles = [{"x":1400,"y":Math.floor(Math.random()*800)}];
 background_objects = [];
 

  function move_background(dir, dist) {
  	if (dir == 1) {
		//
	}
	else {
		dist = 0 - dist;
		}
	for (var key in background_objects) { 
		background_objects[key]['x'] -= dist;
		}
	for (var key in bubbles) {
		bubbles[key]['x'] -= dist;
		if (bubbles[key]['x'] < -20) {
			bubbles[key]['popped'] = 1;
			}
		if (bubbles[key]['x'] == locations['cat']['x'] + 150) {
			if (Math.abs(bubbles[key]['y'] - locations['cat']['y']) < 100) {
				bubbles[key]['popped'] = 1;
				points += 50;
				rm.playSound(pop);
				document.getElementById("points").innerHTML=points + " Points";
				}
			}
		}


	if (bubbles[bubbles.length-1]["x"] <= 800) {
		populate_bubbles();
		}
  	}

  function populate_bubbles() {
	bubbles[0]["x"]
	for (i = 0; i<=50; i++) { 
		var my_x = bubbles[bubbles.length - 1]["x"] + 80;

		if (my_y <=500) {
			var my_y = bubbles[bubbles.length - 1]["y"] + Math.floor(Math.random()*80);
		}
		else {
			var my_y = bubbles[bubbles.length - 1]["y"] - Math.floor(Math.random()*80);
		}
		bubbles[bubbles.length] = {"x":my_x,"y":Math.floor(Math.random()*800),"popped":0};
		}
	}

  //setup a ResourceManager to use in the game
  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var nyan = rm.loadImage('images/kid.png');
  var kid_left = rm.loadImage('images/kid_left.png');
  var bubble = rm.loadImage('images/bubble.gif'); 
  var pop = rm.loadSound('pop.wav');
  var splash = rm.loadImage('images/splash.png');
  //setup a GameCore instance
  var game = new GameCore({
    canvasId: 'canvas',
    resourceManager: rm,
    initInput: function(im){ //im = this.inputManager
      //tells the input manager to listen for key events
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.UP_ARROW);
      im.addKeyAction(keys.DOWN_ARROW);
    },
    handleInput: function(im){

      //just an example showing how to check for presses, could be done more effeciently

      //if(im.keyActions[keys.LEFT_ARROW].isPressed()){
	//left = 1;
	//speed_left = 30;
      //}

      //if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
	//left = 0;
	//speed_right = 30;
      //}

      if(im.keyActions[keys.UP_ARROW].isPressed()){
	if (climb_power > 0) { 
		speed_up = climb_power/3;
      	}
	climb_power -=1;
	if (climb_power < 0) {
		climb_power = 0;
		}
      }

      if(im.keyActions[keys.DOWN_ARROW].isPressed()){
        locations["cat"]["y"] += speed;
	if (locations["cat"]["y"] >= 600 && climb_power > 1) {
      		locations["cat"]["y"] = 600;
	}
      }
      if (speed_left > 0) {
      	speed_left -= 1;
      	}
      if (speed_right > 0) {
      	speed_right -= 1;
      }
      if (speed_up > 0) {
      	speed_up -= 1;
	}
    },
    update: function(millis){
    	movement_right = speed_right - speed_left;
	locations['cat']['x'] += movement_right/3;
	locations['cat']['y'] -= speed_up/3;
	if (locations['cat']['y'] < -1) {
		locations['cat']['y'] = 0;
		}
	document.getElementById("coords").innerHTML=locations['cat']['x'] + "," + locations['cat']['y'] + "," + movement_right + "," + climb_power;
	document.getElementById("power").innerHTML= climb_power + " Power Remaining";
    	locations['cat']['y'] += drop_rate;
	if (locations['cat']['y'] >= 600) {
		locations['cat']['y'] = 600;
		}

	if (climb_power == 0) {
		speed_up -= 1;
		}

	move_background(1, speed);

	if (elapsed > 3000) { 
		
		}
	if (locations['cat']['y'] < 0) {
		offset = -1700 + (0 - locations['cat']['y']);
		if (offset >= 0) {
			offset = 0;
			}
		}
	else {
		render_offset = 0;
	}
    	elapsed = elapsed + millis;
	tick += 1;
    },
    draw: function(context){
      context.drawImage(splash, 0, 0);

      setTimeout(context.drawImage(backImg, 0, 0, 1400, 2500));
      if (left == 0) {
      	context.drawImage(nyan, locations['cat']['x'], locations['cat']['y'] + render_offset);
      }
      else {
      	context.drawImage(kid_left, locations['cat']['x'], locations['cat']['y'] + render_offset);
	}
      for (var key in bubbles) { 
	if (bubbles[key]["popped"] == 0) {
      		context.drawImage(bubble, bubbles[key]['x'], bubbles[key]["y"], 50, 50);
		}
	}
    }
  });

  //if you want to take a look at the game object in dev tools
  console.log(game);
  myAudio = new Audio('superhero.mp3');
  myAudio.loop = true;
  myAudio.play();
  //launch the game!
  populate_bubbles();
  game.run();
});
