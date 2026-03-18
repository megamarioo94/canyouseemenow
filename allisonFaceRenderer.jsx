/* ═══════════════════════════════════════════════
   ALLISON BLACK STYLE FACE RENDERER
   Bold, flat, simple shapes. Warm & playful.
   Drop this into WhoAmI.jsx replacing the
   renderPlaceholderFace function.
   ═══════════════════════════════════════════════ */

// REPLACE your existing renderPlaceholderFace function with this entire block:

function pick(a){return a[Math.floor(Math.random()*a.length)];}

function renderAllisonFace(pal, gender, region) {
  const s = gender === "feminine" ? 1 : gender === "masculine" ? -1 : 0;

  /* ── HEAD SHAPES PER REGION ── */
  const heads = {
    "North America": [
      // Wide square jaw
      () => <rect x={-70-s*5} y={-80} width={140+s*10} height={160} rx={12+s*10} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Big round
      () => <circle cx={0} cy={0} r={85+s*5} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Shield/wide
      () => <path d={`M0,-90 Q${-80+s*5},-85 ${-85+s*8},-20 L${-75+s*5},60 Q${-40+s*5},95 0,100 Q${40-s*5},95 ${75-s*5},60 L${85-s*8},-20 Q${80-s*5},-85 0,-90 Z`} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
    ],
    "Middle East": [
      // Tall oval
      () => <ellipse cx={0} cy={0} rx={65+s*5} ry={95} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Elongated
      () => <path d={`M0,-95 Q${-60+s*5},-88 ${-65+s*5},-30 Q${-70+s*5},20 ${-55+s*5},70 Q-30,100 0,105 Q30,100 ${55-s*5},70 Q${70-s*5},20 ${65-s*5},-30 Q${60-s*5},-88 0,-95 Z`} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Diamond soft
      () => <path d={`M0,-90 Q${-65+s*8},-50 ${-70+s*8},5 Q${-60+s*8},65 0,100 Q${60-s*8},65 ${70-s*8},5 Q${65-s*8},-50 0,-90 Z`} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
    ],
    "Asia Pacific": [
      // Soft round
      () => <circle cx={0} cy={5} r={82+s*3} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={2.5}/>,
      // Gentle oval
      () => <ellipse cx={0} cy={5} rx={72+s*5} ry={88} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={2.5}/>,
      // Pear
      () => <path d={`M0,-85 Q${-55+s*3},-82 -68,-30 Q-75,25 ${-55+s*5},70 Q-30,100 0,102 Q30,100 ${55-s*5},70 Q75,25 68,-30 Q${55-s*3},-82 0,-85 Z`} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={2.5}/>,
    ],
    "Europe": [
      // Angular jaw
      () => <path d={`M${-10-s*3},-90 L${-75+s*5},-75 L${-80+s*8},-10 L-70,50 Q${-50+s*8},92 -15,98 L15,98 Q${50-s*8},92 70,50 L${80-s*8},-10 L${75-s*5},-75 L${10+s*3},-90 Z`} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Rectangular
      () => <rect x={-68+s*5} y={-88} width={136-s*10} height={186} rx={8+s*12} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
      // Diamond sharp
      () => <path d={`M0,-95 Q${-70+s*8},-60 ${-78+s*8},0 Q${-65+s*8},65 0,100 Q${65-s*8},65 ${78-s*8},0 Q${70-s*8},-60 0,-95 Z`} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>,
    ],
  };

  /* ── HAIR PER REGION ── */
  const hairs = {
    "North America": [
      // Flat top block
      () => <g><rect x={-78} y={-110} width={156} height={45} rx={4} fill={pal.stroke}/><rect x={-74} y={-110} width={25} height={55} rx={3} fill={pal.stroke}/><rect x={49} y={-110} width={25} height={55} rx={3} fill={pal.stroke}/></g>,
      // Buzz cut
      () => <ellipse cx={0} cy={-65} rx={78} ry={32} fill={pal.stroke} opacity={0.85}/>,
      // Side part
      () => <path d="M-72,-30 Q-78,-75 -35,-95 Q0,-105 40,-95 Q78,-75 72,-25 L65,-45 Q50,-75 0,-82 Q-50,-72 -65,-42 Z" fill={pal.stroke}/>,
    ],
    "Middle East": [
      // Draped covering
      () => <g><path d="M-72,-50 Q-78,-88 -30,-100 Q0,-108 30,-100 Q78,-88 72,-50" fill={pal.primary[2]||pal.primary[0]} stroke={pal.stroke} strokeWidth={2}/><path d="M-72,-50 L-80,-10 Q-85,30 -72,50" fill={pal.primary[2]||pal.primary[0]} stroke={pal.stroke} strokeWidth={2}/><path d="M72,-50 L80,-10 Q85,30 72,50" fill={pal.primary[2]||pal.primary[0]} stroke={pal.stroke} strokeWidth={2}/></g>,
      // Long flowing
      () => <g><path d="M-68,-35 Q-72,-80 -35,-98 Q0,-108 35,-98 Q72,-80 68,-35" fill={pal.stroke}/><path d="M-68,-35 Q-72,15 -62,60 Q-58,80 -50,90" fill="none" stroke={pal.stroke} strokeWidth={7} strokeLinecap="round"/><path d="M68,-35 Q72,15 62,60 Q58,80 50,90" fill="none" stroke={pal.stroke} strokeWidth={7} strokeLinecap="round"/></g>,
      // Covered ornate
      () => <g><path d="M-70,-48 Q-75,-88 -30,-102 Q0,-110 30,-102 Q75,-88 70,-48" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2}/><path d="M-70,-48 L-78,-8 Q-82,30 -68,50" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2}/><path d="M70,-48 L78,-8 Q82,30 68,50" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2}/><circle cx={0} cy={-70} r={4} fill={pal.accent[2]||pal.primary[2]}/></g>,
    ],
    "Asia Pacific": [
      // Straight fringe
      () => <g><path d="M-68,-25 Q-72,-70 -42,-92 Q0,-108 42,-92 Q72,-70 68,-25 L62,-42 Q50,-68 0,-78 Q-50,-68 -62,-42 Z" fill={pal.stroke}/><path d="M-45,-48 Q-40,-60 -28,-64 L-30,-44 Z" fill={pal.stroke}/><path d="M-10,-52 Q0,-66 10,-65 L6,-46 Z" fill={pal.stroke}/></g>,
      // Neat bob
      () => <g><path d="M-65,-28 Q-68,-72 -38,-92 Q0,-105 38,-92 Q68,-72 65,-28" fill={pal.stroke}/><path d="M-65,-28 Q-67,8 -60,35" fill="none" stroke={pal.stroke} strokeWidth={9} strokeLinecap="round"/><path d="M65,-28 Q67,8 60,35" fill="none" stroke={pal.stroke} strokeWidth={9} strokeLinecap="round"/></g>,
      // Side swept
      () => <path d="M-66,-25 Q-70,-68 -38,-90 Q0,-102 38,-90 Q70,-68 66,-25 L60,-40 Q48,-68 0,-78 Q-48,-66 -60,-38 Z" fill={pal.stroke}/>,
    ],
    "Europe": [
      // Swept back
      () => <g><path d="M-65,-32 Q-70,-75 -30,-95 Q0,-105 35,-95 Q72,-75 66,-25 L60,-42 Q48,-72 0,-82 Q-48,-70 -58,-40 Z" fill={pal.primary[1]||pal.stroke} stroke={pal.stroke} strokeWidth={1.5}/></g>,
      // Slicked
      () => <path d="M-66,-28 Q-70,-78 -30,-96 Q0,-105 35,-96 Q72,-78 68,-28 L62,-42 Q48,-74 0,-84 Q-48,-72 -60,-40 Z" fill={pal.stroke}/>,
      // Cropped clean
      () => <path d="M-68,-24 Q-72,-70 -36,-92 Q0,-102 36,-92 Q72,-70 68,-24 L62,-40 Q48,-66 0,-76 Q-48,-66 -62,-40 Z" fill={pal.stroke}/>,
    ],
  };

  /* ── SHARED EYES (Allison Black style: simple, bold) ── */
  const eyes = [
    // Simple dots
    (f) => <g><circle cx={0} cy={0} r={8} fill={pal.stroke}/><circle cx={3*f} cy={-3} r={3} fill="white"/></g>,
    // Oval with dot
    (f) => <g><ellipse cx={0} cy={0} rx={14} ry={10} fill="white" stroke={pal.stroke} strokeWidth={2.5}/><circle cx={2*f} cy={0} r={6} fill={pal.stroke}/><circle cx={4*f} cy={-2} r={2.5} fill="white"/></g>,
    // Half circle (happy)
    (f) => <g><path d="M-12,0 Q0,-16 12,0" fill="white" stroke={pal.stroke} strokeWidth={2.5}/><circle cx={1*f} cy={-4} r={5} fill={pal.stroke}/><circle cx={3*f} cy={-6} r={2} fill="white"/></g>,
    // Wide open
    (f) => <g><circle cx={0} cy={0} r={14} fill="white" stroke={pal.stroke} strokeWidth={2.5}/><circle cx={2*f} cy={-1} r={8} fill={pal.stroke}/><circle cx={4*f} cy={-3} r={3} fill="white"/></g>,
    // Narrow line
    (f) => <g><path d="M-12,2 Q0,-6 12,2 Q0,8 -12,2" fill="white" stroke={pal.stroke} strokeWidth={2}/><circle cx={1*f} cy={1} r={4.5} fill={pal.stroke}/><circle cx={3*f} cy={-1} r={1.8} fill="white"/></g>,
  ];

  /* ── SHARED EYEBROWS ── */
  const brows = [
    (f) => <path d={`M${-16*f},-2 Q0,-10 ${16*f},0`} stroke={pal.stroke} strokeWidth={4} strokeLinecap="round" fill="none"/>,
    (f) => <path d={`M${-16*f},0 L${16*f},-2`} stroke={pal.stroke} strokeWidth={3.5} strokeLinecap="round"/>,
    (f) => <path d={`M${-16*f},2 L${4*f},-6 L${16*f},-1`} stroke={pal.stroke} strokeWidth={3} strokeLinecap="round" fill="none"/>,
    (f) => <path d={`M${-14*f},0 L${14*f},0`} stroke={pal.stroke} strokeWidth={2} strokeLinecap="round" opacity={0.6}/>,
  ];

  /* ── SHARED NOSES ── */
  const noses = [
    // Simple button
    () => <ellipse cx={0} cy={0} rx={8} ry={6} fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1.5} opacity={0.7}/>,
    // Triangle
    () => <path d="M0,-8 L8,8 L-8,8 Z" fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1.5} opacity={0.6}/>,
    // Line
    () => <path d="M0,-10 L0,6 Q-6,10 -4,6" fill="none" stroke={pal.stroke} strokeWidth={2} strokeLinecap="round"/>,
    // Dot
    () => <circle cx={0} cy={0} r={5} fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1.5}/>,
    // Broad
    () => <path d="M-3,-8 L-8,6 Q-10,10 -4,8 L4,8 Q10,10 8,6 L3,-8" fill={pal.skin[1]} stroke={pal.stroke} strokeWidth={1.2} opacity={0.6}/>,
  ];

  /* ── SHARED MOUTHS (Allison Black: big smiles, expressive) ── */
  const mouths = [
    // Wide happy smile
    () => <path d="M-22,0 Q0,22 22,0" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2.5} opacity={0.8}/>,
    // Big open grin
    () => <g><path d="M-20,-2 Q0,20 20,-2" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={2.5}/><path d="M-14,2 L14,2" stroke="white" strokeWidth={2.5} opacity={0.5}/></g>,
    // Small smile
    () => <path d="M-10,0 Q0,8 10,0" fill="none" stroke={pal.stroke} strokeWidth={2.5} strokeLinecap="round"/>,
    // Lipstick lips
    () => <g><path d="M-12,-3 Q0,-8 12,-3" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={1.5} opacity={0.6}/><path d="M-12,-3 Q0,10 12,-3" fill={pal.primary[0]} stroke={pal.stroke} strokeWidth={1.5} opacity={0.7}/></g>,
    // Straight
    () => <path d="M-14,0 L14,0" stroke={pal.stroke} strokeWidth={2.5} strokeLinecap="round"/>,
  ];

  /* ── SHARED CHEEKS ── */
  const cheeks = [
    // Blush circles
    () => <g><circle cx={-48} cy={18} r={14} fill={pal.primary[0]} opacity={0.18}/><circle cx={48} cy={18} r={14} fill={pal.primary[0]} opacity={0.18}/></g>,
    // Freckles
    () => <g>{[-40,-32,-36,32,36,40].map((x,i)=><circle key={i} cx={x} cy={12+Math.sin(i)*5} r={2} fill={pal.skin[2]||pal.stroke} opacity={0.3}/>)}</g>,
    // None
    () => <g/>,
  ];

  /* ── PICK RANDOM PARTS ── */
  const regionHeads = heads[region] || heads["Asia Pacific"];
  const regionHairs = hairs[region] || hairs["Asia Pacific"];

  const pickedHead = pick(regionHeads);
  const pickedHair = pick(regionHairs);
  const pickedEyeIdx = Math.floor(Math.random() * eyes.length);
  const pickedBrowIdx = Math.floor(Math.random() * brows.length);
  const pickedNose = pick(noses);
  const pickedMouth = pick(mouths);
  const pickedCheek = pick(cheeks);

  return (
    <g>
      {/* Hair behind head */}
      {pickedHair()}
      {/* Head */}
      {pickedHead()}
      {/* Cheeks */}
      {pickedCheek()}
      {/* Eyebrows */}
      <g transform="translate(-30,-38)">{brows[pickedBrowIdx](1)}</g>
      <g transform="translate(30,-38)">{brows[pickedBrowIdx](-1)}</g>
      {/* Eyes */}
      <g transform="translate(-30,-18)">{eyes[pickedEyeIdx](1)}</g>
      <g transform="translate(30,-18)">{eyes[pickedEyeIdx](-1)}</g>
      {/* Nose */}
      <g transform="translate(0,12)">{pickedNose()}</g>
      {/* Mouth */}
      <g transform="translate(0,42)">{pickedMouth()}</g>
    </g>
  );
}
