import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollFraction: number; // Current scroll fraction (0 to 1)
}

export default function ThreeCanvas({ scrollFraction }: ThreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Keep scroll progress in a ref to load it into the animation loop without re-triggering useEffect
  const scrollRef = useRef(0);
  scrollRef.current = scrollFraction;

  useEffect(() => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x050505, 1); // Dark obsidian space background

    // --- SCENE ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.025);

    // --- CAMERA ---
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0a0a1f, 1.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2ff, 4, 30);
    cyanLight.position.set(5, 3, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x7000ff, 3.5, 30);
    violetLight.position.set(-5, -3, 3);
    scene.add(violetLight);

    const whiteLight = new THREE.PointLight(0xffffff, 2, 20);
    whiteLight.position.set(0, 5, -5);
    scene.add(whiteLight);

    // --- INTERACTIVE 3D FOCUS OBJECT (Torus Knot) ---
    // Create an intricate wireframe geometry
    const knotGeom = new THREE.TorusKnotGeometry(1.6, 0.5, 150, 16, 3, 4);
    
    // Create dual materials for luxury sci-fi styling
    const lineGeom = new THREE.EdgesGeometry(knotGeom);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f2ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const knotWire = new THREE.LineSegments(lineGeom, lineMat);
    
    // Inner dark semi-opaque core to mask lines behind
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x010103,
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide
    });
    const knotCore = new THREE.Mesh(knotGeom, coreMat);
    
    // Combine into a single group for unified manipulation
    const focusGroup = new THREE.Group();
    focusGroup.add(knotCore);
    focusGroup.add(knotWire);
    
    // Position it standard right-side to sit beautifully next to the hero text
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      focusGroup.position.set(0, 1.2, -2);
      focusGroup.scale.set(0.65, 0.65, 0.65);
    } else {
      focusGroup.position.set(2.8, 0, 0);
      focusGroup.scale.set(1.1, 1.1, 1.1);
    }
    
    scene.add(focusGroup);

    // Extra orbital thin tech rings around focus group
    const outerRingGeom = new THREE.RingGeometry(2.4, 2.42, 64);
    // Convert to wire segments for clean single lines
    const outerRingWire = new THREE.EdgesGeometry(outerRingGeom);
    const ringMat1 = new THREE.LineBasicMaterial({
      color: 0x7000ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.LineSegments(outerRingWire, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    focusGroup.add(ring1);

    const ringMat2 = new THREE.LineBasicMaterial({
      color: 0x00f2ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.LineSegments(outerRingWire, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    focusGroup.add(ring2);

    // --- COGNITIVE NEURAL PARTICLE SYSTEM ---
    const particleCount = 4000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const originalPositionsRef = new Float32Array(particleCount * 3); // For mouse physics return calculation

    // Shape a futuristic volumetric coordinate space (elongated grid/tunnel)
    for (let i = 0; i < particleCount; i++) {
      // Cylinder-like/tunnel configuration
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 14;
      const z = (Math.random() - 0.5) * 45; // long Z corridor

      const px = Math.cos(theta) * radius;
      const py = Math.sin(theta) * radius;
      const pz = z;

      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;

      originalPositionsRef[i * 3] = px;
      originalPositionsRef[i * 3 + 1] = py;
      originalPositionsRef[i * 3 + 2] = pz;

      // Dual-toned cyber colors matching the theme: neon cyan, electric violet, stark white
      const rand = Math.random();
      if (rand < 0.45) {
        // Neon Cyan
        particleColors[i * 3] = 0.0;
        particleColors[i * 3 + 1] = 0.95;
        particleColors[i * 3 + 2] = 1.0;
      } else if (rand < 0.85) {
        // Electric Violet
        particleColors[i * 3] = 0.44;
        particleColors[i * 3 + 1] = 0.0;
        particleColors[i * 3 + 2] = 1.0;
      } else {
        // Pure White Accent
        particleColors[i * 3] = 1.0;
        particleColors[i * 3 + 1] = 1.0;
        particleColors[i * 3 + 2] = 1.0;
      }
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.062,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // --- MOUSE TRACKING & PARALLAX ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Track active raycasting / hover state of knot
    let isHovered = false;
    const raycaster = new THREE.Raycaster();
    const ndcMouse = new THREE.Vector2();

    const checkKnotHover = () => {
      ndcMouse.set(mouse.targetX, mouse.targetY);
      raycaster.setFromCamera(ndcMouse, camera);
      const intersects = raycaster.intersectObject(knotCore);
      if (intersects.length > 0) {
        if (!isHovered) {
          isHovered = true;
          // Temporarily brighten wireframe on hover
          lineMat.color.setHex(0xffffff);
          lineMat.opacity = 0.95;
          document.body.style.cursor = 'pointer';
        }
      } else {
        if (isHovered) {
          isHovered = false;
          lineMat.color.setHex(0x00f2ff);
          lineMat.opacity = 0.65;
          document.body.style.cursor = '';
        }
      }
    };

    // --- ANIMATION RECT RECURSION LOOP ---
    let lerpedScroll = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates for butter-smooth movement
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Hover check
      checkKnotHover();

      // Smooth interpolation of scroll progress (cinematic camera slide)
      lerpedScroll += (scrollRef.current - lerpedScroll) * 0.06;

      // 1. DYNAMIC FOCUS OBJECT ANIMATION
      // Continuous rotational matrices
      const rotSpeedScale = isHovered ? 2.5 : 1.0;
      focusGroup.rotation.y = elapsedTime * 0.15 * rotSpeedScale + mouse.x * 0.25;
      focusGroup.rotation.x = elapsedTime * 0.1 * rotSpeedScale + mouse.y * 0.18;
      
      // Wobble ring orbits
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.22;

      // 2. CAMERA SCROLL PATH PILOTING
      // We translate the camera through space smoothly as scroll increases.
      // At scroll=0, center-right setup.
      // At scroll=1, plunge deeper into a high-density cyber tunnel.
      const initialZ = 8;
      const targetZ = -22;
      const cruiseZ = initialZ + (targetZ - initialZ) * lerpedScroll;

      const initialY = 0;
      const targetY = -4;
      const cruiseY = initialY + (targetY - initialY) * lerpedScroll;

      // Add neat micro-parallaxes with mouse values
      camera.position.x = mouse.x * 1.5;
      camera.position.y = cruiseY + mouse.y * 1.2;
      camera.position.z = cruiseZ;

      // Make camera gaze slightly focus-ahead of target position to feel directional
      const lookAtTarget = new THREE.Vector3(
        focusGroup.position.x * (1 - lerpedScroll) + mouse.x * 0.3,
        focusGroup.position.y * (1 - lerpedScroll),
        focusGroup.position.z - (lerpedScroll * 15) // dynamic look-ahead
      );
      camera.lookAt(lookAtTarget);

      // Dynamically reposition and downscale Focus Knot based on scroll state
      // When scrolling down, slide the Focus Knot slightly off-screen or float it
      const mobileStatus = window.innerWidth < 768;
      if (mobileStatus) {
        focusGroup.position.y = 1.2 - lerpedScroll * 8.0;
        focusGroup.position.x = mouse.x * 0.2;
      } else {
        // Slowly drift left-and-center or sink backwards as you scroll
        focusGroup.position.x = 2.8 - lerpedScroll * 7.5;
        focusGroup.position.y = -lerpedScroll * 3.0;
        focusGroup.position.z = -lerpedScroll * 8.0;
      }

      // 3. FLUID PARTICLE REACTION (Mouse magnetic pull and drift)
      const positions = particleGeom.attributes.position.array as Float32Array;
      
      // Scale mouse target vectors to world space relative to camera depth
      const mouseWorldX = mouse.x * 12;
      const mouseWorldY = mouse.y * 8;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const origX = originalPositionsRef[i3];
        const origY = originalPositionsRef[i3 + 1];
        const origZ = originalPositionsRef[i3 + 2];

        // Cosmic wave drift
        const wave = Math.sin(elapsedTime * 0.8 + origZ * 0.15) * 0.08;
        const cosmicY = origY + wave;

        // Calculate distance from particle to virtual mouse sphere
        // Since original positions are stationary, we measure from their current values
        const currentX = positions[i3];
        const currentY = positions[i3 + 1];

        const dx = mouseWorldX - currentX;
        const dy = mouseWorldY - currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Magnetic Attraction / Repulsion physics
        if (dist < 4.5) {
          const strength = (4.5 - dist) * 0.045; // strength decays with distance
          // Push away from mouse
          positions[i3] -= (dx / dist) * strength;
          positions[i3 + 1] -= (dy / dist) * strength;
        } else {
          // Restore smoothly to original baseline (drift damping)
          positions[i3] += (origX - positions[i3]) * 0.04;
          positions[i3 + 1] += (cosmicY - positions[i3 + 1]) * 0.04;
        }

        // Add subtle speed advance if scroll is happening
        if (scrollRef.current > 0.01) {
          // Particles accelerate slightly towards camera for hyperspeed feel
          positions[i3 + 2] += (deltaTime * scrollRef.current * 8.0);
          if (positions[i3 + 2] > camera.position.z + 5) {
            positions[i3 + 2] = -40; // reset to back of tunnel
          }
        } else {
          // Normal slow continuous drift
          positions[i3 + 2] += deltaTime * 0.4;
          if (positions[i3 + 2] > initialZ + 4) {
            positions[i3 + 2] = -40;
          }
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Render step
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const mobile = w < 768;
      if (mobile) {
        focusGroup.position.set(0, 1.2, -2);
        focusGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        focusGroup.position.set(2.8, 0, 0);
        focusGroup.scale.set(1.1, 1.1, 1.1);
      }
    };

    window.addEventListener('resize', handleResize);
    const animId = requestAnimationFrame(animate);

    // --- DETAILED IMMERSIVE CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      knotGeom.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      coreMat.dispose();
      outerRingGeom.dispose();
      outerRingWire.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block z-0" id="three-webgl-stage" />;
}
