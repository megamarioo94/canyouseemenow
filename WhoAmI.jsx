import { useState, useCallback, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════
   HOW YOU SEE ME? — V6.1 With Images
   Mega Mario | MADE 25/26 | The Agora Module
   ═══════════════════════════════════════════════ */

const C = {
  bg: "#F4ECDA",
  espresso: "#4B351D",
  red: "#9D3E22",
  sun: "#D4A843",
  denim: "#8FADBF",
  olive: "#8F915F",
  cream: "#F0E6D0",
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
      { label: "Lots of greens\nmake me feel better", value: "Lots of greens", color: C.cream },
      { label: "Sweet dessert", value: "Sweet dessert", color: C.red },
      { label: "As long as it's\nfrom my hometown", value: "Whatever's from my hometown", color: C.cream },
    ],
  },
  {
    id: "wardrobe", question: "What colours live in your wardrobe?",
    layout: "scattered",
    options: [
      { label: "I'd prefer\nwarm tone", value: "Warm tones", img: "/images/warm-tone.png", color: "#B8704A" },
      { label: "A fashionista here!\nAlmost got all color", value: "A bit of everything", img: "/images/fashionista.png", color: C.sun },
      { label: "love pastels", value: "Pastels", img: "/images/pastel.png", color: "#D4B8C4" },
      { label: "black and white", value: "Mostly black & white", img: "/images/black-and-white.png", color: C.red },
      { label: "cool tone make me\nlooks good!", value: "Cool tones", img: "/images/cool-tone.png", color: C.denim },
    ],
  },
  {
    id: "comfort", question: "What makes you feel comfy?",
    layout: "card-row",
    options: [
      { label: "Lo-fi music", value: "Lo-fi music", img: null, color: C.sun },
      { label: "You wear your\nbest and fav outfit", value: "Wearing my favorite outfit", img: null, color: C.cream },
      { label: "Subtle smell of\nfresh linen", value: "Fresh linen smell", img: null, color: C.denim },
      { label: "Sounds of bird\nchirping and\nleaves hitting", value: "Nature sounds", img: null, color: C.red },
      { label: "Aesthetic and\norganized table", value: "An organized space", img: null, color: "#B8945A" },
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
      { label: "explore\nnature", value: "Explore nature", img: "/images/explore-nature.png", color: C.olive },
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
      { label: "DEPENDABLE", value: "Dependable", style: "nametag" },
      { label: "KIND", value: "Kind", style: "stamp" },
      { label: "calm", value: "Calm", style: "luggage" },
      { label: "creative", value: "Creative", style: "tape" },
      { label: "authentic", value: "Authentic", style: "ticket" },
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
function renderFace(pal, gender, region) {
  return (
    <g>
      <circle cx={0} cy={0} r={80} fill={pal.skin[0]} stroke={pal.stroke} strokeWidth={3}/>
      <circle cx={-25} cy={-15} r={7} fill={pal.stroke}/>
      <circle cx={25} cy={-15} r={7} fill={pal.stroke}/>
      <path d="M-15,25 Q0,40 15,25" fill="none" stroke={pal.stroke} strokeWidth={3}/>
    </g>
  );
}

function generateFaceData(answers) {
  const region = answers[0] || "Asia Pacific";
  const pal = palettes[region] || palettes["Asia Pacific"];
  const pool = shapePools[region] || shapePools["Asia Pacific"];
  const gender = "neutral";
  return { region: region, palette: pal, profile: pool, gender: gender,
    genderLabel: "balanced, neutral, adaptable" };
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
          background:C.red, cursor:"pointer", display:"flex", alignItems:"center",
          justifyContent:"center", transition:"all 0.3s ease", position:"fixed",
          bottom:32, left:32, boxShadow:"0 2px 8px rgba(0,0,0,0.15)",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{e.currentTarget.style.background=C.red;e.currentTarget.style.transform="scale(1)";}}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill={C.bg}>
            <path d="M11,2 L5,8 L11,14 Z"/>
          </svg>
        </button>
      )}
      {/* Forward — outlined circle with olive triangle */}
      {showForward && (
        <button onClick={onForward} style={{
          width:52, height:52, borderRadius:"50%", border:`2px solid ${C.espresso}33`,
          background:"none", cursor:"pointer", display:"flex", alignItems:"center",
          justifyContent:"center", transition:"all 0.3s ease", position:"fixed",
          bottom:32, right:32,
        }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.olive;e.currentTarget.style.transform="scale(1.08)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=`${C.espresso}33`;e.currentTarget.style.transform="scale(1)";}}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill={C.olive}>
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
      <svg viewBox="0 0 800 400" style={{ position:"absolute", inset:0, opacity:0.06, pointerEvents:"none" }}>
        <path d="M100,200 Q150,150 200,180 Q250,140 300,160 Q350,120 400,150 Q450,130 500,160 Q550,140 600,170 Q650,150 700,180" fill="none" stroke={C.espresso} strokeWidth={2}/>
        <path d="M120,250 Q180,220 240,240 Q300,210 360,230 Q420,200 480,220 Q540,210 600,230 Q660,220 720,240" fill="none" stroke={C.espresso} strokeWidth={1.5}/>
        <ellipse cx={200} cy={180} rx={80} ry={60} fill="none" stroke={C.espresso} strokeWidth={1}/>
        <ellipse cx={500} cy={200} rx={100} ry={70} fill="none" stroke={C.espresso} strokeWidth={1}/>
      </svg>
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
  return (
    <div style={{ position:"relative", maxWidth:700, margin:"0 auto" }}>
      {/* Big food illustration */}
      <div style={{ width:"100%", maxWidth:600, margin:"0 auto 24px", borderRadius:8, overflow:"hidden" }}>
        <img src={q.bgImage} alt="comfort food" style={{ width:"100%", height:"auto", display:"block" }}
          onError={e=>{e.target.style.display="none";}} />
      </div>
      {/* Answer buttons */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
        {q.options.map((opt,i) => (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              ...mono(12), whiteSpace:"pre-line", textAlign:"center",
              padding:"10px 18px", cursor:"pointer", lineHeight:1.4,
              background: selected===opt.value ? C.red : `${opt.color}cc`,
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
    </div>
  );
}

/* Q3: Scattered wardrobe — with real images */
function LayoutScattered({ q, onAnswer, selected }) {
  const positions = [
    { top:0, left:"2%" }, { top:10, left:"22%" }, { top:-10, left:"42%" },
    { top:0, left:"62%" }, { top:10, left:"80%" },
  ];
  return (
    <div style={{ position:"relative", minHeight:360, maxWidth:750, margin:"0 auto", width:"100%" }}>
      {q.options.map((opt,i) => (
        <button key={i} onClick={()=>onAnswer(opt.value)}
          style={{
            position:"absolute", top:positions[i].top+20, left:positions[i].left,
            background:"none", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", gap:6,
            transition:"transform 0.3s ease", animation:`slideUp 0.5s ease ${i*80}ms both`,
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <div style={{
            width:130, height:150, overflow:"hidden", borderRadius:4,
            border: selected===opt.value ? `3px solid ${C.red}` : `1.5px solid ${C.espresso}22`,
            background: selected===opt.value ? `${C.red}11` : `${opt.color}15`,
          }}>
            {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> :
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
      ))}
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
            cursor:"pointer", width:150, padding:0, display:"flex", flexDirection:"column",
            transition:"all 0.3s ease", animation:`slideUp 0.5s ease ${i*80}ms both`,
            boxShadow: selected===opt.value ? `4px 4px 0 ${C.red}` : "none",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          <div style={{ width:"100%", height:110, background:`${opt.color}22`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> :
              <span style={{...mono(9),color:`${C.espresso}44`}}>[ img ]</span>}
          </div>
          <div style={{
            ...mono(11), padding:"8px 6px", whiteSpace:"pre-line", textAlign:"center",
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
    <div style={{ display:"flex", gap:40, justifyContent:"center", alignItems:"center", flexWrap:"wrap" }}>
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
          <img src={q.sideImage} alt="flip phone" style={{ width:180, height:"auto", display:"block" }}/> :
          <Img w={180} h={280} alt="phone"/>}
      </div>
    </div>
  );
}

/* Q6: Folder Tabs with real images */
function LayoutFolderTabs({ q, onAnswer, selected }) {
  return (
    <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", alignItems:"flex-end" }}>
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
            width:130, height:90, overflow:"hidden", borderRadius:"6px 6px 0 0",
            border: selected===opt.value ? `2.5px solid ${C.red}` : `1.5px solid ${C.espresso}22`,
            borderBottom:"none", background:`${opt.color}22`,
          }}>
            {opt.img ? <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> :
              <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{...mono(9),color:`${C.espresso}44`}}>[ img ]</span>
              </div>}
          </div>
          <div style={{
            ...mono(11), padding:"10px 8px", whiteSpace:"pre-line", textAlign:"center",
            width:130, lineHeight:1.3,
            background: selected===opt.value ? C.red : opt.color,
            color: selected===opt.value ? C.bg : C.espresso,
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
    { x:0, y:0 }, { x:170, y:0 }, { x:340, y:0 },
    { x:85, y:155 }, { x:255, y:155 },
  ];
  return (
    <div style={{ position:"relative", width:500, height:340, margin:"0 auto" }}>
      {q.options.map((opt,i) => {
        const sel = selected===opt.value;
        return (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              position:"absolute", left:hexPositions[i].x, top:hexPositions[i].y,
              width:160, height:150, padding:0, overflow:"hidden",
              clipPath:"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              border:"none", cursor:"pointer", transition:"all 0.3s ease",
              animation:`slideUp 0.5s ease ${i*100}ms both`,
              transform: sel ? "scale(1.08)" : "scale(1)",
            }}
            onMouseEnter={e=>{if(!sel)e.currentTarget.style.transform="scale(1.05)";}}
            onMouseLeave={e=>{if(!sel)e.currentTarget.style.transform="scale(1)";}}>
            {opt.img ?
              <img src={opt.img} alt={opt.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter:sel?"brightness(0.85)":"brightness(1)" }}/> :
              <div style={{ width:"100%", height:"100%", background:`${opt.color}33`, display:"flex", alignItems:"center", justifyContent:"center" }}>
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
  const styles = {
    nametag:(sel)=>({ background:sel?C.red:"#B82B2B", color:"white", padding:"20px 28px", border:"none", fontWeight:700, fontSize:14 }),
    stamp:(sel)=>({ background:sel?C.red:C.espresso, color:C.sun, padding:"24px 30px", border:`4px double ${C.sun}`, fontSize:22, fontWeight:700, letterSpacing:"6px" }),
    luggage:(sel)=>({ background:sel?C.red:C.denim, color:C.espresso, padding:"16px 28px", borderRadius:"50%/40%", border:"none", fontStyle:"italic", fontSize:18 }),
    tape:(sel)=>({ background:sel?C.red:`${C.sun}88`, color:C.espresso, padding:"12px 32px", border:"none", fontStyle:"italic", fontSize:16, transform:"rotate(-3deg)" }),
    ticket:(sel)=>({ background:sel?C.red:C.cream, color:sel?C.bg:C.espresso, padding:"14px 24px", border:`2px dashed ${sel?C.bg:C.red}`, fontSize:14 }),
  };
  const positions = [
    { top:0, left:"5%" }, { top:-10, left:"35%" }, { top:10, left:"68%" },
    { top:130, left:"15%" }, { top:140, left:"55%" },
  ];
  return (
    <div style={{ position:"relative", minHeight:280, maxWidth:650, margin:"0 auto", width:"100%" }}>
      {q.options.map((opt,i) => {
        const sel = selected===opt.value;
        return (
          <button key={i} onClick={()=>onAnswer(opt.value)}
            style={{
              ...mono(14), position:"absolute", top:positions[i].top+20, left:positions[i].left,
              cursor:"pointer", transition:"all 0.3s ease",
              animation:`slideUp 0.5s ease ${i*100}ms both`,
              ...styles[opt.style](sel),
            }}
            onMouseEnter={e=>e.currentTarget.style.transform=`${opt.style==="tape"?"rotate(-3deg) ":""}scale(1.08)`}
            onMouseLeave={e=>e.currentTarget.style.transform=opt.style==="tape"?"rotate(-3deg)":""}>
            {opt.label}
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
  const svgRef = useRef(null);

  const handleAnswer = val => { const na=[...answers]; na[currentQ]=val; setAnswers(na); };

  const goNext = () => {
    if(answers[currentQ]===undefined) return;
    if(currentQ<questions.length-1) setCurrentQ(currentQ+1);
    else {
      setStage("generating"); setWaitLine2(false);
      setTimeout(()=>{
  try {
    const d=generateFaceData(answers); 
    setFaceData(d);
    setStage("reveal"); 
    setTimeout(()=>setShowAssumptions(true),1200);
  } catch(e) {
    alert("Error: " + e.message);
    setStage("intro");
  }
},4000);
    }
  };
  const goBack = () => { if(currentQ>0) setCurrentQ(currentQ-1); };
  const startOver = () => { setStage("intro");setCurrentQ(0);setAnswers([]);setFaceData(null);setShowAssumptions(false); };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.espresso, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px", position:"relative", overflow:"hidden" }}>

      {/* Grain */}
      <div style={{ position:"fixed", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents:"none", zIndex:0 }}/>
      <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Source+Code+Pro:wght@400;500;700&display=swap" rel="stylesheet"/>

      {/* ═══ INTRO ═══ */}
      {stage==="intro" && (
        <div style={{ textAlign:"center", maxWidth:700, animation:"slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both", zIndex:1, border:`3px solid ${C.espresso}`, padding:"60px 40px", background:C.bg, position:"relative" }}>
          <p style={{...mono(12), letterSpacing:"4px", textTransform:"uppercase", color:C.espresso, marginBottom:36, opacity:0.7 }}>
            An interactive exploration
          </p>
          <div style={{ position:"relative", marginBottom:20, lineHeight:0.85 }}>
            <div style={{...display("clamp(36px,6vw,52px)"), marginBottom:4 }}>HOW YOU</div>
            <div style={{ position:"relative", display:"inline-block" }}>
              <div style={{...display("clamp(72px,14vw,120px)"), color:`${C.red}44`, position:"absolute", left:6, top:6, zIndex:0 }}>SEE</div>
              <div style={{...display("clamp(72px,14vw,120px)"), color:C.red, position:"relative", zIndex:1 }}>SEE</div>
            </div>
            <div style={{ position:"relative", display:"inline-block", marginLeft:8 }}>
              <div style={{...display("clamp(72px,14vw,120px)"), color:`${C.red}44`, position:"absolute", left:6, top:6, zIndex:0 }}>ME?</div>
              <div style={{...display("clamp(72px,14vw,120px)"), color:C.red, position:"relative", zIndex:1 }}>ME?</div>
            </div>
          </div>
          <p style={{...mono(14), color:C.espresso, marginBottom:8, opacity:0.7 }}>
            Answer 8 simple questions. The system will generate a face for you.
          </p>
          <p style={{...display(18), color:C.red, marginBottom:40, fontStyle:"italic" }}>
            But whose version of you is it?
          </p>
          <button onClick={()=>setStage("quiz")}
            style={{...mono(16), letterSpacing:"2px", textTransform:"uppercase", background:"none", color:C.espresso, border:`2px solid ${C.espresso}`, padding:"16px 52px", cursor:"pointer", transition:"all 0.3s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.espresso;e.currentTarget.style.color=C.bg;}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.espresso;}}>
            START!
          </button>
          <div style={{ position:"absolute", bottom:-3, right:-3, width:"100%", height:"100%", border:`3px solid ${C.espresso}`, zIndex:-1 }}/>
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
                <button onClick={()=>{setShowAssumptions(false);setStage("reassemble");}}
                  style={{...mono(14), letterSpacing:"2px", textTransform:"uppercase", background:C.red, color:C.bg, border:"none", padding:"16px 44px", cursor:"pointer", transition:"all 0.3s ease" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.espresso}
                  onMouseLeave={e=>e.currentTarget.style.background=C.red}>
                  Rebuild yourself
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
        <p style={{ position:"fixed", bottom:16, ...mono(9), letterSpacing:"2px", color:C.olive, textTransform:"uppercase", zIndex:1, opacity:0.5 }}>Mega Mario — MADE 25/26</p>
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
