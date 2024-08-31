import{a as g,s as h,i as l}from"./assets/vendor-Bg270AUm.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const y="https://pixabay.com/api/",b="23838686-34a57fb5ee7e13f7202c685b1";async function u(s,r){const i={q:s,key:b,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15},{data:a}=await g(y,{params:i});return a}function m(s){return s.map(({webformatURL:r,largeImageURL:i,tags:a,likes:e,views:o,comments:n,downloads:p})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${i}">
              <img class="gallery-image" src="${r}" alt="${a}" width="360" height="152" />
              <ul class="description">
                <li class="description-items">
                  <span class="accent">Likes </span>${e}
                </li>
                <li class="description-items">
                  <span class="accent">Views </span>${o}
                </li>
                <li class="description-items">
                  <span class="accent">Comments </span>${n}
                </li>
                <li class="description-items">
                  <span class="accent">Downloads </span>${p}
                </li>
              </ul>
            </a>
          </li>`).join("")}const t={form:document.querySelector(".search-form"),input:document.querySelector(".search-input"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".load-more-btn")},f=new h(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8});t.form.addEventListener("submit",L);t.btnLoadMore.addEventListener("click",C);let c=1,d="";async function L(s){if(s.preventDefault(),t.gallery.innerHTML="",d=t.input.value.trim(),c=1,t.btnLoadMore.classList.add("visually-hidden"),d==="")return l.error({message:"Search field can not be empty!",position:"topCenter",timeout:3e3,messageColor:"#fafafb",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",maxWidth:"432px"});t.loader.classList.remove("visually-hidden");try{const r=await u(d,c);if(r.hits.length===0)return l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3,messageColor:"#fafafb",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",maxWidth:"432px"});t.gallery.innerHTML=m(r.hits),f.refresh(),t.input.value="",r.totalHits>15&&t.btnLoadMore.classList.remove("visually-hidden")}catch(r){l.error({message:`Something went wrong... Error: ${r.message}`,position:"topCenter",timeout:3e3,messageColor:"#fafafb",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",maxWidth:"432px"})}finally{t.loader.classList.add("visually-hidden")}}async function C(){c++,t.loader.classList.remove("visually-hidden");try{const s=await u(d,c);t.gallery.insertAdjacentHTML("beforeend",m(s.hits)),f.refresh();const{height:r}=t.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),Math.ceil(s.totalHits/15)===c&&(l.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3e3,messageColor:"#fafafb",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",maxWidth:"432px"}),t.btnLoadMore.classList.add("visually-hidden"))}catch(s){l.error({message:`Something went wrong... Error: ${s.message}`,position:"topCenter",timeout:3e3,messageColor:"#fafafb",backgroundColor:"#ef4040",progressBarColor:"#b51b1b",maxWidth:"432px"})}finally{t.loader.classList.add("visually-hidden")}}
//# sourceMappingURL=index.js.map
