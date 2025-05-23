
import React from 'react';

const shapes = [
  {
    id: 1,
    type: 'tetrahedron',
    size: 60,
    left: '10%',
    top: '20%',
    animationDelay: '0s',
    animationDuration: '8s'
  },
  {
    id: 2,
    type: 'cube',
    size: 80,
    left: '85%',
    top: '15%',
    animationDelay: '2s',
    animationDuration: '10s'
  },
  {
    id: 3,
    type: 'prism',
    size: 45,
    left: '70%',
    top: '60%',
    animationDelay: '1s',
    animationDuration: '12s'
  },
  {
    id: 4,
    type: 'tetrahedron',
    size: 35,
    left: '20%',
    top: '70%',
    animationDelay: '3s',
    animationDuration: '9s'
  },
  {
    id: 5,
    type: 'cube',
    size: 55,
    left: '5%',
    top: '50%',
    animationDelay: '1.5s',
    animationDuration: '11s'
  },
  {
    id: 6,
    type: 'prism',
    size: 70,
    left: '90%',
    top: '80%',
    animationDelay: '2.5s',
    animationDuration: '8.5s'
  },
  {
    id: 7,
    type: 'tetrahedron',
    size: 40,
    left: '60%',
    top: '25%',
    animationDelay: '0.5s',
    animationDuration: '10.5s'
  },
  {
    id: 8,
    type: 'cube',
    size: 50,
    left: '30%',
    top: '85%',
    animationDelay: '3.5s',
    animationDuration: '9.5s'
  }
];

const TetrahedronSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="opacity-10">
    <polygon points="50,10 20,80 80,80" fill="currentColor" />
  </svg>
);

const CubeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="opacity-10">
    <rect x="20" y="20" width="60" height="60" fill="currentColor" />
  </svg>
);

const PrismSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="opacity-10">
    <polygon points="30,20 70,20 80,50 70,80 30,80 20,50" fill="currentColor" />
  </svg>
);

const FloatingShape = ({ shape }: { shape: typeof shapes[0] }) => {
  const ShapeComponent = {
    tetrahedron: TetrahedronSVG,
    cube: CubeSVG,
    prism: PrismSVG
  }[shape.type];

  return (
    <div
      className="absolute text-white animate-float"
      style={{
        left: shape.left,
        top: shape.top,
        animationDelay: shape.animationDelay,
        animationDuration: shape.animationDuration
      }}
    >
      <div
        className="animate-drift"
        style={{
          animationDelay: shape.animationDelay,
          animationDuration: `${parseFloat(shape.animationDuration) + 2}s`
        }}
      >
        <ShapeComponent size={shape.size} />
      </div>
    </div>
  );
};

export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape) => (
        <FloatingShape key={shape.id} shape={shape} />
      ))}
    </div>
  );
};
