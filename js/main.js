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