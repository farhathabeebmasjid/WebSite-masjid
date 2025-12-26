
fetch("assets/data/settings.json").then(r=>r.json()).then(s=>{
mosqueName.textContent=s.mosqueName;
address.textContent=s.address;

const ramadan=new Date(s.ramadanStart);
setInterval(()=>{
countdown.textContent=Math.max(0,Math.ceil((ramadan-new Date())/86400000))+" days remaining";
},1000);

fetch(`https://api.aladhan.com/v1/timingsByCity?city=${s.city}&country=${s.country}&method=2`)
.then(r=>r.json()).then(d=>{
const t=d.data.timings;
["Fajr","Dhuhr","Asr","Maghrib","Isha"].forEach(p=>{
prayers.innerHTML+=`<div class="bg-white p-3 rounded shadow"><b>${p}</b><br>Adhan: ${t[p]}</div>`;
});
sunrise.textContent=t.Sunrise;
sunset.textContent=t.Sunset;
hijri.textContent=d.data.date.hijri.date;

extra.innerHTML=`
<div>Tahajjud: Night</div>
<div>Ishraq: ${t.Sunrise}</div>
<div>Chasht: 10:00 AM</div>
<div>Tasbih: Anytime</div>
<div>Witr: After Isha (${t.Isha})</div>`;
});
});

fetch("https://api.alquran.cloud/v1/ayah/262/ar.alafasy").then(r=>r.json()).then(v=>verseAr.textContent=v.data.text);
fetch("https://api.alquran.cloud/v1/ayah/262/en.asad").then(r=>r.json()).then(v=>verseEn.textContent=v.data.text);
