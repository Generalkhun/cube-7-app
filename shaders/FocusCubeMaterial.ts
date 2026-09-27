import * as THREE from "three";

export function createFocusCubeMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: "#dfe9ff",
    emissive: "#7ea9ff",
    emissiveIntensity: 0.45,
    metalness: 0.18,
    roughness: 0.32,
    clearcoat: 0.5,
    transparent: true,
    opacity: 1,
    flatShading: false,
  });
}
