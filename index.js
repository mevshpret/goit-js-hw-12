import{a as h,S as w,i as a}from"./assets/vendor-Ca8cN8cH.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const I="50595955-e0b6c1995a30b33308caba1cc";h.defaults.baseURL="https://pixabay.com/api/";function f(e,o){return h("",{params:{key:I,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}}).then(({data:i})=>i)}const q=new w(".gallery-link",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"}),P=document.querySelector(".gallery");function g(e){const o=e.map(({webformatURL:s,largeImageURL:i,tags:t,likes:r,views:n,comments:b,downloads:S})=>`
      <li class="gallery-item">
    <a class="gallery-link" href="${i}">
      <img
        class="gallery-image"
        src="${s}"
        alt="${t}"
      />
    </a>
    <div class="statisticInfo">
      <div class="itemInfo">
        <h3 class="itemInfoName">Likes</h3>
        <p>${r}</p>
      </div>
      <div class="itemInfo">
        <h3 class="itemInfoName">Views</h3>
        <p>${n}</p>
      </div>
      <div class="itemInfo">
        <h3 class="itemInfoName">Comments</h3>
        <p>${b}</p>
      </div>
      <div class="itemInfo">
        <h3 class="itemInfoName">Downloads</h3>
        <p>${S}</p>  
       </div>
    </div>
  </li>`).join("");P.insertAdjacentHTML("beforeend",o),q.refresh()}function R(){const e=document.querySelector(".gallery");e.innerHTML=""}function p(){const e=document.querySelector(".loader");e==null||e.classList.add("active")}function y(){const e=document.querySelector(".loader");e==null||e.classList.remove("active")}function v(){const e=document.querySelector(".addMore");e==null||e.classList.add("active")}function L(){const e=document.querySelector(".addMore");e==null||e.classList.remove("active")}const u=document.querySelector(".form"),M=document.querySelector(".addMore");let d="",l=1,m=0,c=0;u.addEventListener("submit",N);M.addEventListener("click",$);async function N(e){e.preventDefault();const o=u.elements["search-text"].value.trim();if(o===""){a.warning({message:"Please enter a search term.",position:"topRight"});return}d=o,l=1,c=0,R(),L(),p();try{const{hits:s,totalHits:i}=await f(d,l);if(s.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m=i,c+=s.length,g(s),c<m?v():a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(s){console.error("Search failed:",s),a.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{y(),u.reset()}}async function $(){l+=1,L(),p();try{const{hits:e}=await f(d,l);e.length>0?(g(e),c+=e.length,setTimeout(()=>{const o=document.querySelector(".gallery-item");if(o){const s=o.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}},100),c<m?v():a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(e){console.error("Load more failed:",e),a.error({message:"Something went wrong while loading images.",position:"topRight"})}finally{y()}}
//# sourceMappingURL=index.js.map
