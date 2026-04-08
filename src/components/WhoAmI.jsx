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

/* ═══ FACE SCORING: Form (soft↔sharp) × Expression (warm↔cool) ═══ */
const formScores = {
  "Warm soup":0.5,"Rice bowl with protein":0,"Lots of greens":-0.3,"Sweet dessert":1.0,"Whatever's from my hometown":0,
  "Warm tones":0.3,"A bit of everything":0.3,"Pastels":1.0,"Mostly black & white":-1.0,"Cool tones":-0.5,
  "Lo-fi music":0.3,"Wearing my favorite outfit":-0.3,"Fresh linen smell":0.5,"Nature sounds":0.5,"An organized space":-0.8,
  "Early morning":-0.3,"Late at night":-0.3,"Afternoon":0.3,"Depends on the day":0,
  "Exploring new places":-0.3,"Staying home":0.5,"Creative activities":0.3,"Explore nature":0.3,"It changes all the time":0,
  "Warm & textured":0.5,"Colorful & expressive":0.3,"Clean & minimal":-1.0,"A mix of styles":0.5,"Dark & moody":-0.8,
  "Dependable":-0.3,"Kind":0.5,"Calm":0.3,"Creative":0.3,"Authentic":0,
};
const exprScores = {
  "Warm soup":1.0,"Rice bowl with protein":0.3,"Lots of greens":0,"Sweet dessert":0.5,"Whatever's from my hometown":0.5,
  "Warm tones":0.8,"A bit of everything":0.3,"Pastels":0.3,"Mostly black & white":-0.8,"Cool tones":-0.5,
  "Lo-fi music":0.3,"Wearing my favorite outfit":0.5,"Fresh linen smell":-0.3,"Nature sounds":0.3,"An organized space":-0.5,
  "Early morning":0.3,"Late at night":-0.5,"Afternoon":0.3,"Depends on the day":0,
  "Exploring new places":0.8,"Staying home":-0.3,"Creative activities":0.5,"Explore nature":0.3,"It changes all the time":0.3,
  "Warm & textured":0.8,"Colorful & expressive":1.0,"Clean & minimal":-0.5,"A mix of styles":0.3,"Dark & moody":-1.0,
  "Dependable":0.3,"Kind":1.0,"Calm":-0.5,"Creative":0.5,"Authentic":0.3,
};

function scoreFace(answers) {
  let form = 0, expr = 0;
  for (let i = 1; i < answers.length; i++) {
    const val = answers[i];
    if (val) { form += formScores[val] || 0; expr += exprScores[val] || 0; }
  }
  return { form, expr };
}

function selectParts(form, expr) {
  const fZone = form > 0.8 ? "soft" : form < -0.8 ? "sharp" : "mid";
  const eZone = expr > 0.8 ? "warm" : expr < -0.8 ? "cool" : "neutral";
  const key = `${fZone}-${eZone}`;

  const eyeMap = {
    "soft-warm":"eyes-3.png","soft-neutral":"eyes-1.png","soft-cool":"eyes-1.png",
    "mid-warm":"eyes-2.png","mid-neutral":"eyes-8.png","mid-cool":"eyes-6.png",
    "sharp-warm":"eyes-2.png","sharp-neutral":"eyes-5.png","sharp-cool":"eyes-5.png",
  };
  const noseMap = {
    "soft-warm":"nose-1.png","soft-neutral":"nose-1.png","soft-cool":"nose-8.png",
    "mid-warm":"nose-6.png","mid-neutral":"nose-6.png","mid-cool":"nose-3.png",
    "sharp-warm":"nose-5.png","sharp-neutral":"nose-7.png","sharp-cool":"nose-3.png",
  };
  const mouthMap = {
    "soft-warm":"mouth-6.png","soft-neutral":"mouth-2.png","soft-cool":"mouth-1.png",
    "mid-warm":"mouth-7.png","mid-neutral":"mouth-3.png","mid-cool":"mouth-4.png",
    "sharp-warm":"mouth-8.png","sharp-neutral":"mouth-5.png","sharp-cool":"mouth-5.png",
  };

  return { eyes: eyeMap[key], nose: noseMap[key], mouth: mouthMap[key] };
}

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

