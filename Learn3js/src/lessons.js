import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* Helper to setup basic scene */
function setupBase(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const onResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return { scene, camera, renderer, controls, onResize, domElement: renderer.domElement };
}

export const lessons = [
    {
        id: 1,
        title: "1. The Hello Cube",
        description: `
            <h3>Your First 3D Object</h3>
            <p>Welcome to Three.js! A basic scene needs 3 things:</p>
            <ul>
                <li><strong>Scene</strong>: The container for all objects.</li>
                <li><strong>Camera</strong>: The point of view.</li>
                <li><strong>Renderer</strong>: Draws the scene to the screen.</li>
            </ul>
            <p><strong>Task:</strong> Rotate the cube manually by clicking the 'Rotate' button below.</p>
        `,
        tasks: [
            { id: 'view', text: 'View the red cube' },
            { id: 'rotate', text: 'Rotate the cube using the button' }
        ],
        init: (container, onTaskComplete) => {
            const { scene, camera, renderer, controls, onResize, domElement } = setupBase(container);
            
            // 1. Create Geometry
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            // 2. Create Material
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            // 3. Create Mesh
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            camera.position.z = 5;

            // Render loop
            let animationId;
            function animate() {
                animationId = requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();

            // API for interaction
            const actions = {
                rotateCube: () => {
                    cube.rotation.x += 0.5;
                    cube.rotation.y += 0.5;
                    onTaskComplete('rotate');
                }
            };

            // Cleanup
            return {
                dispose: () => {
                    window.removeEventListener('resize', onResize);
                    cancelAnimationFrame(animationId);
                    domElement.remove();
                    geometry.dispose();
                    material.dispose();
                },
                actions
            };
        }
    },
    {
        id: 2,
        title: "2. Materials & Light",
        description: `
            <h3>Let there be Light!</h3>
            <p>Does the previous cube look flat? That's because <code>MeshBasicMaterial</code> doesn't react to light.</p>
            <p>To see depth, we need:</p>
            <ul>
                <li>A material that reacts to light (e.g., <code>MeshStandardMaterial</code>).</li>
                <li>A light source (e.g., <code>DirectionalLight</code>).</li>
            </ul>
            <p><strong>Task:</strong> Toggle the light to see how it affects the cube.</p>
        `,
        tasks: [
            { id: 'light-on', text: 'Turn on the light' }
        ],
        init: (container, onTaskComplete) => {
            const { scene, camera, renderer, controls, onResize, domElement } = setupBase(container);
            
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Ambient light (soft general light)
            const ambientLight = new THREE.AmbientLight(0x404040); 
            scene.add(ambientLight);

            // Directional light (sun-like)
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            // Start removed to simulate "off"
            // scene.add(directionalLight); 

            camera.position.z = 5;

            let animationId;
            function animate() {
                animationId = requestAnimationFrame(animate);
                controls.update();
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();

            const actions = {
                toggleLight: () => {
                   if (scene.children.includes(directionalLight)) {
                       scene.remove(directionalLight);
                       return false; // light off
                   } else {
                       scene.add(directionalLight);
                       onTaskComplete('light-on');
                       return true; // light on
                   }
                }
            };

            return {
                dispose: () => {
                    window.removeEventListener('resize', onResize);
                    cancelAnimationFrame(animationId);
                    domElement.remove();
                    geometry.dispose();
                    material.dispose();
                },
                actions
            };
        }
    },
    {
        id: 3,
        title: "3. Grouping Objects",
        description: `
            <h3>Solar System (Simplified)</h3>
            <p>You can group objects just like in HTML. Moving a parent group moves all its children.</p>
            <p>Here we have a "Sun" (yellow) and an "Earth" (blue). The Earth is a child of the Sun pivot point.</p>
            <p><strong>Task:</strong> Speed up the rotation to see the orbit.</p>
        `,
        tasks: [
            { id: 'speed-up', text: 'Increase rotation speed' }
        ],
        init: (container, onTaskComplete) => {
            const { scene, camera, renderer, controls, onResize, domElement } = setupBase(container);

            const sunGeo = new THREE.SphereGeometry(1, 32, 32);
            const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const sun = new THREE.Mesh(sunGeo, sunMat);
            scene.add(sun);

            const earthGeo = new THREE.SphereGeometry(0.3, 32, 32);
            const earthMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const earth = new THREE.Mesh(earthGeo, earthMat);
            
            // Create a pivot object for the earth to orbit around
            const earthPivot = new THREE.Object3D();
            sun.add(earthPivot); // Pivot is attached to Sun
            earthPivot.add(earth); // Earth is attached to pivot
            earth.position.x = 3; // Offset from center

            camera.position.z = 8;

            let speed = 0.01;
            let animationId;
            function animate() {
                animationId = requestAnimationFrame(animate);
                controls.update();
                sun.rotation.y += 0.005;
                earthPivot.rotation.y += speed;
                renderer.render(scene, camera);
            }
            animate();

            const actions = {
                setSpeed: () => {
                    speed = 0.05;
                    onTaskComplete('speed-up');
                }
            };

            return {
                dispose: () => {
                   window.removeEventListener('resize', onResize);
                   cancelAnimationFrame(animationId);
                   domElement.remove();
                },
                actions
            };
        }
    }
];
