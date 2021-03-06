/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

const randnum = (min, max) => Math.round(Math.random() * (max - min) + min);

//=========================================================================================== scene
var scene = new THREE.Scene();

//=========================================================================================== camera
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

//=========================================================================================== canvas
renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true; //Shadow
renderer.shadowMapSoft = true; // Shadow
renderer.shadowMapType = THREE.PCFShadowMap; //Shadow
document.body.appendChild(renderer.domElement);

//=========================================================================================== add VR
renderer.setPixelRatio(window.devicePixelRatio); //VR
var effect = new THREE.StereoEffect(renderer); //VR
effect.setSize(window.innerWidth, window.innerHeight); //VR
var VR = false;

function toggleVR() {
  if (VR) {
    VR = false;
    camera.rotation.reorder( 'ZYX' );
    camera.lookAt(0,0,0);
  } else {
    VR = true;
    controls = new THREE.DeviceOrientationControls(camera);
    requestFullscreen(document.documentElement);
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//=========================================================================================== resize
window.addEventListener("resize", function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//=========================================================================================== fog
scene.fog = new THREE.FogExp2(new THREE.Color("lightblue"), 0.005);

//=========================================================================================== light
var spotLight = new THREE.SpotLight(new THREE.Color('white'), .15);
spotLight.position.set(5, 100, 0);
spotLight.castShadow = true;
scene.add(spotLight);

var sphereLight = new THREE.SphereGeometry(.05);
var sphereLightMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color("white")
});
var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
sphereLightMesh.castShadow = true;
sphereLightMesh.position.set(0,2.5,0)
//scene.add(sphereLightMesh);

var distance = 10;
var intensity = 2.5;

var pointLight2 = new THREE.PointLight(new THREE.Color('red'), intensity, distance);
pointLight2.position.set(0, 0, -5);
scene.add(pointLight2);

var pointLight3 = new THREE.PointLight(new THREE.Color('#808000'), intensity, distance);
pointLight3.position.set(0, 0, 5);
scene.add(pointLight3);

//=========================================================================================== floor
THREE.ImageUtils.crossOrigin = '';
var floorMap = THREE.ImageUtils.loadTexture("images/texture.jpg");
floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
floorMap.repeat.set(50, 50);

var groundMaterial = new THREE.MeshPhongMaterial({
  color: new THREE.Color('#111'),
  specular: new THREE.Color('#808000'),
  //specular: new THREE.Color('#333'),
  shininess: 0,
  bumpMap: floorMap
});
var groundGeo = new THREE.PlaneGeometry(200, 200);
var ground = new THREE.Mesh(groundGeo, groundMaterial);


ground.position.set(0, 0, 0);
ground.rotation.x = (-Math.PI / 2);
ground.receiveShadow = true;
scene.add(ground);

//===================================================== add tree
//3D Model from http://www.sweethome3d.com/searchModels.jsp?model=tree&x=0&y=0
var loader = new THREE.LegacyJSONLoader();
loader.load("js/real-tree2.js", function(geometry, materials) {

  new Array(100).fill(null).map( (d, i) => {
    x = Math.cos(i/100 * Math.PI * 2) * randnum(7,50);
    z = Math.sin(i/100 * Math.PI * 2) * randnum(7,50);
    y = -1;

    var obj = new THREE.Mesh(geometry, materials);
    obj.scale.set(5, 5, 5);
    obj.castShadow = true;
    obj.position.set(x, y, z);
    scene.add(obj);
  });
});

//===================================================== add model
if (window.innerWidth > 768) {
  var leafs = [];
  loader = new THREE.LegacyJSONLoader();
  loader.load('js/single-leaf.js', function(geometry, materials) {

    //create leafs
    new Array(250).fill(null).map( (d, i) => {
      var matt = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        color: new THREE.Color('silver')
      });
      var particle = new THREE.Mesh(geometry, matt);
      particle.position.set(randnum(-10, randnum(10, 20)), 20, randnum(-10, 10));
      particle.scale.set(.5, .5, .5);
      particle.rotateY(Math.random() * 180);
      scene.add(particle);
      leafs.push(particle);
    });

    leafs.map((d, i) => {
      //position
      if (i % 2 == 0) {
        leafs[i].position.y = 0;
      } else {
        TweenMax.to(leafs[i].position, 10, {
          y: 0,
          x: randnum(-10, 10),
          ease: Power2.Linear,
          delay: 0.025 * i,
          repeat: -1
        }, 1);
      }
      //rotation
      if (i % 2 == 0) {
        leafs[i].rotation.y = 0;
      } else {
        TweenMax.to(leafs[i], 5, {
          rotationY: '+=25',
          ease: Power2.Linear,
          delay: 0.025 * i,
          repeat: -1
        }, 1);
      }
    }); //end leafs
  });
} //end if

