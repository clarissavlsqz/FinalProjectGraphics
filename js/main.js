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

    // Clouds
    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += 20 + (Math.random() * 9);
        cloud.position.y += 40 + (Math.random() * 2); 
        scene.add(cloud);
    }

    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(25 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += 50 + ( Math.random() * 4);
        cloud.position.y += 35 + (Math.random() * 2); 
        cloud.position.z = -30;
        scene.add(cloud);
    }

    for (let i = 0; i < 20; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += -30 + (2 *  Math.random() * 5);
        cloud.position.y += 55 + (2 * Math.random() * 2.5); 
        cloud.position.z = 20;
        scene.add(cloud);
    }

    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(35 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += -15 + (2 *  Math.random() * 5);
        cloud.position.y += 25 + (2 * Math.random() * 2.5); 
        cloud.position.z = 10;
        scene.add(cloud);
    }

    for (let i = 0; i < 30; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x -= 40 + (2 *  Math.random() * 5);
        cloud.position.y += 30 + (2 * Math.random() * 2.5); 
        cloud.position.z = 40;
        scene.add(cloud);
    }

    for (let i = 0; i < 20; i++) {
        const cloudGeo = new THREE.SphereGeometry(50 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x -= 50 + (2 *  Math.random() * 5);
        cloud.position.y += 30 + (2* Math.random() * 2.5); 
        cloud.position.z -= 40;
        scene.add(cloud);
    }

    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshBasicMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += 10 + (2 *  Math.random() * 5);
        cloud.position.y += 20 + (2 * Math.random() * 2.5); 
        cloud.position.z -= 30;
        scene.add(cloud);
    }
    

    // Plane beach
    const geometryBeach = new THREE.PlaneBufferGeometry(125,130);
    geometryBeach.rotateX(4.7);
    const materialBeach = new THREE.MeshBasicMaterial( {color: 0xC2B280} );
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture} );
    const beach = new THREE.Mesh( geometryBeach, materialBeach );
    //beach.position.x += 15;
    //beach.position.y -= 0.5;
    scene.add(beach);

    // First Cube grass
    const geometryPlane = new THREE.BoxGeometry(79,115);
    geometryPlane.rotateX(4.7);
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
    const materialPlane = new THREE.MeshBasicMaterial( {color: 0x228B22} )
    const floor = new THREE.Mesh( geometryPlane, materialPlane );
	floor.material.side = THREE.DoubleSide;
    floor.position.x = beach.position.x + 14;
	scene.add(floor); 

    // River
    const geometryRiver = new THREE.BoxGeometry(9,130);
    geometryRiver.rotateX(4.7);
    const materialRiver = new THREE.MeshBasicMaterial ( {color: 0x0D64A3} );
    const river = new THREE.Mesh( geometryRiver, materialRiver);
    river.material.side = THREE.DoubleSide;
    river.position.x = floor.position.x - 44;
    scene.add(river);

    // Second Cube Grass
    const geometryPlane2 = new THREE.BoxGeometry(20,115);
    geometryPlane2.rotateX(4.7);
    const floor2 = new THREE.Mesh(geometryPlane2, materialPlane);
    floor2.material.side = THREE.DoubleSide;
    floor2.position.x = river.position.x - 14.5;
    scene.add(floor2);

    // Camping tent
    const geometryTent = new THREE.CylinderGeometry(0, 8, 10, 4, 0)
    const materialTent = new THREE.MeshNormalMaterial();
    const pyramid = new THREE.Mesh(geometryTent, materialTent);
    pyramid.position.x -= 15;
    pyramid.position.z -= 30;
    pyramid.position.y += 5.5;
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
    const trunkGeometry = new THREE.CylinderGeometry( 1, 1, 10, 32 );
    const trunkMaterial = new THREE.MeshBasicMaterial( {color: 0x492000} );
    const trunkCylinder = new THREE.Mesh( trunkGeometry, trunkMaterial );
    trunkCylinder.position.x += 3;
    trunkCylinder.position.y += 4.5;
    trunkCylinder.position.z += -6.65;
    scene.add( trunkCylinder );

    // Leafs Left
    const sLGeometry = new THREE.SphereGeometry( 3, 32, 16 );
    const sLMaterial = new THREE.MeshBasicMaterial( { color: 0x74B72E } );
    const lEsfera = new THREE.Mesh( sLGeometry, sLMaterial );
    lEsfera.position.x += 3;
    lEsfera.position.y += 8;
    lEsfera.position.z += -8;
    scene.add( lEsfera );

    // Leafs Mid
    const sMGeometry = new THREE.SphereGeometry( 3, 32, 16 );
    const sMMaterial = new THREE.MeshBasicMaterial( { color: 0x3CB043 } );
    const mEsfera = new THREE.Mesh( sMGeometry, sMMaterial );
    mEsfera.position.x += 3;
    mEsfera.position.y += 8.5;
    mEsfera.position.z += -7;
    scene.add( mEsfera );

    // Leafs Right
    const sRGeometry = new THREE.SphereGeometry( 3, 32, 16 );
    const sRMaterial = new THREE.MeshBasicMaterial( { color: 0x74B72E } );
    const rEsfera = new THREE.Mesh( sRGeometry, sRMaterial );
    rEsfera.position.x += 3;
    rEsfera.position.y += 8;
    rEsfera.position.z += -5;
    scene.add( rEsfera );

    // Trunk2
    const trunkCylinder2 = new THREE.Mesh( trunkGeometry, trunkMaterial );
    trunkCylinder2.position.x += 3;
    trunkCylinder2.position.y += 4.5;
    trunkCylinder2.position.z += 7;
    scene.add( trunkCylinder2 );

    // Leafs Left2
    const lEsfera2 = new THREE.Mesh( sLGeometry, sLMaterial );
    lEsfera2.position.x += 3;
    lEsfera2.position.y += 8;
    lEsfera2.position.z += 5.65;
    scene.add( lEsfera2 );

    // Leafs Mid2
    const mEsfera2 = new THREE.Mesh( sMGeometry, sMMaterial );
    mEsfera2.position.x += 3;
    mEsfera2.position.y += 8.5;
    mEsfera2.position.z += 6.65;
    scene.add( mEsfera2 );

    // Leafs Right2
    const rEsfera2 = new THREE.Mesh( sRGeometry, sRMaterial );
    rEsfera2.position.x += 3;
    rEsfera2.position.y += 8;
    rEsfera2.position.z += 8.65;
    scene.add( rEsfera2 );

    // Trunk3
    const trunkCylinder3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunkCylinder3.position.x += 24;
    trunkCylinder3.position.y += 4.5;
    trunkCylinder3.position.z -= 25;
    scene.add( trunkCylinder3 );

    // Leafs Left3
    const lEsfera3 = new THREE.Mesh(sLGeometry, sLMaterial);
    lEsfera3.position.x += 24;
    lEsfera3.position.y += 8.5;
    lEsfera3.position.z -= 26.65;
    scene.add( lEsfera3 );

    // Leafs Mid3
    const mEsfera3 = new THREE.Mesh( sMGeometry, sMMaterial);
    mEsfera3.position.x += 24;
    mEsfera3.position.y += 9;
    mEsfera3.position.z -= 24.65;
    scene.add( mEsfera3 );

    // Leafs Right3
    const rEsfera3 = new THREE.Mesh(sRGeometry, sRMaterial);
    rEsfera3.position.x += 24;
    rEsfera3.position.y += 8.5;
    rEsfera3.position.z -= 23.65;
    scene.add( rEsfera3 );

    // Trunk4
    const trunkCylinder4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunkCylinder4.position.x += 40;
    trunkCylinder4.position.y += 4.5;
    trunkCylinder4.position.z += 1;
    scene.add( trunkCylinder4 );

    // Leafs Left4
    const lEsfera4 = new THREE.Mesh(sLGeometry, sLMaterial);
    lEsfera4.position.x += 40;
    lEsfera4.position.y += 8.5;
    lEsfera4.position.z -= 0.65;
    scene.add( lEsfera4 );

    // Leafs Mid4
    const mEsfera4 = new THREE.Mesh( sMGeometry, sMMaterial);
    mEsfera4.position.x += 40;
    mEsfera4.position.y += 9;
    mEsfera4.position.z += 0.65;
    scene.add( mEsfera4 );

    // Leafs Right4
    const rEsfera4 = new THREE.Mesh(sRGeometry, sRMaterial);
    rEsfera4.position.x += 40;
    rEsfera4.position.y += 8.5;
    rEsfera4.position.z += 2.65;
    scene.add( rEsfera4 );

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

    // House
    const geometryHouse = new THREE.BoxGeometry(10, 10, 10);
    const materialHouse = new THREE.MeshBasicMaterial( { color: 0xf5f5dc } );
    const house = new THREE.Mesh(geometryHouse, materialHouse);
    house.position.x += 20;
    house.position.y = floor.position.y + 6;
    house.position.z += 30;
    scene.add(house);

    // First Part of Roof House (Inclined)
    const geometryRoof = new THREE.BoxGeometry(11,11,1.7);
    const materialRoof = new THREE.MeshBasicMaterial( { color: 0xc09d79 });
    const roof1 = new THREE.Mesh(geometryRoof, materialRoof);
    roof1.position.x = house.position.x;
    roof1.position.y = house.position.y + 7;
    roof1.position.z = house.position.z - 3.4;
    roof1.rotateX(Math.PI / 4);
    scene.add(roof1);

    // Second Part of Roof House (Inclined)
    const roof2 = new THREE.Mesh(geometryRoof, materialRoof);
    roof2.position.x = house.position.x;
    roof2.position.y = house.position.y + 7;
    roof2.position.z = house.position.z + 3.4;
    roof2.rotateX(3 * Math.PI / 4);
    scene.add(roof2);

    // Third Part of the Roof (Triangle)
    const geometryHouse2 = new THREE.CylinderGeometry( 0, 7, 7, 4);
    const roof3 = new THREE.Mesh(geometryHouse2, materialHouse);
    roof3.position.x = house.position.x;
    roof3.position.y = house.position.y + 8;
    roof3.position.z = house.position.z;
    roof3.rotateY(Math.PI / 4);
    scene.add(roof3);
    
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