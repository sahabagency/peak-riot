'use strict';
const designs = [
  {id:'menace',name:'Menace',line:'Mischief is your middle name.'},
  {id:'big-grin',name:'Big Grin',line:'Good vibes. From ear to ear.'},
  {id:'chomp',name:'Chomp',line:'A little bite. A lot of character.'},
  {id:'tongue-out',name:'Tongue Out',line:'Take the fun very seriously.'}
];
const unitPrice = 2499;
const storageKey = 'peak-riot-preview-bag-v1';
let selected = designs[0];
let viewed = selected;
let quantity = 1;
let bag = [];
const el = id => document.getElementById(id);
const dollars = cents => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
const getDesign = id => designs.find(d => d.id === id);
const photo = id => `assets/${id}.jpg`;
try {const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))bag=saved.filter(item=>item&&getDesign(item.id)&&Number.isInteger(item.qty)&&item.qty>0&&item.qty<=20).filter((item,index,items)=>items.findIndex(other=>other.id===item.id)===index).map(({id,qty})=>({id,qty}));} catch {}
function saveBag(){try{localStorage.setItem(storageKey,JSON.stringify(bag));}catch{}renderBag();}
function bagState(){return {items:bag.map(item=>({design:item.id,name:getDesign(item.id).name,quantity:item.qty,unitPriceUSD:24.99})),subtotalUSD:bag.reduce((sum,item)=>sum+item.qty*unitPrice,0)/100,checkoutAvailable:false};}
function showPhoto(id){viewed=getDesign(id);el('main-image').src=photo(id);el('main-image').alt=`${viewed.name} yellow ski mask design`;el('image-caption').textContent=`0${designs.indexOf(viewed)+1} / ${viewed.name.toUpperCase()}`;document.querySelectorAll('[data-gallery]').forEach(button=>{const on=button.dataset.gallery===id;button.classList.toggle('selected',on);button.setAttribute('aria-pressed',String(on));});}
function selectDesign(id){const found=getDesign(id);if(!found)throw new Error('Choose a valid mask design.');selected=found;document.querySelector(`input[name="design"][value="${id}"]`).checked=true;el('selected-name').textContent=selected.name;showPhoto(id);return {selectedDesign:selected.id,quantity};}
function setQuantity(value){quantity=Math.max(1,Math.min(20,value));el('quantity').textContent=quantity;el('decrease').disabled=quantity===1;el('increase').disabled=quantity===20;el('add-price').textContent=dollars(quantity*unitPrice);}
function openDialog(id){const dialog=el(id);if(!dialog.open)dialog.showModal();}
function addToBag(id,qty){if(!getDesign(id)||!Number.isInteger(qty)||qty<1||qty>20)throw new Error('Choose a valid design and a quantity between 1 and 20.');const line=bag.find(item=>item.id===id);if((line?.qty||0)+qty>20)throw new Error('The preview bag supports up to 20 masks per design.');if(line)line.qty+=qty;else bag.push({id,qty});saveBag();openDialog('bag-dialog');el('status').textContent=`Added ${qty} ${getDesign(id).name} ${qty===1?'mask':'masks'} to your bag.`;return bagState();}
function changeLine(id,delta){const line=bag.find(item=>item.id===id);if(!line)return;line.qty=Math.max(0,Math.min(20,line.qty+delta));bag=bag.filter(item=>item.qty>0);saveBag();}
function renderBag(){const count=bag.reduce((sum,item)=>sum+item.qty,0);el('bag-count').textContent=count;el('dialog-count').textContent=count;el('subtotal').textContent=dollars(count*unitPrice)+' USD';el('bag-summary').hidden=!count;el('bag-items').innerHTML=count?bag.map(item=>{const d=getDesign(item.id);return `<div class="bag-item"><img src="${photo(d.id)}" alt="${d.name}" width="82" height="82"><div><div class="bag-item-header"><strong>${d.name}</strong><span>${dollars(item.qty*unitPrice)}</span></div><small>PEAK RIOT Ski Mask · ${dollars(unitPrice)} each</small><div class="bag-actions"><div class="quantity"><button data-adjust="${d.id}" data-delta="-1" aria-label="Decrease ${d.name} quantity">−</button><output aria-label="${d.name} quantity">${item.qty}</output><button data-adjust="${d.id}" data-delta="1" aria-label="Increase ${d.name} quantity" ${item.qty===20?'disabled':''}>+</button></div><button class="remove" data-remove="${d.id}" aria-label="Remove ${d.name}">Remove</button></div></div></div>`;}).join('')+'<button class="clear-bag" id="clear-bag">Clear bag</button>':'<div class="empty-bag"><h3>YOUR NEXT ALTER EGO<br>IS WAITING.</h3><p>Your bag is empty. Find a face that feels like you.</p><button class="primary close-dialog">EXPLORE THE MASKS</button></div>';}
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>selectDesign(button.dataset.gallery)));
document.querySelectorAll('input[name="design"]').forEach(input=>input.addEventListener('change',()=>selectDesign(input.value)));
el('decrease').addEventListener('click',()=>setQuantity(quantity-1));el('increase').addEventListener('click',()=>setQuantity(quantity+1));
el('add-to-bag').addEventListener('click',()=>{el('action-error').hidden=true;try{addToBag(selected.id,quantity);}catch(error){el('action-error').textContent=error.message;el('action-error').hidden=false;}});
el('open-bag').addEventListener('click',()=>openDialog('bag-dialog'));
el('zoom-image').addEventListener('click',()=>{el('enlarged-image').src=photo(viewed.id);el('enlarged-image').alt=`${viewed.name} ski mask enlarged`;openDialog('image-dialog');});
el('privacy-button').addEventListener('click',()=>openDialog('privacy-dialog'));
document.addEventListener('click',event=>{const close=event.target.closest('.close-dialog');if(close)close.closest('dialog').close();const adjust=event.target.closest('[data-adjust]');if(adjust){const id=adjust.dataset.adjust,delta=Number(adjust.dataset.delta);changeLine(id,delta);el('bag-items').querySelector(`[data-adjust="${id}"][data-delta="${delta}"]`)?.focus();}const remove=event.target.closest('[data-remove]');if(remove){bag=bag.filter(item=>item.id!==remove.dataset.remove);saveBag();}if(event.target.id==='clear-bag'){bag=[];saveBag();}});
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}}));
el('lineup-grid').innerHTML=designs.map((d,index)=>`<button class="lineup-card" data-design="${d.id}" aria-label="Choose ${d.name}"><span class="photo"><img src="${photo(d.id)}" alt="${d.name} ski mask" loading="lazy" width="500" height="500"><span class="card-number">0${index+1}</span></span><span class="card-title"><strong>${d.name}</strong><span>$24.99</span></span><span class="card-description">${d.line}</span></button>`).join('');
el('lineup-grid').addEventListener('click',event=>{const card=event.target.closest('[data-design]');if(card){selectDesign(card.dataset.design);el('shop').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});el('add-to-bag').focus({preventScroll:true});}});
renderBag();

