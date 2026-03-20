import { useState, useCallback, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════
   HOW YOU SEE ME? — V6.1 With Images
   Mega Mario | MADE 25/26 | The Agora Module
   ═══════════════════════════════════════════════ */

const C = {
  bg: "#F4ECDA",
  espresso: "#572c19",
  terracotta: "#9D3E22",
  red: "#8b1a1c",
  cocoa: "#69452d",
  ocre: "#ca9633",
  sun: "#e8bb66",
  denim: "#85abb8",
  ocean: "#708f92",
  sage: "#abae99",
  cream: "#f1d7bc",
  light: "#EDE4D2",
};

const questions = [
  {
    id: "region", question: "Where is home?",
    layout: "map-list",
    options: [
      { label: "North America", value: "North America" },
      { label: "Middle East", value: "Middle East" },
      { label: "Asia Pacific", value: "Asia Pacific" },
      { label: "Europe", value: "Europe" },
    ],
  },
  {
    id: "food", question: "Pick a comfort food",
    layout: "food-single",
    bgImage: "/images/comfy-food.png",
    options: [
      { label: "SOUP,\nany kind of soup", value: "Warm soup", color: C.sun },
      { label: "Warm rice bowl\nwith any protein", value: "Rice bowl with protein", color: C.cream },
      { label: "Lots of greens\nmake me feel better", value: "Lots of greens", color: C.sage },
      { label: "Sweet dessert", value: "Sweet dessert", color: C.ocean },
      { label: "As long as it's\nfrom my hometown", value: "Whatever's from my hometown", color: C.cocoa },
    ],
  },
  {
    id: "wardrobe", question: "What colours live in your wardrobe?",
    layout: "scattered",
    options: [
      { label: "I'd prefer\nwarm tone", value: "Warm tones", img: "/images/warm-tone.png", color: "#B8704A" },
      { label: "A fashionista here!\nAlmost got all color", value: "A bit of everything", img: "/images/fashionista.png", color: C.sun },
      { label: "love pastels", value: "Pastels", img: "/images/pastel.png", color: C.denim },
      { label: "black and white", value: "Mostly black & white", img: "/images/black-and-white.png", color: "#ffffff" },
      { label: "cool tone make me\nlooks good!", value: "Cool tones", img: "/images/cool-tone.png", color: "#C2CCCF" },
    ],
  },
  {
    id: "comfort", question: "What makes you feel comfy?",
    layout: "card-row",
    options: [
      { label: "Lo-fi music", value: "Lo-fi music", img: "/images/Lofi-music.png", color: C.sun },
      { label: "You wear your\nbest and fav outfit", value: "Wearing my favorite outfit", img: "/images/Fav-outfit.png", color: C.cream },
      { label: "Subtle smell of\nfresh linen", value: "Fresh linen smell", img: "/images/Fresh-linen.png", color: C.denim },
      { label: "Sounds of bird\nchirping and\nleaves hitting", value: "Nature sounds", img: "/images/Bird-chirping.png", color: C.red },
      { label: "Aesthetic and\norganized table", value: "An organized space", img: "/images/Organize-table.png", color: "#B8945A" },
    ],
  },
  {
    id: "time", question: "When do you feel most like yourself?",
    layout: "toggle-list",
    sideImage: "/images/flip-phone.png",
    options: [
      { label: "early morning", value: "Early morning" },
      { label: "late at night", value: "Late at night" },
      { label: "in the afternoon", value: "Afternoon" },
      { label: "depends on my mood", value: "Depends on the day" },
    ],
  },
  {
    id: "freetime", question: "How do you spend your free time?",
    layout: "folder-tabs",
    options: [
      { label: "exploring\nnew\nfood places", value: "Exploring new places", img: "/images/explore-food-place.png", color: C.red },
      { label: "staying home\nand\nresting", value: "Staying home", img: "/images/staying-home-rest.png", color: C.denim },
      { label: "do fun\ncreative\nactivity", value: "Creative activities", img: "/images/crafty-activity.png", color: C.sun },
      { label: "explore\nnature", value: "Explore nature", img: "/images/explore-nature.png", color: C.sage },
      { label: "it changes\nall the time", value: "It changes all the time", img: "/images/changes-all-the-time.png", color: C.sun },
    ],
  },
  {
    id: "visual", question: "Which corner feels like yours?",
    layout: "hexagons",
    options: [
      { label: "Warm & textured", value: "Warm & textured", img: "/images/Warm_Cozy.png", color: "#C4956A" },
      { label: "Colorful & expressive", value: "Colorful & expressive", img: "/images/Creative_Space.png", color: "#D4A0C8" },
      { label: "Clean & minimal", value: "Clean & minimal", img: "/images/Minimalist_Zen.png", color: C.red },
      { label: "Nature retreat", value: "A mix of styles", img: "/images/Nature_Space.png", color: "#7A9B6A" },
      { label: "Dark & moody", value: "Dark & moody", img: "/images/Dark_Moody.png", color: "#3A3035" },
    ],
  },
  {
    id: "seen", question: "How do you want to be seen?",
    layout: "label-scatter",
    options: [
     { label: "DEPENDABLE", value: "Dependable", img: "/images/seen-dependable.png", w: 210 },
     { label: "KIND", value: "Kind", img: "/images/seen-kind.png", w: 140 },
     { label: "calm", value: "Calm", img: "/images/seen-calm.png", w: 200 },
     { label: "creative", value: "Creative", img: "/images/seen-creative.png", w: 270 },
     { label: "authentic", value: "Authentic", img: "/images/seen-authentic.png", w: 190 },
    ],
  },
];

/* ═══ GENDER INFERENCE ═══ */
const genderSignals = {
  food:{"Warm soup":0.5,"Rice bowl with protein":-0.5,"Lots of greens":0.5,"Sweet dessert":1,"Whatever's from my hometown":0},
  wardrobe:{"Warm tones":-0.3,"A bit of everything":0.3,"Mostly black & white":-0.8,"Pastels":1,"Cool tones":-0.3},
  comfort:{"Fresh linen smell":0.8,"Wearing my favorite outfit":0.7,"Lo-fi music":0,"Nature sounds":0.2,"An organized space":-0.5},
  freetime:{"Exploring new places":0,"Staying home":-0.2,"Creative activities":0.3,"Explore nature":0,"It changes all the time":0},
  visual:{"Clean & minimal":-0.5,"Warm & textured":0.3,"Colorful & expressive":0.7,"Dark & moody":-0.7,"A mix of styles":0},
  seen:{"Dependable":-0.6,"Kind":0.7,"Creative":0.2,"Calm":-0.3,"Authentic":0},
};
function inferGender(ans){let s=0;const m={};questions.forEach((q,i)=>{m[q.id]=ans[i];});["food","wardrobe","comfort","freetime","visual","seen"].forEach(k=>{if(m[k]&&genderSignals[k]?.[m[k]]!==undefined)s+=genderSignals[k][m[k]];});return s>0.5?"feminine":s<-0.5?"masculine":"neutral";}

/* ═══ FACE DATA ═══ */
const palettes = {
  "North America":{skin:["#F4C89A","#E8B078","#D4956A"],primary:["#D45B5B","#3B6FD4","#E8C83B"],accent:["#FFF","#1A1A2E","#FF6B35"],bg:"#FFF8F0",stroke:"#1A1A2E"},
  "Middle East":{skin:["#D4A574","#C8956A","#B8845A"],primary:["#8B4513","#C47D5A","#D4A030"],accent:["#F5E6D0","#6B3A2A","#E8C870"],bg:"#FDF5EC",stroke:"#3D2212"},
  "Asia Pacific":{skin:["#F5DCC8","#EAC8AA","#D4B08C"],primary:["#E8B89D","#C4A080","#A08868"],accent:["#F0E0D0","#8B7355","#D4C0A8"],bg:"#FAF4EE",stroke:"#4A3828"},
  "Europe":{skin:["#E8D8CC","#D0C0B0","#B8A898"],primary:["#5B7A8B","#7A8B7A","#8B7A6B"],accent:["#B8C4D4","#D4D0C8","#4A5B6B"],bg:"#F0EDE8",stroke:"#2C3844"},
};
const shapePools = {
  "North America":{label:"bold, loud, confident",assumptions:["You must like bold colors","You're probably outgoing","Big personality, big features"]},
  "Middle East":{label:"warm, traditional, reserved",assumptions:["Warm tones suit you — obviously","You must be traditional","Reserved and family-oriented"]},
  "Asia Pacific":{label:"quiet, soft, agreeable",assumptions:["Soft features, soft colors","You must be quiet and polite","Probably good at math too"]},
  "Europe":{label:"refined, structured, composed",assumptions:["Cool tones — very sophisticated","Structured and analytical","Naturally authoritative"]},
};
function pick(a){return a[Math.floor(Math.random()*a.length)];}

/* ═══════════════════════════════════════════════
   SUPER MINIMAL FACE RENDERER
   
   INSTRUCTIONS:
   1. Open WhoAmI.jsx
   2. Find the renderPlaceholderFace function
   3. Delete the ENTIRE function
   4. Paste this code in its place
   5. Then find where it says: 
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

function generateFaceData(answers) {
  const region = answers[0] || "Asia Pacific";
  const pal = palettes[region] || palettes["Asia Pacific"];
  const pool = shapePools[region] || shapePools["Asia Pacific"];
  const gender = inferGender(answers);
  return { region: region, palette: pal, profile: pool, gender: gender,
    genderLabel: gender==="feminine"?"soft, gentle, delicate":gender==="masculine"?"strong, bold, structured":"balanced, neutral, adaptable" };
}

/* ═══ COMPONENTS ═══ */

/* Progress Bar */
function ProgressBar({ current, total }) {
  return (
    <div style={{ display:"flex", gap:2, justifyContent:"center", marginBottom:48 }}>
      {Array.from({length:total}).map((_,i) => (
        <div key={i} style={{
          width:`${Math.min(60,500/total)}px`, height:10,
          background: i<current ? C.espresso : i===current ? C.sun : `${C.sun}55`,
          transition:"background 0.4s ease", borderRadius:1,
        }}/>
      ))}
    </div>
  );
}

/* Nav Arrows — matching PDF design */
function NavArrows({ onBack, onForward, showBack, showForward }) {
  return (
    <>
      {/* Back — filled red circle with white triangle */}
      {showBack && (
        <button onClick={onBack} style={{
          width:52, height:52, borderRadius:"50%", border:"none",
          background:C.red, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          justifyContent:"center", transition:"all 0.3s ease", position:"fixed",
          bottom:-100, left:20, zIndex:10,
        }}
          onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{e.currentTarget.style.background=C.red;e.currentTarget.style.transform="scale(1)";}}>
          <svg width="38" height="38" viewBox="0 0 18 16" fill={C.bg}>
            <path d="M11,2 L5,8 L11,14 Z"/>
          </svg>
        </button>
      )}
      {/* Forward — outlined circle with olive triangle */}
      {showForward && (
        <button onClick={onForward} style={{
          width:52, height:52, borderRadius:"50%", border:`2px solid ${C.espresso}33`,
          background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          justifyContent:"center", transition:"all 0.3s ease", position:"fixed",
          bottom:-100, right:20, zIndex:10,
        }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.olive;e.currentTarget.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=`${C.espresso}33`;e.currentTarget.style.transform="scale(1)";}}>
          <svg width="38" height="38" viewBox="0 0 14 16" fill={C.sage}>
            <path d="M5,2 L11,8 L5,14 Z"/>
          </svg>
        </button>
      )}
    </>
  );
}

