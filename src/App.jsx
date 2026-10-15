import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

const TYPES={
A:{name:"ChatGPT 型",title:"靈感奔流的創意魔法師",icon:"💡",color:"from-emerald-400 to-teal-600",desc:"你充滿想像力，擅長透過交流開拓可能性，並把抽象概念變得生動有趣。",strength:"創意、表達、靈活應變",growth:"篩選點子並核實資訊",partner:"Copilot 型、Perplexity 型"},
B:{name:"Microsoft Copilot 型",title:"沉着可靠的任務指揮官",icon:"🧭",color:"from-blue-400 to-indigo-600",desc:"你務實而有組織，擅長把零散想法整理成清晰計劃，推動團隊完成任務。",strength:"規劃、整理、執行",growth:"為探索與創意預留空間",partner:"ChatGPT 型、Gemini 型"},
C:{name:"Claude 型",title:"月光圖書館的沉思學者",icon:"📚",color:"from-amber-400 to-orange-600",desc:"你細膩、耐心，重視脈絡與深度，習慣理解不同觀點後才作判斷。",strength:"深度閱讀、分析、同理",growth:"設定思考時限，適時行動",partner:"Perplexity 型、Copilot 型"},
D:{name:"Gemini 型",title:"穿梭萬象的多媒體探險家",icon:"🌐",color:"from-violet-400 to-fuchsia-600",desc:"你好奇而開放，喜歡探索不同媒體與領域，並把看似無關的線索連結起來。",strength:"探索、跨學科、多媒體",growth:"收窄範圍並聚焦重點",partner:"DeepSeek 型、Claude 型"},
E:{name:"Perplexity 型",title:"追尋真相的銀徽記者",icon:"🔎",color:"from-cyan-400 to-sky-600",desc:"你理性而謹慎，重視來源與證據，會主動區分事實、意見與推測。",strength:"搜尋、查證、資訊判斷",growth:"接受資料不完整時仍可探索",partner:"ChatGPT 型、Claude 型"},
F:{name:"DeepSeek 型",title:"極速拆解的邏輯工程師",icon:"⚙️",color:"from-slate-500 to-slate-800",desc:"你冷靜、直接，善於找出規律，並把複雜問題拆成清晰而可處理的步驟。",strength:"推理、解難、系統思考",growth:"兼顧感受、文化與表達方式",partner:"Gemini 型、ChatGPT 型"}}
const L=["A","B","C","D","E","F"];
const RAW=[
["老師給你一個完全自由的專題，你首先會怎樣做？",["立即腦力激盪，想出幾個有趣主題","建立時間表，列出每週工作","先閱讀背景資料，真正理解題目","搜集圖片、影片、地圖等素材","尋找可靠來源，確認可引用資料","把專題拆成幾個小問題逐一解決"]],
["在小組討論中，你通常扮演甚麼角色？",["提出新點子，令討論更有活力","記錄決定、分配工作並提醒進度","聆聽不同意見，再深入分析","把不同同學的想法連結起來","提醒大家核實資料","找出問題核心及高效方案"]],
["遇上不熟悉的問題時，你會怎樣做？",["先與別人討論，從對話找靈感","找出可以立即採取的第一步","慢慢閱讀，了解背景與細節","從不同媒體和角度探索","搜尋可信來源的解釋","分析已知條件，再推演答案"]],
["如果要介紹一段歷史，你會選擇：",["寫成角色鮮明的故事","製作結構清晰的簡報","深入分析事件原因和影響","加入地圖、圖片、文物及影片","列出史料出處供觀眾查證","製作時間線呈現邏輯關係"]],
["朋友提出一個很好的計劃，你通常會說：",["我們還可以加入一些新元素！","誰負責甚麼？何時完成？","先想清楚它會帶來甚麼影響。","可參考其他地方的類似做法。","這些資料和假設可靠嗎？","這是最簡單有效的方法嗎？"]],
["哪一種課堂最能吸引你？",["可自由創作和即興發揮","目標步驟清晰並能完成作品","可深入討論和分析觀點","有圖片、影片及跨學科內容","可調查問題、比較資料真偽","可解謎、推理或進行實驗"]],
["閱讀長文章時，你最自然的做法是：",["想像如何改編成有趣形式","把重點整理成筆記和清單","留意語氣、觀點和論證結構","尋找相關圖片和延伸材料","檢查文章引用了哪些證據","整理成因果關係或邏輯圖"]],
["要記憶大量內容時，你偏好：",["編成故事、口訣或聯想","製作分類整齊的溫習表","先理解內容，避免純粹背誦","使用圖像、顏色或心智圖","查找例證，確認概念含義","找出規律，以規則減少記憶量"]],
["答案與參考答案不同時，你會：",["思考自己的答案是否是另一種可能","對照要求，找出遺漏步驟","比較兩種答案背後的觀點","尋找更多例子作全面比較","檢查參考答案的資料來源","重新推演，找出錯誤位置"]],
["你最希望收到哪種評語？",["你的想法很有創意","作品完整而且組織良好","分析深入，很有思考","能連結不同知識，視野很廣","證據充分，資料運用可靠","推理清晰，解決方法有效"]],
["小組只剩一天便要交功課，你會：",["提出簡單但吸引的新方向","立即重新分工，確保按時完成","檢查內容是否前後一致","補充最能提升效果的視覺素材","核對重要資料和來源","刪除不必要部分，集中核心任務"]],
["兩位組員意見不合時，你通常會：",["提出融合雙方創意的第三方案","提醒共同目標，推動作出決定","聆聽雙方理由，理解分歧來源","從其他案例尋找新方向","要求雙方提供證據","比較成本、條件和效果"]],
["你最欣賞哪一種隊友？",["令大家充滿靈感的人","答應了便完成工作的人","願意聆聽和認真思考的人","見識廣博並帶來新發現的人","說話有根據的人","能看穿問題並提出解法的人"]],
["匯報時突然出現技術故障，你會：",["即場發揮，用故事繼續介紹","啟用後備方案，維持進度","冷靜說明，不讓故障影響思路","改用現場物件或其他媒體","確保口述的重要資料仍準確","快速判斷原因並嘗試修復"]],
["團隊完成任務後，你最想：",["討論下次可加入的新玩法","整理檔案並記錄改善事項","反思過程與學習所得","把成果改成影片或網頁分享","檢查最終版本有沒有資料錯誤","分析耗時步驟並尋找優化方法"]],
["網上出現一則驚人消息，你的第一反應是：",["想像若是真的會帶來甚麼改變","儲存下來，稍後整理跟進","思考背後背景和可能含義","搜尋相關圖片、影片和報道","查找原始來源及可靠媒體","分析內容是否矛盾或不合邏輯"]],
["資料來源互相矛盾時，你會：",["提出幾種可能解釋","建立比較表整理差異","分析作者立場、語境和用詞","擴大搜尋，找不同形式證據","追查第一手資料和發布日期","比較證據能否支持結論"]],
["面對沒有標準答案的問題，你會感到：",["興奮，因為可自由發揮","有挑戰，但想建立完成標準","有興趣，因為可深入思考","好奇，因為可探索很多方向","謹慎，因為要分辨事實與意見","專注，因為可建立推理模型"]],
["如果一個答案聽起來很合理，你會：",["用它發展更多想法","思考如何轉化成實際行動","檢視是否忽略其他觀點","尋找更多背景和例子","查核答案所依據的來源","測試在不同條件下是否成立"]],
["你最不能接受哪種情況？",["所有人只接受同一種想法","討論很多，最後甚麼也沒完成","未理解問題便急着下結論","只從單一角度看世界","沒有證據卻當成事實","有簡單方法卻把事情複雜化"]],
["如果可以獲得一種超能力，你會選擇：",["把想像立即變成現實","同時管理很多任務而不混亂","看懂話語背後的真正意思","瞬間到世界各地探索","一眼看穿謊言和假消息","立即理解所有系統的原理"]],
["哪句說話最能代表你？",["凡事總有另一種可能","好想法需要真正落實","理解比快速回答更重要","世界比我們看見的更廣闊","先看證據，再作判斷","複雜問題也可以逐步拆解"]],
["你心目中最理想的工作空間是：",["有白板與創意小物的工作室","文件有序、設備齊全的指揮中心","安靜舒適的圖書館","有螢幕、地圖與影像的探索室","滿是檔案和資料庫的調查室","有電腦、工具和模型的實驗室"]],
["完成作品時，甚麼最令你有成功感？",["作品令人眼前一亮","所有部分按計劃完成","作品具有深入觀點","作品呈現豐富多元內容","每個重要說法都有可靠證據","找到清晰有效的解決方法"]],
["若成為AI智慧學院導師，你最想教學生：",["突破框架，勇敢創作","做好規劃，付諸實行","深入閱讀，理解不同觀點","探索世界，連結不同知識","辨別真偽，養成查證習慣","拆解問題，運用邏輯解難"]]
];
const Q=RAW.map(([q,o])=>({q,o:o.map((text,i)=>({type:L[i],text}))}));
const Btn=({children,className="",outline=false,...p})=><button className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-300 ${outline?"border border-white/20 bg-transparent text-white hover:bg-white/10":"bg-cyan-500 text-slate-950 hover:bg-cyan-400"} ${className}`} {...p}>{children}</button>;
export default function App(){
 const[started,setStarted]=useState(false),[i,setI]=useState(0),[ans,setAns]=useState({}),[done,setDone]=useState(false);
 const scores=useMemo(()=>Object.fromEntries(L.map(k=>[k,Object.values(ans).filter(v=>v===k).length])),[ans]);
 const ranked=useMemo(()=>[...L].sort((a,b)=>scores[b]-scores[a]),[scores]); const top=ranked[0], tied=ranked.filter(k=>scores[k]===scores[top]);
 const pick=t=>{setAns(a=>({...a,[i]:t}));if(i<Q.length-1)setTimeout(()=>setI(x=>x+1),160)};
 const reset=()=>{setStarted(false);setI(0);setAns({});setDone(false)};
 if(!started)return <main className="min-h-screen text-white flex items-center justify-center p-5 bg-[radial-gradient(circle_at_top,#172554,#020617_55%)]"><section className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 shadow-2xl p-8 md:p-14 text-center"><div className="text-7xl">🤖</div><p className="mt-6 text-cyan-300 font-bold tracking-widest">AI 智慧學院入學測驗</p><h1 className="mt-3 text-4xl md:text-6xl font-black">你是哪一位 AI 夥伴？</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">完成25個情境題，探索你的創意、執行、思考、探索、查證與解難傾向。</p><div className="grid grid-cols-3 md:grid-cols-6 gap-3 my-9">{L.map(k=><div key={k} className="rounded-2xl bg-white/5 p-3"><div className="text-3xl">{TYPES[k].icon}</div><div className="mt-1 text-xs text-slate-400">{TYPES[k].name}</div></div>)}</div><Btn onClick={()=>setStarted(true)}>開始測驗 <Sparkles className="ml-2"/></Btn><p className="mt-5 text-xs text-slate-500">趣味人格探索，不屬於專業心理評估。</p></section></main>;
 if(done){const t=TYPES[top];return <main className="min-h-screen bg-slate-950 text-white p-5 md:p-10"><section className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5"><div className={`bg-gradient-to-br ${t.color} p-10 text-center`}><div className="text-7xl">{tied.length>1?"🌈":t.icon}</div><p className="mt-3 font-bold opacity-80">你的測驗結果</p><h1 className="mt-2 text-4xl font-black">{tied.length>1?"混合型 AI 人格":t.name}</h1><p className="mt-3 text-2xl font-bold">{tied.length>1?tied.map(k=>TYPES[k].name).join(" × "):t.title}</p></div><div className="p-7 md:p-10">{tied.length===1&&<><p className="text-lg leading-8 text-slate-200">{t.desc}</p><div className="my-8 grid gap-4 md:grid-cols-3">{[["你的長處",t.strength],["成長任務",t.growth],["最佳拍檔",t.partner]].map(([a,b])=><div className="rounded-2xl bg-white/5 p-5" key={a}><div className="text-sm font-bold text-cyan-300">{a}</div><div className="mt-2">{b}</div></div>)}</div></>}<h2 className="mb-4 text-xl font-bold">人格能量分布</h2><div className="space-y-4">{ranked.map(k=><div key={k}><div className="mb-1 flex justify-between text-sm"><span>{TYPES[k].icon} {TYPES[k].name}</span><b>{scores[k]}分</b></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><motion.div initial={{width:0}} animate={{width:`${scores[k]/25*100}%`}} className={`h-full bg-gradient-to-r ${TYPES[k].color}`}/></div></div>)}</div><Btn outline className="mt-8 w-full" onClick={reset}><RotateCcw className="mr-2"/>重新測驗</Btn></div></section></main>}
 const q=Q[i];return <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8"><div className="mx-auto max-w-3xl"><div className="mb-3 flex justify-between text-sm text-slate-400"><span>AI人格測驗</span><span>{Object.keys(ans).length}/25 已回答</span></div><div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10"><motion.div animate={{width:`${((i+(ans[i]?1:0))/25)*100}%`}} className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"/></div><AnimatePresence mode="wait"><motion.section key={i} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-9"><div className="font-bold text-cyan-300">第{i+1}題</div><h2 className="my-5 text-2xl md:text-3xl font-bold">{q.q}</h2><div className="grid gap-3">{q.o.map(o=><button key={o.type} onClick={()=>pick(o.type)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${ans[i]===o.type?"border-cyan-400 bg-cyan-400/15":"border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-bold">{o.type}</span><span>{o.text}</span>{ans[i]===o.type&&<CheckCircle2 className="ml-auto shrink-0 text-cyan-300"/>}</button>)}</div></motion.section></AnimatePresence><div className="mt-5 flex justify-between"><Btn outline disabled={i===0} onClick={()=>setI(i-1)}><ArrowLeft className="mr-2" size={18}/>上一題</Btn>{i<24?<Btn disabled={!ans[i]} onClick={()=>setI(i+1)}>下一題<ArrowRight className="ml-2" size={18}/></Btn>:<Btn disabled={Object.keys(ans).length<25} onClick={()=>setDone(true)}>查看結果<Sparkles className="ml-2" size={18}/></Btn>}</div></div></main>
}