// Expose the same preview actions to supported browser agents.
const modelContext = document.modelContext;
if (modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const maskEnum = designs.map(design => design.id);
  const register = tool => {try {Promise.resolve(modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
  register({name:'read_storefront',title:'Read mask designs and preview bag',description:'Read available ski mask designs, preview pricing and this browser’s bag. Checkout is not connected.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({designs:designs.map(({id,name})=>({id,name,priceUSD:24.99})),selectedDesign:selected.id,...bagState()})});
  register({name:'select_mask_design',title:'Select a mask design',description:'Select a design in the visible product gallery. Does not add to the bag or place an order.',inputSchema:{type:'object',properties:{design:{type:'string',enum:maskEnum}},required:['design'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:input=>{if(!input||typeof input!=='object'||!getDesign(input.design))throw new Error('Invalid design.');return selectDesign(input.design);}});
  register({name:'add_to_preview_bag',title:'Add masks to the preview bag',description:'Stage masks in the visible bag saved on this browser and open the bag. This does not purchase, reserve stock, or place an order. Checkout is unavailable.',inputSchema:{type:'object',properties:{design:{type:'string',enum:maskEnum},quantity:{type:'integer',minimum:1,maximum:20}},required:['design','quantity'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:input=>{if(!input||typeof input!=='object')throw new Error('Invalid mask selection.');return addToBag(input.design,input.quantity);}});
  addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
