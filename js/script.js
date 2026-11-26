(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const S=[
{t:'Baño & secado',d:'Champús según el tipo de pelo, secado a mano y cepillado completo.',p:25,c:'bano'},
{t:'Corte & estilismo',d:'Corte a tijera o máquina, adaptado a la raza y al estilo de vida de tu perro.',p:40,c:'corte'},
{t:'Cuidado del manto',d:'Deslanado, desenredado y tratamientos para pelo largo, rizado o denso.',p:30,c:'cuidado'},
{t:'Spa canino',d:'Mascarilla hidratante, masaje relajante y un toque de perfume suave.',p:18,c:'bano'},
{t:'Higiene',d:'Uñas, oídos, almohadillas y zona sanitaria, con calma y sin estrés.',p:10,c:'cuidado'},
{t:'Primera visita',d:'Sesión de adaptación para cachorros y perros que necesitan ir despacio.',p:20,c:'cuidado'}];
const CL=['b','','k','','k','b'];
const IM=['shower','scissors','table','bath','cor','run'];
const VB={bubble:'0 0 40 40',lines:'0 0 50 40',spark:'0 0 30 30',heart:'0 0 30 28'};
const dd=(s,st,c='w')=>`<svg class="dd ${c}" style="${st}" viewBox="${VB[s]}"><use href="#${s}"/></svg>`;
const DD=[
 dd('bubble','right:9%;top:12%;width:40px')+dd('bubble','right:21%;top:30%;width:22px')+dd('spark','right:7%;top:46%;width:22px')+dd('bubble','right:30%;top:9%;width:16px'),
 dd('spark','right:10%;top:12%;width:28px')+dd('bubble','right:6%;top:34%;width:34px')+dd('spark','right:24%;top:24%;width:16px')+dd('bubble','right:18%;top:8%;width:20px'),
 dd('bubble','right:8%;top:10%;width:44px')+dd('spark','right:22%;top:20%;width:24px')+dd('bubble','right:9%;top:40%;width:20px')+dd('spark','right:30%;top:8%;width:14px'),
 dd('spark','right:8%;top:14%;width:26px')+dd('bubble','right:20%;top:12%;width:36px')+dd('bubble','right:7%;top:40%;width:22px')+dd('spark','right:28%;top:36%;width:18px'),
 dd('bubble','right:10%;top:10%;width:38px')+dd('spark','right:6%;top:36%;width:24px')+dd('bubble','right:24%;top:22%;width:18px')+dd('spark','right:20%;top:6%;width:16px'),
 dd('spark','right:9%;top:12%;width:30px')+dd('bubble','right:22%;top:10%;width:30px')+dd('spark','right:6%;top:38%;width:18px')+dd('bubble','right:12%;top:34%;width:20px')
];

const card=(s,i)=>`<article class="card ${CL[i]} i-${IM[i]} rv" data-cat="${s.c}" style="--d:${(i%3)*.08}s"><span class="dds" aria-hidden="true">${DD[i]}</span><span class="n">0${i+1}</span><h3>${s.t}</h3><p>${s.d}</p><div class="row"><em>Desde ${s.p} €</em><a class="more" href="#reservar" data-svc="${i}">Reservar</a></div></article>`;
$('#home-cards').innerHTML=S.slice(0,3).map(card).join('');
$('#all-cards').innerHTML=S.map(card).join('');
$$('#all-cards .card').forEach((c,i)=>{if([0,3,5].includes(i))c.classList.add('w')});
$$('select[data-sv]').forEach(x=>x.innerHTML=S.map((s,i)=>`<option value="${i}">${s.t}</option>`).join(''));
$$('[data-cta]').forEach(e=>e.innerHTML='<div class="wrap cta-in"><h2 class="rv">¿Listo para el cambio de look?</h2><a class="btn lime go rv" href="#reservar">Reservar cita</a></div>');
const T=[['Mi perra siempre salía agobiada de otras peluquerías. Aquí vuelve contenta y con un corte precioso.','Marta · mamá de Coco'],['Se nota que trabajan con calma. Un perro a la vez marca la diferencia, y el resultado es de revista.','Luis · papá de Bimba'],['Fuimos con un cachorro muy miedoso y la primera visita fue perfecta. Volvemos cada mes.','Andrea · mamá de Nube']];
$('#tm').innerHTML=T.map((t,i)=>`<figure class="q${i?'':' on'}"><blockquote>“${t[0]}”</blockquote><figcaption>${t[1]}</figcaption></figure>`).join('');
$('#dots').innerHTML=T.map((_,i)=>`<button aria-label="Opinión ${i+1}"${i?'':' class="on"'}></button>`).join('');
let ti=0,tp=false;
const showT=i=>{ti=(i+T.length)%T.length;$$('#tm .q').forEach((q,k)=>q.classList.toggle('on',k===ti));$$('#dots button').forEach((b,k)=>b.classList.toggle('on',k===ti))};
$$('#dots button').forEach((b,i)=>b.onclick=()=>showT(i));
$('#tm').onmouseenter=()=>tp=true;$('#tm').onmouseleave=()=>tp=false;
setInterval(()=>{if(!tp&&!RM)showT(ti+1)},6000);
const F=[['¿Cuánto dura una sesión?','Entre 1 y 3 horas según el servicio y el tipo de pelo. Al reservar te damos una hora orientativa de recogida.'],['¿Mi perro tiene que estar vacunado?','Sí, pedimos la cartilla de vacunación al día para cuidar de todos los perros del estudio.'],['¿Puedo quedarme durante la cita?','Preferimos que los perros trabajen tranquilos, pero en la primera visita puedes quedarte un rato para que se adapte.'],['¿Cómo se paga y cómo se cancela?','Aceptamos tarjeta, efectivo y Bizum. Puedes cancelar o cambiar la cita con 24 horas de antelación sin coste.'],['¿Atendéis a gatos?','Por ahora nos especializamos en perros de todas las razas y tamaños.']];
$('#faq').innerHTML=F.map(f=>`<div class="fq"><button class="fq-q" aria-expanded="false">${f[0]}<i></i></button><div class="fq-a"><p>${f[1]}</p></div></div>`).join('');
$$('.fq-q').forEach(b=>b.onclick=()=>{const a=b.nextElementSibling,o=b.getAttribute('aria-expanded')==='true';$$('.fq-q').forEach(x=>{x.setAttribute('aria-expanded','false');x.nextElementSibling.style.height='0px'});if(!o){b.setAttribute('aria-expanded','true');a.style.height=a.scrollHeight+'px'}});
const P=['inicio','servicios','como-trabajamos','reservar'];
const TT={inicio:'Wuau Studio · Peluquería & Estilismo Canino',servicios:'Servicios · Wuau Studio','como-trabajamos':'Cómo trabajamos · Wuau Studio',reservar:'Reservar cita · Wuau Studio'};
const fmt=(v,d,p,s)=>(p||'')+v.toFixed(d).replace('.',',')+(s||'');
function count(el){const to=+el.dataset.count,d=+(el.dataset.dec||0);if(RM){el.textContent=fmt(to,d,el.dataset.pre,el.dataset.suf);return}let t0;const f=t=>{t0=t0||t;const k=Math.min((t-t0)/1400,1);el.textContent=fmt(to*(1-Math.pow(1-k,3)),d,el.dataset.pre,el.dataset.suf);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.dataset.count!==undefined)count(e.target)}}),{threshold:.15});
function go(){let h=location.hash.slice(1);if(!P.includes(h))h='inicio';
if(h==='inicio'&&location.hash)history.replaceState(null,'',location.pathname+location.search);
const pg=$('#p-'+h);$$('.page').forEach(p=>p.classList.toggle('on',p===pg));
$$('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===h));
document.title=TT[h];$('#nav').classList.remove('open');$('#bg').setAttribute('aria-expanded','false');
scrollTo({top:0,behavior:'instant'});
$$('.rv,[data-count]',pg).forEach(e=>{if(e.dataset.count!==undefined)e.textContent=fmt(0,0,e.dataset.pre,e.dataset.suf);else e.classList.remove('in');io.observe(e)});
$$('.fq-q').forEach(x=>{x.setAttribute('aria-expanded','false');x.nextElementSibling.style.height='0px'});}
addEventListener('hashchange',go);go();
const bar=$('.bar'),pgb=$('#pgb'),up=$('#up');let tk=false;
function sc(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;pgb.style.width=(h>0?y/h*100:0)+'%';bar.classList.toggle('sm',y>20);up.classList.toggle('on',y>520);tk=false}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(sc)}},{passive:true});sc();
up.onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});
$('#bg').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#bg').setAttribute('aria-expanded',o)};
$$('#filters button').forEach(b=>b.onclick=()=>{$$('#filters button').forEach(x=>x.classList.toggle('on',x===b));$$('#all-cards .card').forEach(c=>{const s=b.dataset.f==='all'||c.dataset.cat===b.dataset.f;c.classList.toggle('off',!s);if(s){c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}})});
const eS=$('#e-s'),eT=$('#e-t'),eO=$('#e-o'),M=[1,1.3,1.7];
function est(){eO.textContent=Math.round(S[+eS.value].p*M[+eT.value])+' €';eO.classList.remove('pop');void eO.offsetWidth;eO.classList.add('pop')}
eS.onchange=eT.onchange=est;est();
document.addEventListener('click',e=>{const a=e.target.closest('[data-svc],[data-svc-from]');if(!a)return;$('#f-s').value=a.dataset.svc!==undefined?a.dataset.svc:eS.value;if(a.dataset.svcFrom)$('#rf').elements.t.value=eT.value});
const ph=$('.hero .photo');
if(ph&&!RM&&matchMedia('(hover:hover)').matches){ph.addEventListener('mousemove',e=>{const r=ph.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ph.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`});ph.addEventListener('mouseleave',()=>ph.style.transform='')}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),3200)}
const rf=$('#rf');try{$('#fd').min=new Date().toISOString().slice(0,10)}catch(e){}
rf.addEventListener('submit',e=>{e.preventDefault();const v=k=>rf.elements[k].value;
const m=`Hola Wuau Studio, soy ${v('n')}. Quiero reservar para ${v('d')} (perro ${['pequeño','mediano','grande'][v('t')]}): ${S[v('s')].t}${v('f')?'. Día preferido: '+v('f'):''}.`;
toast('Abriendo WhatsApp con tu solicitud…');window.open('https://wa.me/34644892103?text='+encodeURIComponent(m),'_blank')});
/* Tarjetas de servicios: en móvil/táctil no hay hover, así que la foto se activa
   cuando la tarjeta pasa por el centro de la pantalla al hacer scroll. */
const touchMQ=matchMedia('(hover:none), (max-width:900px)');
const cardIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting&&touchMQ.matches){
    e.target.classList.add('on');
    cardIO.unobserve(e.target); // una vez activada, se queda hasta recargar
  }
}),{rootMargin:'-20% 0px -20% 0px'});
$$('.card').forEach(c=>cardIO.observe(c));
})();