let scene, camera, renderer, cube;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    camera.position.set(10,20,10);

    // Create render var
    renderer = new THREE.WebGLRenderer({antialias: true});

    // Create controls var for camera movement
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


    // Green cube
    //const geometry = new THREE.BoxGeometry();
    //const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture} );
    //cube = new THREE.Mesh( geometry, material );
    //scene.add(cube);

    //Plane grass
    const geometryPlane = new THREE.PlaneBufferGeometry(15,20);
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
}



function animate() {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01
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