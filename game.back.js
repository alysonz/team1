//load the AMD modules we need
require(['frozen/GameCore', 'frozen/ResourceManager', 'dojo/keys'], function(GameCore, ResourceManager, keys){

  var speed = 10.0;
  var obs_speed = 10;
 locations = {}
 locations["cat"] = {"x":100,"y":100}
 locations["coin"] = {"x":Math.floor(Math.random()*1400),"y":Math.floor(Math.random()*800)}
 

  //setup a ResourceManager to use in the game
  var rm = new ResourceManager();
  var backImg = rm.loadImage('images/background.png');
  var nyan = rm.loadImage('images/eagle.gif');
  var coin = rm.loadImage('images/bacon.gif');

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

      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        locations["cat"]["x"] -= speed;
	if (locations["cat"]["x"] > 1400) {
      		locations["cat"]["x"] = 1400;
		}
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        locations["cat"]["x"] += speed;
	if (locations["cat"]["x"] < 0) {
      		locations["cat"]["x"] = 0;
		}
      }

      if(im.keyActions[keys.UP_ARROW].isPressed()){
        locations["cat"]["y"] -= speed;
	if (locations["cat"]["y"] > 800) {
      		locations["cat"]["y"] = 800;
		}
      }

      if(im.keyActions[keys.DOWN_ARROW].isPressed()){
        locations["cat"]["y"] += speed;
	if (locations["cat"]["y"] < 0) {
      		locations["cat"]["y"] = 0;
	}
      }
    },
    update: function(millis){
	locations['coin']['x'] -= obs_speed;
	if (locations['coin']['x'] < -600) {
		locations["coin"] = {"x":1600,"y":Math.floor(Math.random()*800)}
	}

	if ((locations['coin']['x'] - locations['cat']['x'] < 100) && (locations['coin']['y'] - locations['cat']['y'] < 100)) { 
		locations["coin"] = {"x":1600,"y":Math.floor(Math.random()*800)}
		speed += 1;
		obs_speed += 1;
	}

	console.log
    },
    draw: function(context){
      context.drawImage(backImg, 0, 0, this.width, this.height);
      context.drawImage(nyan, locations['cat']['x'], locations['cat']['y']);
      context.drawImage(coin, locations['coin']['x'], locations['coin']['y']);
    }
  });

  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();
});
