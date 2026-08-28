"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MotionValue } from "framer-motion";

const HERO_IMAGE = "/images/hero.jpg";
const HERO_DEPTH_MAP = "/images/hero/depth.webp";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  attribute float a_depth;
  uniform float u_progress;
  uniform float u_strength;
  varying vec2 v_uv;
  varying float v_depth;
  varying float v_travel;

  void main() {
    float depth = pow(smoothstep(0.01, 0.99, a_depth), 0.68);
    float travel = pow(clamp(u_progress, 0.0, 1.0), 0.78) * u_strength;
    vec2 focus = vec2(0.02, -0.34);
    float camera_push = 1.0 + travel * 0.62;
    float depth_relief = 1.0 + depth * depth * travel * 1.05;
    float perspective = camera_push * depth_relief;
    vec2 position = focus + (a_position - focus) * perspective;

    // Foreground surges toward camera; background falls away.
    position.y += mix(-0.12, 0.52, depth) * travel;
    position.x += (a_position.x - focus.x) * depth * travel * 0.18;

    v_uv = a_uv;
    v_depth = depth;
    v_travel = travel;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_uv;
  varying float v_depth;
  varying float v_travel;
  uniform sampler2D u_image;

  void main() {
    vec4 color = texture2D(u_image, clamp(v_uv, vec2(0.001), vec2(0.999)));
    float relief = (v_depth - 0.32) * v_travel * 0.08;
    float punch = 1.0 + v_travel * 0.12;
    float vignette = 1.0 - distance(v_uv, vec2(0.5, 0.42)) * v_travel * 0.55;
    color.rgb = color.rgb * punch + relief;
    color.rgb *= clamp(vignette, 0.72, 1.0);
    gl_FragColor = color;
  }
`;

type HeroParallaxProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

type RendererOptions = {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  depthImage: HTMLImageElement;
  progress: MotionValue<number>;
  onReady: () => void;
  onUnavailable: () => void;
};

export function HeroParallax({
  progress,
  reducedMotion,
}: HeroParallaxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    const canvasElement = canvas;
    const imageElement = image;

    const setRendererVisibility = (ready: boolean) => {
      imageElement.style.opacity = ready ? "0" : "0.8";
      canvasElement.style.opacity = ready ? "0.8" : "0";
    };

    setRendererVisibility(false);
    if (reducedMotion || !imageLoaded) return;

    let disposed = false;
    let disposeRenderer: (() => void) | undefined;

    async function initialize() {
      const depthImage = new window.Image();
      depthImage.decoding = "async";
      depthImage.src = HERO_DEPTH_MAP;

      try {
        await depthImage.decode();
        if (disposed) return;

        disposeRenderer = createParallaxRenderer({
          canvas: canvasElement,
          image: imageElement,
          depthImage,
          progress,
          onReady: () => {
            if (!disposed) setRendererVisibility(true);
          },
          onUnavailable: () => {
            if (!disposed) setRendererVisibility(false);
          },
        });
      } catch {
        if (!disposed) setRendererVisibility(false);
      }
    }

    void initialize();

    return () => {
      disposed = true;
      disposeRenderer?.();
      setRendererVisibility(false);
    };
  }, [imageLoaded, progress, reducedMotion]);

  return (
    <div className="absolute inset-0 bg-canvas" aria-hidden="true">
      <Image
        ref={imageRef}
        src={HERO_IMAGE}
        alt=""
        fill
        preload
        sizes="100vw"
        onLoad={() => setImageLoaded(true)}
        className="object-cover opacity-80 transition-opacity duration-500 motion-reduce:transition-none"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 motion-reduce:hidden motion-reduce:transition-none"
      />
    </div>
  );
}

function createParallaxRenderer({
  canvas,
  image,
  depthImage,
  progress,
  onReady,
  onUnavailable,
}: RendererOptions) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    onUnavailable();
    return () => undefined;
  }

  const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  const vertexBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const imageTexture = createTexture(gl, image);
  const sampleDepth = createDepthSampler(depthImage);

  if (!vertexBuffer || !indexBuffer || !imageTexture) {
    throw new Error("Unable to allocate hero parallax WebGL resources.");
  }

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const uvLocation = gl.getAttribLocation(program, "a_uv");
  const vertexDepthLocation = gl.getAttribLocation(program, "a_depth");
  const imageLocation = gl.getUniformLocation(program, "u_image");
  const progressLocation = gl.getUniformLocation(program, "u_progress");
  const strengthLocation = gl.getUniformLocation(program, "u_strength");

  if (
    positionLocation < 0 ||
    uvLocation < 0 ||
    vertexDepthLocation < 0 ||
    imageLocation === null ||
    progressLocation === null ||
    strengthLocation === null
  ) {
    throw new Error("Unable to locate hero parallax shader inputs.");
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(uvLocation);
  gl.vertexAttribPointer(
    uvLocation,
    2,
    gl.FLOAT,
    false,
    stride,
    2 * Float32Array.BYTES_PER_ELEMENT,
  );
  gl.enableVertexAttribArray(vertexDepthLocation);
  gl.vertexAttribPointer(
    vertexDepthLocation,
    1,
    gl.FLOAT,
    false,
    stride,
    4 * Float32Array.BYTES_PER_ELEMENT,
  );

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, imageTexture);
  gl.uniform1i(imageLocation, 0);
  gl.disable(gl.CULL_FACE);
  gl.clearColor(0.11, 0.114, 0.125, 1);

  let frame = 0;
  let indexCount = 0;
  let latestProgress = clampProgress(progress.get());
  let hasRendered = false;
  let contextLost = false;

  const render = () => {
    frame = 0;
    if (contextLost) return;

    gl.uniform1f(progressLocation, latestProgress);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

    if (!hasRendered) {
      hasRendered = true;
      onReady();
    }
  };

  const scheduleRender = (nextProgress = latestProgress) => {
    latestProgress = clampProgress(nextProgress);
    if (!frame) frame = requestAnimationFrame(render);
  };

  const resize = () => {
    const { width: cssWidth, height: cssHeight } =
      canvas.getBoundingClientRect();
    if (cssWidth <= 0 || cssHeight <= 0) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(cssWidth * pixelRatio));
    const height = Math.max(1, Math.round(cssHeight * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    const canvasAspect = cssWidth / Math.max(cssHeight, 1);
    const imageAspect =
      depthImage.naturalWidth / depthImage.naturalHeight;
    let scaleX = 1;
    let scaleY = 1;

    if (canvasAspect > imageAspect) {
      scaleY = imageAspect / canvasAspect;
    } else {
      scaleX = canvasAspect / imageAspect;
    }

    const zoom = canvasAspect < 0.8 ? 0.78 : 0.76;
    const strength =
      canvasAspect < 0.8 ? 1.08 : canvasAspect < 1.2 ? 1.12 : 1.18;

    const mesh = createDepthMesh({
      cssWidth,
      cssHeight,
      scaleX: scaleX * zoom,
      scaleY: scaleY * zoom,
      sampleDepth,
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.DYNAMIC_DRAW);
    indexCount = mesh.indices.length;
    gl.uniform1f(strengthLocation, strength);
    scheduleRender();
  };

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    onUnavailable();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  canvas.addEventListener("webglcontextlost", handleContextLost);
  const unsubscribe = progress.on("change", scheduleRender);
  resize();

  return () => {
    unsubscribe();
    resizeObserver.disconnect();
    canvas.removeEventListener("webglcontextlost", handleContextLost);
    if (frame) cancelAnimationFrame(frame);
    gl.deleteTexture(imageTexture);
    gl.deleteBuffer(vertexBuffer);
    gl.deleteBuffer(indexBuffer);
    gl.deleteProgram(program);
  };
}

type DepthMeshOptions = {
  cssWidth: number;
  cssHeight: number;
  scaleX: number;
  scaleY: number;
  sampleDepth: (u: number, v: number) => number;
};

function createDepthMesh({
  cssWidth,
  cssHeight,
  scaleX,
  scaleY,
  sampleDepth,
}: DepthMeshOptions) {
  const columns = Math.min(112, Math.max(64, Math.round(cssWidth / 14)));
  const rows = Math.min(100, Math.max(64, Math.round(cssHeight / 14)));
  const overscan = 0.22;
  const vertices = new Float32Array((columns + 1) * (rows + 1) * 5);
  const indices = new Uint16Array(columns * rows * 6);
  let vertexOffset = 0;

  for (let row = 0; row <= rows; row += 1) {
    const screenV =
      -overscan + (row / rows) * (1 + overscan * 2);
    const sourceV = (screenV - 0.5) * scaleY + 0.5;

    for (let column = 0; column <= columns; column += 1) {
      const screenU =
        -overscan + (column / columns) * (1 + overscan * 2);
      const sourceU = (screenU - 0.5) * scaleX + 0.5;

      vertices[vertexOffset] = screenU * 2 - 1;
      vertices[vertexOffset + 1] = screenV * 2 - 1;
      vertices[vertexOffset + 2] = sourceU;
      vertices[vertexOffset + 3] = sourceV;
      vertices[vertexOffset + 4] = sampleDepth(sourceU, sourceV);
      vertexOffset += 5;
    }
  }

  let indexOffset = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const topLeft = row * (columns + 1) + column;
      const topRight = topLeft + 1;
      const bottomLeft = topLeft + columns + 1;
      const bottomRight = bottomLeft + 1;

      indices[indexOffset] = topLeft;
      indices[indexOffset + 1] = bottomLeft;
      indices[indexOffset + 2] = topRight;
      indices[indexOffset + 3] = topRight;
      indices[indexOffset + 4] = bottomLeft;
      indices[indexOffset + 5] = bottomRight;
      indexOffset += 6;
    }
  }

  return { vertices, indices };
}

function createDepthSampler(depthImage: HTMLImageElement) {
  const scratch = document.createElement("canvas");
  scratch.width = depthImage.naturalWidth;
  scratch.height = depthImage.naturalHeight;
  const context = scratch.getContext("2d", { willReadFrequently: true });

  if (!context) {
    throw new Error("Unable to read the hero depth map.");
  }

  context.drawImage(depthImage, 0, 0);
  const { data, width, height } = context.getImageData(
    0,
    0,
    scratch.width,
    scratch.height,
  );

  return (u: number, v: number) => {
    const x = Math.round(clampProgress(u) * (width - 1));
    const y = Math.round((1 - clampProgress(v)) * (height - 1));
    return data[(y * width + x) * 4] / 255;
  };
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    throw new Error("Unable to create hero parallax shader program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(message || "Unable to link hero parallax shader program.");
  }

  return program;
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create hero parallax shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || "Unable to compile hero parallax shader.");
  }

  return shader;
}

function createTexture(
  gl: WebGLRenderingContext,
  source: HTMLImageElement,
) {
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    source,
  );

  return texture;
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}
