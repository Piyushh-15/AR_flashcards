const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF, loadAudio} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
	const start = async() => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: './mno.mind',
			maxTrack: 3,
		});
		
		const {renderer, scene, camera} = mindarThree;
		
		const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
		scene.add(light);
		
		const mouse = await loadGLTF("./mouse/scene.gltf");
		mouse.scene.scale.set(0.25, 0.25, 0.25);
		
		const mouseAclip = await loadAudio("./sound/mouse.mp3");
		const mouseListener = new THREE.AudioListener();
		const mouseAudio = new THREE.PositionalAudio(mouseListener);
		
		const nightingale = await loadGLTF("./nightingale/scene.gltf");
		nightingale.scene.scale.set(0.5, 0.5, 0.5);
		
		const nightingaleAclip = await loadAudio("./sound/nightingale.mp3");
		const nightingaleListener = new THREE.AudioListener();
		const nightingaleAudio = new THREE.PositionalAudio(nightingaleListener);
		
		const owl = await loadGLTF("./owl/scene.gltf");
		owl.scene.scale.set(0.5, 0.5, 0.5);
		
		const owlAclip = await loadAudio("./sound/owl.mp3");
		const owlListener = new THREE.AudioListener();
		const owlAudio = new THREE.PositionalAudio(owlListener);
		
		const mouseAnchor = mindarThree.addAnchor(0);
		mouseAnchor.group.add(mouse.scene);
		camera.add(mouseListener);
		mouseAudio.setRefDistance(100);
		mouseAudio.setBuffer(mouseAclip);
		mouseAudio.setLoop(true);
		mouseAnchor.group.add(mouseAudio)
		
		mouseAnchor.onTargetFound = () => {
			mouseAudio.play();
		}
		
		mouseAnchor.onTargetLost = () => {
			mouseAudio.pause();
		}
		
		const nightingaleAnchor = mindarThree.addAnchor(1);
		nightingaleAnchor.group.add(nightingale.scene);
		
		camera.add(nightingaleListener);
		nightingaleAudio.setRefDistance(100);
		nightingaleAudio.setBuffer(nightingaleAclip);
		nightingaleAudio.setLoop(true);
		nightingaleAnchor.group.add(nightingaleAudio)
		
		nightingaleAnchor.onTargetFound = () => {
			nightingaleAudio.play();
		}
		
		nightingaleAnchor.onTargetLost = () => {
			nightingaleAudio.pause();
		}
		
		const owlAnchor = mindarThree.addAnchor(2);
		owlAnchor.group.add(owl.scene);
		
		camera.add(owlListener);
		owlAudio.setRefDistance(100);
		owlAudio.setBuffer(owlAclip);
		owlAudio.setLoop(true);
		owlAnchor.group.add(owlAudio)
		
		owlAnchor.onTargetFound = () => {
			owlAudio.play();
		}
		
		owlAnchor.onTargetLost = () => {
			owlAudio.pause();
		}
		
		await mindarThree.start();
		
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	}
	start();
	
});
		
		