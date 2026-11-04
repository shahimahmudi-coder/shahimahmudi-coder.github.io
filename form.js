const f=document.getElementById('cf');
if(f){const st=document.getElementById('st'),q=n=>f.elements[n];
const show=(m,c)=>{st.hidden=false;st.className=c;st.textContent=m};
f.addEventListener('submit',async e=>{e.preventDefault();
let bad=false;
[['name','Enter your full name.'],['email','Enter a valid email address.'],['subject','Enter a subject.'],['message','Write a message.']].forEach(([n,m])=>{
const el=q(n),v=el.value.trim(),ok=n==='email'?/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v):v.length>0;
document.getElementById('e-'+n).textContent=ok?'':m;el.setAttribute('aria-invalid',!ok);if(!ok)bad=true});
if(bad)return;
if(q('botcheck').checked)return;
const key=f.dataset.key;
if(!key||key.startsWith('YOUR_')){show('The form is not connected to an email service yet. Please email me directly.','bad');return}
const b=f.querySelector('button');b.disabled=true;b.textContent='Sending…';
try{const d=Object.fromEntries(new FormData(f));d.access_key=key;d.from_name='Portfolio website';
const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});
const j=await r.json();
if(j.success){f.reset();show('Message sent. Thank you, I will reply as soon as I can.','ok')}else throw 0}
catch(_){show('The message could not be sent. Check your connection and try again, or email me directly.','bad')}
b.disabled=false;b.textContent='Send message'})}