/* Image component — shows real image or placeholder */
function Img({ src, w, h, alt, style: s = {} }) {
  if (src) {
    return <img src={src} alt={alt||""} style={{ width:w, height:h, objectFit:"cover", display:"block", ...s }} />;
  }
  return (
    <div style={{ width:w, height:h, background:`${C.cream}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", border:`1.5px solid ${C.espresso}22`, ...s }}>
      <span style={{ ...mono(10), color:`${C.espresso}55`, textAlign:"center", padding:4 }}>[ img ]</span>
    </div>
  );
}

/* ═══ QUESTION LAYOUTS ═══ */

/* Q1: Map List */
function LayoutMapList({ q, onAnswer, selected }) {
  return (
    <div style={{ position:"relative", minHeight:400, display:"flex", flexDirection:"column", alignItems:"center" }}>
    <div style={{ display:"flex", flexDirection:"column", gap:16, alignItems:"center", zIndex:1, marginTop:20 }}>
        {q.options.map((opt,i) => (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              ...mono(16), background:C.bg,
              border: selected===opt.value ? `2.5px solid ${C.red}` : `1.5px solid ${C.espresso}44`,
              padding:"14px 48px", cursor:"pointer", color:C.espresso,
              minWidth:260, textAlign:"center", transition:"all 0.3s ease",
              boxShadow: selected===opt.value ? `4px 4px 0 ${C.red}` : "none",
              animation:`slideUp 0.4s ease ${i*80}ms both`,
            }}
            onMouseEnter={e=>{if(selected!==opt.value){e.currentTarget.style.borderColor=C.red;e.currentTarget.style.boxShadow=`3px 3px 0 ${C.red}`;}}}
            onMouseLeave={e=>{if(selected!==opt.value){e.currentTarget.style.borderColor=`${C.espresso}44`;e.currentTarget.style.boxShadow="none";}}}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Q2: Food — single big image with button overlay */
function LayoutFoodSingle({ q, onAnswer, selected }) {
  const labelPositions = [
    { top:"41%", left:"17%", color:C.sun },
    { top:"41%", left:"42%", color:C.cream },
    { top:"41%", left:"65%", color:C.sage },
    { top:"81%", left:"25%", color:C.ocean },
    { top:"81%", left:"54%", color:C.cocoa },
  ];
  return (
    <div style={{ position:"relative", maxWidth:700, margin:"0 auto" }}>
      <img src={q.bgImage} alt="comfort food" style={{ width:"100%", height:"auto", display:"block" }}
        onError={e=>{e.target.style.display="none";}} />
      {q.options.map((opt,i) => (
        <button key={i} onClick={()=>onAnswer(opt.value)}
          style={{
            ...mono(11), position:"absolute",
            top:labelPositions[i].top, left:labelPositions[i].left,
            whiteSpace:"pre-line", textAlign:"center",
            padding:"6px 14px", cursor:"pointer", lineHeight:1.4,
            background: selected===opt.value ? C.red : `${labelPositions[i].color}cc`,
            color: selected===opt.value ? C.bg : C.espresso,
            border: selected===opt.value ? `2px solid ${C.red}` : `1.5px solid ${C.espresso}22`,
            boxShadow: selected===opt.value ? `3px 3px 0 ${C.espresso}` : "none",
            transition:"all 0.3s ease",
            animation:`slideUp 0.4s ease ${i*80}ms both`,
          }}
          onMouseEnter={e=>{if(selected!==opt.value){e.currentTarget.style.borderColor=C.red;e.currentTarget.style.transform="translateY(-3px)";}}}
          onMouseLeave={e=>{if(selected!==opt.value){e.currentTarget.style.borderColor=`${C.espresso}22`;e.currentTarget.style.transform="translateY(0)";}}}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* Q3: Scattered wardrobe — with real images */
function LayoutScattered({ q, onAnswer, selected }) {
  return (
    <div style={{ display:"flex", gap:12, justifyContent:"center", alignItems:"flex-start", flexWrap:"wrap", maxWidth:800, margin:"0 auto" }}>
      {q.options.map((opt,i) => {
        const offsets = [0, 20, -10, 15, -5];
        return (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              background:"none", border:"none", cursor:"pointer",
              display:"flex", flexDirection:"column", alignItems:"center", gap:6,
              marginTop: offsets[i],
              transition:"transform 0.3s ease", animation:`slideUp 0.5s ease ${i*80}ms both`,
            }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <div style={{
              width:140, height:180, overflow:"hidden", borderRadius:4,
              border: selected===opt.value ? `3px solid ${C.red}` : `1.5px solid ${C.espresso}22`,
              background: `${opt.color}15`,
            }}>
              {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"contain", padding:8}}/> :
                <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{...mono(9),color:`${C.espresso}44`}}>[ img ]</span>
                </div>}
            </div>
            <div style={{
              ...mono(10), padding:"5px 10px", whiteSpace:"pre-line", textAlign:"center",
              background: selected===opt.value ? C.red : `${opt.color}55`,
              color: selected===opt.value ? C.bg : C.espresso,
              border:`1px solid ${C.espresso}22`, lineHeight:1.4,
            }}>
              {opt.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* Q4: Card Row */
function LayoutCardRow({ q, onAnswer, selected }) {
  return (
    <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"nowrap" }}>
      {q.options.map((opt,i) => (
        <button key={i} onClick={()=>onAnswer(opt.value)}
          style={{
            background:"none", border: selected===opt.value ? `2.5px solid ${C.red}` : `1.5px solid ${C.espresso}33`,
            cursor:"pointer", width:130, padding:0, display:"flex", flexDirection:"column", justifyContent:"space-between", height:210,
            transition:"all 0.3s ease", animation:`slideUp 0.5s ease ${i*80}ms both`,
            boxShadow: selected===opt.value ? `4px 4px 0 ${C.red}` : "none",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          <div style={{ width:"100%", height:157, background:`${opt.color}22`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> :
              <span style={{...mono(9),color:`${C.espresso}44`}}>[ img ]</span>}
          </div>
          <div style={{
            ...mono(11), padding:"4px 6px", whiteSpace:"pre-line", textAlign:"center",
            background: selected===opt.value ? C.red : `${opt.color}55`,
            color: selected===opt.value ? C.bg : C.espresso,
            width:"100%", lineHeight:1.3,
          }}>
            {opt.label}
          </div>
        </button>
      ))}
    </div>
  );
}

/* Q5: Toggle List with phone image */
function LayoutToggleList({ q, onAnswer, selected }) {
  return (
    <div style={{ display:"flex", gap:26, justifyContent:"center", alignItems:"center", flexWrap:"wrap" }}>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {q.options.map((opt,i) => (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              display:"flex", alignItems:"center", gap:16, background:"none",
              border:`1.5px solid ${selected===opt.value ? C.red : `${C.espresso}33`}`,
              padding:"12px 24px", cursor:"pointer", minWidth:300, transition:"all 0.3s ease",
              animation:`slideUp 0.4s ease ${i*80}ms both`,
            }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=C.red}
            onMouseLeave={e=>e.currentTarget.style.borderColor=selected===opt.value?C.red:`${C.espresso}33`}>
            <div style={{
              width:44, height:22, borderRadius:11,
              border:`2px solid ${selected===opt.value?C.red:`${C.espresso}44`}`,
              background:selected===opt.value?C.red:"none", position:"relative", transition:"all 0.3s ease", flexShrink:0,
            }}>
              <div style={{
                width:16, height:16, borderRadius:"50%",
                background:selected===opt.value?C.bg:`${C.espresso}44`,
                position:"absolute", top:1, left:selected===opt.value?24:2, transition:"all 0.3s ease",
              }}/>
            </div>
            <span style={{...mono(15),color:C.espresso}}>{opt.label}</span>
          </button>
        ))}
      </div>
      <div style={{ flexShrink:0, maxWidth:200 }}>
        {q.sideImage ?
          <img src={q.sideImage} alt="flip phone" style={{ width:200, height:"auto", display:"block" }}/> :
          <Img w={180} h={280} alt="phone"/>}
      </div>
    </div>
  );
}

/* Q6: Folder Tabs with real images */
function LayoutFolderTabs({ q, onAnswer, selected }) {
  return (
    <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"nowrap", alignItems:"flex-end", maxWidth:850, margin:"0 auto"}}>
      {q.options.map((opt,i) => (
        <button key={i} onClick={()=>onAnswer(opt.value)}
          style={{
            background:"none", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center",
            transition:"transform 0.3s ease", animation:`slideUp 0.4s ease ${i*80}ms both`,
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          <div style={{
            width:160, height:170, overflow:"hidden",borderRadius:"6px 6px 0 0", border: "none", background:"transparent"}}>
            {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"bottom" }}/> :
              <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{...mono(9),color:`${C.espresso}44`}}>[ img ]</span>
              </div>}
          </div>
          <div style={{
            ...mono(11), marginTop: 8,padding:"10px 8px", whiteSpace:"pre-line", textAlign:"center",
            width:140, lineHeight:1.3,
            background: selected===opt.value ? C.red : opt.color,
            color: selected===opt.value ? C.bg : (opt.color === C.red ? C.bg : C.espresso),
            border:`1.5px solid ${C.espresso}22`, borderTop:"none",
          }}>
            {opt.label}
          </div>
        </button>
      ))}
    </div>
  );
}

/* Q7: Hexagons with real images */
function LayoutHexagons({ q, onAnswer, selected }) {
  const hexPositions = [
    { x:-80, y:-10 }, { x:140, y:-10}, { x:357, y:-10 },
    { x:33, y:165 }, { x:250, y:165 },
];
  return (
    <div style={{ position:"relative", width:500, height:340, overflow:"visible", margin:"0 auto" }}>
      {q.options.map((opt,i) => {
        const sel = selected===opt.value;
        return (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              position:"absolute", left:hexPositions[i].x, top:hexPositions[i].y, width:230, height:230, padding:0, overflow:"hidden",
              background:C.bg,clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              border:"none", cursor:"pointer", transition:"all 0.3s ease",
              animation:`slideUp 0.5s ease ${i*100}ms both`,
              transform: sel ? "scale(1.08)" : "scale(1)",
            }}
            onMouseEnter={e=>{if(!sel)e.currentTarget.style.transform="scale(1.05)";}}
            onMouseLeave={e=>{if(!sel)e.currentTarget.style.transform="scale(1)";}}>
            {opt.img ?
              <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter:sel?"brightness(0.85)":"brightness(1)" }}/> :
              <div style={{ width:"100%", height:"100%", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{...mono(10),color:C.espresso,textAlign:"center",padding:8}}>[ {opt.label} ]</span>
              </div>}
            {sel && <div style={{ position:"absolute", inset:0, border:`4px solid ${C.red}`, clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", pointerEvents:"none" }}/>}
          </button>
        );
      })}
    </div>
  );
}

/* Q8: Label Scatter */
function LayoutLabelScatter({ q, onAnswer, selected }) {
  const positions = [
    { top:0, left:"3%" }, { top:-17, left:"39%" }, { top:10, left:"65%" },
    { top:168, left:"12%" }, { top:160, left:"58%" },
  ];
  return (
    <div style={{ position:"relative", minHeight:320, maxWidth:700, margin:"0 auto", width:"100%" }}>
      {q.options.map((opt,i) => {
        const sel = selected===opt.value;
        return (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              position:"absolute", top:positions[i].top+20, left:positions[i].left,
              background:"none", border:"none", cursor:"pointer", padding:0,
              transition:"all 0.3s ease",
              animation:`slideUp 0.5s ease ${i*100}ms both`,
              transform: sel ? "scale(1.1)" : "scale(1)",
              filter: sel ? "brightness(0.9)" : "brightness(1)",
            }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
            onMouseLeave={e=>e.currentTarget.style.transform=sel?"scale(1.1)":"scale(1)"}>
            <img src={opt.img} alt={opt.label} style={{ width:opt.w||160, height:"auto", display:"block" }}/>
            {sel && <div style={{ position:"absolute", inset:0, border:`3px solid ${C.red}`, borderRadius:4, pointerEvents:"none" }}/>}
          </button>
        );
      })}
    </div>
  );
}

/* Layout Router */
function QuestionLayout({ q, onAnswer, selected }) {
  const layouts = {
    "map-list":LayoutMapList, "food-single":LayoutFoodSingle, "scattered":LayoutScattered,
    "card-row":LayoutCardRow, "toggle-list":LayoutToggleList, "folder-tabs":LayoutFolderTabs,
    "hexagons":LayoutHexagons, "label-scatter":LayoutLabelScatter,
  };
  const Comp = layouts[q.layout];
  return Comp ? <Comp q={q} onAnswer={onAnswer} selected={selected}/> : null;
}

/* ═══ TYPOGRAPHY ═══ */
const display = (size,extra={}) => ({ fontFamily:"'Archivo Black','Helvetica Neue',sans-serif", fontSize:size, fontWeight:400, letterSpacing:"-0.02em", lineHeight:1.1, color:C.espresso, ...extra });
const mono = (size,extra={}) => ({ fontFamily:"'Source Code Pro','Courier New',monospace", fontSize:size, fontWeight:400, lineHeight:1.5, ...extra });

/* ═══ MAIN ═══ */
export default function WhoAmI() {
  const [stage,setStage] = useState("intro");
  const [currentQ,setCurrentQ] = useState(0);
  const [answers,setAnswers] = useState([]);
  const [faceData,setFaceData] = useState(null);
  const [showAssumptions,setShowAssumptions] = useState(false);
  const [waitLine2,setWaitLine2] = useState(false);
  const [showStats,setShowStats] = useState(false);
  const [allResponses,setAllResponses] = useState([]);
  const svgRef = useRef(null);
  // Load saved responses on mount
useEffect(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("howYouSeeMe_responses") || "[]");
    setAllResponses(saved);
  } catch(e) {}
}, []);

// Save a response
const saveResponse = (didRebuild) => {
  const response = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    region: faceData.region,
    gender: faceData.gender,
    genderLabel: faceData.genderLabel,
    label: faceData.profile.label,
    answers: answers,
    didRebuild: didRebuild,
  };
  const updated = [...allResponses, response];
  setAllResponses(updated);
  localStorage.setItem("howYouSeeMe_responses", JSON.stringify(updated));
  return response;
};

  const handleAnswer = val => { const na=[...answers]; na[currentQ]=val; setAnswers(na); };

  const goNext = () => {
    if(answers[currentQ]===undefined) return;
    if(currentQ<questions.length-1) setCurrentQ(currentQ+1);
    else {
      setStage("generating"); setWaitLine2(false);
      setTimeout(()=>setWaitLine2(true),1800);
      setTimeout(()=>{
        const d=generateFaceData(answers); setFaceData(d);
        setStage("reveal"); setTimeout(()=>setShowAssumptions(true),1200);
      },4000);
    }
  };
  const goBack = () => { if(currentQ>0) setCurrentQ(currentQ-1); };
  const startOver = () => { setStage("intro");setCurrentQ(0);setAnswers([]);setFaceData(null);setShowAssumptions(false); };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.espresso, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",padding:"24px 20px 100px", position:"relative", overflow:"hidden" }}>

      {/* Grain */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents:"none", zIndex:0 }}/>
      <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Source+Code+Pro:wght@400;500;700&display=swap" rel="stylesheet"/>

      {/* ═══ INTRO ═══ */}
      {stage==="intro" && (
        <div style={{ textAlign:"center", maxWidth:700, animation:"slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both", zIndex:1, padding:"40px 20px", background:C.bg, position:"relative" }}>
          <p style={{...mono(12), letterSpacing:"4px", textTransform:"uppercase", color:C.espresso, marginBottom:20, opacity:0.7 }}>
            An interactive exploration
          </p>
          <div style={{ position:"relative", marginBottom:20, textAlign:"left", display:"inline-block" }}>
           <div style={{...display("clamp(38px, 6vw,52px)"), marginBottom:-26 }}>HOW YOU</div>
           <div style={{ position:"relative", marginBottom:-35 }}>
             <div style={{...display("clamp(80px,16vw,130px)"), color:`${C.denim}100`, position:"absolute", left:5, top:5, zIndex:0 }}>SEE</div>
             <div style={{...display("clamp(80px,16vw,130px)"), color:C.terracotta, position:"relative", zIndex:1, WebkitTextStroke:`2px ${C.espresso}`}}>SEE</div>
             </div>
             <div style={{ position:"relative", display:"flex", alignItems:"baseline" }}>
              <span style={{...display("clamp(80px,16vw,130px)"), color:"#85ABB8", WebkitTextStroke:`2px ${C.espresso}` }}>M</span>
              <span style={{...display("clamp(80px,16vw,130px)"), color:"#85ABB8", WebkitTextStroke:`2px ${C.espresso}` }}>E</span>
              <span style={{...display("clamp(80px,16vw,130px)"), color:C.sun, WebkitTextStroke:`2px ${C.espresso}` }}>?</span>
            </div>
          </div>
          <p style={{...mono(16), color:C.espresso, marginBottom:20, opacity:0.7 }}>
            Answer 8 simple questions. The system will generate a face for you.
          </p>
          <p style={{...mono(20), color:C.red, marginBottom:40, fontStyle:"normal" }}>
            But whose version of you is it?
          </p>
          <button onClick={()=>setStage("quiz")}
            style={{...mono(16), letterSpacing:"2px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}`, padding:"16px 52px", cursor:"pointer", transition:"all 0.3s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.color=C.bg;}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.espresso;}}>
            START!
          </button>

        </div>
      )}

      {/* ═══ QUIZ ═══ */}
      {stage==="quiz" && (
        <div style={{ textAlign:"center", maxWidth:800, width:"100%", zIndex:1, animation:"slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both" }} key={currentQ}>
          <ProgressBar current={currentQ} total={questions.length}/>
          <h2 style={{...display("clamp(28px,5vw,44px)"), marginBottom:40 }}>
            {questions[currentQ].question}
          </h2>
          <QuestionLayout q={questions[currentQ]} onAnswer={handleAnswer} selected={answers[currentQ]}/>
          <NavArrows onBack={goBack} onForward={goNext} showBack={currentQ>0} showForward={answers[currentQ]!==undefined}/>
        </div>
      )}

      {/* ═══ GENERATING ═══ */}
      {stage==="generating" && (
        <div style={{ textAlign:"center", zIndex:1, animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p style={{...mono(18), color:C.espresso, marginBottom:12 }}>Interesting answers.</p>
          <p style={{...mono(18), color:C.espresso, marginBottom:48, opacity:waitLine2?1:0, transition:"opacity 1s ease" }}>
            Let us show you who you are.
          </p>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            {[C.sun,C.espresso,C.red,C.denim,C.cream,"#6B8A9E",C.olive].map((c,i) => (
              <div key={i} style={{
                width:18, height:18, borderRadius:"50%", background:c,
                border:c===C.cream?`1px solid ${C.espresso}22`:"none",
                animation:`pulse 1.4s ease ${i*0.12}s infinite`,
              }}/>
            ))}
          </div>
        </div>
      )}

      {/* ═══ REVEAL ═══ */}
      {stage==="reveal" && faceData && (
        <div style={{ textAlign:"center", maxWidth:650, width:"100%", zIndex:1, animation:"slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p style={{...mono(11), letterSpacing:"3px", textTransform:"uppercase", color:C.olive, marginBottom:12 }}>The system sees you as</p>
          <h2 style={{...display("clamp(26px,5vw,38px)"), marginBottom:6 }}>"{faceData.profile.label}"</h2>
          <p style={{...mono(13), color:C.red, marginBottom:28 }}>+ {faceData.genderLabel}</p>
          <div style={{ border:`2px solid ${C.espresso}22`, padding:20, margin:"0 auto 28px", maxWidth:360, background:faceData.palette.bg }}>
            <svg ref={svgRef} viewBox="-120 -130 240 260" style={{ width:"100%", maxWidth:320, height:"auto" }}>
             {renderFace(faceData.palette, faceData.gender, faceData.region)}
            </svg>
            <p style={{...mono(10), color:C.olive, marginTop:8 }}>[ your illustrations will go here ]</p>
          </div>
          {showAssumptions && (
            <div style={{ animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both", marginBottom:36 }}>
              <p style={{...mono(10), letterSpacing:"3px", textTransform:"uppercase", color:C.olive, marginBottom:20 }}>What the system assumed</p>
              {faceData.profile.assumptions.map((a,i) => (
                <p key={i} style={{...mono(14), color:C.espresso, marginBottom:8, opacity:0, animation:`slideUp 0.5s ease ${0.2+i*0.25}s both` }}>→ {a}</p>))}
              {faceData.gender!=="neutral" && (
                <p style={{...mono(14), color:C.red, marginBottom:8, opacity:0, animation:`slideUp 0.5s ease ${0.2+3*0.25}s both` }}>
                  → {faceData.gender==="feminine"?"Pastels and sweetness? Must be soft.":"Dark tones and logic? Must be tough."}
                </p>)}
              <div style={{ marginTop:36 }}>
                <p style={{...display(20), color:C.espresso, marginBottom:24 }}>This isn't you. Take the pieces back.</p>
                <button onClick={()=>{saveResponse(true);setShowAssumptions(false);setStage("reassemble");}}
                  style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:C.red, color:C.bg, border:"none", padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.espresso}
                  onMouseLeave={e=>e.currentTarget.style.background=C.red}>
                  Rebuild yourself
                </button>
                <button onClick={()=>{saveResponse(false);startOver();}}
                 style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}`, padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease", marginLeft:12 }}
                 onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.color=C.bg;}}
                 onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.espresso;}}>
                 Accept this face
                </button>
              </div>
            </div>)}
        </div>
      )}

      {/* ═══ REASSEMBLE ═══ */}
      {stage==="reassemble" && faceData && (
        <div style={{ textAlign:"center", maxWidth:650, width:"100%", zIndex:1, animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h2 style={{...display("clamp(28px,5vw,40px)"), marginBottom:8 }}>Now, who are you<span style={{color:C.sun}}>?</span></h2>
          <p style={{...mono(13), color:C.olive, marginBottom:28 }}>Drag the pieces. Arrange them your way.</p>
          <div style={{ border:`2px solid ${C.espresso}22`, padding:20, margin:"0 auto 28px", maxWidth:400, background:faceData.palette.bg, minHeight:360, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <p style={{...mono(12), color:C.olive }}>[ Drag-and-drop canvas ]<br/>[ Will activate with your illustrated face parts ]</p>
          </div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={startOver}
              style={{...mono(12), letterSpacing:"1.5px", textTransform:"uppercase", background:C.espresso, color:C.bg, border:`2px solid ${C.espresso}`, padding:"12px 28px", cursor:"pointer", transition:"all 0.3s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.background=C.red;e.currentTarget.style.borderColor=C.red;}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.borderColor=C.espresso;}}>
              Start over
            </button>
          </div>
          <p style={{...display(16), color:C.olive, margin:"40px auto 0", maxWidth:440, lineHeight:1.5, fontStyle:"italic" }}>
            Identity is not what others project onto you.<br/>It's what you choose to assemble.
          </p>
        </div>
      )}

      {stage!=="intro"&&stage!=="generating"&&(
        <p style={{ position:"fixed", bottom:16, ...mono(9), letterSpacing:"2px", color:C.olive, textTransform:"uppercase", zIndex:1, opacity:0.5 }}>Mega Mario</p>
      )}
{/* ═══ STATS BUTTON ═══ */}
{stage==="intro" && (
  <button onClick={()=>setShowStats(!showStats)}
    style={{position:"fixed", top:16, right:16, ...mono(10), background:"none", border:`1px solid ${C.espresso}33`, padding:"8px 16px", cursor:"pointer", color:C.espresso, opacity:0.5, zIndex:10}}>
    {allResponses.length} responses
  </button>
)}

{/* ═══ STATS PANEL ═══ */}
{showStats && (
  <div style={{position:"fixed", inset:0, background:`${C.bg}ee`, zIndex:100, overflow:"auto", padding:40, display:"flex", flexDirection:"column", alignItems:"center"}}>
    <button onClick={()=>setShowStats(false)} style={{position:"fixed", top:16, right:16, ...mono(14), background:"none", border:"none", cursor:"pointer", color:C.espresso}}>✕ Close</button>
    <h2 style={{...display(32), marginBottom:8}}>Response Wall</h2>
    <p style={{...mono(14), color:C.espresso, marginBottom:8}}>{allResponses.length} people were profiled.</p>
    <p style={{...mono(14), color:C.red, marginBottom:32}}>
      {allResponses.filter(r=>r.didRebuild).length} chose to rebuild. {allResponses.filter(r=>!r.didRebuild).length} accepted the system's face.
    </p>
    <div style={{display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center", maxWidth:900}}>
      {allResponses.map((r,i) => (
        <div key={r.id} style={{border:`1.5px solid ${r.didRebuild ? C.red : C.espresso}33`, padding:12, width:160, textAlign:"center", background:r.didRebuild ? `${C.red}08` : `${C.espresso}05`}}>
          <p style={{...mono(10), color:C.espresso, marginBottom:4}}>{r.region}</p>
          <p style={{...display(12), marginBottom:4}}>"{r.label}"</p>
          <p style={{...mono(9), color:r.didRebuild ? C.red : C.sage}}>{r.didRebuild ? "REBUILT" : "ACCEPTED"}</p>
          <p style={{...mono(8), color:C.espresso, opacity:0.4, marginTop:4}}>{r.gender}</p>
        </div>
      ))}
    </div>
  </div>
)}

      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(40px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:0.6;}50%{transform:scale(1.3);opacity:1;}}
        *{box-sizing:border-box;margin:0;padding:0;}
        button:focus-visible{outline:2px solid ${C.red};outline-offset:3px;}
        ::selection{background:${C.sun};color:${C.espresso};}
      `}</style>
    </div>
  );
}
