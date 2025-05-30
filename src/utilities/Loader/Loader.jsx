import React from 'react';
import BodyText from '../../components/BodyText/BodyText';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
      <BodyText text="Loading Content.." size="text-sm" fontWeight="font-semibold" />

      <style jsx>{`
        .loader-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: #f9f9f9;
        }

        .cube {
          width: 150px;
          height: 150px;
          position: relative;
          transform-style: preserve-3d;
          animation: spinCube 10s infinite linear;
        }

        .face {
          width: 150px;
          height: 150px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          opacity: 0.95;
        }

        /* Opposite faces share color but not adjacent ones */
        .front  { background: #99AEBB; transform: rotateY(0deg) translateZ(75px); }       /* Face 1 */
        .back   { background: #99AEBB; transform: rotateY(180deg) translateZ(75px); }     /* Face 6 (opposite of front) */
        .right  { background: #364954; transform: rotateY(90deg) translateZ(75px); }      /* Face 2 */
        .left   { background: #364954; transform: rotateY(-90deg) translateZ(75px); }     /* Face 5 (opposite of right) */
        .top    { background: #00C5FF; transform: rotateX(90deg) translateZ(75px); }      /* Face 3 */
        .bottom { background: #00C5FF; transform: rotateX(-90deg) translateZ(75px); }     /* Face 4 (opposite of top) */

        @keyframes spinCube {
          0%   { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          25%  { transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg); }
          50%  { transform: rotateX(180deg) rotateY(180deg) rotateZ(180deg); }
          75%  { transform: rotateX(270deg) rotateY(270deg) rotateZ(270deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
