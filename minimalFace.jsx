/* ═══════════════════════════════════════════════
   SUPER MINIMAL FACE RENDERER
   
   INSTRUCTIONS:
   1. Open WhoAmI.jsx
   2. Find the renderPlaceholderFace function
   3. Delete the ENTIRE function
   4. Paste this code in its place
   5. Then find where it says: renderPlaceholderFace(faceData.palette, faceData.gender)
   6. Replace with: renderFace(faceData.palette, faceData.gender, faceData.region)
   7. Also find generateFaceData function and add region to the return
   ═══════════════════════════════════════════════ */

function renderFace(pal, gender, region) {
  // Seed a simple random from region+gender combo so same input = same face per session
  const r = () => Math.random();
  const s = gender === "feminine" ? 1 : gender === "masculine" ? -1 : 0;

  /* ── HEAD SHAPES ── */
  const headOptions = {
    "North America": [
      // Wide square
      <rect x={-65-s*5} y={-75} width={130+s*10} height={155} rx={10+s*12} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Big circle
      <circle cx={0} cy={0} r={80+s*5} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Wide rectangle
      <rect x={-72-s*3} y={-70} width={144+s*6} height={145} rx={16+s*10} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
    ],
    "Middle East": [
      // Tall oval
      <ellipse cx={0} cy={0} rx={58+s*5} ry={88} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Elongated rectangle
      <rect x={-55+s*3} y={-85} width={110-s*6} height={170} rx={40+s*5} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Narrow oval
      <ellipse cx={0} cy={0} rx={52+s*5} ry={85} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
    ],
    "Asia Pacific": [
      // Soft circle
      <circle cx={0} cy={3} r={75+s*3} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={2.5}/>,
      // Round oval
      <ellipse cx={0} cy={3} rx={68+s*5} ry={78} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={2.5}/>,
      // Slightly pear
      <ellipse cx={0} cy={8} rx={70+s*3} ry={80} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={2.5}/>,
    ],
    "Europe": [
      // Angular tall
      <rect x={-58+s*5} y={-82} width={116-s*10} height={168} rx={6+s*10} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Sharp oval
      <ellipse cx={0} cy={0} rx={62+s*3} ry={86} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Narrow rectangle
      <rect x={-52+s*3} y={-80} width={104-s*6} height={165} rx={8+s*12} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
    ],
  };

  /* ── HAIR ── */
  const hairOptions = {
    "North America": [
      <rect x={-70} y={-100} width={140} height={40} rx={4} fill={pal.stroke}/>,
      <ellipse cx={0} cy={-62} rx={72} ry={28} fill={pal.stroke}/>,
      <path d="M-65,-28 Q-68,-70 -30,-88 Q0,-98 30,-88 Q68,-70 65,-28 L58,-42 Q45,-65 0,-72 Q-45,-65 -58,-42 Z" fill={pal.stroke}/>,
    ],
    "Middle East": [
      <g><path d="M-60,-45 Q-65,-82 -25,-95 Q0,-102 25,-95 Q65,-82 60,-45" fill={pal.stroke}/><path d="M-60,-45 Q-63,10 -55,50" fill="none" stroke={pal.stroke} strokeWidth={6} strokeLinecap="round"/><path d="M60,-45 Q63,10 55,50" fill="none" stroke={pal.stroke} strokeWidth={6} strokeLinecap="round"/></g>,
      <g><path d="M-58,-42 Q-62,-78 -25,-92 Q0,-100 25,-92 Q62,-78 58,-42" fill={pal.primary[0]||pal.stroke} stroke={pal.stroke} strokeWidth={2}/><path d="M-58,-42 L-64,-5 Q-68,28 -55,48" fill={pal.primary[0]||pal.stroke} stroke={pal.stroke} strokeWidth={2}/><path d="M58,-42 L64,-5 Q68,28 55,48" fill={pal.primary[0]||pal.stroke} stroke={pal.stroke} strokeWidth={2}/></g>,
      <path d="M-58,-35 Q-62,-75 -28,-90 Q0,-98 28,-90 Q62,-75 58,-35 L52,-48 Q40,-70 0,-78 Q-40,-70 -52,-48 Z" fill={pal.stroke}/>,
    ],
    "Asia Pacific": [
      <g><path d="M-62,-22 Q-65,-62 -35,-82 Q0,-95 35,-82 Q65,-62 62,-22 L55,-38 Q42,-58 0,-66 Q-42,-58 -55,-38 Z" fill={pal.stroke}/><path d="M-38,-42 Q-32,-55 -20,-58 L-22,-40 Z" fill={pal.stroke}/><path d="M-5,-46 Q5,-60 15,-58 L10,-42 Z" fill={pal.stroke}/></g>,
      <g><path d="M-58,-22 Q-62,-62 -32,-80 Q0,-92 32,-80 Q62,-62 58,-22" fill={pal.stroke}/><path d="M-58,-22 Q-60,8 -52,30" fill="none" stroke={pal.stroke} strokeWidth={8} strokeLinecap="round"/><path d="M58,-22 Q60,8 52,30" fill="none" stroke={pal.stroke} strokeWidth={8} strokeLinecap="round"/></g>,
      <path d="M-60,-20 Q-64,-58 -32,-78 Q0,-88 32,-78 Q64,-58 60,-20 L54,-35 Q42,-55 0,-62 Q-42,-55 -54,-35 Z" fill={pal.stroke}/>,
    ],
    "Europe": [
      <path d="M-56,-25 Q-60,-68 -25,-88 Q0,-96 30,-88 Q62,-68 58,-22 L52,-38 Q40,-62 0,-72 Q-42,-60 -50,-36 Z" fill={pal.stroke}/>,
      <path d="M-58,-22 Q-62,-65 -28,-85 Q0,-94 28,-85 Q62,-65 58,-22 L52,-38 Q40,-62 0,-70 Q-40,-62 -52,-38 Z" fill={pal.stroke}/>,
      <g><path d="M-55,-25 Q-60,-65 -22,-85 Q0,-92 28,-85 Q62,-65 56,-18 L50,-35 Q38,-60 0,-68 Q-38,-58 -48,-32 Z" fill={pal.primary[1]||pal.stroke} stroke={pal.stroke} strokeWidth={1.5}/></g>,
    ],
  };

  /* ── EYES: just dots ── */
  const eyeOptions = [
    { r: 7 },
    { r: 5 },
    { r: 9 },
    { r: 6 },
  ];

  /* ── MOUTH: just one curve ── */
  const mouthOptions = [
    // Happy smile
    <path d="M-18,0 Q0,16 18,0" fill="none" stroke={pal.stroke} strokeWidth={3} strokeLinecap="round"/>,
    // Wide grin
    <path d="M-22,0 Q0,18 22,0" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2.5} opacity={0.8}/>,
    // Small smile
    <path d="M-10,0 Q0,8 10,0" fill="none" stroke={pal.stroke} strokeWidth={2.5} strokeLinecap="round"/>,
    // Straight
    <path d="M-12,0 L12,0" stroke={pal.stroke} strokeWidth={2.5} strokeLinecap="round"/>,
    // Open happy
    <g><path d="M-16,-2 Q0,14 16,-2" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2.5}/><path d="M-10,1 L10,1" stroke="white" strokeWidth={2} opacity={0.4}/></g>,
  ];

  /* ── NOSE: tiny ── */
  const noseOptions = [
    <circle cx={0} cy={0} r={4} fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1.2}/>,
    <path d="M0,-4 L5,4 L-5,4 Z" fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1} opacity={0.7}/>,
    <ellipse cx={0} cy={0} rx={5} ry={3.5} fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1} opacity={0.6}/>,
    <path d="M0,-5 L0,3" stroke={pal.stroke} strokeWidth={1.8} strokeLinecap="round" opacity={0.5}/>,
  ];

  /* ── CHEEKS ── */
  const cheekOptions = [
    <g><circle cx={-42} cy={16} r={12} fill={pal.primary[0]} opacity={0.15}/><circle cx={42} cy={16} r={12} fill={pal.primary[0]} opacity={0.15}/></g>,
    <g/>,
    <g><circle cx={-38} cy={14} r={10} fill={pal.primary[0]} opacity={0.1}/><circle cx={38} cy={14} r={10} fill={pal.primary[0]} opacity={0.1}/></g>,
  ];

  /* ── PICK ── */
  const pi = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const head = pi(headOptions[region] || headOptions["Asia Pacific"]);
  const hair = pi(hairOptions[region] || hairOptions["Asia Pacific"]);
  const eye = pi(eyeOptions);
  const mouth = pi(mouthOptions);
  const nose = pi(noseOptions);
  const cheek = pi(cheekOptions);

  return (
    <g>
      {/* Hair behind */}
      {hair}
      {/* Head */}
      {head}
      {/* Cheeks */}
      {cheek}
      {/* Eyes — just two dots */}
      <circle cx={-28} cy={-15} r={eye.r} fill={pal.stroke}/>
      <circle cx={28} cy={-15} r={eye.r} fill={pal.stroke}/>
      {/* Tiny white highlights */}
      <circle cx={-25} cy={-17} r={eye.r * 0.35} fill="white" opacity={0.7}/>
      <circle cx={31} cy={-17} r={eye.r * 0.35} fill="white" opacity={0.7}/>
      {/* Nose */}
      <g transform="translate(0,10)">{nose}</g>
      {/* Mouth */}
      <g transform="translate(0,35)">{mouth}</g>
    </g>
  );
}
