let scene, camera, renderer, cube, skyBox, plane, ocean, river;
let baseImageName = "Daylight Box";
var clock = new THREE.Clock();

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
        return new THREE.MeshLambertMaterial({ map: texture, side: THREE.BackSide });
    });

    return materialArray;
}

function createMaterialArray2(filename) {
    const daylightBoxPaths = createPathStrings(filename);
    const materialArray = daylightBoxPaths.map(image => {
        let texture = new THREE.TextureLoader().load(image);
        return new THREE.MeshLambertMaterial({ map: texture });
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
    //renderer.outputEncoding = THREE.sRGBEncoding;
	//renderer.toneMapping = THREE.ACESFilmicToneMapping;
	//renderer.toneMappingExposure = 0.5;
    document.body.appendChild(renderer.domElement);

    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    /* const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'audio/song.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    }); */

    // LOAD 3D MODELS
    // Set loader
    var loader = new THREE.ColladaLoader();
    loader.load('models/StrcPlaneA00.Nin_NX_NVN/StrcPlaneA00.dae',function colladaReady( collada ){
        seaplane = collada.scene;
        seaplane.scale.x = seaplane.scale.y = seaplane.scale.z = 0.5;
        //player_geometry = collada.scene.children[ 0 ].geometry;
        //player_material = collada.scene.children[ 0 ].material;
        seaplane.position.x = -72;
        seaplane.position.z = 20;
        seaplane.position.y = 4;
        seaplane.rotation.y = -1.6;
        scene.add( seaplane );
        });

    var loader = new THREE.ColladaLoader();
    loader.load('models/PltWeedSmr.Nin_NX_NVN/PltWeedSmr3.dae',function colladaReady( collada ){
        weed = collada.scene;
        weed.scale.x = weed.scale.y = weed.scale.z = 0.5;
        //player_geometry = collada.scene.children[ 0 ].geometry;
        //player_material = collada.scene.children[ 0 ].material;
        weed.position.x = 9;
        weed.position.z = 15;
        weed.position.y = 0.5;
        scene.add( weed );
        });
      

    var loader = new THREE.ColladaLoader();
    loader.load('models/PltWeedSmr.Nin_NX_NVN/PltWeedSmr3.dae',function colladaReady( collada ){
        weed = collada.scene;
        weed.scale.x = weed.scale.y = weed.scale.z = 0.5;
        //player_geometry = collada.scene.children[ 0 ].geometry;
        //player_material = collada.scene.children[ 0 ].material;
        weed.position.x = -46;
        weed.position.z = 3;
        weed.position.y = 0.5;
        scene.add( weed );
        });

        var loader = new THREE.ColladaLoader();
        loader.load('models/PltWeedSmr.Nin_NX_NVN/PltWeedSmr3.dae',function colladaReady( collada ){
            weed = collada.scene;
            weed.scale.x = weed.scale.y = weed.scale.z = 0.5;
            //player_geometry = collada.scene.children[ 0 ].geometry;
            //player_material = collada.scene.children[ 0 ].material;
            weed.position.x = 30;
            weed.position.z = 6;
            weed.position.y = 0.5;
            scene.add( weed );
            });
        

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load("models/dodo-airlines/source/DODO/DODO.mtl", function(
          materials
        ) {
          materials.preload();
          // Load the object
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.load("models/dodo-airlines/source/DODO/DODO.obj", function(
            object
          ) {
            scene.add(object);
            object.position.x = -55;
            object.position.y = 1;
            object.position.z = 30;
        
            object.rotation.x = 0;
            object.rotation.y = 1.556;
            object.rotation.z = 0;

            object.scale.multiplyScalar(2);

            seaport = object;
          });
        });

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setMaterialOptions({side: THREE.DoubleSide}) ;
        mtlLoader.load("models/tent/hobj_tent_01.mtl", function(
          materials
        ) {
          materials.preload();
          // Load the object
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.load("models/tent/hobj_tent_01.obj", function(
            object
          ) {
            scene.add(object);
            object.position.x = -10;
            object.position.y = 0;
            object.position.z = -25;
        
            object.rotation.x = 0;
            object.rotation.y = 0.5;
            object.rotation.z = 0;

            object.scale.multiplyScalar(2);

            tent = object;
          });
        });

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setMaterialOptions({side: THREE.DoubleSide}) ;
        mtlLoader.load("models/Present/fg_present.mtl", function(
          materials
        ) {
          materials.preload();
          // Load the object
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.load("models/Present/fg_present.obj", function(
            object
          ) {
            scene.add(object);
            object.position.x = 0;
            object.position.y = 9.5;
            object.position.z = 0;
        
            object.rotation.x = 0;
            object.rotation.y = 0
            object.rotation.z = 0;

            object.scale.multiplyScalar(0.1);

            present = object;
          });
        });

    window.addEventListener('resize', function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix;
    });

    // Sky
    const sky = new THREE.Sky();
    sky.scale.setScalar(500);
    scene.add(sky);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sun = new THREE.Vector3();

	// Defining the x, y and z value for our 3D Vector
    const theta = Math.PI * (0.49 - 0.5);
    const phi = 2 * Math.PI * (0.205 - 0.5);
    sun.x = Math.cos(phi);
    sun.y = Math.sin(phi) * Math.sin(theta);
    sun.z = Math.sin(phi) * Math.cos(theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    scene.environment = pmremGenerator.fromScene(sky).texture;
    scene.add(sun);

    // Lighting
    var light = new THREE.PointLight( 0xed8728, 5, 70 );
    light.position.set( -20, 50, -75 );
    light.castShadow = true;
    scene.add( light );

    // Ocean
    const oceanGeometry = new THREE.PlaneGeometry( 500, 500 );
    ocean = new THREE.Water(
        oceanGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            alpha: 1.0,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    
    ocean.rotation.x = - Math.PI / 2;
    ocean.position.y = -1.05;
    ocean.receiveShadow = true;
    scene.add( ocean );

    // Defining the x, y and z value for our 3D Vector
    const theta = Math.PI * (0.49 - 0.5);
    const phi = 2 * Math.PI * (0.205 - 0.5);
    sun.x = Math.cos(phi);
    sun.y = Math.sin(phi) * Math.sin(theta);
    sun.z = Math.sin(phi) * Math.cos(theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    ocean.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();
    scene.environment = pmremGenerator.fromScene(sky).texture;
    scene.add(sun);

    // SkyDome
    var skyBoxGeo = new THREE.BoxGeometry(500, 500, 500);
    skyBox = new THREE.Mesh(skyBoxGeo);
    scene.add(skyBox);

    // Clouds
    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += 20 + (Math.random() * 9);
        cloud.position.y += 40 + (Math.random() * 2); 
        cloud.castShadow = true;
        scene.add(cloud);
    }

    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(25 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += 50 + ( Math.random() * 4);
        cloud.position.y += 35 + (Math.random() * 2); 
        cloud.position.z = -30;
        cloud.castShadow = true;
        scene.add(cloud);
    }

    for (let i = 0; i < 20; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += -30 + (2 *  Math.random() * 5);
        cloud.position.y += 55 + (2 * Math.random() * 2.5); 
        cloud.position.z = 20;
        cloud.castShadow = true;
        scene.add(cloud);
    }

    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(35 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += -15 + (2 *  Math.random() * 5);
        cloud.position.y += 25 + (2 * Math.random() * 2.5); 
        cloud.position.z = 10;
        cloud.castShadow = true;
        scene.add(cloud);
    }

    for (let i = 0; i < 30; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x -= 40 + (2 *  Math.random() * 5);
        cloud.position.y += 30 + (2 * Math.random() * 2.5); 
        cloud.position.z = 40;
        cloud.castShadow = true;
        scene.add(cloud);
    }

    for (let i = 0; i < 20; i++) {
        const cloudGeo = new THREE.SphereGeometry(50 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x -= 50 + (2 *  Math.random() * 5);
        cloud.position.y += 30 + (2* Math.random() * 2.5); 
        cloud.position.z -= 40;
        cloud.castShadow = true;
        scene.add(cloud);
    }

    for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.SphereGeometry(40 * Math.random() * 0.1, 32, 16);
        const cloudMaterial = new THREE.MeshLambertMaterial({color: 0xFAF9F6});
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.x += 10 + (2 *  Math.random() * 5);
        cloud.position.y += 20 + (2 * Math.random() * 2.5); 
        cloud.position.z -= 30;
        cloud.castShadow = true;
        scene.add(cloud);
    }
    

    // Cube beach
    const geometryBeach = new THREE.BoxGeometry(125,130);
    geometryBeach.rotateX(4.7);
    const textureBeach = new THREE.TextureLoader();
    const materialBeach = new THREE.MeshLambertMaterial( {map: textureBeach.load("textures/mSand_Alb.png")} );
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshLambertMaterial( {map: texture} );
    const beach = new THREE.Mesh( geometryBeach, materialBeach );
    beach.position.y -= 0.5;
    beach.receiveShadow = true;
    scene.add(beach);

    var light1 = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light1);

    // var light2 = new THREE.PointLight(0xffffff, 0.5);
    // scene.add(light2);

    // Rock - Change to MeshStandard if needed for light
    const geometryRock = new THREE.DodecahedronGeometry(10, 0);
    const textureRock = new THREE.TextureLoader();
    const materialRock = new THREE.MeshLambertMaterial({map: textureRock.load("textures/mbody_alb.png")});
                                                        //normalMap: textureRock.load("textures/mbody_nrm.png"),
                                                        //roughnessMap:textureRock.load("textures/Rough_Rock_023_ROUGH.jpg"),
                                                        //roughness: 0.5,
                                                        //aoMap: textureRock.load("textures/mbody_ao.png"
    const rock1 = new THREE.Mesh(geometryRock, materialRock);
    rock1.position.x = 60;
    rock1.position.z = 58;
    rock1.position.y = 5;
    scene.add(rock1);

    const rock2 = new THREE.Mesh(geometryRock, materialRock);
    rock2.position.x = 60;
    rock2.position.z = 45;
    rock2.position.y = 5;
    scene.add(rock2);

    const rock3 = new THREE.Mesh(geometryRock, materialRock);
    rock3.position.x = 55;
    rock3.position.z = 65;
    rock3.position.y = 5;
    scene.add(rock3);


    // First Cube grass
    const geometryPlane = new THREE.BoxGeometry(79,115, 3);
    geometryPlane.rotateX(4.7);
    const textureGrass = new THREE.TextureLoader().load("textures/ac-grass.png");
    textureGrass.wrapS = textureGrass.wrapT = THREE.RepeatWrapping; 
	textureGrass.repeat.set( 15, 15 );
    //const materialGrass = new THREE.MeshLambertMaterial( {map: texture, side: THREE.DoubleSide} );
    const materialPlane = new THREE.MeshLambertMaterial( {map: textureGrass});
    const floor = new THREE.Mesh( geometryPlane, materialPlane );
	floor.material.side = THREE.DoubleSide;
    floor.position.x = beach.position.x + 14;
    floor.position.y = -0.945;
    floor.receiveShadow = true;
	scene.add(floor); 

    // River
    const geometryRiver = new THREE.BoxGeometry(9,131);
    geometryRiver.rotateX(4.7);
    //const materialRiver = new THREE.MeshLambertMaterial ( {color: 0x0D64A3} );
    const river = new THREE.Water(
        geometryRiver,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    river.material.side = THREE.DoubleSide;
    river.position.x = floor.position.x - 44;
    river.position.y = 0.5;
    scene.add(river);

    // Second Cube Grass
    const geometryPlane2 = new THREE.BoxGeometry(20,115, 5);
    geometryPlane2.rotateX(4.7);
    const textureGrass2 = new THREE.TextureLoader().load("textures/ac-grass.png");
    textureGrass2.wrapS = textureGrass2.wrapT = THREE.RepeatWrapping; 
	textureGrass2.repeat.set( 3, 15 );
    const materialPlane2 = new THREE.MeshLambertMaterial( {map: textureGrass2});
    const floor2 = new THREE.Mesh(geometryPlane2, materialPlane2);
    floor2.material.side = THREE.DoubleSide;
    floor2.position.x = river.position.x - 14.5;
    floor2.position.y = -1.5;
    scene.add(floor2);

    // Fossil Hole
    const geometryFossilHole = new THREE.CircleGeometry(2, 24);
    const textureFossilHole = new THREE.TextureLoader();
    const materialFossilHole = new THREE.MeshLambertMaterial({map: textureFossilHole.load("textures/muniticonholeoff_alb.png")});
    const fossilHole = new THREE.Mesh(geometryFossilHole, materialFossilHole);
    fossilHole.position.x = 20;
    fossilHole.position.y = 0.58;
    fossilHole.rotation.x = Math.PI / 2;;
    fossilHole.material.side = THREE.DoubleSide;
    scene.add(fossilHole);


    // Camping tent
    const geometryTent = new THREE.CylinderGeometry(0, 8, 10, 4, 0);
    const textureTent = new THREE.TextureLoader();
    const materialTent = new THREE.MeshLambertMaterial({map: textureTent.load("textures/mDoortent_Alb.png")});
    pyramid = new THREE.Mesh(geometryTent, materialTent);
    pyramid.position.x -= 15;
    pyramid.position.z -= 30;
    pyramid.position.y += 4.5;
    scene.add(pyramid);

    // Open tent
    const geometryDoorTent = new THREE.CylinderGeometry(0, 8, 10, 4, 0);
    const materialDoorTent = new THREE.MeshLambertMaterial({color: 0x000000});
    doorTent = new THREE.Mesh(geometryDoorTent, materialDoorTent);
    doorTent.position.x -= 15;
    doorTent.position.z -= 27.5;
    doorTent.position.y += 1.5;
    doorTent.material.side = THREE.DoubleSide;
    scene.add(doorTent);

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry( 1, 1, 10, 32 );
    const textureTrunk = new THREE.TextureLoader().load("textures/Bark.jpg");
    const trunkMaterial = new THREE.MeshLambertMaterial( { map: textureTrunk} );
    const trunkCylinder = new THREE.Mesh( trunkGeometry, trunkMaterial );
    trunkCylinder.position.x += 3;
    trunkCylinder.position.y += 4.5;
    trunkCylinder.position.z += -6.65;
    scene.add( trunkCylinder );

    // Leafs Left
    const sLGeometry = new THREE.SphereGeometry( 3, 32, 16 );
    const textureLeafLeft = new THREE.TextureLoader().load("textures/LeafLeft.jpg");
    const sLMaterial = new THREE.MeshLambertMaterial( { map: textureLeafLeft } );
    const lEsfera = new THREE.Mesh( sLGeometry, sLMaterial );
    lEsfera.position.x += 3;
    lEsfera.position.y += 8;
    lEsfera.position.z += -8;
    scene.add( lEsfera );

    // Leafs Mid
    const sMGeometry = new THREE.SphereGeometry( 3, 32, 16 );
    const sMMaterial = new THREE.MeshLambertMaterial( { map: textureLeafLeft } );
    const mEsfera = new THREE.Mesh( sMGeometry, sMMaterial );
    mEsfera.position.x += 3;
    mEsfera.position.y += 9;
    mEsfera.position.z += -7;
    scene.add( mEsfera );

    // Leafs Right
    const sRGeometry = new THREE.SphereGeometry( 3, 32, 16 );
    const sRMaterial = new THREE.MeshLambertMaterial( { map: textureLeafLeft } );
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
    mEsfera2.position.y += 9;
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
    mEsfera3.position.y += 10;
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
    mEsfera4.position.y += 10;
    mEsfera4.position.z += 0.65;
    scene.add( mEsfera4 );

    // Leafs Right4
    const rEsfera4 = new THREE.Mesh(sRGeometry, sRMaterial);
    rEsfera4.position.x += 40;
    rEsfera4.position.y += 8.5;
    rEsfera4.position.z += 2.65;
    scene.add( rEsfera4 );

     // Trunk5
     const trunkCylinder5 = new THREE.Mesh(trunkGeometry, trunkMaterial);
     trunkCylinder5.position.x += 19;
     trunkCylinder5.position.y += 4.5;
     trunkCylinder5.position.z += 45;
     scene.add( trunkCylinder5 );
 
     // Leafs Left5
     const lEsfera5 = new THREE.Mesh(sLGeometry, sLMaterial);
     lEsfera5.position.x += 19;
     lEsfera5.position.y += 8.5;
     lEsfera5.position.z += 43.65;
     scene.add( lEsfera5 );
 
     // Leafs Mid5
     const mEsfera5 = new THREE.Mesh( sMGeometry, sMMaterial);
     mEsfera5.position.x += 19;
     mEsfera5.position.y += 10;
     mEsfera5.position.z += 44.65;
     scene.add( mEsfera5 );
 
     // Leafs Right5
     const rEsfera5 = new THREE.Mesh(sRGeometry, sRMaterial);
     rEsfera5.position.x += 19;
     rEsfera5.position.y += 8.5;
     rEsfera5.position.z += 45.65;
     scene.add( rEsfera5 );

    // Trunk6
    const trunkCylinder6 = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunkCylinder6.position.x = 43;
    trunkCylinder6.position.y += 4.5;
    trunkCylinder6.position.z = -40;
    scene.add( trunkCylinder6 );
      
    // Leafs Left6
    const lEsfera6 = new THREE.Mesh(sLGeometry, sLMaterial);
    lEsfera6.position.x += 43;
    lEsfera6.position.y += 8.5;
    lEsfera6.position.z = -41.65;
    scene.add( lEsfera6 );
      
    // Leafs Mid6
    const mEsfera6 = new THREE.Mesh( sMGeometry, sMMaterial);
    mEsfera6.position.x += 43;
    mEsfera6.position.y += 10;
    mEsfera6.position.z = -39.65;
    scene.add( mEsfera6 );
      
    // Leafs Right6
    const rEsfera6 = new THREE.Mesh(sRGeometry, sRMaterial);
    rEsfera6.position.x += 43;
    rEsfera6.position.y += 8.5;
    rEsfera6.position.z = -38.65;
    scene.add( rEsfera6 );

    // Trunk7
    const trunkCylinder7 = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunkCylinder7.position.x = 14;
    trunkCylinder7.position.y += 4.5;
    trunkCylinder7.position.z = -40;
    scene.add( trunkCylinder7 );
      
    // Leafs Left7
    const lEsfera7 = new THREE.Mesh(sLGeometry, sLMaterial);
    lEsfera7.position.x += 14;
    lEsfera7.position.y += 8.5;
    lEsfera7.position.z = -41.65;
    scene.add( lEsfera7 );
      
    // Leafs Mid7
    const mEsfera7 = new THREE.Mesh( sMGeometry, sMMaterial);
    mEsfera7.position.x += 14;
    mEsfera7.position.y += 10;
    mEsfera7.position.z = -39.65;
    scene.add( mEsfera7 );
      
    // Leafs Right7
    const rEsfera7 = new THREE.Mesh(sRGeometry, sRMaterial);
    rEsfera7.position.x += 14;
    rEsfera7.position.y += 8.5;
    rEsfera7.position.z = -38.65;
    scene.add( rEsfera7 );

     // Trunk8
     const trunkCylinder8 = new THREE.Mesh(trunkGeometry, trunkMaterial);
     trunkCylinder8.position.x = -10;
     trunkCylinder8.position.y += 4.5;
     trunkCylinder8.position.z = 15;
     scene.add( trunkCylinder8 );
       
     // Leafs Left8
     const lEsfera8 = new THREE.Mesh(sLGeometry, sLMaterial);
     lEsfera8.position.x += -10;
     lEsfera8.position.y += 8.5;
     lEsfera8.position.z = 16.65;
     scene.add( lEsfera8 );
       
     // Leafs Mid8
     const mEsfera8 = new THREE.Mesh( sMGeometry, sMMaterial);
     mEsfera8.position.x +=-10;
     mEsfera8.position.y += 10;
     mEsfera8.position.z = 14.65;
     scene.add( mEsfera8 );
       
     // Leafs Right8
     const rEsfera8 = new THREE.Mesh(sRGeometry, sRMaterial);
     rEsfera8.position.x += -10;
     rEsfera8.position.y += 8.5;
     rEsfera8.position.z = 13.65;
     scene.add( rEsfera8 );
 

    // Character
    // Head
    const geometryHead = new THREE.SphereGeometry( 1, 32, 16 );
    const textureHead = new THREE.TextureLoader().load("textures/Head.jpg");
    const materialHead = new THREE.MeshLambertMaterial( { map: textureHead } );
    const head = new THREE.Mesh( geometryHead, materialHead );
    head.position.y = 5;
    head.position.x = -3;
    
    //Hair
    const geometryHair = new THREE.SphereGeometry(0.3, 32, 16);
    const materialHair = new THREE.MeshLambertMaterial( {color: 0x6b4d3c });
    const hair1 = new THREE.Mesh( geometryHair, materialHair );
    hair1.position.y = head.position.y + 0.7;
    hair1.position.x = head.position.x + 0.7;
    scene.add(hair1);
    const hair2 = new THREE.Mesh( geometryHair, materialHair );
    hair2.position.y = head.position.y + 0.7;
    hair2.position.x = head.position.x - 0.7;

    // Neck
    const geometryNeck = new THREE.CylinderGeometry( 0.3, 0.3, 0.3, 14 );
    const materialNeck = new THREE.MeshLambertMaterial( {color: 0xf8b890} );
    const neck = new THREE.Mesh( geometryNeck, materialNeck );
    neck.position.y = head.position.y - 1;
    neck.position.x = head.position.x;
    
    // Body
    const geometryBody = new THREE.CylinderGeometry( 0.3, 0.8, 2.2, 14 );
    const textureBody = new THREE.TextureLoader().load("textures/Body.jpg");
    const materialBody = new THREE.MeshLambertMaterial( { map: textureBody } );
    const body = new THREE.Mesh( geometryBody, materialBody );
    body.position.y = neck.position.y - 1.2;
    body.position.x = neck.position.x;


    // Right Arm
    const geometryArm = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 14);
    const materialArm = new THREE.MeshLambertMaterial({ color: 0xf8b890 });
    const rightArm = new THREE.Mesh(geometryArm, materialArm);
    rightArm.position.y = body.position.y + 0.5;
    rightArm.position.x = body.position.x + 0.5;
    rightArm.rotateZ(Math.PI / 4);

    // Right Hand
    const geometryHand = new THREE.SphereGeometry(0.3, 32, 16);
    const materialHand = new THREE.MeshLambertMaterial( { color: 0xf8b890} );
    const rightHand = new THREE.Mesh(geometryHand, materialHand);
    rightHand.position.y = rightArm.position.y - 0.5;
    rightHand.position.x = rightArm.position.x + 0.5;

    // Left Arm
    const leftArm = new THREE.Mesh(geometryArm, materialArm);
    leftArm.position.y = body.position.y + 0.5;
    leftArm.position.x = body.position.x - 0.5;
    leftArm.rotateZ(3 * Math.PI / 4);

    // Left Hand
    const leftHand = new THREE.Mesh(geometryHand, materialHand);
    leftHand.position.y = leftArm.position.y - 0.5;
    leftHand.position.x = leftArm.position.x - 0.5;

    //Right Leg
    const geometryLeg = new THREE.CylinderGeometry(0.15, 0.15, 1.6, 14);
    const materialLeg = new THREE.MeshLambertMaterial( { color: 0xf8b890 } );
    const rightLeg = new THREE.Mesh(geometryLeg, materialLeg);
    rightLeg.position.y = body.position.y - 1.5;
    rightLeg.position.x = body.position.x + 0.3;

    // Left Leg
    const leftLeg = new THREE.Mesh(geometryLeg, materialLeg);
    leftLeg.position.y = body.position.y - 1.5;
    leftLeg.position.x = body.position.x - 0.3;

    // Right Foot
    const geometryFoot = new THREE.BoxGeometry(0.5, 0.2, 1);
    const materialFoot = createMaterialArray2("Foot");
    const rightFoot = new THREE.Mesh(geometryFoot, materialFoot);
    rightFoot.position.y = rightLeg.position.y - 0.7;
    rightFoot.position.x = rightLeg.position.x;
    rightFoot.position.z = rightLeg.position.z + 0.25;

    // Left Foot 
    const leftFoot = new THREE.Mesh(geometryFoot, materialFoot);
    leftFoot.position.y = leftLeg.position.y - 0.7;
    leftFoot.position.x = leftLeg.position.x;
    leftFoot.position.z = leftLeg.position.z + 0.25;

    // Create group for character
    const character = new THREE.Group();
    character.add( head );
    character.add(hair1);
    character.add(hair2);
    character.add( neck ); 
    character.add( body );
    character.add( rightArm );
    character.add( rightHand );
    character.add(leftArm);
    character.add( leftHand );
    character.add(rightLeg);
    character.add(leftLeg);
    character.add(rightFoot);
    character.add(leftFoot);
    scene.add(character);

    // GiftBox
    // const giftBoxGeo = new THREE.BoxGeometry();
    // const giftTexture = new THREE.TextureLoader();
    // const materialGiftBox = new THREE.MeshLambertMaterial({ map: giftTexture.load("textures/paper_0010_base_color_2k.jpg")});
    // const giftBox = new THREE.Mesh(giftBoxGeo, materialGiftBox);
    // giftBox.position.y += 10;
	// scene.add(giftBox);

    // Line between box and balloon
    const materialLine = new THREE.LineBasicMaterial({
        color: 0x000000,
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
    const materialBalloon = new THREE.MeshPhongMaterial( { color: 0xff0000} );
    const balloon = new THREE.Mesh(geometryBalloon, materialBalloon);
    balloon.position.y += 12; 
    balloon.position.x = 0;
    scene.add( balloon );

    // House
    const geometryHouse = new THREE.BoxGeometry(10, 10, 10);
    const materialHouse = createMaterialArray2("House");
    const house = new THREE.Mesh(geometryHouse, materialHouse);
    house.position.x += 20;
    house.position.y = floor.position.y + 6;
    house.position.z += 30;
    scene.add(house);

    // First Part of Roof House (Inclined)
    const geometryRoof = new THREE.BoxGeometry(11,11,1.7);
    const materialRoof = createMaterialArray2("Roof");
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

    // Chimney 
    const geometryChimney = new THREE.BoxGeometry(2,4,2);
    const textureChimney = new THREE.TextureLoader().load("textures/Chimney.jpg");
    const materialChimney = new THREE.MeshLambertMaterial( { map: textureChimney } );
    const chimney = new THREE.Mesh(geometryChimney, materialChimney);
    chimney.position.x = house.position.x;
    chimney.position.y = house.position.y + 9;
    chimney.position.z = house.position.z + 3;
    scene.add(chimney);

    // Mailbox
    const geometryStickMail = new THREE.BoxGeometry(0.5,3,0.5);
    const textureStickMailbox = new THREE.TextureLoader().load("textures/StickMailbox.jpg");
    const materialStickMailbox = new THREE.MeshLambertMaterial( {map: textureStickMailbox } );
    const stickMail = new THREE.Mesh(geometryStickMail, materialStickMailbox);
    stickMail.position.x = house.position.x - 9;
    stickMail.position.y += 2.5;
    stickMail.position.z = house.position.z - 3;
    scene.add(stickMail);

    // Box of mail
    const geometryBoxmail = new THREE.BoxGeometry(2,2,2);
    const materialMailbox = createMaterialArray2("Mailbox");
    const mailBox = new THREE.Mesh(geometryBoxmail, materialMailbox);
    mailBox.position.x = stickMail.position.x;
    mailBox.position.y = stickMail.position.y + 1.5;
    mailBox.position.z = stickMail.position.z;
    scene.add(mailBox);

    // Table 
    const geometryTable = new THREE.CylinderGeometry(5,5,1,32);
    const textureTable = new THREE.TextureLoader().load("textures/Wood.jpg");
    const materialTable = new THREE.MeshLambertMaterial( { map: textureTable });
    const table = new THREE.Mesh(geometryTable, materialTable);
    table.position.x -= 2;
    table.position.y = floor.position.y + 3;
    table.position.z += 40;
    scene.add(table)

    // Table leg
    const geometryLegTable = new THREE.CylinderGeometry(1,1,2.5,32);
    const legTable = new THREE.Mesh(geometryLegTable, materialTable);
    legTable.position.x = table.position.x;
    legTable.position.y = floor.position.y + 1.5;
    legTable.position.z = table.position.z;
    scene.add(legTable);

    // Chair 1 for table
    const geometryChair = new THREE.CylinderGeometry(2,2,2,32);
    const textureChair = new THREE.TextureLoader().load("textures/Chair.jpg");
    const materialChair = new THREE.MeshLambertMaterial( { map: textureChair });
    const chair1 = new THREE.Mesh(geometryChair, materialChair);
    chair1.position.x = table.position.x;
    chair1.position.y = floor.position.y + 1.5;
    chair1.position.z = table.position.z + 7.5;
    scene.add(chair1);

    // Chair 2 for table
    const chair2 = new THREE.Mesh(geometryChair, materialChair);
    chair2.position.x = table.position.x;
    chair2.position.y = floor.position.y + 1.5;
    chair2.position.z = table.position.z - 7.5;
    scene.add(chair2);

    // Pier
    // Leg1
    const geometryPierShortLeg = new THREE.CylinderGeometry(1,1, 2, 32);
    const texturePier = new THREE.TextureLoader();
    const materialPierLeg = new THREE.MeshLambertMaterial({map: texturePier.load("textures/GameCube - Animal Crossing - Wallpaper.png")});
    const leg1 = new THREE.Mesh(geometryPierShortLeg, materialPierLeg);
    leg1.position.x = 10;
    leg1.position.y = 0;
    leg1.position.z -= 60;
    scene.add(leg1);

    //Leg2
    const leg2 = new THREE.Mesh(geometryPierShortLeg, materialPierLeg);
    leg2.position.x = leg1.position.x + 7;
    leg2.position.y = 0;
    leg2.position.z -= 60;
    scene.add(leg2);

    //Leg3
    const geometryPierLongLeg = new THREE.CylinderGeometry(1,1, 10, 32);
    const leg3 = new THREE.Mesh(geometryPierLongLeg, materialPierLeg);
    leg3.position.x = leg1.position.x;
    leg3.position.y -= 4.5;
    leg3.position.z -= 73;
    scene.add(leg3);

    // Leg4
    const leg4 = new THREE.Mesh(geometryPierLongLeg, materialPierLeg);
    leg4.position.x = leg2.position.x;
    leg4.position.y -= 4.5;
    leg4.position.z -= 73;
    scene.add(leg4);


    // Deck of pier
    const geometryPier = new THREE.BoxGeometry(10, 20, 1);
    geometryPier.rotateX(4.7);
    const deckPierTexture = new THREE.TextureLoader();
    const materialPier = new THREE.MeshLambertMaterial({map: deckPierTexture.load("textures/GameCube - Animal Crossing - Wallpaper.png") });
    const pier = new THREE.Mesh(geometryPier, materialPier);
    pier.position.x = 13.5;
    pier.position.y = 1;
    pier.position.z -= 66;
    scene.add(pier);

    // movement - please calibrate these values
    var xSpeed = 0.08;
    var zSpeed = 0.08;
    
    // Get if a key has been pressed
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if(keyCode == 65 && character.position.x > -10) {
            character.translateX(-xSpeed);
        }
        else if(keyCode == 68 && character.position.x < 3) {
            character.translateX(xSpeed);
        }
        else if(keyCode == 83 && character.position.z > -10) {
            character.translateZ(-zSpeed);
        }
        else if(keyCode == 87 && character.position.z < 10) {
            character.translateZ(zSpeed);
        }
    }

    
    
}



function animate() {
    requestAnimationFrame(animate);
   // skyBox.rotation.x += 0.005;
    //skyBox.rotation.y += 0.005;
    //renderer.render(scene, camera);
    render();
    controls.update();
}
// Make the scene persisten when resize the window
/* function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
} */

function render() {
    ocean.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    river.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    var t = clock.getElapsedTime();
    
    if (t >= 6.0) {
        clock = new THREE.Clock;
        tent.scale.set(3,3,3);

    } else {
        tent.scale.x = 3-(3*t/6.0);
    	tent.scale.y = 3-(3*t/6.0);
		tent.scale.z = 3-(3*t/6.0);    
    }

    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    renderer.render( scene, camera );

}

init();
animate();