// Funciones auxiliares ofuscadas
const $ = e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);
const rnd=(min,max)=>Math.floor(Math.random()*(max-min+1))+min;
const rndPos=()=>({x:rnd(5,95),y:rnd(5,95)});
const rndSize=(min=5,max=20)=>rnd(min,max);
const txtFragments=["El 31/04 espera por ","pasos hacia las ","rocas... ¿dónde están los ","minutos que se perdieron?","Los pájaros cantan ","veces al día, pero solo ","de ellas se escuchan... faltan ","noches"," no es una palabra, es el número ","que guarda el "," y el ","... ¿o era al revés?","La lluvia cae durante ","segundos, pero moja durante ","días... y ","horas más"];
const numPool=[7,19,22,23,32,42,47,57,68,89,91,99];
const playSound=()=>{const a=new Audio(`data:audio/wav;base64,UklGRlQDAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA`+rnd(1000,9999));a.volume=0.1;a.play().catch(()=>{})};
const createEl=(t,c)=>{const e=document.createElement(t);e.className=c;return e};
const shuffleArr=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
