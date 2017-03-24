console.log(Phaser);//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var music;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){   
	game.load.image('background', 'assets/search.jpg');
	game.load.image('player', 'assets/blaziken.png');
	game.load.image('ground', 'assets/wallHorizontal.png');
	game.load.image('obstacle', 'assets/wallVertical.png');
	game.stage.backgroundColor="#000099";
	
	game.load.audio('backgroundMusic', 'assets/centuries.mp3');

};

function create(){
	game.add.tileSprite(0, 0, 800, 600, 'background');
	
	//game.physics
	game.physics.startSystem(Phaser.Physics.ARCADE);    
	//game.physics.startSystem(Phaser.Physics.ARCADE);
	//physics.arcade.enable(player);

	//player
	player = game.add.sprite(game.width/8, game.world.height*(5.7/8), 'player');
	game.physics.arcade.enable(player);
	player.scale.setTo(0.5, 0.5);
	

	//obstacle
	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(1,1);
	obstacle.anchor.setTo(0,1);
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;
	
	//platforms
	platforms = game.add.group();
	platforms.immovable = true;
	
	//ground
	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4, 1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
	
	//this sets the spacebar key as the input for this game.
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	//this sets the physics on the player in terms of gravity and bounce.
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 600;

	music = game.add.audio('backgroundMusic');
	music.play();
};


function update(){
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);                
	//this allows the player to jump only if you press the space key
	if (spaceKey.isDown){
		player.body.velocity.y = -100;
	}
	if (obstacle.x > 600) {
		obstacle.x -= 0.1;
	}
	if (obstacle.x < 0){
		obstacle.kill();
		obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
		obstacle.scale.setTo(1,1);
		obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(obstacle);
		obstacle.body.immovable = true;
	}
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();
      