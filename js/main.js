let scene, camera, renderer, cube;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create render var
    renderer = new THREE.WebGLRenderer({antialias: true});

    // Set window size
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // Green cube
    //const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    //const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture} );
    //cube = new THREE.Mesh( geometry, material );
    //scene.add(cube);

    //Plane grass
    const geometry = new THREE.PlaneGeometry(15, 10);
    //const texture = new THREE.TextureLoader().load('textures/grass.png');
    //const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
    const material = new THREE.MeshBasicMaterial( {color: 0x228B22} )
    const floor = new THREE.Mesh( geometry, material );
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 90;
	scene.add( floor ); 


    camera.position.z = 10;
}



function animate() {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01
    renderer.render(scene, camera);
}
// Make the scene persisten when resize the window
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
init();
animate();