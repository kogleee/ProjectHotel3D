document.addEventListener("DOMContentLoaded", function() {
    // Получаем контейнер для панорамы
    var container = document.getElementById('panorama-container');

    // Создаем сцену
    var scene = new THREE.Scene();

    // Создаем камеру
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    // Создаем рендерер
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Добавляем освещение (необязательно)
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    // Создаем сферическую панораму
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('vecteezy_a-modern-apartment-empty-entrance-hall-with-pink-glass-door_25489679.jpg', function(texture) {
        var geometry = new THREE.SphereGeometry(500, 60, 40);
        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    });

    // Добавляем управление
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Обновляем размеры рендерера при изменении размера окна
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Обновляем сцену
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Добавляем обработчики для кнопок управления зумом
    document.getElementById('zoom-in').addEventListener('click', function() {
        camera.position.z -= 10;
    });

    document.getElementById('zoom-out').addEventListener('click', function() {
        camera.position.z += 10;
    });
});