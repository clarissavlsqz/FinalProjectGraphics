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
    var skyBoxGeo = new THREE.BoxGeometry(200, 200, 200);
    skyBox = new THREE.Mesh(skyBoxGeo);
    const materialArray = createMaterialArray(baseImageName);
    skyBox = new THREE.Mesh(skyBoxGeo, materialArray);

    scene.add(skyBox);


    // Plane beach
    const geometryBeach = new THREE.PlaneBufferGeometry(115,120);
    geometryBeach.rotateX(4.7);
    const materialBeach = new THREE.MeshBasicMaterial( {color: 0xC2B280} );
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture} );
    const beach = new THREE.Mesh( geometryBeach, materialBeach );
    //beach.position.x += 15;
    //beach.position.y -= 0.5;
    scene.add(beach);

    // Cube grass
    const geometryPlane = new THREE.BoxGeometry(105,110);
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

    //Body Front = BF
    const geometryBF = new THREE.CylinderGeometry( 3, 1, 3, 32 );
    const materialBF = new THREE.MeshBasicMaterial( {color: 0x63c5da} );
    const cylinderBF = new THREE.Mesh( geometryBF, materialBF );
    cylinderBF.position.x += -65;
    cylinderBF.position.y += 5;
    cylinderBF.position.z += 20;
    cylinderBF.rotateZ(Math.PI / 2);
    cylinderBF.rotateX(Math.PI / 2);
    scene.add( cylinderBF );

    //Body Head = BH
    const geometryBH = new THREE.SphereGeometry( 1, 32, 16 );
    const materialBH = new THREE.MeshBasicMaterial( { color: 0x757c88 } );
    const headPlane = new THREE.Mesh( geometryBH, materialBH );
    headPlane.position.x = cylinderBF.position.x;
    headPlane.position.y = cylinderBF.position.y;
    headPlane.position.z = cylinderBF.position.z-2;
    scene.add( headPlane ); 

    //Body Head Ace 1= BHA1
    const geometryBHA1 = new THREE.BoxGeometry( 6, 0.8, 0.1); 
    const materialBHA1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cubeBHA1 = new THREE.Mesh( geometryBHA1, materialBHA1 );
    cubeBHA1.position.x = headPlane.position.x;
    cubeBHA1.position.y = headPlane.position.y;
    cubeBHA1.position.z = headPlane.position.z;
    scene.add( cubeBHA1 );

    //Body Head Ace 2= BHA2
    const geometryBHA2 = new THREE.BoxGeometry( 0.8, 6, 0.1); 
    const materialBHA2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cubeBHA2 = new THREE.Mesh( geometryBHA2, materialBHA2 );
    cubeBHA2.position.x = headPlane.position.x;
    cubeBHA2.position.y = headPlane.position.y;
    cubeBHA2.position.z = headPlane.position.z;
    scene.add( cubeBHA2 );

    //Body plane = BP
    const geometryBP = new THREE.CylinderGeometry( 3, 3, 7, 32 );
    const materialBP = new THREE.MeshBasicMaterial( {color: 0x63c5da} );
    const cylinderBP = new THREE.Mesh( geometryBP, materialBP );
    cylinderBP.position.x = cylinderBF.position.x;
    cylinderBP.position.y = cylinderBF.position.y;
    cylinderBP.position.z = cylinderBF.position.z + 5;
    cylinderBP.rotateZ(Math.PI / 2);
    cylinderBP.rotateX(Math.PI / 2);
    scene.add( cylinderBP );

    //Tail Main Plane = TMP
    //Tail Main Plane = TMP
    const geometryTMP = new THREE.BoxGeometry( 0.1, 7, 3 ); 
    const materialTMP = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cubeTMP = new THREE.Mesh( geometryTMP, materialTMP );
    cubeTMP.position.x = cylinderBF.position.x;
    cubeTMP.position.y += cylinderBF.position.y + 2;
    cubeTMP.position.z += cylinderBF.position.z + 8.5;
    scene.add( cubeTMP );

    //Tail Side Plane = TSP
    const geometryTSP = new THREE.BoxGeometry( 7, 0.1, 3 ); 
    const materialTSP = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cubeTSP = new THREE.Mesh( geometryTSP, materialTSP );
    cubeTSP.position.x = cubeTMP.position.x;
    cubeTSP.position.y = cubeTMP.position.y - 3;
    cubeTSP.position.z = cubeTMP.position.z;
    scene.add( cubeTSP );

    //Wing Plane = WP
    const geometryWP = new THREE.BoxGeometry( 10, 0.1, 3 ); 
    const materialWP = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cubeWP = new THREE.Mesh( geometryWP, materialWP );
    cubeWP.position.x = cylinderBF.position.x;
    cubeWP.position.y = cylinderBF.position.y + 1;
    cubeWP.position.z = cylinderBF.position.z + 5;
    scene.add( cubeWP );

    //Right Foot Plane = RFP
    const geometryRFP = new THREE.BoxGeometry( 2, 1, 10 ); 
    const materialRFP = new THREE.MeshBasicMaterial( {color: 0x63c5da} );
    const cubeRFP= new THREE.Mesh( geometryRFP, materialRFP );
    cubeRFP.position.x = cylinderBF.position.x + 2;
    cubeRFP.position.y = cylinderBF.position.y - 4;
    cubeRFP.position.z = cylinderBF.position.z + 5;
    scene.add( cubeRFP );

    //Right Foot Tube Plane = RFTP
    const geometryRFTP = new THREE.CylinderGeometry(0.25, 0.25, 2, 14);
    const materialRFTP = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const CubeRFTP = new THREE.Mesh(geometryRFTP, materialRFTP);
    CubeRFTP.position.y = cubeRFP.position.y + 1;
    CubeRFTP.position.x = cubeRFP.position.x;
    CubeRFTP.position.z = cubeRFP.position.z;
    CubeRFTP.rotateZ(Math.PI / 4);
    scene.add(CubeRFTP);

    //Left Foot Plane = LFP
    const geometryLFP = new THREE.BoxGeometry( 2, 1, 10 ); 
    const materialLFP = new THREE.MeshBasicMaterial( {color: 0x63c5da} );
    const cubeLFP = new THREE.Mesh( geometryLFP, materialLFP );
    cubeLFP.position.x = cylinderBF.position.x - 2;
    cubeLFP.position.y = cylinderBF.position.y - 4;
    cubeLFP.position.z = cylinderBF.position.z + 5;
    scene.add( cubeLFP );

    //Left Foot Tube Plane = LFTP
    const geometryLFTP = new THREE.CylinderGeometry(0.25, 0.25, 2, 14);
    const materialLFTP = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const CubeLFTP = new THREE.Mesh(geometryLFTP, materialLFTP);
    CubeLFTP.position.y = cubeLFP.position.y + 1;
    CubeLFTP.position.x = cubeLFP.position.x;
    CubeLFTP.position.z = cubeLFP.position.z;
    CubeLFTP.rotateZ(3 * Math.PI / 4);
    scene.add(CubeLFTP);

    // Trunk
    const geometry = new THREE.CylinderGeometry( 1, 1, 3, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0x492000} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x += 3;
    cylinder.position.y += 1.45;
    cylinder.position.z += -6.65;
    scene.add( cylinder );

    // Leafs Left
    const sLGeometry = new THREE.SphereGeometry( 2.5, 32, 16 );
    const sLMaterial = new THREE.MeshBasicMaterial( { color: 0x74B72E } );
    const lEsfera = new THREE.Mesh( sLGeometry, sLMaterial );
    lEsfera.position.x += 3;
    lEsfera.position.y += 4.5;
    lEsfera.position.z += -8;
    scene.add( lEsfera );

    // Leafs Mid
    const sMGeometry = new THREE.SphereGeometry( 2.5, 32, 16 );
    const sMMaterial = new THREE.MeshBasicMaterial( { color: 0x3CB043 } );
    const mEsfera = new THREE.Mesh( sMGeometry, sMMaterial );
    mEsfera.position.x += 3;
    mEsfera.position.y += 5;
    mEsfera.position.z += -7;
    scene.add( mEsfera );

    // Leafs Right
    const sRGeometry = new THREE.SphereGeometry( 2.5, 32, 16 );
    const sRMaterial = new THREE.MeshBasicMaterial( { color: 0x74B72E } );
    const rEsfera = new THREE.Mesh( sRGeometry, sRMaterial );
    rEsfera.position.x += 3;
    rEsfera.position.y += 4.5;
    rEsfera.position.z += -5;
    scene.add( rEsfera );

    // Trunk2
    const geometry2 = new THREE.CylinderGeometry( 1, 1, 3, 32 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0x492000} );
    const cylinder2 = new THREE.Mesh( geometry2, material2 );
    cylinder2.position.x += 3;
    cylinder2.position.y += 1.45;
    cylinder2.position.z += 7;
    scene.add( cylinder2 );

    // Leafs Left2
    const sLGeometry2 = new THREE.SphereGeometry( 2.5, 32, 16 );
    const sLMaterial2 = new THREE.MeshBasicMaterial( { color: 0x74B72E } );
    const lEsfera2 = new THREE.Mesh( sLGeometry2, sLMaterial2 );
    lEsfera2.position.x += 3;
    lEsfera2.position.y += 4.5;
    lEsfera2.position.z += 5.65;
    scene.add( lEsfera2 );

    // Leafs Mid2
    const sMGeometry2 = new THREE.SphereGeometry( 2.5, 32, 16 );
    const sMMaterial2 = new THREE.MeshBasicMaterial( { color: 0x3CB043 } );
    const mEsfera2 = new THREE.Mesh( sMGeometry2, sMMaterial2 );
    mEsfera2.position.x += 3;
    mEsfera2.position.y += 5;
    mEsfera2.position.z += 6.65;
    scene.add( mEsfera2 );

    // Leafs Right2
    const sRGeometry2 = new THREE.SphereGeometry( 2.5, 32, 16 );
    const sRMaterial2 = new THREE.MeshBasicMaterial( { color: 0x74B72E } );
    const rEsfera2 = new THREE.Mesh( sRGeometry2, sRMaterial2 );
    rEsfera2.position.x += 3;
    rEsfera2.position.y += 4.5;
    rEsfera2.position.z += 8.65;
    scene.add( rEsfera2 );

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

    // GiftBox
    const giftBoxGeo = new THREE.BoxGeometry();
    const materialGiftBox = new THREE.MeshBasicMaterial({ color: 0xFFB6C1});
    const giftBox = new THREE.Mesh(giftBoxGeo, materialGiftBox);
    giftBox.position.y += 10;
	scene.add(giftBox);

    // Line between box and balloon
    const materialLine = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 10,
    });
    
    const points = [];
    points.push( new THREE.Vector2(0, 10.5));
    points.push( new THREE.Vector2(0, 12));
   // points.push( new THREE.Vector3( 1, 10.5, 16 ) );
    const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
    
    const line = new THREE.Line( geometryLine, materialLine );
    
    scene.add( line );


    // Balloon
    const geometryBalloon = new THREE.SphereGeometry(0.7, 32, 16);
    const materialBalloon = new THREE.MeshBasicMaterial( { color: 0xff0000} );
    const balloon = new THREE.Mesh(geometryBalloon, materialBalloon);
    balloon.position.y += 12; 
    balloon.position.x = 0;
    scene.add( balloon );
    
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