navigator.geolocation.getCurrentPosition(pos => {
const lat = pos.coords.latitude;
const lon = pos.coords.longitude;

// Daily timings
fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
.then(r=>r.json()).then(d=>{
const t=d.data.timings;
fajr.innerText=t.Fajr;
sunrise.innerText=t.Sunrise;
dhuhr.innerText=t.Dhuhr;
asr.innerText=t.Asr;
maghrib.innerText=t.Maghrib;
sunset.innerText=t.Sunset;
isha.innerText=t.Isha;
});

// Weekly
for(let i=0;i<7;i++){
let date=new Date(); date.setDate(date.getDate()+i);
let ds=date.toISOString().split('T')[0];
fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lon}&method=2`)
.then(r=>r.json()).then(d=>{
let t=d.data.timings;
weeklyTable.querySelector("tbody").innerHTML+=
`<tr>
<td class="p-2">${ds}</td>
<td class="p-2">${t.Fajr}</td>
<td class="p-2">${t.Sunrise}</td>
<td class="p-2">${t.Dhuhr}</td>
<td class="p-2">${t.Asr}</td>
<td class="p-2">${t.Maghrib}</td>
<td class="p-2">${t.Sunset}</td>
<td class="p-2">${t.Isha}</td>
</tr>`;
});
}

// Monthly
const now=new Date();
fetch(`https://api.aladhan.com/v1/calendar/${now.getFullYear()}/${now.getMonth()+1}?latitude=${lat}&longitude=${lon}&method=2`)
.then(r=>r.json()).then(data=>{
data.data.forEach(day=>{
let t=day.timings;
monthlyTable.querySelector("tbody").innerHTML+=
`<tr>
<td class="p-2">${day.date.gregorian.date}</td>
<td class="p-2">${t.Fajr}</td>
<td class="p-2">${t.Sunrise}</td>
<td class="p-2">${t.Dhuhr}</td>
<td class="p-2">${t.Asr}</td>
<td class="p-2">${t.Maghrib}</td>
<td class="p-2">${t.Sunset}</td>
<td class="p-2">${t.Isha}</td>
</tr>`;
});
});
});

// Events
const events=[
{title:"Qur'an Study Circle",info:"Every Saturday 6:00 PM"},
{title:"Kids Islamic Class",info:"Sunday 10:00 AM"},
{title:"Community Iftar",info:"First Friday of Month"}
];
events.forEach(e=>{
document.getElementById("events").innerHTML+=`<p><strong>${e.title}</strong> – ${e.info}</p>`;
});

// Jumu’ah
const khutbah=[
{imam:"Imam Abdullah",time:"1:30 PM"},
{imam:"Imam Kareem",time:"2:30 PM"}
];
khutbah.forEach(j=>{
document.getElementById("jumuah").innerHTML+=`<p><strong>${j.imam}</strong> – ${j.time}</p>`;
});
