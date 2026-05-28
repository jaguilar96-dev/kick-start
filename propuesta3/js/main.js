const clinics=[
{name:'Centro Medico Vida Integral',department:'Lima',city:'Miraflores',specialties:['Cardiologia','Laboratorio clinico'],benefits:['Tarifas preferenciales','Resultados digitales']},
{name:'Clinica Especializada Arequipa Salud',department:'Arequipa',city:'Cayma',specialties:['Traumatologia','Imagenes y diagnostico'],benefits:['Hasta 15% en imagenes','Atencion programada']},
{name:'Centro Norte Diagnostico',department:'Trujillo',city:'Trujillo',specialties:['Laboratorio clinico','Medicina preventiva'],benefits:['Campanas preventivas','Descuentos en analisis']},
{name:'Red Dental Piura',department:'Piura',city:'Piura',specialties:['Odontologia','Medicina estetica'],benefits:['Evaluacion preferencial','Planes familiares']},
{name:'Instituto Andino de Rehabilitacion',department:'Cusco',city:'Wanchaq',specialties:['Terapias y rehabilitacion','Salud ocupacional'],benefits:['Paquetes por sesion','Convenios empresariales']},
{name:'Clinica San Miguel Especialidades',department:'Lima',city:'San Miguel',specialties:['Ginecologia','Cardiologia'],benefits:['Consulta preferencial','Activacion rapida']}
];
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('[data-header]');
  const toggle=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('[data-nav]');
  if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));}
  const onScroll=()=>header&&header.classList.toggle('scrolled',window.scrollY>10);onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}}}));
  initClinics();initPlanTabs();initContactForm();
});
function initClinics(){
  const grid=document.querySelector('[data-clinic-grid]');if(!grid)return;
  const search=document.querySelector('[data-search]');const dep=document.querySelector('[data-department]');const spec=document.querySelector('[data-specialty]');const count=document.querySelector('[data-clinic-count]');
  [...new Set(clinics.map(c=>c.department))].forEach(v=>dep.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`));
  [...new Set(clinics.flatMap(c=>c.specialties))].forEach(v=>spec.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`));
  const render=()=>{const q=(search.value||'').toLowerCase();const rows=clinics.filter(c=>(!q||c.name.toLowerCase().includes(q))&&(!dep.value||c.department===dep.value)&&(!spec.value||c.specialties.includes(spec.value)));grid.innerHTML=rows.map(c=>`<article class="clinic-card"><h3>${c.name}</h3><p class="meta">${c.department} - ${c.city}</p><p><strong>Especialidades:</strong> ${c.specialties.join(', ')}</p><p><strong>Beneficios:</strong> ${c.benefits.join(', ')}</p><div class="clinic-actions"><a class="btn btn-secondary" href="beneficios.html">Ver detalle</a><a class="btn btn-primary" href="contacto.html">Contactar</a></div></article>`).join('')||'<p>No encontramos centros con esos filtros.</p>';count.textContent=`${rows.length} centro(s) encontrado(s)`;};
  [search,dep,spec].forEach(el=>el.addEventListener('input',render));render();
}
function initPlanTabs(){
  const tabs=document.querySelectorAll('[data-plan-tab]');if(!tabs.length)return;
  tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');document.querySelectorAll('[data-plan-panel]').forEach(p=>p.classList.toggle('hidden',p.dataset.planPanel!==tab.dataset.planTab));}));
}
function initContactForm(){
  const form=document.querySelector('[data-contact-form]');if(!form)return;
  form.addEventListener('submit',e=>{e.preventDefault();let ok=true;form.querySelectorAll('.error').forEach(el=>el.remove());form.querySelectorAll('.field-error').forEach(el=>el.classList.remove('field-error'));
    form.querySelectorAll('[required]').forEach(field=>{const empty=field.type==='checkbox'?!field.checked:!field.value.trim();const badEmail=field.type==='email'&&field.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);if(empty||badEmail){ok=false;field.classList.add('field-error');const msg=document.createElement('span');msg.className='error';msg.textContent=badEmail?'Ingresa un correo valido.':'Este campo es obligatorio.';(field.closest('label')||field.parentElement).appendChild(msg);}});
    const success=form.querySelector('[data-success]');if(ok){success.hidden=false;form.reset();setTimeout(()=>success.hidden=true,5000);}else{success.hidden=true;}
  });
}








