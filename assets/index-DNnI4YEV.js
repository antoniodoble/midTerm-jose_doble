(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`pokememory_session`,t=`pokememory_ranking`;function n(t){sessionStorage.setItem(e,JSON.stringify(t))}function r(){let t=sessionStorage.getItem(e);return t?JSON.parse(t):null}function i(){sessionStorage.removeItem(e)}function a(){let e=localStorage.getItem(t);return e?JSON.parse(e):[]}function o(e){let n=a(),r={id:crypto.randomUUID(),username:e.username,favoritePokemon:e.favoritePokemon,timeInSeconds:e.timeInSeconds,cardsCount:e.cardsCount,createdAt:new Date().toISOString()};return n.push(r),n.sort((e,t)=>t.cardsCount===e.cardsCount?e.timeInSeconds-t.timeInSeconds:t.cardsCount-e.cardsCount),localStorage.setItem(t,JSON.stringify(n)),r.id}function s(e){let t=e?e.trim():``;return t?t.length<3||t.length>15?{isValid:!1,message:`El nombre de usuario debe tener entre 3 y 15 caracteres.`}:{isValid:!0,message:``}:{isValid:!1,message:`El nombre de usuario es obligatorio.`}}function c(e){let t=Number(e);return e===``||e==null?{isValid:!1,message:`Introduce el número de cartas.`}:Number.isInteger(t)?t<=0?{isValid:!1,message:`El número de cartas debe ser positivo (mayor que 0).`}:t%2==0?t>20?{isValid:!1,message:`El número máximo de cartas permitido es 20.`}:{isValid:!0,message:``}:{isValid:!1,message:`El número de cartas debe ser PAR (ej. 4, 8, 12, 16).`}:{isValid:!1,message:`El número de cartas debe ser un número entero.`}}function l(e){let t=document.querySelector(`#profile-form`),r=document.querySelector(`#username`),i=document.querySelector(`#username-error`),a=document.querySelector(`#start-btn`),o=null;function c(){let e=s(r.value).isValid;a.disabled=!(e&&o!==null)}return r.addEventListener(`input`,()=>{let e=s(r.value);!e.isValid&&r.value.trim().length>0?(i.textContent=e.message,i.classList.add(`visible`)):(i.textContent=``,i.classList.remove(`visible`)),c()}),t.addEventListener(`submit`,t=>{t.preventDefault();let i=r.value.trim();if(!s(i).isValid||!o)return;let a={username:i,favoritePokemon:{id:o.id,name:o.name,image:o.image}};n(a),e(a)}),{setSelectedPokemon:e=>{o=e,c()}}}var u=`https://pokeapi.co/api/v2`,d=649,f=[];async function p(){if(f.length>0)return f;try{return f=(await(await fetch(`${u}/pokemon?limit=1000`)).json()).results,f}catch(e){return console.error(`Error fetching pokemon list:`,e),[]}}async function m(e){try{let t=await fetch(`${u}/pokemon/${e.toLowerCase()}`);if(!t.ok)throw Error(`Pokémon no encontrado`);let n=await t.json();return{id:n.id,name:n.name,image:n.sprites.other?.[`official-artwork`]?.front_default||n.sprites.front_default}}catch(t){return console.error(`Error fetching details for ${e}:`,t),null}}async function h(e){let t=await p();if(t.length===0)return[];let n=new Set;for(;n.size<e;){let e=Math.floor(Math.random()*t.length);n.add(e)}let r=Array.from(n).map(e=>m(t[e].name));return(await Promise.all(r)).filter(e=>e!==null)}async function g(){let e=Math.floor(Math.random()*d)+1;try{let t=await fetch(`${u}/pokemon/${e}`);if(!t.ok)throw Error(`Pokémon no encontrado`);let n=await t.json(),r=n.sprites.versions?.[`generation-v`]?.[`black-white`]?.animated?.front_default;return{name:n.name,image:r||n.sprites.front_default}}catch(e){return console.error(`Error fetching animated sprite:`,e),null}}function _(e,t,n,r){let i=[];e.addEventListener(`focus`,async()=>{i.length===0&&(i=await p())}),e.addEventListener(`input`,()=>{let n=e.value.trim().toLowerCase();if(t.innerHTML=``,n.length<2)return;let r=i.filter(e=>e.name.toLowerCase().includes(n)).slice(0,5);if(r.length===0){let e=document.createElement(`li`);e.textContent=`No se encontraron Pokémon`,e.classList.add(`no-results`),t.appendChild(e)}else r.forEach(e=>{let n=document.createElement(`li`);n.textContent=e.name,n.addEventListener(`click`,()=>a(e.name)),t.appendChild(n)})});async function a(i){t.innerHTML=``,e.value=i,n.innerHTML=`<p>Cargando Pokémon...</p>`;let a=await m(i);a?(n.innerHTML=`
        <div class="selected-card">
          <img src="${a.image}" alt="${a.name}" />
          <span>${a.name.toUpperCase()}</span>
        </div>
      `,r(a)):n.innerHTML=`<p class='error-message visible'>Error al cargar Pokémon</p>`}document.addEventListener(`click`,n=>{!e.contains(n.target)&&!t.contains(n.target)&&(t.innerHTML=``)})}function v(e){let t=document.querySelector(`#cards-count`),n=document.querySelector(`#cards-error`),r=document.querySelector(`#start-game-btn`);t&&r&&(t.addEventListener(`input`,()=>{let e=c(t.value);e.isValid?(n.textContent=``,n.classList.remove(`visible`),r.disabled=!1):(n.textContent=e.message,n.classList.add(`visible`),r.disabled=!0)}),r.addEventListener(`click`,()=>{let r=c(t.value);if(!r.isValid){n.textContent=r.message,n.classList.add(`visible`);return}let i=Number(t.value);e(i,i/2)}))}var y=null,b=0;function x(e){S(),b=0,C(e),y=setInterval(()=>{b++,C(e)},1e3)}function S(){return y&&=(clearInterval(y),null),b}function C(e){e&&(e.textContent=`${Math.floor(b/60)}m ${b%60}s`)}var w=2,T={userProfile:null,totalCards:0,cardsData:[],flippedCards:[],matchedPairs:0,isChecking:!1,timerElement:null,boardElement:null,onGameEndCallback:null};async function E({userProfile:e,totalCards:t,pairsCount:n,timerElement:r,boardElement:i,onGameEnd:a}){S(),T={userProfile:e,totalCards:t,cardsData:[],flippedCards:[],matchedPairs:0,isChecking:!1,timerElement:r,boardElement:i,onGameEndCallback:a},i.innerHTML=`<p class="loading-text">Cargando cartas de PokeAPI...</p>`;let o=await h(n);if(o.length===0){i.innerHTML=`<p class="error-message visible">Error al cargar las cartas. Inténtalo de nuevo.</p>`;return}let s=[...o,...o].map((e,t)=>({uid:`card-${t}-${Math.random()}`,id:e.id,name:e.name,image:e.image}));for(let e=s.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[s[e],s[t]]=[s[t],s[e]]}T.cardsData=s,D(),x(r)}function D(){T.boardElement.innerHTML=``;let e=document.createElement(`div`);e.className=`cards-grid`,e.style.setProperty(`--columns`,T.totalCards/w),T.cardsData.forEach(t=>{let n=document.createElement(`div`);n.className=`memory-card`,n.dataset.id=t.id,n.dataset.uid=t.uid,n.innerHTML=`
      <div class="card-inner">
        <div class="card-front">
        </div>
        <div class="card-back">
          <img src="${t.image}" alt="${t.name}" draggable="false" />
          <span>${t.name}</span>
        </div>
      </div>
    `,n.addEventListener(`click`,()=>O(n)),e.appendChild(n)}),T.boardElement.appendChild(e)}function O(e){T.isChecking||e.classList.contains(`flipped`)||e.classList.contains(`matched`)||(e.classList.add(`flipped`),T.flippedCards.push(e),T.flippedCards.length===2&&k())}function k(){T.isChecking=!0;let[e,t]=T.flippedCards;e.dataset.id===t.dataset.id?(e.classList.add(`matched`),t.classList.add(`matched`),T.matchedPairs++,T.flippedCards=[],T.isChecking=!1,T.matchedPairs===T.totalCards/2&&A()):setTimeout(()=>{e.classList.remove(`flipped`),t.classList.remove(`flipped`),T.flippedCards=[],T.isChecking=!1},900)}function A(){let e=S(),t=o({username:T.userProfile.username,favoritePokemon:T.userProfile.favoritePokemon,timeInSeconds:e,cardsCount:T.totalCards});T.onGameEndCallback&&T.onGameEndCallback(t,e)}var j=[`🥇`,`🥈`,`🥉`];function M(e,t=null){let n=a();if(n.length===0){e.innerHTML=`
      <section class="ranking-section">
        <h2>Ranking Global</h2>
        <p class="empty-ranking">Aún no hay partidas registradas. ¡Sé el primero!</p>
      </section>
    `;return}let r=n.length>5,i=n.slice(0,5),o=!1,s=null,c=-1;if(t){let e=n.findIndex(e=>e.id===t);e>=5&&(o=!0,s=n[e],c=e+1)}let l=i.map((e,n)=>N(e,n+1,e.id===t)).join(``),u=``;r&&(u=`
      <tr class="omitted-row">
        <td colspan="5">... y ${n.length-5} resultado(s) más omitido(s) por legibilidad ...</td>
      </tr>
    `);let d=``;o&&s&&(d=N(s,c,!0)),e.innerHTML=`
    <section class="ranking-section">
      <h2>Ranking Global</h2>
      <div class="table-responsive">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Jugador</th>
              <th>Pokémon</th>
              <th>Tiempo</th>
              <th>Cartas</th>
            </tr>
          </thead>
          <tbody>
            ${l}
            ${u}
            ${d}
          </tbody>
        </table>
      </div>
    </section>
  `}function N(e,t,n){let r=`${Math.floor(e.timeInSeconds/60)}m ${e.timeInSeconds%60}s`;return`
    <tr class="${n?`recent-result`:``}">
      <td><strong>${j[t-1]??`#${t}`}</strong></td>
      <td>${P(e.username)}</td>
      <td class="pokemon-cell">
        <img src="${e.favoritePokemon.image}" alt="${e.favoritePokemon.name}" width="28" height="28" />
        <span>${P(e.favoritePokemon.name)}</span>
      </td>
      <td>${r}</td>
      <td>${e.cardsCount}</td>
    </tr>
  `}function P(e){return e.replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e]||e)}async function F(e){let t=await g();t?.image&&(e.src=t.image,e.alt=`${t.name} animado`,e.hidden=!1)}var I=document.querySelector(`#app`);function L(){let e=r();e?B(e):R()}function R(){I.innerHTML=`
    <main class="landing">
      <h1>PokeMemory</h1>
      <p class="landing-subtitle">¡Hazte con todos!</p>
      <div class="landing-sprite-wrapper">
        <img id="landing-sprite" class="landing-sprite" alt="" hidden />
      </div>
      <button id="landing-start-btn" class="cta-btn">Crear perfil</button>
    </main>
  `,document.querySelector(`#landing-start-btn`).addEventListener(`click`,z),F(document.querySelector(`#landing-sprite`))}function z(){I.innerHTML=`
    <main class="login-container">
      <h1>PokeMemory</h1>
      <form id="profile-form">
        <div class="form-group">
          <label for="username">Nombre de usuario (3-15 caracteres):</label>
          <input type="text" id="username" minlength="3" maxlength="15" placeholder="Tu nombre..." autocomplete="off" />
          <span id="username-error" class="error-message"></span>
        </div>

        <div class="form-group">
          <label for="pokemon-search">Pokémon Favorito:</label>
          <input type="text" id="pokemon-search" placeholder="Escribe para buscar (ej. pikachu)..." autocomplete="off" />
          <ul id="search-results" class="search-results"></ul>
        </div>

        <div id="selected-pokemon-preview" class="pokemon-preview">
          <p>No se ha seleccionado ningún Pokémon</p>
        </div>

        <button type="submit" id="start-btn" disabled>Crear Perfil</button>
      </form>
    </main>
  `;let e=l(e=>{B(e)});_(document.querySelector(`#pokemon-search`),document.querySelector(`#search-results`),document.querySelector(`#selected-pokemon-preview`),t=>{e.setSelectedPokemon(t)})}function B(e){I.innerHTML=`
    <header class="game-header">
      <div class="user-info">
        <img src="${e.favoritePokemon.image}" alt="${e.favoritePokemon.name}" width="40" height="40" />
        <span><strong>${e.username}</strong> (${e.favoritePokemon.name})</span>
      </div>
      <button id="logout-btn" class="secondary-btn">Cerrar Sesión</button>
    </header>

    <main class="game-layout">
      <section class="game-controls-panel">
        <h2>Nueva Partida</h2>
        <div class="form-group">
          <label for="cards-count">Número de cartas (par, ej. 4, 8, 12):</label>
          <input type="number" id="cards-count" placeholder="Ej. 8" min="2" max="20" step="2" />
          <span id="cards-error" class="error-message"></span>
        </div>
        <div class="game-actions">
          <button id="start-game-btn" disabled>Iniciar / Reiniciar Partida</button>
          <div class="timer-container">
            <span>Tiempo: </span>
            <strong id="game-timer">0m 0s</strong>
          </div>
        </div>
        <div id="game-status-msg" class="status-msg"></div>
      </section>

      <section id="board-container" class="board-container">
        <p class="placeholder-text">Introduce el número de cartas e inicia la partida para jugar.</p>
      </section>

      <div id="ranking-container"></div>
    </main>
  `;let t=document.querySelector(`#ranking-container`);M(t),document.querySelector(`#logout-btn`).addEventListener(`click`,()=>{S(),i(),L()}),v((n,r)=>{let i=document.querySelector(`#game-status-msg`);i.textContent=``,i.className=`status-msg`,E({userProfile:e,totalCards:n,pairsCount:r,timerElement:document.querySelector(`#game-timer`),boardElement:document.querySelector(`#board-container`),onGameEnd:(e,n)=>{i.textContent=`¡Misión cumplida! Tiempo: ${Math.floor(n/60)}m ${n%60}s`,i.classList.add(`success`),M(t,e)}})})}L();