//===================================================== models
var mixers = [];
var characterGroup = new THREE.Group();
scene.add(characterGroup);

loadModels();
function loadModels() {
  const loader = new THREE.GLTFLoader();

  loader.load('js/Reindeer.glb', function(gltf){
      var model = gltf.scene.children[ 0 ];
      model.position.set( 0, 0, -5 );
      model.scale.set( .025, .025, .025 );
      model.rotateZ(Math.PI);

      var animation = gltf.animations[ 0 ];
      var mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );

      var action = mixer.clipAction( animation );
      action.play();

      gltf.scene.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.material.side = THREE.DoubleSide;
        }
      });
      scene.add( model );
  });

  loader.load('js/Reindeer.glb', function(gltf){
      var model = gltf.scene.children[ 0 ];
      model.position.set( 10, 0, 0 );
      model.scale.set( .025, .025, .025 );
      model.rotateZ(-Math.PI/2);

      var animation = gltf.animations[ 2 ];
      var mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );

      var action = mixer.clipAction( animation );
      action.play();

      gltf.scene.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.material.side = THREE.DoubleSide;
        }
      });
      characterGroup.add( model );
  });
}//end loadModels

//=========================================================================================== model
  loader = new THREE.LegacyJSONLoader();
  loader.load('js/camp.js', function(geometry, materials) {
    var matt = new THREE.MeshLambertMaterial({
      vertexColors: THREE.FaceColors,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    });
    var wall = new THREE.Mesh(geometry, matt);
    wall.position.set(0, 0, 0);
    wall.rotateY(Math.PI);
    wall.scale.set(4, 4, 4);
    scene.add(wall);
  });

//=========================================================================================== full screen
var requestFullscreen = function(ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
}
var exitFullscreen = function(ele) {
  if (ele.exitFullscreen) {
    ele.exitFullscreen();
  } else if (ele.webkitExitFullscreen) {
    ele.webkitExitFullscreen();
  } else if (ele.mozCancelFullScreen) {
    ele.mozCancelFullScreen();
  } else if (ele.msExitFullscreen) {
    ele.msExitFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
}

//=========================================================================================== add tweening
//https://greensock.com/forums/topic/16993-threejs-properties/
Object.defineProperties(THREE.Object3D.prototype, {
  x: {
    get: function() {
      return this.position.x;
    },
    set: function(v) {
      this.position.x = v;
    }
  },
  y: {
    get: function() {
      return this.position.y;
    },
    set: function(v) {
      this.position.y = v;
    }
  },
  z: {
    get: function() {
      return this.position.z;
    },
    set: function(v) {
      this.position.z = v;
    }
  },
  rotationZ: {
    get: function() {
      return this.rotation.x;
    },
    set: function(v) {
      this.rotation.x = v;
    }
  },
  rotationY: {
    get: function() {
      return this.rotation.y;
    },
    set: function(v) {
      this.rotation.y = v;
    }
  },
  rotationX: {
    get: function() {
      return this.rotation.z;
    },
    set: function(v) {
      this.rotation.z = v;
    }
  }
});

//=========================================================================================== add Animation
let angle = 0,
  lastTime = null,
  u_frame = 0,
  clock = new THREE.Clock(),
  count = 0,
  prevTime = Date.now(),
  phase = 0;


function moveCharacter(){
    characterGroup.position.z < -75 ? (characterGroup.position.z = 75) : (characterGroup.position.z -= .50);
}

function moveLights(){
  phase += 0.03;
  sphereLightMesh.position.z = 5 - Math.cos(phase) * 5;
  sphereLightMesh.position.x = Math.sin(phase) * 5;
  pointLight3.position.copy(sphereLightMesh.position);

}

//===================================================== mouse
var mouseX = 0;
var mouseY = 0;
var zoomIn = 20;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
function onDocumentMouseMove(event) {
  mouseX = ( event.clientX - window.innerWidth / 2 ) / zoomIn;
  mouseY = ( event.clientY - window.innerHeight  / 2 ) / zoomIn;
}

(function animate() {
  //update models
  const delta = clock.getDelta();
  mixers.forEach( ( mixer ) => { mixer.update( delta * 1.25 ); } );
  moveCharacter();
  moveLights();

  //VR Mode
  if(VR){
     effect.render(scene, camera);
     controls.update();
     document.querySelector('.btn-group').classList.add('hide');
  }else{
      renderer.render(scene, camera);
      camera.position.x += ( mouseX - camera.position.x ) * .05;
      camera.lookAt( scene.position );
      document.querySelector('.btn-group').classList.remove('hide');
  }

  requestAnimationFrame(animate);

})();

//set camera position
camera.position.y = 1.5;
camera.position.z = -25;
camera.position.x = 50;