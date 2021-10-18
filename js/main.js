let scene, camera, renderer, cube, skyBox;
let baseImageName = "Daylight Box";

function createPathStrings(filename) {
    const basePath = "textures/";
    const baseFile = basePath + filename;
    const fileType = ".jpg";
    const sides = ["Back", "Front", "Top", "Bottom", "Right", "Left"];
    const pathStrings = sides.map(side => {
        return baseFile + "_" + side + fileType;
    });

    return pathStrings;

} 

function createMaterialArray(filename) {
    const daylightBoxPaths = createPathStrings(filename);
    const materialArray = daylightBoxPaths.map(image => {
        let texture = new THREE.TextureLoader().load(image);
        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });

    return materialArray;
}

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    camera.position.set(10,20,10);

    // Create render
    renderer = new THREE.WebGLRenderer({antialias: true});

    // Create controls for camera movement
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Set window size
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix;
    });

    // SkyDome
    var skyBoxGeo = new THREE.BoxGeometry(50, 50, 50);
    skyBox = new THREE.Mesh(skyBoxGeo);
    const materialArray = createMaterialArray(baseImageName);
    skyBox = new THREE.Mesh(skyBoxGeo, materialArray);

    scene.add(skyBox);


    // Plane beach
    const geometryBeach = new THREE.PlaneBufferGeometry(15,20);
    geometryBeach.rotateX(4.7);
    const materialBeach = new THREE.MeshBasicMaterial( {color: 0xC2B280} );
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture} );
    const beach = new THREE.Mesh( geometryBeach, materialBeach );
    beach.position.x += 15;
    beach.position.y -= 0.5;
    scene.add(beach);

    // Cube grass
    const geometryPlane = new THREE.BoxGeometry(15,20);
    geometryPlane.rotateX(4.7);
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
    const materialPlane = new THREE.MeshBasicMaterial( {color: 0x228B22} )
    const floor = new THREE.Mesh( geometryPlane, materialPlane );
	floor.material.side = THREE.DoubleSide;
	scene.add(floor); 

    // Camping tent
    const geometryTent = new THREE.CylinderGeometry(0, 4, 5, 4, 1)
    const materialTent = new THREE.MeshNormalMaterial();
    const pyramid = new THREE.Mesh(geometryTent, materialTent);
    pyramid.position.x += 3;
    pyramid.position.y += 2.6;
    scene.add(pyramid);

    // Character
    // Head
    const geometryHead = new THREE.SphereGeometry( 1, 32, 16 );
    const materialHead = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const head = new THREE.Mesh( geometryHead, materialHead );
    head.position.y = 5;
    head.position.x = -3;
    scene.add( head );    

    // Neck
    const geometryNeck = new THREE.CylinderGeometry( 0.3, 0.3, 0.5, 14 );
    const materialNeck = new THREE.MeshBasicMaterial( {color: 0xff0f00} );
    const neck = new THREE.Mesh( geometryNeck, materialNeck );
    neck.position.y = head.position.y - 1;
    neck.position.x = head.position.x;
    scene.add( neck ); 
    
    // Body
    const geometryBody = new THREE.CylinderGeometry( 0.7, 0.7, 2, 14 );
    const materialBody = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    const body = new THREE.Mesh( geometryBody, materialBody );
    body.position.y = neck.position.y - 1.2;
    body.position.x = neck.position.x;
    scene.add( body ); 


    // Right Arm
    const geometryArm = new THREE.CylinderGeometry(0.25, 0.25, 1.3, 14);
    const materialArm = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const rightArm = new THREE.Mesh(geometryArm, materialArm);
    rightArm.position.y = body.position.y + 0.3;
    rightArm.position.x = body.position.x + 1;
    rightArm.rotateZ(Math.PI / 4);
    scene.add( rightArm );

    // Right Hand
    const geometryHand = new THREE.SphereGeometry(0.3, 32, 16);
    const materialHand = new THREE.MeshBasicMaterial( { color: 0xff00ff} );
    const rightHand = new THREE.Mesh(geometryHand, materialHand);
    rightHand.position.y = rightArm.position.y - 0.5;
    rightHand.position.x = rightArm.position.x + 0.5;
    scene.add( rightHand );

    // Left Arm
    const leftArm = new THREE.Mesh(geometryArm, materialArm);
    leftArm.position.y = body.position.y + 0.3;
    leftArm.position.x = body.position.x - 1;
    leftArm.rotateZ(3 * Math.PI / 4);
    scene.add(leftArm);

    // Left Hand
    const leftHand = new THREE.Mesh(geometryHand, materialHand);
    leftHand.position.y = leftArm.position.y - 0.5;
    leftHand.position.x = leftArm.position.x - 0.5;
    scene.add( leftHand );

    //Right Leg
    const geometryLeg = new THREE.CylinderGeometry(0.25, 0.25, 1.3, 14);
    const materialLeg = new THREE.MeshBasicMaterial( { color: 0x00ffff} );
    const rightLeg = new THREE.Mesh(geometryLeg, materialLeg);
    rightLeg.position.y = body.position.y - 1.5;
    rightLeg.position.x = body.position.x + 0.3;
    scene.add(rightLeg);

    // Left Leg
    const leftLeg = new THREE.Mesh(geometryLeg, materialLeg);
    leftLeg.position.y = body.position.y - 1.5;
    leftLeg.position.x = body.position.x - 0.3;
    scene.add(leftLeg);

    // Right Foot
    const geometryFoot = new THREE.BoxGeometry(0.5, 0.5, 1);
    const materialFoot = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const rightFoot = new THREE.Mesh(geometryFoot, materialFoot);
    rightFoot.position.y = rightLeg.position.y - 0.6;
    rightFoot.position.x = rightLeg.position.x;
    rightFoot.position.z = rightLeg.position.z + 0.25;
    scene.add(rightFoot);

    // Left Foot 
    const leftFoot = new THREE.Mesh(geometryFoot, materialFoot);
    leftFoot.position.y = leftLeg.position.y - 0.6;
    leftFoot.position.x = leftLeg.position.x;
    leftFoot.position.z = leftLeg.position.z + 0.25;
    scene.add(leftFoot);
    
}



function animate() {
    requestAnimationFrame(animate);
   // skyBox.rotation.x += 0.005;
    //skyBox.rotation.y += 0.005;
    renderer.render(scene, camera);
    controls.update();
}
// Make the scene persisten when resize the window
/* function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
} */
init();
animate();