function renderFace(faceData) {
  const rc = {"North America":"na","Middle East":"me","Asia Pacific":"ap","Europe":"eu"}[faceData.region] || "ap";
  const headNum = Math.random() > 0.5 ? 1 : 2;
  const hairNum = Math.random() > 0.5 ? 1 : 2;
  const base = "/images/faces/";
  const p = faceData.parts;

  return (
    <g>
      <image href={`${base}hair-${rc}-${hairNum}.png`} x={0} y={0} width={500} height={500} />
      <image href={`${base}head-${rc}-${headNum}.png`} x={0} y={0} width={500} height={500} />
      <g style={{ transformOrigin:"250px 250px", transform:"scale(1.25)" }}>
        <image href={`${base}${p.eyes}`} x={0} y={0} width={500} height={500} />
        <image href={`${base}${p.nose}`} x={0} y={0} width={500} height={500} />
        <image href={`${base}${p.mouth}`} x={0} y={0} width={500} height={500} />
      </g>
    </g>
  );
}

function generateFaceData(answers) {
  const region = answers[0] || "Asia Pacific";
  const pal = palettes[region] || palettes["Asia Pacific"];
  const pool = shapePools[region] || shapePools["Asia Pacific"];
  const gender = inferGender(answers);
  const { form, expr } = scoreFace(answers);
  const parts = selectParts(form, expr);
  return { region, palette: pal, profile: pool, gender, parts,
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
          bottom:30, left:20, zIndex:10,
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
          bottom:30, right:20, zIndex:10,
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
    <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
      {q.options.map((opt,i) => (
        <button key={i} onClick={()=>onAnswer(opt.value)}
          style={{
            background:"none", border: selected===opt.value ? `2.5px solid ${C.red}` : `1.5px solid ${C.espresso}33`,
            cursor:"pointer", width:"clamp(100px,18vw,130px)", padding:0, display:"flex", flexDirection:"column", justifyContent:"space-between", height:"auto", minHeight:160,
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
              padding:"12px 24px", cursor:"pointer", minWidth:"clamp(240px,70vw,300px)", transition:"all 0.3s ease",
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
    <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", alignItems:"flex-end", maxWidth:850, margin:"0 auto"}}>
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
            width:"clamp(110px,22vw,160px)", height:"clamp(120px,24vw,170px)", overflow:"hidden",borderRadius:"6px 6px 0 0", border: "none", background:"transparent"}}>
            {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"bottom" }}/> :
              <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{...mono(9),color:`${C.espresso}44`}}>[ img ]</span>
              </div>}
          </div>
          <div style={{
            ...mono(11), marginTop: 8,padding:"10px 8px", whiteSpace:"pre-line", textAlign:"center",
            width:"clamp(95px,20vw,140px)", lineHeight:1.3,
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
    { x:"0%", y:0 }, { x:"37%", y:0 }, { x:"74%", y:0 },
    { x:"18%", y:"52%" }, { x:"55%", y:"52%" },
  ];
  return (
    <div style={{ position:"relative", width:"100%", maxWidth:500, paddingBottom:"70%", overflow:"visible", margin:"0 auto" }}>
      {q.options.map((opt,i) => {
        const sel = selected===opt.value;
        return (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              position:"absolute", left:hexPositions[i].x, top:hexPositions[i].y, width:"28%", height:0, paddingBottom:"28%", overflow:"hidden",
              background:C.bg,clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              border:"none", cursor:"pointer", transition:"all 0.3s ease",
              animation:`slideUp 0.5s ease ${i*100}ms both`,
              transform: sel ? "scale(1.08)" : "scale(1)",
            }}
            onMouseEnter={e=>{if(!sel)e.currentTarget.style.transform="scale(1.05)";}}
            onMouseLeave={e=>{if(!sel)e.currentTarget.style.transform="scale(1)";}}>
            {opt.img ?
              <img src={opt.img} alt={opt.label} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:sel?"brightness(0.85)":"brightness(1)" }}/> :
              <div style={{ position:"absolute", inset:0, width:"100%", height:"100%", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
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
  const [rebuiltParts,setRebuiltParts] = useState({ head:null, hair:null, eyes:null, nose:null, mouth:null });
  const [selectedPart,setSelectedPart] = useState(null); // { type:"eyes", file:"eyes-3.png" }
  const [showCompare,setShowCompare] = useState(false);
  const [feedbackEmoji,setFeedbackEmoji] = useState(null);
  const [feedbackText,setFeedbackText] = useState("");
  const svgRef = useRef(null);
  const compareRef = useRef(null);

  // ═══ Google Sheets Integration ═══
  // INSTRUCTIONS: Create a Google Sheet, go to Extensions > Apps Script,
  // paste the script from google-sheets-script.gs, deploy as web app, paste URL below.
  const SHEETS_URL = "https://script.google.com/macros/s/AKfycbz42uzsHkwZq2SwRn-zxir9_mCZDh0cBscBJvAQVuiMXwsxX8HodfSAg8nEULwT6Rgx/exec";

  const sendToSheets = async (data) => {
    if (!SHEETS_URL) return;
    try {
      // Try fetch first
      const res = await fetch(SHEETS_URL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors",
        keepalive: true,
      });
    } catch(e) {
      // Fallback: sendBeacon (works even when page is closing)
      try {
        navigator.sendBeacon(SHEETS_URL, JSON.stringify(data));
      } catch(e2) { console.log("Sheets sync failed:", e2); }
    }
  };
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
    feedbackEmoji: null,
    feedbackText: "",
  };
  const updated = [...allResponses, response];
  setAllResponses(updated);
  localStorage.setItem("howYouSeeMe_responses", JSON.stringify(updated));
  return response;
};

const saveFeedback = () => {
  const updated = [...allResponses];
  if (updated.length > 0) {
    updated[updated.length - 1].feedbackEmoji = feedbackEmoji;
    updated[updated.length - 1].feedbackText = feedbackText;
  }
  setAllResponses(updated);
  localStorage.setItem("howYouSeeMe_responses", JSON.stringify(updated));
  // Send to Google Sheets
  sendToSheets(updated[updated.length - 1]);
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
  const startOver = () => { setStage("intro");setCurrentQ(0);setAnswers([]);setFaceData(null);setShowAssumptions(false);setRebuiltParts({head:null,hair:null,eyes:null,nose:null,mouth:null});setSelectedPart(null);setShowCompare(false);setFeedbackEmoji(null);setFeedbackText(""); };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.espresso, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",padding:"24px 16px 100px", position:"relative", overflow:"hidden", width:"100%" }}>

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
          <div style={{ border:`2px solid ${C.espresso}22`, padding:20, margin:"0 auto 28px", maxWidth:360, width:"90%", background:faceData.palette.bg }}>
            <svg ref={svgRef} viewBox="0 0 500 500" style={{ width:"100%", height:"auto" }}>
             {renderFace(faceData)}
            </svg>
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
                <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={()=>{saveResponse(true);setShowAssumptions(false);setStage("reassemble");}}
                  style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:C.red, color:C.bg, border:"none", padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.espresso}
                  onMouseLeave={e=>e.currentTarget.style.background=C.red}>
                  Rebuild yourself
                </button>
                <button onClick={()=>{saveResponse(false);setStage("feedback");}}
                 style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}`, padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease" }}
                 onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.color=C.bg;}}
                 onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.espresso;}}>
                 Accept this face
                </button>
                </div>
              </div>
            </div>)}
        </div>
      )}

      {/* ═══ REASSEMBLE ═══ */}
      {stage==="reassemble" && faceData && !showCompare && (
        <div style={{ textAlign:"center", maxWidth:750, width:"100%", zIndex:1, animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h2 style={{...display("clamp(28px,5vw,40px)"), marginBottom:8 }}>Now, who are you<span style={{color:C.sun}}>?</span></h2>
          <p style={{...mono(13), color:C.olive, marginBottom:28 }}>
            {selectedPart ? `Tap the canvas to place the ${selectedPart.type}` : "Pick a feature below, then tap the canvas to place it."}
          </p>

          {/* ── Face Canvas — click to place selected part ── */}
          <div onClick={()=>{
              if(selectedPart){
                setRebuiltParts(p=>({...p,[selectedPart.type]:selectedPart.file}));
                setSelectedPart(null);
              }
            }}
            style={{ position:"relative", width:"min(360px, 85vw)", height:"min(360px, 85vw)", margin:"0 auto 28px",
              border:`2px solid ${selectedPart ? C.sun : C.espresso+"22"}`,
              background:faceData.palette.bg, overflow:"hidden",
              cursor: selectedPart ? "copy" : "default",
              transition:"border-color 0.2s ease", maxWidth:"85vw" }}>

            {/* All placed parts stacked at full size — PNGs are 500×500 pre-positioned */}
            {rebuiltParts.hair && <img src={`/images/faces/${rebuiltParts.hair}`} alt="hair"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", pointerEvents:"none", zIndex:0 }}/>}
            {rebuiltParts.head && <img src={`/images/faces/${rebuiltParts.head}`} alt="head"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", pointerEvents:"none", zIndex:1 }}/>}
            {rebuiltParts.eyes && <img src={`/images/faces/${rebuiltParts.eyes}`} alt="eyes"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", pointerEvents:"none", zIndex:2, transform:"scale(1.25)", transformOrigin:"center" }}/>}
            {rebuiltParts.nose && <img src={`/images/faces/${rebuiltParts.nose}`} alt="nose"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", pointerEvents:"none", zIndex:2, transform:"scale(1.25)", transformOrigin:"center" }}/>}
            {rebuiltParts.mouth && <img src={`/images/faces/${rebuiltParts.mouth}`} alt="mouth"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", pointerEvents:"none", zIndex:2, transform:"scale(1.25)", transformOrigin:"center" }}/>}

            {/* Empty state */}
            {!rebuiltParts.head && !rebuiltParts.hair && !rebuiltParts.eyes && !rebuiltParts.nose && !rebuiltParts.mouth && (
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <p style={{...mono(12), color:`${C.espresso}33` }}>Start building your face</p>
              </div>
            )}
          </div>

          {/* ── Parts Palette ── */}
          {[
            { type:"head", label:"HEAD", items: ["na","me","ap","eu"].flatMap(r=>[1,2].map(n=>`head-${r}-${n}.png`)) },
            { type:"hair", label:"HAIR", items: ["na","me","ap","eu"].flatMap(r=>[1,2].map(n=>`hair-${r}-${n}.png`)) },
            { type:"eyes", label:"EYES", items: [1,2,3,4,5,6,7,8].map(n=>`eyes-${n}.png`) },
            { type:"nose", label:"NOSE", items: [1,2,3,4,5,6,7,8].map(n=>`nose-${n}.png`) },
            { type:"mouth", label:"MOUTH", items: [1,2,3,4,5,6,7,8].map(n=>`mouth-${n}.png`) },
          ].map(group => (
            <div key={group.type} style={{ marginBottom:16 }}>
              <p style={{...mono(10), letterSpacing:"2px", textTransform:"uppercase", color:C.olive, marginBottom:8 }}>{group.label}</p>
              <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap", padding:"0 8px" }}>
                {group.items.map(file => {
                  const isSelected = selectedPart?.file === file;
                  const isPlaced = rebuiltParts[group.type] === file;
                  return (
                    <button key={file} onClick={()=>setSelectedPart(isSelected ? null : {type:group.type, file})}
                      style={{
                        width:"clamp(48px,12vw,64px)", height:"clamp(48px,12vw,64px)", padding:4, cursor:"pointer", transition:"all 0.2s ease",
                        border: isSelected ? `3px solid ${C.red}` : isPlaced ? `2px solid ${C.sun}` : `1.5px solid ${C.espresso}22`,
                        background: isSelected ? `${C.red}11` : isPlaced ? `${C.sun}11` : C.light,
                        borderRadius:6, opacity: isPlaced && !isSelected ? 0.5 : 1,
                        transform: isSelected ? "scale(1.1)" : "scale(1)",
                      }}
                      onMouseEnter={e=>{if(!isSelected)e.currentTarget.style.borderColor=C.red;}}
                      onMouseLeave={e=>{if(!isSelected)e.currentTarget.style.borderColor=isPlaced?C.sun:`${C.espresso}22`;}}>
                      <img src={`/images/faces/${file}`} alt={file} style={{ width:"100%", height:"100%", objectFit:"contain" }}/>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ── Action Buttons ── */}
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginTop:24 }}>
            {rebuiltParts.eyes && rebuiltParts.nose && rebuiltParts.mouth && rebuiltParts.head && (
              <button onClick={()=>setShowCompare(true)}
                style={{...mono(12), letterSpacing:"1.5px", textTransform:"uppercase", background:C.red, color:C.bg, border:"none", padding:"14px 36px", cursor:"pointer", transition:"all 0.3s ease" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.espresso}
                onMouseLeave={e=>e.currentTarget.style.background=C.red}>
                Compare faces
              </button>
            )}
            <button onClick={()=>setRebuiltParts({head:null,hair:null,eyes:null,nose:null,mouth:null})}
              style={{...mono(12), letterSpacing:"1.5px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}33`, padding:"12px 28px", cursor:"pointer", transition:"all 0.3s ease" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.espresso}
              onMouseLeave={e=>e.currentTarget.style.borderColor=`${C.espresso}33`}>
              Clear
            </button>
            <button onClick={startOver}
              style={{...mono(12), letterSpacing:"1.5px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}33`, padding:"12px 28px", cursor:"pointer", transition:"all 0.3s ease" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.espresso}
              onMouseLeave={e=>e.currentTarget.style.borderColor=`${C.espresso}33`}>
              Start over
            </button>
          </div>

          <p style={{...display(16), color:C.olive, margin:"36px auto 0", maxWidth:440, lineHeight:1.5, fontStyle:"italic" }}>
            Identity is not what others project onto you.<br/>It's what you choose to assemble.
          </p>
        </div>
      )}

      {/* ═══ COMPARE ═══ */}
      {stage==="reassemble" && showCompare && faceData && (
        <div ref={compareRef} style={{ textAlign:"center", maxWidth:800, width:"100%", zIndex:1, animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h2 style={{...display("clamp(24px,4vw,36px)"), marginBottom:8 }}>The system's face <span style={{color:C.red}}>vs</span> yours</h2>
          <p style={{...mono(12), color:C.olive, marginBottom:32 }}>Left: how they saw you. Right: how you see yourself.</p>

          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
            {/* Stereotype face */}
            <div style={{ textAlign:"center" }}>
              <p style={{...mono(10), letterSpacing:"2px", textTransform:"uppercase", color:C.red, marginBottom:8 }}>Their version</p>
              <div style={{ width:"min(280px,40vw)", height:"min(280px,40vw)", position:"relative", border:`2px solid ${C.espresso}22`, background:faceData.palette.bg, padding:10 }}>
                <svg viewBox="0 0 500 500" style={{ width:"100%", height:"100%" }}>
                  {renderFace(faceData)}
                </svg>
              </div>
              <p style={{...mono(11), color:C.espresso, marginTop:8 }}>"{faceData.profile.label}"</p>
            </div>

            {/* User's rebuilt face */}
            <div style={{ textAlign:"center" }}>
              <p style={{...mono(10), letterSpacing:"2px", textTransform:"uppercase", color:C.sun, marginBottom:8 }}>Your version</p>
              <div style={{ width:"min(280px,40vw)", height:"min(280px,40vw)", position:"relative", border:`2px solid ${C.espresso}22`, background:faceData.palette.bg, overflow:"hidden" }}>
                {rebuiltParts.hair && <img src={`/images/faces/${rebuiltParts.hair}`} alt="hair"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", zIndex:0 }}/>}
                {rebuiltParts.head && <img src={`/images/faces/${rebuiltParts.head}`} alt="head"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", zIndex:1 }}/>}
                {rebuiltParts.eyes && <img src={`/images/faces/${rebuiltParts.eyes}`} alt="eyes"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", zIndex:2, transform:"scale(1.25)", transformOrigin:"center" }}/>}
                {rebuiltParts.nose && <img src={`/images/faces/${rebuiltParts.nose}`} alt="nose"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", zIndex:2, transform:"scale(1.25)", transformOrigin:"center" }}/>}
                {rebuiltParts.mouth && <img src={`/images/faces/${rebuiltParts.mouth}`} alt="mouth"
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain", zIndex:2, transform:"scale(1.25)", transformOrigin:"center" }}/>}
              </div>
              <p style={{...mono(11), color:C.espresso, marginTop:8 }}>Your own face</p>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setShowCompare(false)}
              style={{...mono(12), letterSpacing:"1.5px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}`, padding:"14px 32px", cursor:"pointer", transition:"all 0.3s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.color=C.bg;}}
              onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.espresso;}}>
              ← Edit face
            </button>
            <button onClick={()=>setStage("feedback")}
              style={{...mono(12), letterSpacing:"1.5px", textTransform:"uppercase", background:C.red, color:C.bg, border:"none", padding:"14px 32px", cursor:"pointer", transition:"all 0.3s ease" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.espresso}
              onMouseLeave={e=>e.currentTarget.style.background=C.red}>
              Done — leave feedback
            </button>
          </div>

          <p style={{...display(16), color:C.olive, margin:"36px auto 0", maxWidth:440, lineHeight:1.5, fontStyle:"italic" }}>
            Identity is not what others project onto you.<br/>It's what you choose to assemble.
          </p>
        </div>
      )}

      {/* ═══ FEEDBACK ═══ */}
      {stage==="feedback" && (
        <div style={{ textAlign:"center", maxWidth:500, width:"100%", zIndex:1, animation:"slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both", padding:"0 20px" }}>
          <h2 style={{...display("clamp(24px,5vw,36px)"), marginBottom:8 }}>How did that feel<span style={{color:C.sun}}>?</span></h2>
          <p style={{...mono(13), color:C.olive, marginBottom:32 }}>Your identity was profiled by a system. We'd love to hear your thoughts.</p>

          {/* Emoji reactions */}
          <div style={{ display:"flex", gap:16, justifyContent:"center", marginBottom:32 }}>
            {[
              { emoji:"😠", label:"Upset" },
              { emoji:"😕", label:"Uneasy" },
              { emoji:"🤔", label:"Thoughtful" },
              { emoji:"😮", label:"Surprised" },
              { emoji:"😊", label:"Amused" },
            ].map(r => (
              <button key={r.emoji} onClick={()=>setFeedbackEmoji(r.emoji)}
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                  background:"none", border: feedbackEmoji===r.emoji ? `2px solid ${C.red}` : `2px solid transparent`,
                  borderRadius:12, padding:"12px 10px", cursor:"pointer", transition:"all 0.2s ease",
                  transform: feedbackEmoji===r.emoji ? "scale(1.15)" : "scale(1)",
                }}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
                onMouseLeave={e=>e.currentTarget.style.transform=feedbackEmoji===r.emoji?"scale(1.15)":"scale(1)"}>
                <span style={{ fontSize:36 }}>{r.emoji}</span>
                <span style={{...mono(10), color:C.espresso }}>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Text input */}
          <textarea
            value={feedbackText}
            onChange={e=>setFeedbackText(e.target.value)}
            placeholder="Share your thoughts... (optional)"
            style={{
              ...mono(14), width:"100%", minHeight:100, padding:16,
              background:C.light, border:`1.5px solid ${C.espresso}22`, borderRadius:4,
              color:C.espresso, resize:"vertical", outline:"none",
              transition:"border-color 0.2s ease",
            }}
            onFocus={e=>e.target.style.borderColor=C.red}
            onBlur={e=>e.target.style.borderColor=`${C.espresso}22`}
          />

          {/* Submit */}
          <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:24 }}>
            <button onClick={()=>{saveFeedback();setStage("thankyou");}}
              style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:C.red, color:C.bg, border:"none", padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.espresso}
              onMouseLeave={e=>e.currentTarget.style.background=C.red}>
              {feedbackEmoji || feedbackText ? "Submit" : "Skip"}
            </button>
          </div>
        </div>
      )}

      {/* ═══ THANK YOU ═══ */}
      {stage==="thankyou" && (
        <div style={{ textAlign:"center", maxWidth:500, width:"100%", zIndex:1, animation:"slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h2 style={{...display("clamp(28px,5vw,42px)"), marginBottom:16 }}>Thank you<span style={{color:C.sun}}>.</span></h2>
          <p style={{...display(18), color:C.olive, marginBottom:12, fontStyle:"italic", lineHeight:1.5 }}>
            Identity is not what others project onto you.<br/>It's what you choose to assemble.
          </p>
          <p style={{...mono(13), color:C.espresso, marginBottom:40, opacity:0.6 }}>
            — The Agora Project by Mega Mario
          </p>
          <button onClick={startOver}
            style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}`, padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.color=C.bg;}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.espresso;}}>
            Start a new session
          </button>
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
  <div style={{position:"fixed", inset:0, background:`${C.bg}ee`, zIndex:100, overflow:"auto", padding:"40px 20px", display:"flex", flexDirection:"column", alignItems:"center"}}>
    <button onClick={()=>setShowStats(false)} style={{position:"fixed", top:16, right:16, ...mono(14), background:"none", border:"none", cursor:"pointer", color:C.espresso}}>✕ Close</button>
    <h2 style={{...display(32), marginBottom:8}}>Response Wall</h2>
    <p style={{...mono(14), color:C.espresso, marginBottom:8}}>{allResponses.length} people were profiled.</p>
    <p style={{...mono(14), color:C.red, marginBottom:12}}>
      {allResponses.filter(r=>r.didRebuild).length} chose to rebuild. {allResponses.filter(r=>!r.didRebuild).length} accepted the system's face.
    </p>
    {/* Export CSV button */}
    <button onClick={()=>{
      const headers = "timestamp,region,label,gender,didRebuild,feedbackEmoji,feedbackText\n";
      const rows = allResponses.map(r =>
        `${r.timestamp},${r.region},"${r.label}",${r.gender},${r.didRebuild},${r.feedbackEmoji||""},${(r.feedbackText||"").replace(/"/g,'""')}`
      ).join("\n");
      const blob = new Blob([headers+rows], {type:"text/csv"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `agora-responses-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
    }}
      style={{...mono(11), letterSpacing:"1px", textTransform:"uppercase", background:C.espresso, color:C.bg, border:"none", padding:"10px 24px", cursor:"pointer", marginBottom:24, borderRadius:4}}>
      Export CSV
    </button>
    <div style={{display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center", maxWidth:900}}>
      {allResponses.map((r,i) => (
        <div key={r.id} style={{border:`1.5px solid ${r.didRebuild ? C.red : C.espresso}33`, padding:12, width:160, textAlign:"center", background:r.didRebuild ? `${C.red}08` : `${C.espresso}05`}}>
          <p style={{...mono(10), color:C.espresso, marginBottom:4}}>{r.region}</p>
          <p style={{...display(12), marginBottom:4}}>"{r.label}"</p>
          <p style={{...mono(9), color:r.didRebuild ? C.red : C.sage}}>{r.didRebuild ? "REBUILT" : "ACCEPTED"}</p>
          {r.feedbackEmoji && <p style={{fontSize:18, marginTop:4}}>{r.feedbackEmoji}</p>}
          {r.feedbackText && <p style={{...mono(8), color:C.espresso, opacity:0.6, marginTop:4, fontStyle:"italic"}}>"{r.feedbackText.slice(0,50)}{r.feedbackText.length>50?"...":""}"</p>}
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
        html{-webkit-text-size-adjust:100%;overflow-x:hidden;}
        body{overflow-x:hidden;}
        textarea{font-family:'Source Code Pro','Courier New',monospace;}
        img{max-width:100%;}
        @media(max-width:480px){
          button{-webkit-tap-highlight-color:transparent;}
        }
      `}</style>
    </div>
  );
}