import{i as e,n as t,r as n}from"./index-BzFlNHD8.js";import{t as r}from"./clsx-DIZ_YDR7.js";import{A as i,B as a,C as o,D as s,E as c,H as l,I as u,L as d,M as f,N as p,O as m,P as h,R as g,S as _,T as v,V as y,_ as b,a as x,b as S,c as C,d as w,f as T,h as E,i as D,j as ee,k as O,l as k,m as A,o as te,p as j,s as M,t as ne,u as N,v as P,w as F,x as I,y as L,z as re}from"./NHLNWQXL-BqqVyT9e.js";var ie=!1;function ae(e){return e!==null&&(typeof e==`object`||typeof e==`function`)}var oe=(e,t)=>e===t||e.length===t.length&&e.every((e,n)=>e===t[n]),se=e=>typeof e==`function`&&!e.length?e():e,ce=e=>Array.isArray(e)?e:e?[e]:[];function le(e,...t){return typeof e==`function`?e(...t):e}var ue=ie?e=>h()?g(e):e:g;function R(e,t,n,r){return e.addEventListener(t,n,r),ue(e.removeEventListener.bind(e,t,n,r))}function de(e,t,n,r){let a=()=>{ce(se(e)).forEach(e=>{e&&ce(se(t)).forEach(t=>R(e,t,n,r))})};typeof e==`function`?m(a):i(a)}function fe(e,t=h()){let n=0,r,i;return()=>(n++,g(()=>{n--,queueMicrotask(()=>{!n&&i&&(i(),i=r=void 0)})}),i||ee(t=>r=e(i=t),t),r)}function pe(e,t){for(let n=e.length-1;n>=0;n--){let r=t.slice(0,n+1);if(!oe(e[n],r))return!1}return!0}var me=fe(()=>{let[e,t]=f(null);return R(window,`keydown`,e=>{t(e),setTimeout(()=>t(null))}),e}),he=fe(()=>{let[e,t]=f([]),n=()=>t([]),r=me();return R(window,`keydown`,n=>{if(n.repeat||typeof n.key!=`string`)return;let r=n.key.toUpperCase(),i=e();if(i.includes(r))return;let a=[...i,r];i.length===0&&r!==`ALT`&&r!==`CONTROL`&&r!==`META`&&r!==`SHIFT`&&(n.shiftKey&&a.unshift(`SHIFT`),n.altKey&&a.unshift(`ALT`),n.ctrlKey&&a.unshift(`CONTROL`),n.metaKey&&a.unshift(`META`)),t(a)}),R(window,`keyup`,e=>{if(typeof e.key!=`string`)return;let n=e.key.toUpperCase();t(e=>e.filter(e=>e!==n))}),R(window,`blur`,n),R(window,`contextmenu`,e=>{e.defaultPrevented||n()}),e[0]=e,e[1]={event:r},e[Symbol.iterator]=function*(){yield e[0],yield e[1]},e}),ge=fe(()=>{let e=he();return O(t=>e().length===0?[]:[...t,e()],[])});function _e(e,t,n={}){if(!e.length)return;e=e.map(e=>e.toUpperCase());let{preventDefault:r=!0}=n,i=me(),a=ge(),o=!1;m(d(a,n.requireReset?n=>{if(!n.length)return o=!1;if(o)return;let a=i();n.length<e.length?pe(n,e.slice(0,n.length))?r&&a&&a.preventDefault():o=!0:(o=!0,pe(n,e)&&(r&&a&&a.preventDefault(),t(a)))}:n=>{let a=n.at(-1);if(!a)return;let o=i();if(r&&a.length<e.length){oe(a,e.slice(0,e.length-1))&&o&&o.preventDefault();return}if(oe(a,e)){let i=n.at(-2);(!i||oe(i,e.slice(0,e.length-1)))&&(r&&o&&o.preventDefault(),t(o))}}))}var ve=s(void 0),ye=e=>{let[t,n]=f(e.theme);return m(()=>{n(e.theme)}),c(ve.Provider,{value:{theme:t,setTheme:n},get children(){return e.children}})};function be(){let e=l(ve);if(!e)throw Error(`useTheme must be used within a ThemeContextProvider`);return e}var z={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsrd-font-size) * 0.625)`,xs:`calc(var(--tsrd-font-size) * 0.75)`,sm:`calc(var(--tsrd-font-size) * 0.875)`,md:`var(--tsrd-font-size)`,lg:`calc(var(--tsrd-font-size) * 1.125)`,xl:`calc(var(--tsrd-font-size) * 1.25)`,"2xl":`calc(var(--tsrd-font-size) * 1.5)`,"3xl":`calc(var(--tsrd-font-size) * 1.875)`,"4xl":`calc(var(--tsrd-font-size) * 2.25)`,"5xl":`calc(var(--tsrd-font-size) * 3)`,"6xl":`calc(var(--tsrd-font-size) * 3.75)`,"7xl":`calc(var(--tsrd-font-size) * 4.5)`,"8xl":`calc(var(--tsrd-font-size) * 6)`,"9xl":`calc(var(--tsrd-font-size) * 8)`},lineHeight:{"3xs":`calc(var(--tsrd-font-size) * 0.75)`,"2xs":`calc(var(--tsrd-font-size) * 0.875)`,xs:`calc(var(--tsrd-font-size) * 1)`,sm:`calc(var(--tsrd-font-size) * 1.25)`,md:`calc(var(--tsrd-font-size) * 1.5)`,lg:`calc(var(--tsrd-font-size) * 1.75)`,xl:`calc(var(--tsrd-font-size) * 2)`,"2xl":`calc(var(--tsrd-font-size) * 2.25)`,"3xl":`calc(var(--tsrd-font-size) * 2.5)`,"4xl":`calc(var(--tsrd-font-size) * 2.75)`,"5xl":`calc(var(--tsrd-font-size) * 3)`,"6xl":`calc(var(--tsrd-font-size) * 3.25)`,"7xl":`calc(var(--tsrd-font-size) * 3.5)`,"8xl":`calc(var(--tsrd-font-size) * 3.75)`,"9xl":`calc(var(--tsrd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`},fontFamily:{sans:`ui-sans-serif, Inter, system-ui, sans-serif, sans-serif`,mono:`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsrd-font-size) * 0.125)`,sm:`calc(var(--tsrd-font-size) * 0.25)`,md:`calc(var(--tsrd-font-size) * 0.375)`,lg:`calc(var(--tsrd-font-size) * 0.5)`,xl:`calc(var(--tsrd-font-size) * 0.75)`,"2xl":`calc(var(--tsrd-font-size) * 1)`,"3xl":`calc(var(--tsrd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsrd-font-size) * 0.0625)`,.5:`calc(var(--tsrd-font-size) * 0.125)`,1:`calc(var(--tsrd-font-size) * 0.25)`,1.5:`calc(var(--tsrd-font-size) * 0.375)`,2:`calc(var(--tsrd-font-size) * 0.5)`,2.5:`calc(var(--tsrd-font-size) * 0.625)`,3:`calc(var(--tsrd-font-size) * 0.75)`,3.5:`calc(var(--tsrd-font-size) * 0.875)`,4:`calc(var(--tsrd-font-size) * 1)`,4.5:`calc(var(--tsrd-font-size) * 1.125)`,5:`calc(var(--tsrd-font-size) * 1.25)`,5.5:`calc(var(--tsrd-font-size) * 1.375)`,6:`calc(var(--tsrd-font-size) * 1.5)`,6.5:`calc(var(--tsrd-font-size) * 1.625)`,7:`calc(var(--tsrd-font-size) * 1.75)`,8:`calc(var(--tsrd-font-size) * 2)`,9:`calc(var(--tsrd-font-size) * 2.25)`,10:`calc(var(--tsrd-font-size) * 2.5)`,11:`calc(var(--tsrd-font-size) * 2.75)`,12:`calc(var(--tsrd-font-size) * 3)`,14:`calc(var(--tsrd-font-size) * 3.5)`,16:`calc(var(--tsrd-font-size) * 4)`,20:`calc(var(--tsrd-font-size) * 5)`,24:`calc(var(--tsrd-font-size) * 6)`,28:`calc(var(--tsrd-font-size) * 7)`,32:`calc(var(--tsrd-font-size) * 8)`,36:`calc(var(--tsrd-font-size) * 9)`,40:`calc(var(--tsrd-font-size) * 10)`,44:`calc(var(--tsrd-font-size) * 11)`,48:`calc(var(--tsrd-font-size) * 12)`,52:`calc(var(--tsrd-font-size) * 13)`,56:`calc(var(--tsrd-font-size) * 14)`,60:`calc(var(--tsrd-font-size) * 15)`,64:`calc(var(--tsrd-font-size) * 16)`,72:`calc(var(--tsrd-font-size) * 18)`,80:`calc(var(--tsrd-font-size) * 20)`,96:`calc(var(--tsrd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},xe={data:``},Se=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||xe},Ce=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,we=/\/\*[^]*?\*\/|  +/g,Te=/\n+/g,B=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?B(o,a):a+`{`+B(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=B(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=a[1]==`-`?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=B.p?B.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},V={},Ee=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+Ee(e[n]);return t}return e},De=(e,t,n,r,i)=>{let a=Ee(e),o=V[a]||(V[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!V[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=Ce.exec(e.replace(we,``));)t[4]?r.shift():t[3]?(n=t[3].replace(Te,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(Te,` `).trim();return r[0]})(e):e;V[o]=B(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&V.g;return n&&(V.g=V[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(V[o],t,r,s),o},Oe=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:B(e,``):!1===e?``:e}return e+r+(a??``)},``);function H(e){let t=this||{},n=e.call?e(t.p):e;return De(n.unshift?n.raw?Oe(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,Se(t.target),t.g,t.o,t.k)}H.bind({g:1});var U=H.bind({k:1}),ke={primary:{bg:{light:z.colors.gray[900],dark:z.colors.gray[100]},hover:{light:z.colors.gray[800],dark:z.colors.gray[200]},active:{light:z.colors.gray[700],dark:z.colors.gray[300]},text:{light:`#fff`,dark:z.colors.gray[900]},border:{light:z.colors.gray[800],dark:z.colors.gray[200]},outline:{light:z.colors.gray[900],dark:z.colors.gray[100]},outlineHover:{light:z.colors.gray[800],dark:z.colors.gray[200]}},secondary:{bg:{light:z.colors.gray[100],dark:z.colors.gray[100]},hover:{light:z.colors.gray[200],dark:z.colors.gray[200]},active:{light:z.colors.gray[300],dark:z.colors.gray[300]},text:{light:z.colors.gray[900],dark:z.colors.gray[900]},border:{light:z.colors.gray[300],dark:z.colors.gray[300]},outline:{light:z.colors.gray[700],dark:z.colors.gray[300]},outlineHover:{light:z.colors.gray[800],dark:z.colors.gray[200]}},info:{bg:{light:z.colors.blue[500],dark:z.colors.blue[500]},hover:{light:z.colors.blue[600],dark:z.colors.blue[600]},active:{light:z.colors.blue[700],dark:z.colors.blue[700]},text:{light:`#fff`,dark:`#fff`},border:{light:z.colors.blue[500],dark:z.colors.blue[500]},outline:{light:z.colors.blue[700],dark:z.colors.blue[300]},outlineHover:{light:z.colors.blue[600],dark:z.colors.blue[200]}},warning:{bg:{light:z.colors.yellow[500],dark:z.colors.yellow[500]},hover:{light:z.colors.yellow[600],dark:z.colors.yellow[600]},active:{light:z.colors.yellow[700],dark:z.colors.yellow[700]},text:{light:`#fff`,dark:`#fff`},border:{light:z.colors.yellow[500],dark:z.colors.yellow[500]},outline:{light:z.colors.yellow[700],dark:z.colors.yellow[300]},outlineHover:{light:z.colors.yellow[600],dark:z.colors.yellow[200]}},danger:{bg:{light:z.colors.red[500],dark:z.colors.red[500]},hover:{light:z.colors.red[600],dark:z.colors.red[600]},active:{light:z.colors.red[700],dark:z.colors.red[700]},text:{light:`#fff`,dark:`#fff`},border:{light:z.colors.red[500],dark:z.colors.red[500]},outline:{light:z.colors.red[700],dark:z.colors.red[300]},outlineHover:{light:z.colors.red[600],dark:z.colors.red[200]}},success:{bg:{light:z.colors.green[500],dark:z.colors.green[500]},hover:{light:z.colors.green[600],dark:z.colors.green[600]},active:{light:z.colors.green[700],dark:z.colors.green[700]},text:{light:`#fff`,dark:`#fff`},border:{light:z.colors.green[500],dark:z.colors.green[500]},outline:{light:z.colors.green[700],dark:z.colors.green[300]},outlineHover:{light:z.colors.green[600],dark:z.colors.green[200]}}},W=H,Ae=e=>{let{colors:t,font:n,size:r,border:i}=z,{fontFamily:a}=n,o=(t,n)=>e===`light`?t:n,s=e=>{let n=ke[e],r=o(n.outline.light,n.outline.dark),i=o(n.outlineHover.light,n.outlineHover.dark),a=o(n.bg.light,n.bg.dark),s=o(n.hover.light,n.hover.dark),c=o(n.active.light,n.active.dark),l=o(n.text.light,n.text.dark),u=o(n.border.light,n.border.dark);return{ghost:W`
        background: transparent;
        color: ${r};
        border-color: transparent;
        &:hover {
          background: ${o(t.gray[100],t.darkGray[800])};
          color: ${i};
        }
        &:active {
          background: ${o(t.gray[200],t.darkGray[700])};
          color: ${i};
        }
      `,outline:W`
        background: transparent;
        color: ${r};
        border-color: ${r};
        &:hover {
          background: ${o(t.gray[50],t.darkGray[800])};
          color: ${i};
          border-color: ${i};
        }
        &:active {
          background: ${o(t.gray[100],t.darkGray[700])};
          color: ${i};
          border-color: ${i};
        }
      `,solid:W`
        background: ${a};
        color: ${l};
        border-color: ${u};
        &:hover {
          background: ${s};
          border-color: ${s};
          box-shadow: ${o(z.shadow.xs(`rgb(0 0 0 / 0.12)`),z.shadow.xs(`rgb(0 0 0 / 0.5)`))};
        }
        &:active {
          background: ${c};
          border-color: ${c};
          box-shadow: ${o(z.shadow.inner(`rgb(0 0 0 / 0.2)`),z.shadow.inner(`rgb(0 0 0 / 0.6)`))};
        }
      `}},c={primary:s(`primary`),secondary:s(`secondary`),info:s(`info`),warning:s(`warning`),danger:s(`danger`),success:s(`success`)};return{logo:W`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      width: ${r[12]};
      height: ${r[12]};
      font-family: ${a.sans};
      gap: ${z.size[.5]};
      padding: 0;
      &:hover {
        opacity: 0.7;
      }
    `,selectWrapper:W`
      width: 100%;
      max-width: ${320}px;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    `,selectContainer:W`
      width: 100%;
    `,selectLabel:W`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${o(t.gray[900],t.gray[100])};
      text-align: left;
    `,selectDescription:W`
      font-size: 0.8rem;
      color: ${o(t.gray[500],t.gray[400])};
      margin: 0;
      line-height: 1.3;
      text-align: left;
    `,select:W`
      appearance: none;
      width: 100%;
      padding: 0.5rem 3rem 0.5rem 0.75rem;
      border-radius: 0.375rem;
      background-color: ${o(t.gray[50],t.darkGray[800])};
      color: ${o(t.gray[900],t.gray[100])};
      border: 1px solid ${o(t.gray[200],t.gray[800])};
      font-size: 0.875rem;
      transition: all 0.15s ease;
      cursor: pointer;

      /* Custom arrow */
      background-image: url("data:image/svg+xml;utf8,<svg fill='%236b7280' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1.25rem;

      &:hover {
        border-color: ${o(t.gray[300],t.gray[700])};
      }

      &:focus {
        outline: none;
        border-color: ${t.gray[400]};
        box-shadow: 0 0 0 3px ${o(t.gray[200],t.gray[800])};
      }
    `,inputWrapper:W`
      width: 100%;
      max-width: ${320}px;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    `,inputContainer:W`
      width: 100%;
    `,inputLabel:W`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${o(t.gray[900],t.gray[100])};
      text-align: left;
    `,inputDescription:W`
      font-size: 0.8rem;
      color: ${o(t.gray[500],t.gray[400])};
      margin: 0;
      line-height: 1.3;
      text-align: left;
    `,input:W`
      appearance: none;
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      background-color: ${o(t.gray[50],t.darkGray[800])};
      color: ${o(t.gray[900],t.gray[100])};
      border: 1px solid ${o(t.gray[200],t.gray[800])};
      font-size: 0.875rem;
      font-family: ${a.mono};
      transition: all 0.15s ease;

      &::placeholder {
        color: ${o(t.gray[400],t.gray[500])};
      }

      &:hover {
        border-color: ${o(t.gray[300],t.gray[700])};
      }

      &:focus {
        outline: none;
        border-color: ${o(t.gray[400],t.gray[600])};
        box-shadow: 0 0 0 3px ${o(t.gray[200],t.gray[800])};
      }
    `,checkboxWrapper:W`
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      padding: 0.375rem;
      border-radius: 0.375rem;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${o(t.gray[50],t.darkGray[900])};
      }
    `,checkboxContainer:W`
      width: 100%;
    `,checkboxLabelContainer:W`
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    `,checkbox:W`
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid ${o(t.gray[300],t.gray[700])};
      border-radius: 0.25rem;
      background-color: ${o(t.gray[50],t.darkGray[800])};
      display: grid;
      place-items: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
      margin-top: 0.125rem;

      &:hover {
        border-color: ${o(t.gray[400],t.gray[600])};
      }

      &:checked {
        background-color: ${o(t.gray[900],t.gray[100])};
        border-color: ${o(t.gray[900],t.gray[100])};
      }

      &:checked::after {
        content: '';
        width: 0.4rem;
        height: 0.6rem;
        border: solid ${o(`#fff`,t.gray[900])};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-top: -3px;
      }
    `,checkboxLabel:W`
      color: ${o(t.gray[900],t.gray[100])};
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      text-align: left;
    `,checkboxDescription:W`
      color: ${o(t.gray[500],t.gray[400])};
      font-size: 0.8rem;
      line-height: 1.3;
      text-align: left;
    `,button:{base:W`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: ${z.font.fontFamily.sans};
        font-size: 0.8rem;
        font-weight: 500;
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        cursor: pointer;
        transition:
          background 0.15s,
          color 0.15s,
          border 0.15s,
          box-shadow 0.15s;
        outline: none;
        border-width: 1px;
        border-style: solid;
      `,variant(e,t,n){let r=c[e];return n?r.ghost:t?r.outline:r.solid}},tag:{dot:e=>W`
        width: ${z.size[1.5]};
        height: ${z.size[1.5]};
        border-radius: ${z.border.radius.full};
        background-color: ${o(z.colors[e][500],z.colors[e][500])};
      `,base:W`
        display: flex;
        gap: ${z.size[1.5]};
        box-sizing: border-box;
        height: ${z.size[6.5]};
        background: ${o(t.gray[50],t.darkGray[500])};
        color: ${o(t.gray[700],t.gray[300])};
        border-radius: ${z.border.radius.sm};
        font-size: ${n.size.sm};
        padding: ${z.size[1]};
        padding-left: ${z.size[1.5]};
        align-items: center;
        font-weight: ${n.weight.medium};
        border: ${o(`1px solid `+t.gray[300],`1px solid transparent`)};
        user-select: none;
        position: relative;
        &:focus-visible {
          outline-offset: 2px;
          outline: 2px solid ${o(t.blue[700],t.blue[800])};
        }
      `,label:W`
        font-size: ${n.size.xs};
      `,count:W`
        font-size: ${n.size.xs};
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${o(t.gray[500],t.gray[400])};
        background-color: ${o(t.gray[200],t.darkGray[300])};
        border-radius: 2px;
        font-variant-numeric: tabular-nums;
        height: ${z.size[4.5]};
      `},tree:{info:W`
        color: ${o(t.gray[500],t.gray[500])};
        font-size: ${n.size.xs};
        margin-right: ${r[1]};
      `,actionButton:W`
        background-color: transparent;
        color: ${o(t.gray[500],t.gray[500])};
        border: none;
        display: inline-flex;
        padding: 0;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: ${r[3]};
        height: ${r[3]};
        position: relative;
        z-index: 1;

        &:hover svg {
          color: ${o(t.gray[600],t.gray[400])};
        }

        &:focus-visible {
          border-radius: ${i.radius.xs};
          outline: 2px solid ${o(t.blue[700],t.blue[800])};
          outline-offset: 2px;
        }
      `,expanderContainer:W`
        position: relative;
      `,expander:W`
        position: absolute;
        cursor: pointer;
        left: -16px;
        top: 3px;
        & path {
          stroke: ${o(t.blue[400],t.blue[300])};
        }
        & svg {
          width: ${r[3]};
          height: ${r[3]};
        }

        display: inline-flex;
        align-items: center;
        transition: all 0.1s ease;
      `,expandedLine:e=>W`
        display: block;
        padding-left: 0.75rem;
        margin-left: -0.7rem;
        ${e?`border-left: 1px solid ${o(t.blue[400],t.blue[300])};`:``}
      `,collapsible:W`
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background-color: ${o(t.gray[100],t.darkGray[700])};
          border-radius: ${z.border.radius.sm};
          padding: 0 ${z.size[1]};
        }
      `,actions:W`
        display: inline-flex;
        margin-left: ${r[2]};
        gap: ${r[2]};
        align-items: center;
        & svg {
          height: 12px;
          width: 12px;
        }
      `,valueCollapsed:W`
        color: ${o(t.gray[500],t.gray[400])};
      `,valueFunction:W`
        color: ${o(t.cyan[500],t.cyan[400])};
      `,valueString:W`
        color: ${o(t.green[500],t.green[400])};
      `,valueNumber:W`
        color: ${o(t.yellow[500],t.yellow[400])};
      `,valueBoolean:W`
        color: ${o(t.pink[500],t.pink[400])};
      `,valueNull:W`
        color: ${o(t.gray[500],t.gray[400])};
        font-style: italic;
      `,valueKey:W`
        color: ${o(t.blue[400],t.blue[300])};
      `,valueBraces:W`
        color: ${t.gray[500]};
      `,valueContainer:e=>W`
        display: block;
        margin-left: ${e?`0`:`1rem`};

        &:not(:hover) .actions {
          display: none;
        }

        &:hover .actions {
          display: inline-flex;
        }
      `},header:{row:W`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${z.size[2]} ${z.size[2.5]};
        gap: ${z.size[2.5]};
        border-bottom: ${o(t.gray[300],t.darkGray[500])} 1px solid;
        align-items: center;
      `,logoAndToggleContainer:W`
        display: flex;
        gap: ${z.size[3]};
        align-items: center;
        & > button {
          padding: 0;
          background: transparent;
          border: none;
          display: flex;
          gap: ${r[.5]};
          flex-direction: column;
        }
      `,logo:W`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        gap: ${z.size[.5]};
        padding: 0;
        &:hover {
          opacity: 0.7;
        }
        &:focus-visible {
          outline-offset: 4px;
          border-radius: ${i.radius.xs};
          outline: 2px solid ${t.blue[800]};
        }
      `,tanstackLogo:W`
        font-size: ${n.size.md};
        font-weight: ${n.weight.bold};
        line-height: ${n.lineHeight.xs};
        white-space: nowrap;
        color: ${o(t.gray[700],t.gray[300])};
      `,flavorLogo:(e,t)=>W`
        font-weight: ${n.weight.semibold};
        font-size: ${n.size.xs};
        background: linear-gradient(to right, ${o(e,t)});
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 1;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      `},section:{main:W`
        margin-bottom: 1.5rem;
        padding: 1rem;
        background-color: ${o(t.gray[50],t.darkGray[800])};
        border: 1px solid ${o(t.gray[200],t.gray[800])};
        border-radius: 0.5rem;
        box-shadow: none;
      `,title:W`
        font-size: 1rem;
        font-weight: 600;
        color: ${o(t.gray[900],t.gray[100])};
        margin: 0 0 0.75rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${o(t.gray[200],t.gray[800])};
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-align: left;
      `,icon:W`
        height: 18px;
        width: 18px;
        & > svg {
          height: 100%;
          width: 100%;
        }
        color: ${o(t.gray[700],t.gray[400])};
      `,description:W`
        color: ${o(t.gray[500],t.gray[400])};
        font-size: 0.8rem;
        margin: 0 0 1rem 0;
        line-height: 1.4;
        text-align: left;
      `},mainPanel:{panel:e=>W`
        padding: ${e?z.size[3]:0};
        background: ${o(t.gray[50],t.darkGray[700])};
        overflow-y: auto;
        height: 100%;
      `}}};function G(){let{theme:e}=be(),[t,n]=f(Ae(e()));return m(()=>{n(Ae(e()))}),t}var je=I(`<div><label><input type=checkbox><div>`),Me=I(`<span>`);function K(e){let t=G(),[n,r]=f(e.checked||!1),a=t=>{let n=t.target.checked;r(n),e.onChange?.(n)};return(()=>{var r=je(),o=r.firstChild,s=o.firstChild,c=s.nextSibling;return s.$$input=a,A(c,(()=>{var n=E(()=>!!e.label);return()=>n()&&(()=>{var n=Me();return A(n,()=>e.label),i(()=>T(n,t().checkboxLabel)),n})()})(),null),A(c,(()=>{var n=E(()=>!!e.description);return()=>n()&&(()=>{var n=Me();return A(n,()=>e.description),i(()=>T(n,t().checkboxDescription)),n})()})(),null),i(e=>{var n=t().checkboxContainer,i=t().checkboxWrapper,a=t().checkbox,l=t().checkboxLabelContainer;return n!==e.e&&T(r,e.e=n),i!==e.t&&T(o,e.t=i),a!==e.a&&T(s,e.a=a),l!==e.o&&T(c,e.o=l),e},{e:void 0,t:void 0,a:void 0,o:void 0}),i(()=>s.checked=n()),r})()}j([`input`]);var Ne=I(`<div><div><input>`),Pe=I(`<label>`),Fe=I(`<p>`);function Ie(e){let t=G(),[n,r]=f(e.value||``),a=t=>{let n=t.target.value;r(e=>e===n?e:n),e.onChange?.(n)};return(()=>{var r=Ne(),o=r.firstChild,s=o.firstChild;return A(o,(()=>{var n=E(()=>!!e.label);return()=>n()&&(()=>{var n=Pe();return A(n,()=>e.label),i(()=>T(n,t().inputLabel)),n})()})(),s),A(o,(()=>{var n=E(()=>!!e.description);return()=>n()&&(()=>{var n=Fe();return A(n,()=>e.description),i(()=>T(n,t().inputDescription)),n})()})(),s),s.$$input=a,i(n=>{var i=t().inputContainer,a=t().inputWrapper,c=e.type||`text`,l=t().input,u=e.placeholder;return i!==n.e&&T(r,n.e=i),a!==n.t&&T(o,n.t=a),c!==n.a&&b(s,`type`,n.a=c),l!==n.o&&T(s,n.o=l),u!==n.i&&b(s,`placeholder`,n.i=u),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),i(()=>s.value=n()),r})()}j([`input`]);var Le=I(`<div><div><select>`),Re=I(`<label>`),ze=I(`<p>`),Be=I(`<option>`);function Ve(e){let t=G(),[n,r]=f(e.value||e.options[0]?.value),a=t=>{let n=t.target.value;r(e=>e===n?e:n),e.onChange?.(n)};return(()=>{var r=Le(),o=r.firstChild,s=o.firstChild;return A(o,(()=>{var n=E(()=>!!e.label);return()=>n()&&(()=>{var n=Re();return A(n,()=>e.label),i(()=>T(n,t().selectLabel)),n})()})(),s),A(o,(()=>{var n=E(()=>!!e.description);return()=>n()&&(()=>{var n=ze();return A(n,()=>e.description),i(()=>T(n,t().selectDescription)),n})()})(),s),s.$$input=a,A(s,()=>e.options.map(e=>(()=>{var t=Be();return A(t,()=>e.label),i(()=>t.value=e.value),t})())),i(e=>{var n=t().selectContainer,i=t().selectWrapper,a=t().select;return n!==e.e&&T(r,e.e=n),i!==e.t&&T(o,e.t=i),a!==e.a&&T(s,e.a=a),e},{e:void 0,t:void 0,a:void 0}),i(()=>s.value=n()),r})()}j([`input`]);var He=I(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M8 6h10"></path><path d="M6 12h9"></path><path d="M11 18h7">`),Ue=I(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="lucide lucide-file-search2-icon lucide-file-search-2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><circle cx=11.5 cy=14.5 r=2.5></circle><path d="M13.3 16.3 15 18">`),We=I(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 10.27 7 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 13.73-4 6.93">`),Ge=I(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="m10 9-3 3 3 3"></path><path d="m14 15 3-3-3-3"></path><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719">`),Ke=I(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M10 8h.01"></path><path d="M12 12h.01"></path><path d="M14 8h.01"></path><path d="M16 12h.01"></path><path d="M18 8h.01"></path><path d="M6 8h.01"></path><path d="M7 16h10"></path><path d="M8 12h.01"></path><rect width=20 height=16 x=2 y=4 rx=2>`),qe=I(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx=12 cy=10 r=3>`),Je=I(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1=8 x2=16 y1=12 y2=12>`),Ye=I(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 6 6 18"></path><path d="m6 6 12 12">`),Xe=I(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16.5 9.39999L7.5 4.20999M12 17.5L12 3M21 16V7.99999C20.9996 7.64926 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64926 3 7.99999V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ze=I(`<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.85999M22 4L12 14.01L9 11.01"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Qe=I(`<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),$e=I(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 9L12 15L18 9"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),et=I(`<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),tt=I(`<svg width=12 height=12 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M21 13V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11M15 3H21M21 3V9M21 3L10 14"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),nt=I(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),rt=I(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M18 6L6 18M6 6L18 18"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),it=I(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 10h6V4"></path><path d="m2 4 6 6"></path><path d="M21 10V7a2 2 0 0 0-2-2h-7"></path><path d="M3 14v2a2 2 0 0 0 2 2h3"></path><rect x=12 y=14 width=10 height=7 rx=1>`);function at(){return He()}function ot(){return Ue()}function st(){return We()}function ct(){return Ge()}function lt(){return Ke()}function ut(){return qe()}function dt(){return Je()}function ft(){return Ye()}function pt(){return Xe()}function mt(){return Ze()}function ht(){return Qe()}function gt(){return $e()}function _t(){return et()}function vt(){return tt()}function yt(){return nt()}function bt(){return rt()}function xt(){return it()}var St=I(`<button>`);function Ct(e){let t=G(),n=O(()=>{let n=e.variant||`primary`;return r(t().button.base,t().button.variant(n,e.outline,e.ghost),e.className)});return(()=>{var t=St();return L(t,u(e,{get class(){return n()}}),!1,!0),A(t,()=>e.children),t})()}var wt=I(`<div>`),Tt=({className:e,children:t,class:n,withPadding:a})=>{let o=G();return(()=>{var s=wt();return A(s,t),i(()=>T(s,r(o().mainPanel.panel(!!a),e,n))),s})()},Et=I(`<section>`),Dt=I(`<h3>`),Ot=I(`<p>`),kt=I(`<span>`),q=({children:e,...t})=>{let n=G();return(()=>{var i=Et();return L(i,u({get class(){return r(n().section.main,t.class)}},t),!1,!0),A(i,e),i})()},J=({children:e,...t})=>{let n=G();return(()=>{var i=Dt();return L(i,u({get class(){return r(n().section.title,t.class)}},t),!1,!0),A(i,e),i})()},Y=({children:e,...t})=>{let n=G();return(()=>{var i=Ot();return L(i,u({get class(){return r(n().section.description,t.class)}},t),!1,!0),A(i,e),i})()},X=({children:e,...t})=>{let n=G();return(()=>{var i=kt();return L(i,u({get class(){return r(n().section.icon,t.class)}},t),!1,!0),A(i,e),i})()},At=class{#e=!0;#t;#n;#r;#i;#a;#o;#s;#c=0;#l=5;#u=!1;#d=!1;#f=null;#p=()=>{this.debugLog(`Connected to event bus`),this.#a=!0,this.#u=!1,this.debugLog(`Emitting queued events`,this.#i),this.#i.forEach(e=>this.emitEventToBus(e)),this.#i=[],this.stopConnectLoop(),this.#n().removeEventListener(`tanstack-connect-success`,this.#p)};#m=()=>{if(this.#c<this.#l){this.#c++,this.dispatchCustomEvent(`tanstack-connect`,{});return}this.#n().removeEventListener(`tanstack-connect`,this.#m),this.#d=!0,this.debugLog(`Max retries reached, giving up on connection`),this.stopConnectLoop()};#h=()=>{this.#u||(this.#u=!0,this.#n().addEventListener(`tanstack-connect-success`,this.#p),this.#m())};constructor({pluginId:e,debug:t=!1,enabled:n=!0,reconnectEveryMs:r=300}){this.#t=e,this.#e=n,this.#n=this.getGlobalTarget,this.#r=t,this.debugLog(` Initializing event subscription for plugin`,this.#t),this.#i=[],this.#a=!1,this.#d=!1,this.#o=null,this.#s=r}startConnectLoop(){this.#o!==null||this.#a||(this.debugLog(`Starting connect loop (every ${this.#s}ms)`),this.#o=setInterval(this.#m,this.#s))}stopConnectLoop(){this.#u=!1,this.#o!==null&&(clearInterval(this.#o),this.#o=null,this.#i=[],this.debugLog(`Stopped connect loop`))}debugLog(...e){this.#r&&console.log(`🌴 [tanstack-devtools:${this.#t}-plugin]`,...e)}getGlobalTarget(){if(typeof globalThis<`u`&&globalThis.__TANSTACK_EVENT_TARGET__)return this.debugLog(`Using global event target`),globalThis.__TANSTACK_EVENT_TARGET__;if(typeof window<`u`&&window.addEventListener!==void 0)return this.debugLog(`Using window as event target`),window;let e=typeof EventTarget<`u`?new EventTarget:void 0;return e===void 0||e.addEventListener===void 0?(this.debugLog(`No event mechanism available, running in non-web environment`),{addEventListener:()=>{},removeEventListener:()=>{},dispatchEvent:()=>!1}):(this.debugLog(`Using new EventTarget as fallback`),e)}getPluginId(){return this.#t}dispatchCustomEventShim(e,t){try{let n=new Event(e,{detail:t});this.#n().dispatchEvent(n)}catch{this.debugLog(`Failed to dispatch shim event`)}}dispatchCustomEvent(e,t){try{this.#n().dispatchEvent(new CustomEvent(e,{detail:t}))}catch{this.dispatchCustomEventShim(e,t)}}emitEventToBus(e){this.debugLog(`Emitting event to client bus`,e),this.dispatchCustomEvent(`tanstack-dispatch-event`,e)}createEventPayload(e,t){return{type:`${this.#t}:${e}`,payload:t,pluginId:this.#t}}emit(e,t){if(!this.#e){this.debugLog(`Event bus client is disabled, not emitting event`,e,t);return}if(this.#f&&(this.debugLog(`Emitting event to internal event target`,e,t),this.#f.dispatchEvent(new CustomEvent(`${this.#t}:${e}`,{detail:this.createEventPayload(e,t)}))),this.#d){this.debugLog(`Previously failed to connect, not emitting to bus`);return}if(!this.#a){this.debugLog(`Bus not available, will be pushed as soon as connected`),this.#i.push(this.createEventPayload(e,t)),typeof CustomEvent<`u`&&!this.#u&&(this.#h(),this.startConnectLoop());return}return this.emitEventToBus(this.createEventPayload(e,t))}on(e,t,n){let r=n?.withEventTarget??!1,i=`${this.#t}:${e}`;if(r&&(this.#f||=new EventTarget,this.#f.addEventListener(i,e=>{t(e.detail)})),!this.#e)return this.debugLog(`Event bus client is disabled, not registering event`,i),()=>{};let a=e=>{this.debugLog(`Received event from bus`,e.detail),t(e.detail)};return this.#n().addEventListener(i,a),this.debugLog(`Registered event to bus`,i),()=>{r&&this.#f?.removeEventListener(i,a),this.#n().removeEventListener(i,a)}}onAll(e){if(!this.#e)return this.debugLog(`Event bus client is disabled, not registering event`),()=>{};let t=t=>{let n=t.detail;e(n)};return this.#n().addEventListener(`tanstack-devtools-global`,t),()=>this.#n().removeEventListener(`tanstack-devtools-global`,t)}onAllPluginEvents(e){if(!this.#e)return this.debugLog(`Event bus client is disabled, not registering event`),()=>{};let t=t=>{let n=t.detail;this.#t&&n.pluginId!==this.#t||e(n)};return this.#n().addEventListener(`tanstack-devtools-global`,t),()=>this.#n().removeEventListener(`tanstack-devtools-global`,t)}},Z=new class extends At{constructor(){super({pluginId:`tanstack-devtools-core`})}};function jt(e){let t={...e},n={...e},r={},i=e=>{let n=r[e];if(!n){if(!p())return t[e];r[e]=n=f(t[e],{internal:!0}),delete t[e]}return n[0]()};for(let t in e)Object.defineProperty(n,t,{get:()=>i(t),enumerable:!0});let a=(e,n)=>{let i=r[e];if(i)return i[1](n);e in t&&(t[e]=le(n,t[e]))};return[n,(e,t)=>{if(ae(e)){let t=y(()=>Object.entries(le(e,n)));v(()=>{for(let[e,n]of t)a(e,()=>n)})}else a(e,t);return n}]}var Mt={width:null,height:null};function Nt(e){if(!e)return{...Mt};let{width:t,height:n}=e.getBoundingClientRect();return{width:t,height:n}}function Pt(e){let t=typeof e==`function`,[n,r]=jt(a.context||t?Mt:Nt(e)),i=new ResizeObserver(([e])=>r(Nt(e.target)));return g(()=>i.disconnect()),t?m(()=>{let t=e();t&&(r(Nt(t)),i.observe(t),g(()=>i.unobserve(t)))}):(i.observe(e),g(()=>i.unobserve(e))),n}var Ft=e=>{let[t,n]=f(!1),[r,i]=f(!1),a=O(()=>t()||r()),o=null;return g(()=>{o&&clearTimeout(o)}),{expanded:a,setForceExpand:i,hoverUtils:{enter:()=>{o&&=(clearTimeout(o),null),n(!0)},leave:()=>{o=setTimeout(()=>{n(!1)},e.animationMs)}},animationMs:e.animationMs}},It=s(void 0),Lt=e=>{let t=Ft({animationMs:e.animationMs});return c(It.Provider,{value:t,get children(){return e.children}})};function Rt(){let e=l(It);if(e===void 0)throw Error(`useDrawContext must be used within a DrawClientProvider`);return e}var zt=()=>{let e=l(ne);if(e===void 0)throw Error(`useDevtoolsShellContext must be used within a ShellContextProvider`);return e};function Bt(){let{settings:e,setSettings:t}=Q();return{theme:O(()=>e().theme),setTheme:e=>t({theme:e})}}var Vt=()=>{let{store:e,setStore:t}=zt(),{setForceExpand:n}=Rt(),r=O(()=>e.plugins),i=O(()=>e.state.activePlugins);return m(()=>{i().length===0?n(!0):n(!1)}),{plugins:r,toggleActivePlugins:n=>{t(t=>{let r=t.state.activePlugins.includes(n),i=e.plugins?.find(e=>e.id===n);i?.destroy&&r&&i.destroy(n);let a=r?t.state.activePlugins.filter(e=>e!==n):[...t.state.activePlugins,n];return a.length>3?t:{...t,state:{...t.state,activePlugins:a}}})},activePlugins:i}},Ht=()=>{let{store:e,setStore:t}=zt();return{state:O(()=>e.state),setState:e=>{t(t=>({...t,state:{...t.state,...e}}))}}},Q=()=>{let{store:e,setStore:t}=zt();return{setSettings:e=>{t(t=>({...t,settings:{...t.settings,...e}}))},settings:O(()=>e.settings)}},Ut=()=>{let{state:e,setState:t}=Ht();return{persistOpen:O(()=>e().persistOpen),setPersistOpen:e=>{t({persistOpen:e})}}},Wt=()=>{let{state:e,setState:t}=Ht();return{height:O(()=>e().height),setHeight:e=>{t({height:e})}}},Gt=(e,t=!0)=>{t?e.setAttribute(`tabIndex`,`-1`):e.removeAttribute(`tabIndex`);for(let n of e.children)Gt(n,t)},Kt=e=>{m(()=>{let t=document.getElementById(D);t&&Gt(t,!e())})},qt=e=>e.includes(`CtrlOrMeta`)?[e.map(e=>e===`CtrlOrMeta`?`Control`:e),e.map(e=>e===`CtrlOrMeta`?`Meta`:e)]:[e],Jt=e=>qt(e).flatMap(e=>{let n=e.filter(e=>t.includes(e)),r=e.filter(e=>!t.includes(e));return n.length===0?[r]:x(n).map(e=>[...e,...r])}),Yt=(e,t)=>{let n=Jt(t),r=e.map(e=>e.toUpperCase());return n.some(e=>e.every(e=>r.includes(String(e).toUpperCase()))&&r.every(t=>e.map(e=>String(e).toUpperCase()).includes(t)))},Xt={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsrd-font-size) * 0.625)`,xs:`calc(var(--tsrd-font-size) * 0.75)`,sm:`calc(var(--tsrd-font-size) * 0.875)`,md:`var(--tsrd-font-size)`,lg:`calc(var(--tsrd-font-size) * 1.125)`,xl:`calc(var(--tsrd-font-size) * 1.25)`,"2xl":`calc(var(--tsrd-font-size) * 1.5)`,"3xl":`calc(var(--tsrd-font-size) * 1.875)`,"4xl":`calc(var(--tsrd-font-size) * 2.25)`,"5xl":`calc(var(--tsrd-font-size) * 3)`,"6xl":`calc(var(--tsrd-font-size) * 3.75)`,"7xl":`calc(var(--tsrd-font-size) * 4.5)`,"8xl":`calc(var(--tsrd-font-size) * 6)`,"9xl":`calc(var(--tsrd-font-size) * 8)`},lineHeight:{"3xs":`calc(var(--tsrd-font-size) * 0.75)`,"2xs":`calc(var(--tsrd-font-size) * 0.875)`,xs:`calc(var(--tsrd-font-size) * 1)`,sm:`calc(var(--tsrd-font-size) * 1.25)`,md:`calc(var(--tsrd-font-size) * 1.5)`,lg:`calc(var(--tsrd-font-size) * 1.75)`,xl:`calc(var(--tsrd-font-size) * 2)`,"2xl":`calc(var(--tsrd-font-size) * 2.25)`,"3xl":`calc(var(--tsrd-font-size) * 2.5)`,"4xl":`calc(var(--tsrd-font-size) * 2.75)`,"5xl":`calc(var(--tsrd-font-size) * 3)`,"6xl":`calc(var(--tsrd-font-size) * 3.25)`,"7xl":`calc(var(--tsrd-font-size) * 3.5)`,"8xl":`calc(var(--tsrd-font-size) * 3.75)`,"9xl":`calc(var(--tsrd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`},fontFamily:{sans:`ui-sans-serif, Inter, system-ui, sans-serif, sans-serif`,mono:`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsrd-font-size) * 0.125)`,sm:`calc(var(--tsrd-font-size) * 0.25)`,md:`calc(var(--tsrd-font-size) * 0.375)`,lg:`calc(var(--tsrd-font-size) * 0.5)`,xl:`calc(var(--tsrd-font-size) * 0.75)`,"2xl":`calc(var(--tsrd-font-size) * 1)`,"3xl":`calc(var(--tsrd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsrd-font-size) * 0.0625)`,.5:`calc(var(--tsrd-font-size) * 0.125)`,1:`calc(var(--tsrd-font-size) * 0.25)`,1.5:`calc(var(--tsrd-font-size) * 0.375)`,2:`calc(var(--tsrd-font-size) * 0.5)`,2.5:`calc(var(--tsrd-font-size) * 0.625)`,3:`calc(var(--tsrd-font-size) * 0.75)`,3.5:`calc(var(--tsrd-font-size) * 0.875)`,4:`calc(var(--tsrd-font-size) * 1)`,4.5:`calc(var(--tsrd-font-size) * 1.125)`,5:`calc(var(--tsrd-font-size) * 1.25)`,5.5:`calc(var(--tsrd-font-size) * 1.375)`,6:`calc(var(--tsrd-font-size) * 1.5)`,6.5:`calc(var(--tsrd-font-size) * 1.625)`,7:`calc(var(--tsrd-font-size) * 1.75)`,8:`calc(var(--tsrd-font-size) * 2)`,9:`calc(var(--tsrd-font-size) * 2.25)`,10:`calc(var(--tsrd-font-size) * 2.5)`,11:`calc(var(--tsrd-font-size) * 2.75)`,12:`calc(var(--tsrd-font-size) * 3)`,14:`calc(var(--tsrd-font-size) * 3.5)`,16:`calc(var(--tsrd-font-size) * 4)`,20:`calc(var(--tsrd-font-size) * 5)`,24:`calc(var(--tsrd-font-size) * 6)`,28:`calc(var(--tsrd-font-size) * 7)`,32:`calc(var(--tsrd-font-size) * 8)`,36:`calc(var(--tsrd-font-size) * 9)`,40:`calc(var(--tsrd-font-size) * 10)`,44:`calc(var(--tsrd-font-size) * 11)`,48:`calc(var(--tsrd-font-size) * 12)`,52:`calc(var(--tsrd-font-size) * 13)`,56:`calc(var(--tsrd-font-size) * 14)`,60:`calc(var(--tsrd-font-size) * 15)`,64:`calc(var(--tsrd-font-size) * 16)`,72:`calc(var(--tsrd-font-size) * 18)`,80:`calc(var(--tsrd-font-size) * 20)`,96:`calc(var(--tsrd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},Zt=e=>`${(e/1e3).toFixed(2)}s`,Qt=U`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,$t=U`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`,en=U`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,tn=U`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,nn=U`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`,rn=U`
  to {
    transform: rotate(360deg);
  }
`,an=U`
  0%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1) rotate(10deg);
  }
`,on=e=>{let{colors:t,font:n,size:r,border:i}=Xt,{fontFamily:a,size:o}=n,s=H,c=(t,n)=>e===`light`?t:n;return{seoTabContainer:s`
      padding: 0;
      margin: 0 auto;
      background: ${c(t.white,t.darkGray[700])};
      border-radius: 8px;
      box-shadow: none;
      overflow-y: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      overflow-y: auto;
    `,seoTabTitle:s`
      font-size: 1.25rem;
      font-weight: 600;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0;
      padding: 1rem 1.5rem 0.5rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid ${c(t.gray[200],t.gray[800])};
    `,seoTabSection:s`
      padding: 1.5rem;
      background: ${c(t.gray[50],t.darkGray[800])};
      border: 1px solid ${c(t.gray[200],t.gray[800])};
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-radius: 0.75rem;
    `,seoSubNav:s`
      display: flex;
      flex-direction: row;
      gap: 0;
      margin-bottom: 1rem;
      border-bottom: 1px solid ${c(t.gray[200],t.gray[800])};
    `,seoSubNavLabel:s`
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: ${c(t.gray[600],t.gray[400])};
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      cursor: pointer;
      font-family: inherit;
      &:hover {
        color: ${c(t.gray[800],t.gray[200])};
      }
    `,seoSubNavLabelActive:s`
      color: ${c(t.gray[900],t.gray[100])};
      border-bottom-color: ${c(t.gray[900],t.gray[100])};
    `,seoPreviewSection:s`
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin-bottom: 0;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-x: auto;
      flex-wrap: wrap;
      padding-bottom: 0.5rem;
    `,seoPreviewCard:s`
      border: 1px solid ${c(t.gray[200],t.gray[800])};
      border-radius: 8px;
      padding: 12px 10px;
      background: ${c(t.white,t.darkGray[900])};
      margin-bottom: 0;
      box-shadow: 0 1px 3px ${c(`rgba(0,0,0,0.05)`,`rgba(0,0,0,0.1)`)};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 200px;
      max-width: 240px;
      font-size: 0.95rem;
      gap: 4px;
    `,seoPreviewHeader:s`
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0;
      color: ${c(t.gray[700],t.gray[300])};
    `,seoPreviewImage:s`
      max-width: 100%;
      border-radius: 6px;
      margin-bottom: 6px;
      box-shadow: 0 1px 2px ${c(`rgba(0,0,0,0.03)`,`rgba(0,0,0,0.06)`)};
      height: 160px;
      object-fit: cover;
    `,seoPreviewTitle:s`
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 4px;
      color: ${c(t.gray[900],t.gray[100])};
    `,seoPreviewDesc:s`
      color: ${c(t.gray[600],t.gray[400])};
      margin-bottom: 4px;
      font-size: 0.8rem;
    `,seoPreviewUrl:s`
      color: ${c(t.gray[500],t.gray[500])};
      font-size: 0.75rem;
      margin-bottom: 0;
      word-break: break-all;
    `,seoMissingTagsSection:s`
      margin-top: 4px;
      font-size: 0.875rem;
      color: ${c(t.red[500],t.red[400])};
    `,seoMissingTagsList:s`
      margin: 4px 0 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      max-width: 240px;
    `,seoMissingTag:s`
      background: ${c(t.red[100],t.red[500]+`22`)};
      color: ${c(t.red[700],t.red[500])};
      border-radius: 3px;
      padding: 2px 6px;
      font-size: 0.75rem;
      font-weight: 500;
    `,seoAllTagsFound:s`
      color: ${c(t.green[700],t.green[500])};
      font-weight: 500;
      margin-left: 0;
      padding: 0 10px 8px 10px;
      font-size: 0.875rem;
    `,serpPreviewBlock:s`
      margin-bottom: 1.5rem;
      border: 1px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 10px;
      padding: 1rem;
    `,serpPreviewLabel:s`
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: ${c(t.gray[700],t.gray[300])};
    `,serpSnippet:s`
      border: 1px solid ${c(t.gray[100],t.gray[800])};
      border-radius: 8px;
      padding: 1rem 1.25rem;
      background: ${c(t.white,t.darkGray[900])};
      max-width: 600px;
      font-family: ${a.sans};
      box-shadow: 0 1px 2px ${c(`rgba(0,0,0,0.04)`,`rgba(0,0,0,0.08)`)};
    `,serpSnippetMobile:s`
      border: 1px solid ${c(t.gray[100],t.gray[800])};
      border-radius: 8px;
      padding: 1rem 1.25rem;
      background: ${c(t.white,t.darkGray[900])};
      max-width: 380px;
      font-family: ${a.sans};
      box-shadow: 0 1px 2px ${c(`rgba(0,0,0,0.04)`,`rgba(0,0,0,0.08)`)};
    `,serpSnippetDescMobile:s`
      font-size: 0.875rem;
      color: ${c(t.gray[700],t.gray[300])};
      margin: 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    `,serpSnippetTopRow:s`
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    `,serpSnippetFavicon:s`
      width: 28px;
      height: 28px;
      border-radius: 50%;
      flex-shrink: 0;
      object-fit: contain;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,serpSnippetDefaultFavicon:s`
      width: 28px;
      height: 28px;
      background-color: ${c(t.gray[200],t.gray[800])};
      border-radius: 50%;
      flex-shrink: 0;
      object-fit: contain;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,serpSnippetSiteColumn:s`
      display: flex;
      flex-direction: column;
      gap: 0;
      min-width: 0;
    `,serpSnippetSiteName:s`
      font-size: 0.875rem;
      color: ${c(t.gray[900],t.gray[100])};
      line-height: 1.4;
      margin: 0;
    `,serpSnippetSiteUrl:s`
      font-size: 0.75rem;
      color: ${c(t.gray[500],t.gray[500])};
      line-height: 1.4;
      margin: 0;
    `,serpSnippetTitle:s`
      font-size: 1.25rem;
      font-weight: 400;
      color: ${c(`#1a0dab`,`#8ab4f8`)};
      margin: 0 0 4px 0;
      line-height: 1.3;
    `,serpSnippetDesc:s`
      font-size: 0.875rem;
      color: ${c(t.gray[700],t.gray[300])};
      margin: 0;
      line-height: 1.5;
    `,serpMeasureHidden:s`
      position: absolute;
      left: -9999px;
      top: 0;
      visibility: hidden;
      pointer-events: none;
      box-sizing: border-box;
    `,serpMeasureHiddenMobile:s`
      position: absolute;
      left: -9999px;
      top: 0;
      width: 340px;
      visibility: hidden;
      pointer-events: none;
      font-size: 0.875rem;
      line-height: 1.5;
    `,serpReportSection:s`
      margin-top: 1rem;
      font-size: 0.875rem;
      color: ${c(t.gray[700],t.gray[300])};
    `,serpErrorList:s`
      margin: 4px 0 0 0;
      padding-left: 1.25rem;
      list-style-type: disc;
    `,serpReportItem:s`
      margin-top: 0.25rem;
      color: ${c(t.red[700],t.red[400])};
      font-size: 0.875rem;
    `,devtoolsPanelContainer:(e,n)=>s`
      direction: ltr;
      position: fixed;
      overflow-y: hidden;
      overflow-x: hidden;
      ${e}: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      ${n?``:`max-height: 90%;`}
      border-top: 1px solid ${c(t.gray[200],t.gray[800])};
      transform-origin: top;
    `,devtoolsPanelContainerVisibility:e=>s`
        visibility: ${e?`visible`:`hidden`};
        height: ${e?`auto`:`0`};
      `,devtoolsPanelContainerResizing:e=>e()?s`
          transition: none;
        `:s`
        transition: all 0.4s ease;
      `,devtoolsPanelContainerAnimation:(e,t,n)=>e?s`
          pointer-events: auto;
          transform: translateY(0);
        `:s`
        pointer-events: none;
        transform: translateY(${n===`top`?-t:t}px);
      `,devtoolsPanel:s`
      display: flex;
      font-size: ${o.sm};
      font-family: ${a.sans};
      background-color: ${c(t.white,t.darkGray[700])};
      color: ${c(t.gray[900],t.gray[300])};
      width: w-screen;
      flex-direction: row;
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
    `,dragHandle:e=>s`
      position: absolute;
      left: 0;
      ${e===`bottom`?`top`:`bottom`}: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      user-select: none;
      z-index: 100000;
      &:hover {
        background-color: ${c(t.gray[400],t.gray[500])};
      }
    `,mainCloseBtn:s`
      background: transparent;
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      align-items: center;
      padding: 0;
      font-size: ${n.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;
      & > img {
        width: 56px;
        height: 56px;
        transition: all 0.3s ease;
        outline-offset: 2px;
        border-radius: ${i.radius.full};
        outline: 2px solid transparent;
      }
      &:hide-until-hover {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
      &:hide-until-hover:hover {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
      & > img:focus-visible,
      img:hover {
        outline: 2px solid ${c(t.black,t.black)};
      }
    `,mainCloseBtnPosition:e=>s`
        ${e===`top-left`?`top: ${r[2]}; left: ${r[2]};`:``}
        ${e===`top-right`?`top: ${r[2]}; right: ${r[2]};`:``}
        ${e===`middle-left`?`top: 50%; left: ${r[2]}; transform: translateY(-50%);`:``}
        ${e===`middle-right`?`top: 50%; right: ${r[2]}; transform: translateY(-50%);`:``}
        ${e===`bottom-left`?`bottom: ${r[2]}; left: ${r[2]};`:``}
        ${e===`bottom-right`?`bottom: ${r[2]}; right: ${r[2]};`:``}
      `,mainCloseBtnAnimation:(e,t)=>e?s`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `:t?s`
              opacity: 0;

              &:hover {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
              }
            `:s`
              opacity: 1;
              pointer-events: auto;
              visibility: visible;
            `,tabContainer:s`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      background-color: ${c(t.gray[50],t.darkGray[900])};
      border-right: 1px solid ${c(t.gray[200],t.gray[800])};
      box-shadow: none;
      position: relative;
      width: ${r[10]};
    `,tab:s`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: ${r[10]};
      cursor: pointer;
      font-size: ${o.sm};
      font-family: ${a.sans};
      color: ${c(t.gray[600],t.gray[400])};
      background-color: transparent;
      border: none;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;
      &:hover:not(.close):not(.active):not(.detach) {
        background-color: ${c(t.gray[100],t.gray[800])};
        color: ${c(t.gray[900],t.gray[100])};
        border-left: 2px solid ${c(t.gray[900],t.gray[100])};
      }
      &.active {
        background-color: ${c(t.gray[100],t.gray[800])};
        color: ${c(t.gray[900],t.gray[100])};
        border-left: 2px solid ${c(t.gray[900],t.gray[100])};
      }
      &.detach {
        &:hover {
          background-color: ${c(t.gray[100],t.gray[800])};
        }
        &:hover {
          color: ${c(t.green[700],t.green[500])};
        }
      }
      &.close {
        margin-top: auto;
        &:hover {
          background-color: ${c(t.gray[100],t.gray[800])};
        }
        &:hover {
          color: ${c(t.red[700],t.red[500])};
        }
      }
      &.disabled {
        cursor: not-allowed;
        opacity: 0.2;
        pointer-events: none;
      }
      &.disabled:hover {
        background-color: transparent;
        color: ${t.gray[300]};
      }
      & > svg {
        flex-shrink: 0;
      }
    `,tabContent:s`
      transition: all 0.2s ease-in-out;
      width: 100%;
      height: 100%;
    `,pluginsTabPanel:s`
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `,pluginsTabDraw:e=>s`
      width: ${e?r[48]:0};
      height: 100%;
      background-color: ${c(t.white,t.darkGray[900])};
      box-shadow: none;
      ${e?`border-right: 1px solid ${c(t.gray[200],t.gray[800])};`:``}
    `,pluginsTabDrawExpanded:s`
      width: ${r[48]};
      border-right: 1px solid ${c(t.gray[200],t.gray[800])};
    `,pluginsTabDrawTransition:e=>s`
        transition: width ${Zt(e)} ease;
      `,pluginsTabSidebar:e=>s`
      width: ${r[48]};
      overflow-y: auto;
      transform: ${e?`translateX(0)`:`translateX(-100%)`};
      display: flex;
      flex-direction: column;
    `,pluginsTabSidebarTransition:e=>s`
        transition: transform ${Zt(e)} ease;
      `,pluginsList:s`
      flex: 1;
      overflow-y: auto;
    `,pluginName:s`
      font-size: ${o.xs};
      font-family: ${a.sans};
      color: ${c(t.gray[600],t.gray[400])};
      padding: ${r[2]};
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;

      &:hover {
        background-color: ${c(t.gray[100],t.gray[800])};
        color: ${c(t.gray[900],t.gray[100])};
        padding: ${r[2]};
      }
      &.active {
        background-color: ${c(t.gray[100],t.gray[800])};
        color: ${c(t.gray[900],t.gray[100])};
        border-left: 2px solid ${c(t.gray[900],t.gray[100])};
      }
      &.active:hover {
        background-color: ${c(t.gray[200],t.gray[700])};
      }
    `,pluginsTabContent:s`
      width: 100%;
      height: 100%;

      & > * > * {
        min-width: 0;
        min-height: 0;
        height: 100%;
      }

      &:not(:last-child) {
        border-right: 5px solid ${c(t.purple[200],t.purple[800])};
      }
    `,settingsGroup:s`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,conditionalSetting:s`
      margin-left: 1.5rem;
      padding-left: 1rem;
      border-left: 2px solid ${c(t.gray[300],t.gray[600])};
      background-color: ${c(t.gray[50],t.darkGray[900])};
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-top: 0.5rem;
    `,settingRow:s`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `,settingsModifiers:s`
      display: flex;
      gap: 0.5rem;
    `,settingsStack:s`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `,noPluginsFallback:s`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      padding: 2rem;
      background: ${c(t.gray[50],t.darkGray[700])};
      width: 100%;
      height: 100%;
    `,noPluginsFallbackContent:s`
      max-width: 600px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    `,noPluginsFallbackIcon:s`
      width: 64px;
      height: 64px;
      color: ${c(t.gray[400],t.gray[600])};
      margin-bottom: 0.5rem;

      svg {
        width: 100%;
        height: 100%;
      }
    `,noPluginsFallbackTitle:s`
      font-size: 1.5rem;
      font-weight: 600;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0;
    `,noPluginsFallbackDescription:s`
      font-size: 0.95rem;
      color: ${c(t.gray[600],t.gray[400])};
      line-height: 1.5;
      margin: 0;
    `,noPluginsSuggestions:s`
      width: 100%;
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: ${c(t.white,t.darkGray[800])};
      border: 1px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.5rem;
    `,noPluginsSuggestionsTitle:s`
      font-size: 1.125rem;
      font-weight: 600;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0 0 0.5rem 0;
    `,noPluginsSuggestionsDesc:s`
      font-size: 0.875rem;
      color: ${c(t.gray[600],t.gray[400])};
      margin: 0 0 1rem 0;
    `,noPluginsSuggestionsList:s`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,noPluginsSuggestionCard:s`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: ${c(t.gray[50],t.darkGray[900])};
      border: 1px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.375rem;
      transition: all 0.15s ease;

      &:hover {
        border-color: ${c(t.gray[300],t.gray[600])};
        background: ${c(t.gray[100],t.darkGray[800])};
      }
    `,noPluginsSuggestionInfo:s`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
      flex: 1;
    `,noPluginsSuggestionPackage:s`
      font-size: 0.95rem;
      font-weight: 600;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    `,noPluginsSuggestionSource:s`
      font-size: 0.8rem;
      color: ${c(t.gray[500],t.gray[500])};
      margin: 0;
    `,noPluginsSuggestionStatus:s`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${c(t.green[600],t.green[400])};

      svg {
        width: 18px;
        height: 18px;
      }
    `,noPluginsSuggestionStatusText:s`
      font-size: 0.875rem;
      font-weight: 500;
    `,noPluginsSuggestionStatusTextError:s`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${c(t.red[600],t.red[400])};
    `,noPluginsEmptyState:s`
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: ${c(t.white,t.darkGray[800])};
      border: 1px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.5rem;
    `,noPluginsEmptyStateText:s`
      font-size: 0.875rem;
      color: ${c(t.gray[600],t.gray[400])};
      margin: 0;
      line-height: 1.5;
    `,noPluginsFallbackLinks:s`
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
    `,noPluginsFallbackLink:s`
      font-size: 0.875rem;
      color: ${c(t.gray[700],t.gray[300])};
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: ${c(t.gray[900],t.gray[100])};
        text-decoration: underline;
      }
    `,noPluginsFallbackLinkSeparator:s`
      color: ${c(t.gray[400],t.gray[600])};
    `,pluginMarketplace:s`
      width: 100%;
      overflow-y: auto;
      padding: 2rem;
      background: ${c(`linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`,`linear-gradient(135deg, #1a1d23 0%, #13161a 100%)`)};
      animation: ${Qt} 0.3s ease;
    `,pluginMarketplaceHeader:s`
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid ${c(t.gray[200],t.gray[700])};
    `,pluginMarketplaceTitleRow:s`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 0.5rem;
    `,pluginMarketplaceTitle:s`
      font-size: 1.5rem;
      font-weight: 700;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0;
      letter-spacing: -0.02em;
    `,pluginMarketplaceDescription:s`
      font-size: 0.95rem;
      color: ${c(t.gray[600],t.gray[400])};
      margin: 0 0 1rem 0;
      line-height: 1.5;
    `,pluginMarketplaceSearchWrapper:s`
      position: relative;
      display: flex;
      align-items: center;
      max-width: 400px;
      flex-shrink: 0;

      svg {
        position: absolute;
        left: 1rem;
        color: ${c(t.gray[400],t.gray[500])};
        pointer-events: none;
      }
    `,pluginMarketplaceSearch:s`
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.75rem;
      background: ${c(t.gray[50],t.darkGray[900])};
      border: 2px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.5rem;
      color: ${c(t.gray[900],t.gray[100])};
      font-size: 0.875rem;
      font-family: ${a.sans};
      transition: all 0.2s ease;

      &::placeholder {
        color: ${c(t.gray[400],t.gray[500])};
      }

      &:focus {
        outline: none;
        border-color: ${c(t.blue[500],t.blue[400])};
        background: ${c(t.white,t.darkGray[800])};
        box-shadow: 0 0 0 3px
          ${c(`rgba(59, 130, 246, 0.1)`,`rgba(96, 165, 250, 0.1)`)};
      }
    `,pluginMarketplaceFilters:s`
      margin-top: 1.5rem;
      padding-top: 1rem;
    `,pluginMarketplaceTagsContainer:s`
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;
      padding: 1rem;
      background: ${c(t.gray[50],t.darkGray[800])};
      border: 1px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.5rem;
    `,pluginMarketplaceTagButton:s`
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: ${c(t.white,t.darkGray[700])};
      border: 2px solid ${c(t.gray[300],t.gray[600])};
      border-radius: 0.375rem;
      color: ${c(t.gray[700],t.gray[300])};
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: ${c(t.gray[100],t.darkGray[600])};
        border-color: ${c(t.gray[400],t.gray[500])};
        color: ${c(t.gray[900],t.gray[100])};
      }
    `,pluginMarketplaceTagButtonActive:s`
      background: ${c(`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`)} !important;
      border-color: ${c(`#2563eb`,`#3b82f6`)} !important;
      color: white !important;

      &:hover {
        background: ${c(`linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)`,`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`)} !important;
        border-color: ${c(`#1d4ed8`,`#2563eb`)} !important;
      }
    `,pluginMarketplaceSettingsButton:s`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      background: ${c(t.gray[100],t.darkGray[800])};
      border: 2px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.5rem;
      color: ${c(t.gray[700],t.gray[300])};
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 0.5rem;

      &:hover {
        background: ${c(t.gray[200],t.darkGray[700])};
        border-color: ${c(t.gray[300],t.gray[600])};
        color: ${c(t.gray[900],t.gray[100])};
      }

      &:active {
        transform: scale(0.95);
      }
    `,pluginMarketplaceSettingsPanel:s`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 350px;
      background: ${c(t.white,t.darkGray[800])};
      border-left: 1px solid ${c(t.gray[200],t.gray[700])};
      box-shadow: -4px 0 12px ${c(`rgba(0, 0, 0, 0.1)`,`rgba(0, 0, 0, 0.4)`)};
      z-index: 1000;
      display: flex;
      flex-direction: column;
      animation: ${$t} 0.3s ease;
    `,pluginMarketplaceSettingsPanelHeader:s`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      border-bottom: 1px solid ${c(t.gray[200],t.gray[700])};
    `,pluginMarketplaceSettingsPanelTitle:s`
      font-size: 1.125rem;
      font-weight: 600;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0;
    `,pluginMarketplaceSettingsPanelClose:s`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      background: transparent;
      border: none;
      color: ${c(t.gray[600],t.gray[400])};
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.15s ease;

      &:hover {
        background: ${c(t.gray[100],t.darkGray[700])};
        color: ${c(t.gray[900],t.gray[100])};
      }
    `,pluginMarketplaceSettingsPanelContent:s`
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    `,pluginMarketplaceGrid:s`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
      animation: ${en} 0.4s ease;
    `,pluginMarketplaceCard:s`
      background: ${c(t.white,t.darkGray[800])};
      border: 2px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: ${c(`linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)`,`linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)`)};
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.25s ease;
      }

      &:hover {
        border-color: ${c(t.gray[400],t.gray[500])};
        box-shadow: 0 8px 24px ${c(`rgba(0,0,0,0.1)`,`rgba(0,0,0,0.4)`)};
        transform: translateY(-4px);

        &::before {
          transform: scaleX(1);
        }
      }
    `,pluginMarketplaceCardIcon:s`
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${c(`linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`,`linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)`)};
      border-radius: 0.5rem;
      color: white;
      transition: transform 0.25s ease;

      svg {
        width: 20px;
        height: 20px;
      }

      &.custom-logo {
      }
    `,pluginMarketplaceCardHeader:s`
      flex: 1;
    `,pluginMarketplaceCardTitle:s`
      font-size: 0.95rem;
      font-weight: 600;
      color: ${c(t.gray[900],t.gray[100])};
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    `,pluginMarketplaceCardDescription:s`
      font-size: 0.8rem;
      color: ${c(t.gray[500],t.gray[500])};
      margin: 0;
      padding: 0;
      background: transparent;
      border-radius: 0.375rem;
      display: block;
      font-weight: 500;
    `,pluginMarketplaceCardPackageBadge:s`
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 0.6875rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      opacity: 0.6;
      padding: 4px 8px;
      padding-left: 0;
      background-color: var(--bg-tertiary);
      border-radius: 4px;
      word-break: break-all;
      display: inline-block;
    `,pluginMarketplaceCardDescriptionText:s`
      line-height: 1.5;
      margin-top: 0;
    `,pluginMarketplaceCardVersionInfo:s`
      margin-top: 8px;
      font-size: 0.6875rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    `,pluginMarketplaceCardVersionSatisfied:s`
      color: ${c(t.green[600],t.green[400])};
    `,pluginMarketplaceCardVersionUnsatisfied:s`
      color: ${c(t.red[600],t.red[400])};
    `,pluginMarketplaceCardDocsLink:s`
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: ${c(t.blue[600],t.blue[400])};
      text-decoration: none;
      margin-top: 0.5rem;
      transition: color 0.15s ease;

      &:hover {
        color: ${c(t.blue[700],t.blue[300])};
        text-decoration: underline;
      }

      svg {
        width: 12px;
        height: 12px;
      }
    `,pluginMarketplaceCardTags:s`
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-top: 0.75rem;
    `,pluginMarketplaceCardTag:s`
      font-size: 0.6875rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      background: ${c(t.gray[100],t.darkGray[700])};
      border: 1px solid ${c(t.gray[300],t.gray[600])};
      border-radius: 0.25rem;
      color: ${c(t.gray[700],t.gray[300])};
    `,pluginMarketplaceCardImage:s`
      width: 28px;
      height: 28px;
      object-fit: contain;
    `,pluginMarketplaceNewBanner:s`
      position: absolute;
      top: 12px;
      right: -35px;
      background-color: ${c(t.green[500],t.green[500])};
      color: white;
      padding: 4px 40px;
      font-size: 0.6875rem;
      font-weight: bold;
      text-transform: uppercase;
      transform: rotate(45deg);
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
      z-index: 10;
      letter-spacing: 0.5px;
    `,pluginMarketplaceCardFeatured:s`
      border-color: ${c(t.blue[500],t.blue[400])};
      border-width: 2px;
    `,pluginMarketplaceCardActive:s`
      border-color: ${c(t.green[500],t.green[600])};
      border-width: 2px;

      &:hover {
        border-color: ${c(t.green[500],t.green[600])};
        box-shadow: none;
        transform: none;

        &::before {
          transform: scaleX(0);
        }
      }
    `,pluginMarketplaceCardStatus:s`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${c(t.green[600],t.green[400])};
      animation: ${tn} 0.3s ease;

      svg {
        width: 18px;
        height: 18px;
        animation: ${nn} 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    `,pluginMarketplaceCardSpinner:s`
      width: 18px;
      height: 18px;
      border: 2px solid ${c(t.gray[200],t.gray[700])};
      border-top-color: ${c(t.blue[600],t.blue[400])};
      border-radius: 50%;
      animation: ${rn} 0.8s linear infinite;
    `,pluginMarketplaceCardStatusText:s`
      font-size: 0.875rem;
      font-weight: 600;
    `,pluginMarketplaceCardStatusTextError:s`
      font-size: 0.875rem;
      font-weight: 600;
      color: ${c(t.red[600],t.red[400])};
    `,pluginMarketplaceEmpty:s`
      padding: 3rem 2rem;
      text-align: center;
      background: ${c(t.white,t.darkGray[800])};
      border: 2px dashed ${c(t.gray[300],t.gray[700])};
      border-radius: 0.75rem;
      animation: ${Qt} 0.3s ease;
    `,pluginMarketplaceEmptyText:s`
      font-size: 0.95rem;
      color: ${c(t.gray[600],t.gray[400])};
      margin: 0;
      line-height: 1.6;
    `,pluginMarketplaceSection:s`
      margin-bottom: 2.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    `,pluginMarketplaceSectionHeader:s`
      margin-bottom: 1rem;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      background: ${c(t.gray[50],t.darkGray[800])};
      border: 1px solid ${c(t.gray[200],t.gray[700])};
      border-radius: 0.5rem;
      transition: all 0.15s ease;

      &:hover {
        background: ${c(t.gray[100],t.darkGray[700])};
        border-color: ${c(t.gray[300],t.gray[600])};
      }
    `,pluginMarketplaceSectionHeaderLeft:s`
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceSectionChevron:s`
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${c(t.gray[700],t.gray[300])};
      transition: transform 0.2s ease;
    `,pluginMarketplaceSectionChevronCollapsed:s`
      transform: rotate(-90deg);
    `,pluginMarketplaceSectionTitle:s`
      font-size: 1.25rem;
      font-weight: 700;
      color: ${c(t.gray[900],t.gray[50])};
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceSectionBadge:s`
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      background: ${c(`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`)};
      color: white;
      border-radius: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    `,pluginMarketplaceFeatureBanner:s`
      margin-top: 1rem;
      padding: 1.25rem 1.5rem;
      background: ${c(`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,`linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)`)};
      border-radius: 0.75rem;
      border: 1px solid ${c(t.blue[400],t.blue[800])};
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    `,pluginMarketplaceFeatureBannerContent:s`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,pluginMarketplaceFeatureBannerTitle:s`
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceFeatureBannerIcon:s`
      width: 24px;
      height: 24px;
      display: inline-flex;
    `,pluginMarketplaceFeatureBannerText:s`
      font-size: 0.95rem;
      color: ${c(`rgba(255, 255, 255, 0.95)`,`rgba(255, 255, 255, 0.9)`)};
      line-height: 1.5;
      margin: 0;
    `,pluginMarketplaceFeatureBannerButton:s`
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.25rem;
      background: white;
      color: ${t.blue[600]};
      font-weight: 600;
      font-size: 0.95rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      align-self: flex-start;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background: ${c(t.gray[50],t.gray[100])};
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }
    `,pluginMarketplaceFeatureBannerButtonIcon:s`
      width: 18px;
      height: 18px;
    `,pluginMarketplaceCardDisabled:s`
      opacity: 0.6;
      filter: grayscale(0.3);
      cursor: not-allowed;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    `,pluginMarketplaceCardBadge:s`
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: 0.25rem;
      letter-spacing: 0.05em;
    `,pluginMarketplaceCardBadgeInstall:s`
      background: ${c(t.green[100],t.green[900])};
      color: ${c(t.green[700],t.green[300])};
    `,pluginMarketplaceCardBadgeAdd:s`
      background: ${c(t.blue[100],t.blue[900])};
      color: ${c(t.blue[700],t.blue[300])};
    `,pluginMarketplaceCardBadgeRequires:s`
      background: ${c(t.gray[100],t.gray[800])};
      color: ${c(t.gray[600],t.gray[400])};
    `,pluginMarketplaceButtonInstalled:s`
      opacity: 0.5;
    `,pluginNameAddMore:s`
      font-size: ${o.xs};
      font-family: ${a.sans};
      color: ${c(t.gray[600],t.gray[400])};
      padding: ${r[3]} ${r[2]};
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;
      background: ${c(`linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`,`linear-gradient(135deg, #1f2937 0%, #111827 100%)`)};
      font-weight: 600;
      position: relative;
      margin-top: auto;

      h3 {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;

        &::before {
          content: '✨';
          font-size: 0.875rem;
          animation: ${an} 2s ease-in-out infinite;
        }
      }

      &:hover {
        background: ${c(`linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)`,`linear-gradient(135deg, #374151 0%, #1f2937 100%)`)};
        color: ${c(t.gray[900],t.gray[100])};
        border-left-color: ${c(t.blue[500],t.blue[400])};

        h3::before {
          animation: ${an} 0.5s ease-in-out infinite;
        }
      }

      &.active {
        background: ${c(`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`)};
        color: ${c(t.white,t.white)};
        border-left: 2px solid ${c(t.blue[600],t.blue[300])};
        box-shadow: 0 4px 12px
          ${c(`rgba(59, 130, 246, 0.3)`,`rgba(96, 165, 250, 0.3)`)};

        h3::before {
          filter: brightness(0) invert(1);
        }
      }

      &.active:hover {
        background: ${c(`linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)`,`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`)};
      }
    `}};function $(){let{theme:e}=Bt(),[t,n]=f(on(e()));return m(()=>{n(on(e()))}),t}var sn=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAA4+klEQVR4AeSWBXBbPRaFYwonxlLw56LbnxnLzMzM6DLubBoqt+G4TKEyMzdQhtAyMw4tGXr2RH5ONHEWy+2b+eZeS1fSvTrW0/N7Rh410RFNHX0hpBnpQWaQ9SSPnCIl5A4pF3j8EqUvl6wl00l30pQE1zG/huhEDi/5oyLaOkQwky4kkZwnv2YkaB8KZY5fkrMknnQkxjrE0YrcXpJHPg3yE00mkpPkzwTV6LTwCwmCyqh3qeqbnaqIeg5Vo/pO4ZvYZgx3+YWFuPzCQ4SvMhlEHGM8sfRFDOfgXLWF+iM5RsaSCDmhl+HUqGQhFL83OUr+TuBFFRrkUjW0OFQNLE5uolu0PzwP/AJ0bs7r5LwOVUiQq1b/X8lB0o1oauWpepGFMJP55Mfyq0hlCHOoqzYrPNhHAO37rRA8qBcMtomwxC9E/ZQENLSvQcSOdETszEBETpaHXRloxDb2of6GBJiXL4B+1gQED+gBzbtWH5FU+hC3WNMQ6qj1avs+sRH9iyaMVvINJE5+JakCdE51Q7NTbQp/IG9UYJvPYJkzAVFpCXi1IBtvnNiNt87vxVuXD6DxlYOCtwh/e7gkqPktYogSw7FijlfzsxCVGg+LbTwCvv4Y8ppqi/6BuoHJ6eevlU/OH8hSEibX9Dxf2N5nFvmT90SoAnUOTYRFPgkI69oa0Qlz0Dg/HS3O5qDl1X1kP6yX98J6sQDWC3mwnstDi3O5tRHt1vPsO+/bxzYxlnOIuVoW7hdztziTg8Z5aYiOsyG001eQc6nKTeWvdUgn5ndk8vN6WmQhWpOKaiECdA5tZI0QqnomRM8dixY56/HehRx8ULQXHxTuwfuX8vD+hRyy22MvVpErwxjJ9+mry8+BPCfXEGtxTbF2i91rEWUbDb/AgJpXZaSPMPfI58/TadEpNpDYCRQc2ghztRABzV9HkyQbPjq+EZ+XFODz4nx8dnk3Pru0S0D/CSCtd2U3cygQfHQ0G43jZ0D3enSNMI1MblqHVE+qJIbuWf2U1Sj+p+Qnyj/KpTGEODWWcO/FDWvyTHx1ZhPaXs9Hm6IctL68w8OVnWh9VUL8fkJcqcKTR5viHJHbV6c3onn8tBpR6uuh1gc56buV2r5H3lNq1jxLrzCN5M8hUPhHQLTF66PZ3BFoeyoTXW7monPJTnS6ug2dCrcr7JB8iSJhnwzyWsyNOYpc255IR5NZQ1B9uqMsojapzinyXjxL90UuAXmgDvF3+TfUi4QbtHkfbfOT0PvmLvS+vgM9C7egZ/FW9CreJqBPtslIfZL/H6gd1+t/i/NtK9oqcu19Y6fIvU1OPCyftxI1+UcYoQ7SOSVRtsh78rTvi3BSohzjf/jXr/mE/WDpKPQv3IjBd3ZiQPFmDCjZjIHXtvxHBij24XnoNUTORNTQ74od7y0YBm99OkuouFuU2i+SIEmUpyJGI/JjrxjB0ebqZLvuXIpRd7djxM3NGH7NjhHXN/1v3Hg6cVK8bEUNrIU18XW2bVF1ncHRJtD+XdmDSmKS9uiJihFDfk2EGKGxnvsitv17GHZ6NSaVbsO4G9kYX8VN+8Mh5pCxPx1u2EVNrA1DT6xExBctRM2hMWaxB4ooPyENnsRJkRdoJIsRFisSwrujO2BySRpmlm7C1JsZmHY7qw6yhf2P3KoiE9Pv2DH97mayCdPucF4yjW2MeVqwtkzWuBmTClPQcsg3onZlD2RRTI9bFI10Z/zYK4b+FY8YX9p6Yc6dTMy7n405t9Mx524mf2dIpMtWIZNxwkp+BmYTzoP59+ywlazFzItLMP30VEw9NQZzzo3E/OvJjM0WsVxHnst3Ptn3jVOsT9x/8DMxmzXOK82mzcCnk7uIPdC/apFFqSSBj+vrS+115AvcoIjRfmFfLC3NwBKy+G4aFt8jtEvup7M9E8vKsrC0LJu+gO2ZIsZDukSa4Fvl2ZhXlIzJh0Zh+t6PYdsfi3lHXkXc2bcQfzoSi0oSuVaWNP7Js4SwRk/d9L+Z2d0jSqxJFuWCtG+qx3E6cr1iGF8xecSY3QPx5WlYXpaGb9/bgLjSVCRUpCOhPANxd9djaXECFl5ahIUX5mLxxTlYVrgAcbdWMT4Ty0vTSApJFcTR5zjMODEHg+1WTM6NwrR9LWA7/C4Wn/4YieffwNKLkzk2Sxr3dIm7l4J41k4f30ztJPbEQFGki37To3516RQ7p/pkxBhBi6/GtUFyWQpWVqQg6f562lSsqkjjpi/HlAMTMHxbDwzI+gwDs1th+NbmmLC7MWbubYylJz5B/NVxSOaYFeWpnGMDkks3YPV30jHj6Ex0XBWOkdubYeQOK8bkNMP0g1YsONaE4z5H/J01HJPCMeslNghWyNbX/5/ifPto64xjLqWe2pNoPxn6hUcU7pH0SfxPaswBSpJmCdRfZGZVtbtHa1/btm3btm3btm2bv+3Vr5mdWYzV3aWMt1un526feXv3/9+77nO+k4rs7oqozMCzrmzkJVfCiWfArYETAK2vq7N4YFGuf68b8Ji3P46wHJJnOUEQsLywxKUX7+bAgUuIs0VEPNaCERDJiUKlVjU0qspwdYZy5WbY1u1QY7HWMHtoit/+4fOsG6kiouSaMdgMCIPDyCWMbHoujaEdZFkCIgCoKuBBPcB/poIhoF5xgaOz2OELL/4cu/+8i+pIxS9Ptg0AcCPg7BWdHvcqOo6xPFAC/gC0gmqQd2Y7FuD5X3wOzaEqPkkJneXg2H5OOfUvHJoaQ/GgGdYkBDajHOU0KoohY3k5JlePNy1CduM0IKpswqKcftIJLHR2U45qLCx3iULBGEOne5Bq5basWXMNkuVJsuVx8u4EQb6MkxxnLMYEWBEsHiscxYClv3/8tdXtlZYzQJZRqZW46k2uwh+++EfSdiqu7DKfeQPcEfgEkB/vrZErcTo+g/BUlKS5oR7OTyzyqu+/mKvcaDtxO8ZYAwon/ekUdl56IUvdZWJdYKTZolYJCMKMKIRyWahXLM4Is/MJJoBGrULEBWzZ/jKSpMIXvvs2tq7bTCdOMAbKkRIErjDMyMA2nIsxjFOKPKXQUA7tYcpEwTAm2EoeXAWCJpCDKsgxHk//0UN0/O/S3BNWInaduof3POLDDGxuMjs2n4gQqvJB4EVAAKRX2iB9xrgz8DsgH97aslOXz/HEdzycOz3yNiTdBDECAAg+98SdmNmpOS6/dIwzdp7LvvZFXGPdNlqtgKjkCZxQqVgqoWFqKkGcJckmWNu4MyYf5CdnfJGtAzuYX46JnFKtBjQbFVxgyXUZZ4VSWCIIhDCEUiBUS4ZG2dMsx5RsFQ1vjZauiqKAHueR9Urc5grw/yynXgmigN986U987U0/YGhrS6cvn1PAALcCTv57V5dcwS9cCFyrNlzOlqY67mb3vh7Peu9jCwV5r4j07xKMEUQMqsr89ALnnb2TL//lZyRukdvu2EqzaXrKNERWmJxOUcmZPhiSJxUSO02WCN3YMzwY0WgEZN7jNaNcstQqhmpFqJVMcWpczz8pQilyDNcczXAaCe+Mlq8P5PwnPqpgrCHpJHzwuZ/n/D/todwKs85c4oAzgZv8PYub42TjLwSuBaQuMA7gES+8B/VqgPE5oVEC6QOPyTNIYxw569e3uMe9bsX7n/siHnnN+3LhzjajlyfML2QsLmXML2cYoywuKgvLS0zMHSLtGubmMiqlADHC3EJMmmSUgp4BnCKieBQFrBNqZcdg3RJIzuRCl+nOMJr8gSC5lMAcmfeH0X8rodFCF81mxGNfdl8AytXQAakINwaeBigQXJFTN0AOtIDvA+XhzQ2ZGV+Sp77lgdzirtchS1ICI1gB0+c8BSV0hiiwLC92GLt8gp079zI1M1MITB2cZ+fYImmbwhBeIUuVTidnYR7wjribE1hHVLakWU4UGYIQEAXxGAEExIAxIICiCFCJLNXQsBynZL5EyRwiCrdhbYhZ7ej7MKvG/6jcCs6AZjlrNrSIqo6Tf3YBw5vq0l5IBLhpz8HHgBzPIA7wwKtFuEdQtunSdNe11lR49lseTLnsML7/4bRA0MLBtpe7nHXeHn5/5omcO3oyB5Z2sX/hLKbal1CuRkRGmJ32TE9moIAVkgSWFnLSBFSFUsWCeoyBNMmJD5OmnixTsryYxwhF6xw4K1gj5F5BoBIYuqkh85NU3BClaKRnEMUcU7G6SuHHktNjyHE8uQKD4qywfvMgP/zMn+ksJuIik6rXJrAInAAEgO83yOrTMQR8HSit2dSQpblYXvbBR3CdG20hj1OcBYNi+v54KbCMjU/zgz8fNsT4GZSjlIF6hcF6laHGIK1qExt4xCnGQRzD6P4M3/VghLitBUHJIQashSg01GqOVj2kUQuoRI68axgbj7nsQJeknZHEQp4ZVME6QQyFYUJbGAUnCc3qVpwxGFaU1fvv5jD0nqF/XuiX68FRub/t0+PJ9dYBn9MarLJh2yB//fkFjGyqFzoFrgd8EugCAkB/py8UewXwzlLNpd2lLLjWTTbyzq88lUotwudK/w5VJXSO3Zcd4vN/+AuhmaP5t1BXQZVu4nsBgCBGKFqBuKuM70uYnc2KdZ8b6o2AUgmishBFhykZ6lVDo26pVgyVwGK8MLk/4ZTzFtnVHScX2FSFq68ZZNvGAdatjYhCMBhKLuYaGx5IuTSE9xmI/Ec8vHWWhbk2z73/R5i4dI4gMmka+wB4HvDRPt0jqyKrANgNbFu/tZHvv3zBvvVzj+FO97ke3U6KGKHfGIGzjB9c4MO/+BOSz1CJhCDKcKIkaQ4ilEqmwFnBGJBeVrvU9sSJEseeUtmyOOWZXYLBQUMUQalw4pB7j6rSariCasUy0gjIO4YwvS5GAy4bH2fvxARnHjyPZtVz82ttZeO6Fs7OcI2192D94FXJ8hT5TxgE8F4plQN+/b0zefNzvs2KboGLgGv320BW5R0PBr7nQpNliXcjG6p8+dcvoDlQIcs80leusEboxDmf/vmp7Dq4h1ZksEEG3pNknnLFUC0bnKOQNZbiOzodj6pQr1oyr1grNFqO9r6cE09YYt31SjQqUC4X+6kcxgALiykuFFpNRyV0bBwUhmub2dy6NYENWO60mZld5MJdo/z+/DMImpNc/1qDXH/jrbn6uhuQaYYgVyJDLOZX9/8hOVVwgWX60CL3u+E7AQgik2eJt6rcE/jVig3MqizpyQAj6yoAPO1Fd2bNSBXJsl6Y63sokRPOuHAffxq7lIZ1ZD6l085ZWlaCwOAM5LknTZU0U+ZmM6ZnclQNQwMOY8FaaNQs9ZKhUhbqO2MmDyV0u548V7LsSOuJItixqUQjMizMpyRZxqEFYXppF/um/4zPYurlgO2bhrnPXW7MG570aG6/6R788cwxpudncCbvhaS+j/5xP7q6/w/LhUYLHW5YV+fFb74nAEMjZVU9qnNAAVyfM98M3NU6Ie6mFuAWt9lefKk3ihEAetYWZhc6/PK8vWy0SppnZElO7oVyGdQfMQSoCiLKwnyGiqXRsEVx0edKu5Mx2AoIAyF0UkRT9fNz5HopYyg7eo7de8hzIck9G9ZERZ4ys5AWexbadcruUhY7m1jbuDp5r+g41Kjy4LvfjGttX4e3KZERMl31dv+bP16VwCi3vv1VeD+gqhYAuBcwAkwCYvtC3UcjPGBgKMpmJmP70MfekAc85AaIKnZVvhEFlrN2H+Sj5+5ku4NOEpNlQhgC6gEQgSxTDkwkpLmj2bTFeik0RWJYKrJtQxgcxsHBvV2SP3YZHBT2NYVuW4vMPCoJ1kJghVyVwaaDnCKxDEtgCLFmjqFoGxVXwgDGA17ZMNJibWug6DsxWBFskUMVYGSlMKgUrfwDGDBcwbp6Ws0So5dNcvap+2VgOMy67bwMnAecCwQWAFDgrcBVh9dW/MJcYp7zkttz7euuw6c5zqzE1eCMgsIvT7uEsalJKj4rIqkgNKj3iAAoeQoH9qXEuWVgMMAaT61sSFJf5BPlnqN3AgATZ7SxezIGIsM16gF/dHO4ZUetagkiQdBCPvdKqx6wtOxJ85wgDBCZpeFGGIqGEM2wCBYg94h6nBRjHIIVeuvSG68ApmgVy0qIC1aOUd2Vvvl+3cgx5ADTSxRRpVoJivzqVz+9iOGRsl+YT4oV4NuAOMADQ8AtANqLsQG43mFjOM0JejG1AgDWCvNLCbsPzdNC6MQZNjD43COiiFGkK+ybXGTZe3asHSLPM0QE7z1L7Zxq1aCq5LkWCl6a8+S7MgZ2lAnPOcDtH3M37nWTbTzi858hlPWgIWbYUgQHYliOM9YNhYwe6NIuZQTGMd0ZZ3t1KyEK5CACAAqogoCuvrREjsohqChgUfGsSCkKR0VYabRvzOp+v1xf34vixHPDG6wHIIlTAyDCbVSpAUsWALgz8OTB4TCbmUrsAx9yTR76sOv3jrRi+jLPkjMcmmnz+TMuoZx0yNQXRlKfYw0EqXDq+Ci33byD2+zYxpkzkwyEhlIkvWybXmFQQJVSaJm7JCb+TkJjs2NtuMTtnnNPbn7jHdyouYGPnXMCbjEqrsmgDCKCEcEFYBGWujml0CESs628maoEiM+xqqxgAENvzBHooRhVHGA4+jZbVq60lbZIAP+hcotZaVWpVAIuunCC886Zot5wGse+DvwWuMwAALcFqNcCLQa33Ua94jA+LyzqWEFxosRxyp5uAqoYa/HeI0DcTjllfJQX3/oOvPsp92LjQIuJ9jRODFnmWV72oJBnSpYqqLDYXqJ9bk5tY0Alz2ldbQsb1jTJ2x3ucZOr8rNHPYULkkV+etEkE6MJy+28uCLbXU+pJOSppxMLM/EC3XiRIM+xeYZbTXaE/Cj5ETzOe6w/0mpBcKTVAgIFhxBgCBAcUOgA34f2tXqM+T7EIz6nVQu4wx12AMjgQJgDALfur+zeEkC9CsANr7+OamQwXjCrksFSKBRT3mOtIUPBK5IroXV85fEP5363vQbd1PPXyybYVhmkkMmF3INYwQOqBpVFrs7tGZ0fpVPfQ8OUWLOmSjUUSqL4NOYu19vMWfUn86HfnMAJY+OkKWzZHoEI1gmViiNJlbbmpL5DRZREPYLpu2oUEIpWBChaVAABjEDRp2/+6JwCiAFRQFH8qkhNjt9flSRWIsNNbrQeAGNlRehWAA6oAtcEOHiwYwB+9IPzOeEvl9CfDAKoQuCEsckOnDbOPutJ1WM0ZzmOuda6YS4dmuSjZx5icrbDOaeOkmRtuqEgohT7QyGwgjuCS9DaOHsvHiVeXmbUdrgsSRn7xJ+xzqBFSSWnVasgo8rlF85yKHZcts4w0HKEziAixWlz5YyZ+ulsCPeS6UpwIazWSW8B+tb751T6Npije1Z8Sa8H+P/PSorinOXgoUUA9k90jAioch0goJe6aw9fiowCV0iDSANKGhVUVPi/91WpqiM8xv5yH6wiUOCY1KjpUDisLdYotBRs33qkwP8U5bJRwPfGCbAD4AGAAtmK4MhIqJs2lQ9T0bVr0VYL/T9sm7WZJDEUhDUzzcwgWGY0F/xLYAI4RutSuUQmwaPa1/A1fL1GiVX/E5mK405pwqBZrwPcyKLxWjtm+GGrM5iBAWYyrO0VVtO5VOYix4bK+noFi9S0Ry6xfIYyZRCljuPDHJeXJwteLiIcnx/CCKluMBjkl3oMiUvylsoC8qsM7KsQRUJtQedjrlnbpoQLyWndwgGviHtU4P7uDFE4556cVLi9PQHnxmKP0iZmYZFMKOXj+LhEGBI7o/XTngQBsfZ8qutg3YOc7v0bEvvZV/4sN7mBJNjb2yewaiWkbHOlBlH/HoGCYQ7nAvf393h+fh7aNE3v8o1GwQocHR2NG5vnQ7mu696fPMMIRVEOfefn53j37h1+/PiB7XY7tFdVBV7zdo5Uqo9V9qKyav3auDS9e0kheQsh8fj0hLu7u95r1albw+B/cHDwKpf82/FRFHdsYtU1H7wsy+7nH8L3Q9zc3LRq2tbr4XVP9/4zif2aPJlpEG2+2+1e2KYSDIhhKHqCYU7UK/QmvURv0eNU71BBLEGI7IlIJHjT/hm1DZ4lb0U+SinQWsM5B+/9A2stIaWEdV1Jf54ncs7E11rBOb/GvK7Rb+LneYZSCjFGyluW5ffrvhfAGKO8u3Pfd3qbpgnHcZCn944xBlprkFJi27an9/YZY/7uDCFACEHaD6dmApFdFsbx/3wN9dkiI7skxZRIWRrJEpFUIhVFylKohAiRyCA7LQiDVIpiKimjXarRlLRKklIp2UlkZjrz/I95Hne67/t+mR/Xebv3LM85z3qIh6t9OCfnWlpa8t9oXDxo/i4oKHBbW1t+bHDdu7s7Nzw8bGc1Pz/vXl9ffb/b21sam82xvr7uXl5e/LenpydXXl7u3yclJfn2w9n/DGEqkkLS09N9u7Gx4T5Df3+/XywSPT09Nm9NTY37W26EysPDg7ynS//gWx6ocnh46N89Pz+7WIyOjnrlfIu/eBEC3MzMTOgbFRT01qqqKq+wWKyurvq+VJrCw/9JvI7vh4aGQnIGjD2Sh/wC4bdIISslJcW3U1NTFJZWYQLKvYOPPygeKC2wpaXFTU5O2sb5nS1ZW1uzeaurq72VEVocWV5e/jfJfXWPj49O2dzcdLOzs9aX852cnNBzTBb9dn5+7uW5v7+nZ5qcb29vlNF75dXVlV/n+vra5KRx8CG9vb0mJz2b0DMI93hxcWFzq+xdXV1uYWHBKfQ4jq+oqPBrK9vb2/59amoq22gK+RXC7x+SeiDufx/822s4qJDm5mb/Pi4uzrc3Nzf2fX9/34TmYegctbW1KqjOo4cR8oadnR13fHzsFBqFzlNUVOSOjo7c6empV1JlZSXfW/hSqKDgHhobG00uKpVjgwbAPn19faYwQkXo+Pr6eh9OFcoQVogpnTBU2fjExMRYClljpR2PKIhAkMNGRkYGCH8H4f/zErEwNDU1QeImiGwY4+PjEGsCSU5ORnd3d8Q5lI6ODpuL6G/OobJIMYDLy0tIzEZxcTFKSkogSRLZ2dmYm5uD5CGQ4N1Jf7MPKS0thRgaiHgjJHdAycrKAsnJybGxZGRkBKSwsBATExMQj4bkScjhQzwICQkJUMTYIKEM4gm8c/i/xdhAJFT5MQov3SoqUV2cRfMQPiKUJVw55P9Ydmtrq/Wbnp4OWYS6PVlZWfHvGhoagh6i4c3cmklR2d3dde3t7S4atPSzszNvtZxbDpQtLTqUo9LS0kIyLS4uSjn9o5dBEcPysipM1qJ8jmVxYjkmPj7e1mNIJsHwp+3BwQH7WCXH6uo7vVd9jXNy0Q6e/R9fPnOz5PMtcnNzodCKicR1KGqhtJig9dKapAIBkWRIL7D1aHmDg4P+kWSPj9DSMzMzMTAw4OenxUdDFIG6ujpIFQVlb28PEt4gBQEUKUzojaEzUI9VD+c+xBhgmNV/0da8rbOzExJ6/drv7xYBzOwNKoxz43+ii0oZaRtV15d8gvz8fBANW+JRkHxi4wj7SelqG+eG2RLxHBApjSGWCSkcMDY2BknqkCRroUxKSLS1tUGKD8SirKyMSuS8/pEc6NfneIUHqEbDPlJoQO4/IHl5eRDvpwxe+eJ9lEXltZZhlnLxb+5VvByE4Y370zj1+vbu/68goJY/Yyb1fwg5Aw2HgSAMv1QVFAV9ggIU+gYtpQ/QlkbcMwSEwAURTp4gESIA5E0Ocvst/8pochlWGdmd3ZmZnf9f7hgq97kr63K5CImpTBfhJlIUBdefmioCBGUNmqNBaIK9eZ57gEDp3243A58nNtkD+sUri+Eq9999ClXp+tV3gt+M3W7nG7cEW2VZmu/v9zuQ2KAx13tEbtUKZps6AfmRci0gLjOCYZzmGrHXD8MwSiBndV17J/ILZJbQHw6HA4cOTs+yzK+x3++Zq0Ooh4DcjLNAQgRJejnBgYZZlAU/QXc8Hg0MhSSyftu2Y9d12NSeIHoQVNkMaK1pGvZo9I/HwyeaBAKIPXc7CI3ZXiTONY+yvqf/EuN3LSBEeSrn8xkjJuOqqjJzcbiEA0dR5DcnUUAYcRyH7xACStBXhOCbpo4zLcCw1Y2oujUEUwWvT6eTOMeiuB7EXJLEJKRDY8am/NP3vV4DqBCGCYj+HvFrLSB6d0qSZEQgdmQU5MdBwhFh8xz29XqFDOH3er2STSKDPCXwDPNRypvNJrBeOY3sRfd+v8loZbgOSTbCAT4SB26hb5g31WEX+65XeMS03W71/GHOBhok2ZinwCigkMQ0TWUXYmvWdjTBEEzmsAb7eT6f6HkDnHs6+SPEGtIziqHo9+zftu0F1LbbeTdRc+GnuXmo20F0HSfnld+Z/x1ZkvdBnE5n9NPmABtBC+FIBIuLi4x2xmmHh4eIehiNwMEzAaIk08Rx+eOTE2xvbxPEQm1ui12UXN40TSqD44V48/MLvj3vU3mB29tbPD090c4hkNI7j0VYthPIrayskA3ub3Nzk9Po43jEfJ4wu6tra5wmqypkReH1dqdDPOoD+Q5WOaX19Q1cX1/j+fmZnuEBPZ3JUEkgKulQn6hvfLwMrz/tdoc+w4ThURnEo+n6T0fWJU3Inn+pCz5aa8uoRVVUIwqqXllP2kh8maiKI0L6SrNF1CIaqiGZJQW1MO/wnymsq7Cog7aOrPVZvmbLGNVKGJRyP+p2GnWUYzrKloCqIqGWiX2TKavyN1ojYqJqCiyJqId15L7GxNKgnMek+R3qoL7NOg3WNxX1mAH7rby3gJLjSNa2n8yCxmHSyJYsey2TzPa9hmVm715mZmZmZl5mZmYmM9vyrMzyCkcanp7GqsyMvyHrTP1zRx8unq/PeR1ZWeVWdzwdEVmQOVv29/y1ZySUc2bHZXabz3zOzLDsKKl+W+UHVPB0gPNyN0lcJVQCfJWlBUKBWADfLggUtzlWCYz4G1BbYVYFdgjl02RoYjbbf2oNjfr3Q6iOCOVx/77x9sdT9p+ptM1nmhKYERj+qvllKFKS830H2KOAMvAIMNuF4RpG9F++eB+zo2VS41DazxtDA4DgreQFrmcdCN66QR8CzuWPRbpSXVmBG46nrKyvMxRaxsow0n8mWBFEQoUyVQo4HCq7/akVx+spHzi2yFikmdDClfuqlDvTBPMh7qmXEAyVSRfX0B/9HPGOGVaW17h36TizIxGzF5Yoh6MEjRDRDpXdokWBSDaHe/OevBpYwfdr7fvUQDrXzvp1tr31WWIQcUQaji7X+YsPH6ALxdVT0QIHgXNDoAkcAGZ3DEXu0dVEv+Di3Vx23g5ILQQR6ABQXoCw6XDnrViwzm9bbz0Ya0Hy2wL0tjVDj1i+cmKeqaDJTFWYGlKMVTXFslDRZWaDcRALAE4gDLjhaI3bbZOLxkLCFJ53QYnzZmeJ7hii+8Hh2kug3cHtnELfeR+cewY3PlrhxOLDXHHWBGfsnUKtDIN1oADYnJblPIgg1+cd7yevbPYHGlTg295qvQ2oTSA4A6Hilv2H+0Bmh2L30EpHA3OACYHs5PDpCAJw+8MLXLZrAmukz0KUQykNsBUISAZlKwwv2brtECcoHMYprNO0utpwjmJbCDU4ESoG1sIalbjMsAqxYtEKbCLcMF8jajvWa3UoJHz+nlFGxo4yuWcv8YdvxY5UCfedjXneE3FrGxTvvY+rdu3i9ijm7s8ewJUTdoyfRWm1CsqBUhixGJcSjoIiJmhowOQcq73DHehg67a3Og8lE5IxQXD++bVbHzwJgHXOk+JmgAzIDQAbbasBPn//PD9x1dlEUTiIYp2lYgWSkSafrk4t+e/bSgY2AspKSEWROKGZCOVQEWlBoSC0LNBgOBhBG1A6YL6VMFdvMqbbBMwyXB7hwfU5HjoYUz1vhe4cCqKPXE8ax4Tnn4X81HeSfuEMwlsPcM1skYWxSVpH2xhWSa0maIdYQuqJ5uaDh9h9cZtzztuJmCGiRgyBgAJ0PkUPIPrt7dO3xgMZGBik6gBFu9XhU3PHAGSpYQMA4Kb8gy63AisLbRvMlgL3jnuOc3ypAU4hqYNUoG8dGBlsm/8FWZdr//8lfn+pBwRN6hQbiWOj7ah3tdF0tJqKE80NGrEjHVHIuOXLnSbNVGiuJVx44Xl874uf2T/+toOGxdVj1HeugQ0pvO8zqOvvxjqh9m3ns/b0PTQuGWJ6aoQzonGi838E9X2/ir3uh1DJMONpzD49wU2fWeeRBw5Sa9bBgRgHluw7bP99zKnkBvI+lJ51cHSxzsceXGJXJZT11GkF88Cd+eVdV33aYigOHMDdX1nyzj8VALeNdVs/aNY+xRdyFJVgUTiBjhHqnR6Uniy1Hpw1y43TK3z8CUt85qpFrmeDEZOgl4sMX/4Qhas+y7c/ezcPPtbmvsc6bHCIOTnCXGeVT7ztP3n9H/4Or/rVH+KuG/6VzsSD1MZXYHWD6PgxEqXYKAQ0wpCV2+7ikaWTtCsB6ycmqbSrYK2H4bb/Pvkfnt3ON1vk/XjHwUUACoF2AAI3AA0gzP+tjPcreF6tbQH4yNwRrjtvNzoKEev86AIQgHyIsiU95azL78sEzu9XXY2Ioq0DDAojgjaCUpDYwZPoGM3SsQ1OThni5QInv2xQoaF6QREm6xxdP8nZ145z8O4Stx/usKOkeXDtXm483mS4OEo5XSKMJ7n9AY1SRxitl5h8JOw/enqkc4J04QT6yw/idlTZMz3Gj43uYjQugCgw2fdW4ACd+275FJbt09k+BhZADSQiaCDtJHzgnkMA1DqWzPfeovD/O7ATeCRUlHYUQznaMuqhX30Oe2fHcRa0Djw6T0Xy2raI5/qtH+4O+lQyyMHLY4ZP1hU33ZVSkkWk0yYSQ0lBpICCUN/tOHamI+51PhziDlhatSYjl8ac+cQQ2QhoHIPawwaTGPb2hs0ScN9JQ6kg6EChtKFrcC2NvjEg3qspPbXK+uFjNI8bTju9yIv2ncWZMgMmBQeg8gV9IL2N1cE2/Vnh0N4Krgck1Hz56BIX/ufHOLMaucfqqQbWgMcBK4DKYITAceBTRqColQX43EPzkG6XmmR72Z6lZ/N513MRVKerVHFkKuTNey2/ML7Bv0dHWZ1aYqFiWBhJOTZhOLgzZe7chNsvTdh/mmG9JSyeFMxxIcViQmjOw4E3O+57ZYeDH2xRO5kQOjjaclgcMxVhqW1YbxoWl2DVhZQujjj73yOe8O8x3/EbCVf/1C4O7h8jMQVqrNKMG7CmB/VNZd8JsNtar+1qCgPZTX+pVCBxfPr+owAgZOHxMQ8jBESTf/nHUA43DQC/9+n9rKw00ZZccd9aB/JtchLwwaJSQbfh5GgXxHma39zZ5A1mlXStzmzQBXHWGvPn1zm5z3DyfMvJx1lWpx0dBWYdlteFdAH0RtealLgQoJuCsinRrEWfKayPOxaKllRgIXWcPR0zPRxxouLQV2h2v0Bx7rMMuy9rUZ1sUG/W2buvzVP+oMSBT3V45ESLjfIqnYtSlISwokH5FGTZtDa/nYNmMslW9X2nBBaW6/xG16ehgvmW0QrYsggzgbfi7aPAD1qY3FuJ7PGO1VdPjXD+1BjSoyxATy6TeOU+YM46BN1xpKHmc2cF/Ntsyu2uRrlWp5x0EGUIQ0clhEoBygWhEkNBQ+AUzkLSUyK0Gw7TNJiWxSqhEQprReFkVVgYFtbLsBALY0YhbZgsK86fjbm3kLJUNKzVLIfnLfMLwmpNaLQA2kztijl8SHFyucOu3gnp5SnJUy1BJyZ4OPTrZCiw+RNjPWiLV74tbFo3kFhBofjQgUO896FjnFWJ7UJiA+A+4HcBAHeqhQN+E/iXYa3SmpPo8tESX/jRZzNUKiLZkxgqd/mELXVEXK5WCEcnNW8+zfJ5tcFMo4GkHRKXIC5FiyGgJ0egbN8qsvf0J/VGSBJo9UZfdaHTVTsRWqkidQotEClNrAUJYMwJF9QChjQ8a2+JI0b406UaFxQ1oiHUgwlDQ1UYHRLO2q1pPBZz6P0JF+zTPP+cCQovFphRVL48SfWzw+gFhYwKSnSungT5E0ZQue2+HYASEZRWrDZaXPDyD3EisRSVStsiEfDzwCu3WzggV60Z8ZEycU4ldg81Ev3eF17Fd154Fs46tC90nsgmFA/DdaV7bQe37FT812SbdrtGtd2kZROc7UAPBrYPIezLEeoeFBlI9yz9tlIZb8Ea6CTQbgvNprDRgEZD0WqDMRCiMKFwUUszVFNcPBPw7Y+r8PbFJp/vNNlTDFCBEIdCIVKEASSpz0y3B9g54QXXFLjs2SMUX5yiYghXRxi9fpLibSUYtb7s5gp57rLKVhgAzi/V9LZ7HuaHPnobe7s+fbjrU+AYsBdonWqWHDlSf6LgL8tapQ3XJ8nSL1/HRLUyGC347Lc1ShwObRxGK953BrymuMF0o4ZN23T6IBJwBo3JYBD1QGjp21BD2GsHAyhhX6rfzkbd+KxojAfTgnoDVtdhZRWW6zCUKi5raWIlXLevRDBS4BW1FaZHhPFhYWwYxoYUlRJ9MNZCvQ6r8wF2KeC8vZrHXRMS6QiJFMrFDM/NMvqpUdCCFEA5DyUDQgbDW9TAV4HmxHqD2Zd8gLJWWCFNRCIZZKJ/y0fHdkAyUkM+SqYeV47co81U/9dTLuaXr9mHc4L2vwIPNQdDaBQ0r97l+JBa4/QujKZJSG0bsQlKcjC09Q53A6t6IHqiZz0YCPt9PSiDts7N2QP85FHodIR6U7G8DN00TXBAMXZIc/4eeNolQ8yd3aC4q81kJaBcHEzPjkK66llFEIAohVJ6kI2cRqkARYCgcZFQPjzLzCdnCWoKKUseSh6EtyACSiv+8fr9/N71c5zV9eXBri+BIz46OpnPTwWEHLFfVPBSgXRPKYq+0kqZ+/FnsW/npE9dWVj64m2ElbLm306z3GbWmGrW2bBtnOl0lSKSeBhmkKKCAYjAgxjA2YQS5+BEoeq1B8cEDOBoCHLSHpJzQqcDK2vC2gmFWQvYM62Z3WcYHoG4B6D/Hqonv9xTz3r1oajcBBeNSFcuxEaWeG2c0z+3h8KhGBlyKMnVDjbTlfWLztx9ZIHL3/ipHgy6MFIFkcCPA2/MfP2/s8TfvcDFO6LAnEht+KIzpnjndz2ZQhxlBR6nQFvNfFXz9zNtHumsMNRcp2EaWNPq1wxxFtBopQl04FNTSqhSAm294513+gBC3FPIZpTonu1v+z4PxdswUBmkDJx3MoQ9oAoUfluzBUY2u1d7GGT5fwBGNBaNsyEmMOj2MHtu2svwA2WkYlFkKQtAZZFBs5Py/Ld9mi/MrzERarNsXAjcAlwDaMD9ry4TG/qD54CfrDvhnGqsblrcYHcl5orTpnAAWqON5dBwyl9MrXOstUypbai5EsZVMTKEZQTbbeM6YObBrIJdR6QOqoKokr8hZFEISqlT3uvRXorN7UBlv27ptX3NAa10vx1p3e9XykeEf7O+gdxoyKcZn/t725IfzTsw4nAmJFEJC7tWiIIhho5WIQTR5Be3QWnNy247wCvuO9TznRxtGx9CvAiYB4LtgIRs/zI+nG4AXqLglx+qJ0k37OKf/cw93ZCZ5KpdY9BJeGBqlj+cmWDZDaELQ6zpEItgUDiyyycG7RIi0yHurFBoLVJoH6GY3EHMIsQg8Yyf39VGEECh8JfrUWgkDwTIYPn9CizZMQpBcNJPHbnzAkF6wADrGEQ3ICp36qzc4EcBZECME2wPhuiuNVgXYDHMXTLHxsg5nH3bDlRHIUWLs0IQhlx/8Di//vn9vVEVXd+lCmKBfwDu+t9dJnZr6gqBA8DeYa1MLSyFe5Imb/mDX+aBc67kTwsVKkpTwrGBATGIWA+ja53bvJei8dEgRM5QbNcYrR9huH4/leTzFCII4wmiMCbSTQqBIwwgzteUrQohzKWzflSEKktpfoSWrxd99bZ95ClQgkbnb4gCgzAV2bwC4ugBVh5MgHOaTmSYWDudC+7bw/BjBSjCodoae1724f6oSoFpOAmB/cAled/+3yw1fgVwB8Dw0LDUNmqKJzwTfuanuTAMMJ06LbGIOBySWxJBobRfssLlLi4q+v3Oj1BimzLWOMn06r2MtD9AQUNYGCMMS8S6RaRT4i31I9IQh315IL4dqGy/HwB45YHonrKa4RH4qFBKbaYtBm36IPARB0YUgsZJTyFpaMCVOHfhTIb2V/jpP76BT8gSO+PQHU+MBgD2AQdyPuX/BAi58PolBS8RSMujY9H02ipyzRNYfdoLaCQppOnA4cigUAZdFULickxULRBUuirFqDhA/NVghaD1AJpVmlAcE81FZlbnGG28h5JOCOKYKJgi0m3CICHOnO9HYD5K/HYuUryyIXNWwIP8KBU/qtIZiEFf/oaoQ0EGyW8b6bV9HxrnQnSk+j/Kf/yPI9z9djh9KuDoojUKQoGfAN6Q8yX/N0DIUX0dgzdP1NhELKvLcPkT0Nc+FXBgLQK5S+0C4qM/CoiHipQmq8QTVcJqETSIcSglvjjTB4MI481lZlcfZKz+WUryGGEMQbBjAEB3ujbxw2NNlB+ReVhhJg+kJ1/wPQD8f8iGuj5SBAEgQAgRAhwaVJAB6Mv22wHiOijdwLgy73nlCu99ywanz3ZhzNvE142XAL+Sj4yvBpB8zvsC8GSgw8hYgfVVuOopqMuvHQCwJr8yQtb0gHpWUIWQ0vQw5Z1jxONVlAJnLcqPkjSCURrbA9NeZ2b9IOPrt1BJbyEKQEcRUTjpa0tCpC1xaLOhM1Go/DlNrpZ4MJspC1AAGqXCvkRFQITgUHRAbSDSQAAgb7GAM0ABOnIxH3rDAd7/BsPMLsXJI9JRioIIHweel/OzfLWAAASABUp+pHAekFAZjmnU4NJr0F0waI0kHYDs+pYfowJaowKNAOIf6SnNDFPdPUE8MYQI4AYnndliaQZNKkI1aTBdP8lE7SGGGzdRlIODM+2I/vAzDMvEYUCke1AsUdhVdvklkBwQjdIaraOuDf2Iqo6SFTSAeIdrMHp3156BCYqkwQhOFSEo4XSRNlWS6i4arsT1L3knN73mE0yeUWXpUD1BESPcA1wJ2Jzv+GoCyaeucQ/lDCChOhpTX0Nf+UTiZ12HKpZw7RaCIMbgkgTptJEkRZxFKQ1RMCjs1vXBVE4bY2jPFNFYBRFBnK9FCpRzOCBBoaxhtL3BeHORkcYhRltzlGSOAq3NIh9moy/8anR6kLoCu7kAMqC8tSEkwbXUSxdSK+2lURinHg3TjMqYIEZ0gFEBKI3rClHoUon2ao1P/vPr4I1vZOyMUVYPrWUwsj/LWs/5jK8FkHyRnwFu9VA6XSiFHhR1zoUUXvQD6IlJXNIB6WPBWQvGIEkbV2/iOglK4YdCCjEChYihXV0wZ04TDpf9w5COLN1njw8ZFKmAFkc1bTOc1BnurDKUrna3l6i4JQpqnYg6sU4Je+oDidBBEQnHMNE0jeLp1Mq7WavsYK0wQj0qYoKIECFWQgSE2TpZgM5UKFA/+BXu/q0/ZuGuh7sRPkn98FIHRQHhQX8mvpqH8bUEkocyDtwInJePFID4536bYM/Zg+tYXeUepuw7WXpRU2/gWm0UMgCjFWIFijHV08e6cCYIx4cg0IjNHrAju8IE+HMD/2Gch1QSS4GenF8RzxfuMMJFMUnXJnER07VhEFBWQklDQQthdo6SnZg6UP5hQFEaQbFxz33c8MO/BkC0a5b0yHyCUjEi9wBPBOo5H/H1AJKHUgQ+DjwFSClVA1p1DRBe9/0Uvu1aJC5gkw7OGMgmkSpf6DsJbqMO7Y4fjYVID4xx0G0Xp4cZ2j1BcWoYVYwH0Jz0heDB9AQawF9fExTiK7juSvWH4rrv7KiruKtCqAiz/QgYh0kM7VZKp52SpN12x5A6N4BYb9D4zOfgzW+HKCQYHXZ2ccUNRgTyCeAFgM1HxtcTCFv+4ddk8xsIQkOpElJfR++9gOgZLyA4fTcEASZJ+lGTDY0FAaEPRHpgUgOBRkUBonzEAHqoSGVmhEpvZDZaQRcjVBAg2WNFfYEgeC7+vEOhdM9qgqCnQVsDWIttpzRrber1NrVuu5HmnllGUHE8eI9DX8G8+W1w8CDh6TswC8tGkjREAZINbSFfwL8RQLZ+gF8AXubbCcNjMbVVALjqaYRXXk24YxZChe30IsYCmxGjnCCtFtJogbH+5MGPzIRBndEaXYkpjVcoTw1RGCkTlAroOESHASrIrzGPTz2gxKGsw6WGpJHQ6ELYaHZtx2QwUQi6Z5X064SKQ+zSMu7WW3Dv/wAKYHpSZGEpBWIANk/6VG4NZL6RQACUB2OAy4C3ZfNOKBQdcTFkYw0AnnYd4cWXEU5P4kSw7fbmNAWyteHdIGKabUjN4MZRH4yvMyL4iwL+JnlEWIqIil1bCAmiYADHH9tfYds4kq5MVwgQDIDp7MQ1CAhLMdFwhahShFqN5m130n7pKwBgfAxaLUOrHfRpi+wHfiB3OcQCAvCNBbJ9XdHAvwC/DgCkFCsBpqMxBgD17O8kuvgS9PhE32EuScANroeBQgUKnCCdBGm1IUk3529oD6cfDRqBgRRA/lq9Hli/iK72kQMgWqN78ColCiMV4pEqQRzg1lbp7J+j/vZ34h49AlEI5Ypjfd367wfwD8DvA2xfvL/RQE5dV64BXgJcDoDSKaVKQLuucb42PPs6wgsuQo1N4IIQ6UExFro2/wmxDknTQcQkqT/pzGJTb06m0WQg8tMBBvt7UdOLoi6EcLRK1IUQFiJU2sHOz9O68x5ar34D2YvJCcfKqsW5KDdt45eAu7Z+129mINn7hrlfzs8AfwHM5sBoTDsgSQHQl16JPu9C2HEaqn+vNUaU9o73AsAPQbPJQbbXtiCCf+WiSEMcogsxulzogejaIjrUkCb0rsWZbpHu3HIb9qZbAaAHbXLCysqqI0kj/9jLEeBPgDfmosIAAvCtAASALbm17EcivwHMAICyVIYc4kKadQW+95wLUGefi9qxEzU2jq5U+4Dwy1JIV2rLaqL4vgEIr+zmBw7SFJp13PIy9ugR7P57cd3UBGQ1QtDasLKqcS4AAI4D/wy8FEi2L9zfWkC2i5Yq8OPALwLng3dsXBisrp8mmnZTk3upnbtg9x7UxGQ/epQHpIpFCENUHxIDANYOfv0mRTY2kNo6srjQmzCOHDtC/sXYqCMMHa0WNJphLsrmfKp9E9DaPiq+9V8KiLb0PRt4J1ADJBNRbKgOJ12l3bYFnJf8H8r1VSpZxsdTxsYSikW75ZhV4K3A07cZqKivn5O2vL4BEQMwBTwHeDHw+M2UxuaDaFHsCCOH1gKAiMIacA5A+WPFP2ZCdhzOqX7UJV1trTUwD9zg52d8ClgG+BaKiK8+GK/8qwo8Ffgj4CPAY6dc9kOp/y56Yjt1gEeBD/kh65OAytaa56X4f/ylvSOCU5zbnOUXGf5pv5Tqa/yv+nP+4ubtwG29tu97nz/mr4Cf8mlozzbwAQLfr/nGv/j/AER3GxTUc5MlAAAAAElFTkSuQmCC`,cn=I(`<div>`),ln=I(`<button type=button aria-label="Open TanStack Devtools">`),un=I(`<img alt="TanStack Devtools">`),dn=e=>{let{settings:t}=Q(),[n,a]=f(),o=$(),s=O(()=>r(o().mainCloseBtn,o().mainCloseBtnPosition(t().position),o().mainCloseBtnAnimation(e.isOpen(),t().hideUntilHover)));return m(()=>{let e=t().customTrigger,r=n();e&&r&&e(r,{theme:t().theme})}),c(F,{get when(){return!t().triggerHidden},get children(){var n=ln();return n.$$click=()=>e.setIsOpen(!e.isOpen()),A(n,c(F,{get when(){return t().customTrigger},get fallback(){return(()=>{var e=un();return b(e,`src`,sn),e})()},get children(){var e=cn();return _(a,e),e}})),i(()=>T(n,s())),n}})};j([`click`]);var fn=I(`<div>`),pn=e=>{let t=$(),{height:n}=Wt(),{settings:a}=Q(),o=M();return(()=>{var s=fn();return b(s,`id`,D),A(s,c(Lt,{animationMs:400,get children(){return e.children}})),i(i=>{var c=o().pipWindow?`100vh`:n()+`px`,l=o().pipWindow?`100vh`:n()+`px`,u=r(t().devtoolsPanelContainer(a().panelLocation,!!o().pipWindow),t().devtoolsPanelContainerAnimation(e.isOpen(),n(),a().panelLocation),t().devtoolsPanelContainerVisibility(e.isOpen()),t().devtoolsPanelContainerResizing(e.isResizing));return c!==i.e&&P(s,`height`,i.e=c),l!==i.t&&P(s,`--tsd-main-panel-height`,i.t=l),u!==i.a&&T(s,i.a=u),i},{e:void 0,t:void 0,a:void 0}),s})()},mn=I(`<div>`),hn=e=>{let t=$(),{settings:n}=Q();return(()=>{var r=mn(),a=e.ref;return typeof a==`function`?_(a,r):e.ref=r,A(r,(()=>{var r=E(()=>!!e.handleDragStart);return()=>r()?(()=>{var r=mn();return N(r,`mousedown`,e.handleDragStart,!0),i(()=>T(r,t().dragHandle(n().panelLocation))),r})():null})(),null),A(r,()=>e.children,null),i(()=>T(r,t().devtoolsPanel)),r})()};j([`mousedown`]);var gn=I(`<div><h4 style=margin:0></h4><div></div>Final shortcut is: `),_n={Shift:`Shift`,Alt:`Alt`,Meta:`Meta`,Control:`Control`,CtrlOrMeta:`Ctrl Or Meta`},vn=e=>{let t=$(),n=t=>{if(e.hotkey.includes(t))e.onHotkeyChange(e.hotkey.filter(e=>e!==t));else{let n=e.hotkey.filter(t=>e.modifiers.includes(t)),r=e.hotkey.filter(t=>!e.modifiers.includes(t));e.onHotkeyChange([...n,t,...r])}},r=()=>e.hotkey.filter(t=>!e.modifiers.includes(t)).join(`+`),a=t=>{let n=e=>{if(e.length===1)return[te(e)];let t=[];for(let n of e){let e=te(n);t.includes(e)||t.push(e)}return t},r=e.hotkey.filter(t=>e.modifiers.includes(t)),i=t.split(`+`).flatMap(e=>n(e)).filter(Boolean);e.onHotkeyChange([...r,...i])},o=()=>e.hotkey.join(` + `);return(()=>{var s=gn(),l=s.firstChild,u=l.nextSibling,d=u.nextSibling;return A(l,()=>e.description),A(u,c(F,{keyed:!0,get when(){return e.hotkey},get children(){return e.modifiers.map(t=>c(Ct,{variant:`success`,onclick:()=>n(t),get outline(){return!e.hotkey.includes(t)},get children(){return _n[t]||t}}))}})),A(s,c(Ie,{description:`Use '+' to combine keys (e.g., 'a+b' or 'd'). This will be used with the enabled modifiers from above`,placeholder:`a`,get value(){return r()},onChange:a}),d),A(s,o,null),i(e=>{var n=t().settingsGroup,r=t().settingsModifiers;return n!==e.e&&T(s,e.e=n),r!==e.t&&T(u,e.t=r),e},{e:void 0,t:void 0}),s})()},yn=I(`<div>`),bn=I(`<div><div>`),xn=()=>{let{setSettings:e,settings:t}=Q(),n=$(),r=[`CtrlOrMeta`,`Alt`,`Shift`];return c(Tt,{withPadding:!0,get children(){return[c(q,{get children(){return[c(J,{get children(){return[c(X,{get children(){return c(ct,{})}}),`General`]}}),c(Y,{children:`Configure general behavior of the devtools panel.`}),(()=>{var r=yn();return A(r,c(K,{label:`Default open`,description:`Automatically open the devtools panel when the page loads`,onChange:()=>e({defaultOpen:!t().defaultOpen}),get checked(){return t().defaultOpen}}),null),A(r,c(K,{label:`Hide trigger until hovered`,description:`Keep the devtools trigger button hidden until you hover over its area`,onChange:()=>e({hideUntilHover:!t().hideUntilHover}),get checked(){return t().hideUntilHover}}),null),A(r,c(K,{label:`Completely hide trigger`,description:`Completely removes the trigger from the DOM (you can still open it with the hotkey)`,onChange:()=>e({triggerHidden:!t().triggerHidden}),get checked(){return t().triggerHidden}}),null),A(r,c(Ve,{label:`Theme`,description:`Choose the theme for the devtools panel`,get value(){return t().theme},options:[{label:`Dark`,value:`dark`},{label:`Light`,value:`light`}],onChange:t=>e({theme:t})}),null),i(()=>T(r,n().settingsGroup)),r})()]}}),c(q,{get children(){return[c(J,{get children(){return[c(X,{get children(){return c(dt,{})}}),`URL Configuration`]}}),c(Y,{children:`Control when devtools are available based on URL parameters.`}),(()=>{var r=yn();return A(r,c(K,{label:`Require URL Flag`,description:`Only show devtools when a specific URL parameter is present`,get checked(){return t().requireUrlFlag},onChange:t=>e({requireUrlFlag:t})}),null),A(r,c(F,{get when(){return t().requireUrlFlag},get children(){var r=yn();return A(r,c(Ie,{label:`URL flag`,description:`Enter the URL parameter name (e.g., 'debug' for ?debug=true)`,placeholder:`debug`,get value(){return t().urlFlag},onChange:t=>e({urlFlag:t})})),i(()=>T(r,n().conditionalSetting)),r}}),null),i(()=>T(r,n().settingsGroup)),r})()]}}),c(q,{get children(){return[c(J,{get children(){return[c(X,{get children(){return c(lt,{})}}),`Keyboard`]}}),c(Y,{children:`Customize keyboard shortcuts for quick access.`}),(()=>{var a=yn();return A(a,c(vn,{title:`Open/Close Devtools`,description:`Hotkey to open/close devtools`,get hotkey(){return t().openHotkey},modifiers:r,onHotkeyChange:t=>e({openHotkey:t})}),null),A(a,c(vn,{title:`Source Inspector`,description:`Hotkey to open source inspector`,get hotkey(){return t().inspectHotkey},modifiers:r,onHotkeyChange:t=>e({inspectHotkey:t})}),null),i(()=>T(a,n().settingsStack)),a})()]}}),c(q,{get children(){return[c(J,{get children(){return[c(X,{get children(){return c(ut,{})}}),`Position`]}}),c(Y,{children:`Adjust the position of the trigger button and devtools panel.`}),(()=>{var r=bn(),a=r.firstChild;return A(a,c(Ve,{label:`Trigger Position`,options:[{label:`Bottom Right`,value:`bottom-right`},{label:`Bottom Left`,value:`bottom-left`},{label:`Top Right`,value:`top-right`},{label:`Top Left`,value:`top-left`},{label:`Middle Right`,value:`middle-right`},{label:`Middle Left`,value:`middle-left`}],get value(){return t().position},onChange:t=>e({position:t})}),null),A(a,c(Ve,{label:`Panel Position`,get value(){return t().panelLocation},options:[{label:`Top`,value:`top`},{label:`Bottom`,value:`bottom`}],onChange:t=>e({panelLocation:t})}),null),i(e=>{var t=n().settingsGroup,i=n().settingRow;return t!==e.e&&T(r,e.e=t),i!==e.t&&T(a,e.t=i),e},{e:void 0,t:void 0}),r})()]}})]}})},Sn=e=>{if(e.status===`installing`)return`Installing...`;if(e.status===`success`)return`Installed!`;if(e.status===`error`)return`Error`;switch(e.actionType){case`install`:return`Install`;case`install-devtools`:return`Install Devtools`;case`add-to-devtools`:return`Add to Devtools`;case`requires-package`:return`Requires ${e.requiredPackageName}`;case`wrong-framework`:return`Different Framework`;case`already-installed`:return`Already Installed`;case`bump-version`:return`Bump Version`;case`version-mismatch`:return`Version Mismatch`;default:return`Install`}},Cn=e=>e.actionType===`requires-package`||e.actionType===`wrong-framework`||e.actionType===`version-mismatch`?`danger`:e.actionType===`bump-version`?`warning`:e.actionType===`already-installed`?`secondary`:`primary`,wn=(e,t)=>{let n=t(),r=n.pluginMarketplaceCardBadge;switch(e.actionType){case`install`:case`install-devtools`:return`${r} ${n.pluginMarketplaceCardBadgeInstall}`;case`add-to-devtools`:return`${r} ${n.pluginMarketplaceCardBadgeAdd}`;case`already-installed`:return`${r} ${n.pluginMarketplaceCardBadgeAdd}`;case`bump-version`:return`${r} ${n.pluginMarketplaceCardBadgeRequires}`;case`version-mismatch`:return`${r} ${n.pluginMarketplaceCardBadgeRequires}`;case`requires-package`:case`wrong-framework`:return`${r} ${n.pluginMarketplaceCardBadgeRequires}`;default:return r}},Tn=e=>{switch(e.actionType){case`install`:case`install-devtools`:return`Available`;case`add-to-devtools`:return`Installed`;case`already-installed`:return`Active`;case`version-mismatch`:return`Incompatible`;case`requires-package`:return`Unavailable`;case`wrong-framework`:return`Other Framework`;default:return``}},En=I(`<div>New`),Dn=I(`<img>`),On=I(`<span>✓ v<!> • Min v`),kn=I(`<p>`),An=I(`<a target=_blank rel="noopener noreferrer">Documentation `),jn=I(`<div>`),Mn=I(`<div style=position:relative><span></span><div></div><div><h3></h3><p></p><p>`),Nn=I(`<span>⚠️ v<!> • Requires v<!>+`),Pn=I(`<span>`),Fn=I(`<span>Installing...`),In=I(`<span>Installed!`),Ln=e=>{let t=$(),{card:n}=e;return(()=>{var r=Mn(),a=r.firstChild,s=a.nextSibling,l=s.nextSibling,u=l.firstChild,d=u.nextSibling,f=d.nextSibling;return A(r,c(F,{get when(){return n.metadata?.isNew},get children(){var e=En();return i(()=>T(e,t().pluginMarketplaceNewBanner)),e}}),a),A(a,()=>Tn(n)),A(s,c(F,{get when(){return n.metadata?.logoUrl},get fallback(){return c(pt,{})},get children(){var e=Dn();return i(r=>{var i=n.metadata?.logoUrl,a=n.metadata?.title||n.devtoolsPackage,o=t().pluginMarketplaceCardImage;return i!==r.e&&b(e,`src`,r.e=i),a!==r.t&&b(e,`alt`,r.t=a),o!==r.a&&T(e,r.a=o),r},{e:void 0,t:void 0,a:void 0}),e}})),A(u,()=>n.metadata?.title||n.devtoolsPackage),A(d,()=>n.devtoolsPackage),A(f,(()=>{var e=E(()=>n.actionType===`requires-package`);return()=>e()?`Requires ${n.requiredPackageName}`:E(()=>n.actionType===`wrong-framework`)()?`For different framework projects`:E(()=>n.actionType===`already-installed`)()?`Active in your devtools`:E(()=>n.actionType===`version-mismatch`)()?n.versionInfo?.reason||`Version incompatible`:n.metadata?.description||`For ${n.requiredPackageName}`})()),A(l,c(F,{get when(){return n.versionInfo},get children(){var e=kn();return A(e,c(F,{get when(){return n.versionInfo?.satisfied},get fallback(){return(()=>{var e=Nn(),r=e.firstChild.nextSibling,a=r.nextSibling.nextSibling;return a.nextSibling,A(e,()=>n.versionInfo?.current,r),A(e,()=>n.versionInfo?.required,a),i(()=>T(e,t().pluginMarketplaceCardVersionUnsatisfied)),e})()},get children(){var e=On(),r=e.firstChild.nextSibling;return r.nextSibling,A(e,()=>n.versionInfo?.current,r),A(e,()=>n.versionInfo?.required,null),i(()=>T(e,t().pluginMarketplaceCardVersionSatisfied)),e}})),i(()=>T(e,t().pluginMarketplaceCardVersionInfo)),e}}),null),A(l,c(F,{get when(){return n.metadata?.docsUrl},get children(){var e=An();return e.firstChild,A(e,c(vt,{}),null),i(r=>{var i=n.metadata?.docsUrl,a=t().pluginMarketplaceCardDocsLink;return i!==r.e&&b(e,`href`,r.e=i),a!==r.t&&T(e,r.t=a),r},{e:void 0,t:void 0}),e}}),null),A(l,c(F,{get when(){return E(()=>!!n.metadata?.tags)()&&n.metadata.tags.length>0},get children(){var e=jn();return A(e,c(o,{get each(){return n.metadata?.tags},children:e=>(()=>{var n=Pn();return A(n,e),i(()=>T(n,t().pluginMarketplaceCardTag)),n})()})),i(()=>T(e,t().pluginMarketplaceCardTags)),e}}),null),A(r,c(F,{get when(){return n.status===`idle`},get fallback(){return(()=>{var e=jn();return A(e,c(F,{get when(){return n.status===`installing`},get children(){return[(()=>{var e=jn();return i(()=>T(e,t().pluginMarketplaceCardSpinner)),e})(),(()=>{var e=Fn();return i(()=>T(e,t().pluginMarketplaceCardStatusText)),e})()]}}),null),A(e,c(F,{get when(){return n.status===`success`},get children(){return[c(mt,{}),(()=>{var e=In();return i(()=>T(e,t().pluginMarketplaceCardStatusText)),e})()]}}),null),A(e,c(F,{get when(){return n.status===`error`},get children(){return[c(ht,{}),(()=>{var e=Pn();return A(e,()=>n.error||`Failed to install`),i(()=>T(e,t().pluginMarketplaceCardStatusTextError)),e})()]}}),null),i(()=>T(e,t().pluginMarketplaceCardStatus)),e})()},get children(){return c(Ct,{get variant(){return Cn(n)},onClick:()=>e.onAction(n),get disabled(){return n.status!==`idle`||n.actionType===`requires-package`||n.actionType===`wrong-framework`||n.actionType===`already-installed`||n.actionType===`version-mismatch`},get class(){return E(()=>n.actionType===`already-installed`)()?t().pluginMarketplaceButtonInstalled:``},get children(){return Sn(n)}})}}),null),i(e=>{var i=t().pluginMarketplaceCard,o={[t().pluginMarketplaceCardDisabled]:!n.isCurrentFramework&&n.actionType!==`already-installed`,[t().pluginMarketplaceCardFeatured]:!!n.metadata?.featured&&n.actionType!==`already-installed`,[t().pluginMarketplaceCardActive]:n.actionType===`already-installed`},c=wn(n,t),p=t().pluginMarketplaceCardIcon,m=!!n.metadata?.logoUrl,h=t().pluginMarketplaceCardHeader,g=t().pluginMarketplaceCardTitle,_=t().pluginMarketplaceCardPackageBadge,v=t().pluginMarketplaceCardDescriptionText;return i!==e.e&&T(r,e.e=i),e.t=w(r,o,e.t),c!==e.a&&T(a,e.a=c),p!==e.o&&T(s,e.o=p),m!==e.i&&s.classList.toggle(`custom-logo`,e.i=m),h!==e.n&&T(l,e.n=h),g!==e.s&&T(u,e.s=g),_!==e.h&&T(d,e.h=_),v!==e.r&&T(f,e.r=v),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0}),r})()},Rn=I(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">`),zn=I(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><rect x=2 y=4 width=20 height=16 rx=2></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7">`),Bn=I(`<div><div><h4><span></span>Want to be featured here?</h4><p>If you've built a plugin for TanStack Devtools and would like to showcase it in the featured section, we'd love to hear from you! Reach out to us to discuss partnership opportunities.</p><a href="mailto:partners+devtools@tanstack.com?subject=Featured%20Plugin%20Partnership%20Inquiry"><span></span>Contact Us`),Vn=I(`<div>`),Hn=I(`<div><div><div><div></div><h3>`),Un=()=>Rn(),Wn=()=>zn(),Gn=e=>{let t=$();return(()=>{var n=Hn(),r=n.firstChild,a=r.firstChild,s=a.firstChild,l=s.nextSibling;return N(r,`click`,e.onToggleCollapse,!0),A(s,c(gt,{})),A(l,()=>e.section.displayName),A(n,c(F,{get when(){return!e.isCollapsed()},get children(){return[c(F,{get when(){return e.section.id===`featured`},get children(){var e=Bn(),n=e.firstChild,r=n.firstChild,a=r.firstChild,o=r.nextSibling,s=o.nextSibling,l=s.firstChild;return A(a,c(Un,{})),A(l,c(Wn,{})),i(i=>{var c=t().pluginMarketplaceFeatureBanner,u=t().pluginMarketplaceFeatureBannerContent,d=t().pluginMarketplaceFeatureBannerTitle,f=t().pluginMarketplaceFeatureBannerIcon,p=t().pluginMarketplaceFeatureBannerText,m=t().pluginMarketplaceFeatureBannerButton,h=t().pluginMarketplaceFeatureBannerButtonIcon;return c!==i.e&&T(e,i.e=c),u!==i.t&&T(n,i.t=u),d!==i.a&&T(r,i.a=d),f!==i.o&&T(a,i.o=f),p!==i.i&&T(o,i.i=p),m!==i.n&&T(s,i.n=m),h!==i.s&&T(l,i.s=h),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),e}}),(()=>{var n=Vn();return A(n,c(o,{get each(){return e.section.cards},children:t=>c(Ln,{card:t,get onAction(){return e.onCardAction}})})),i(()=>T(n,t().pluginMarketplaceGrid)),n})()]}}),null),i(i=>{var o=t().pluginMarketplaceSection,c=t().pluginMarketplaceSectionHeader,u=t().pluginMarketplaceSectionHeaderLeft,d=t().pluginMarketplaceSectionChevron,f={[t().pluginMarketplaceSectionChevronCollapsed]:e.isCollapsed()},p=t().pluginMarketplaceSectionTitle;return o!==i.e&&T(n,i.e=o),c!==i.t&&T(r,i.t=c),u!==i.a&&T(a,i.a=u),d!==i.o&&T(s,i.o=d),i.i=w(s,f,i.i),p!==i.n&&T(l,i.n=p),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),n})()};j([`click`]);var Kn=I(`<div><div><h3>Marketplace Settings</h3><button></button></div><div>`),qn=e=>{let t=$();return c(F,{get when(){return e.isOpen()},get children(){var n=Kn(),r=n.firstChild,a=r.firstChild,o=a.nextSibling,s=r.nextSibling;return N(o,`click`,e.onClose,!0),A(o,c(bt,{})),A(s,c(K,{label:`Show active plugins`,description:`Display installed plugins in a separate section`,get checked(){return e.showActivePlugins()},onChange:t=>e.setShowActivePlugins(t)})),i(e=>{var i=t().pluginMarketplaceSettingsPanel,c=t().pluginMarketplaceSettingsPanelHeader,l=t().pluginMarketplaceSettingsPanelTitle,u=t().pluginMarketplaceSettingsPanelClose,d=t().pluginMarketplaceSettingsPanelContent;return i!==e.e&&T(n,e.e=i),c!==e.t&&T(r,e.t=c),l!==e.a&&T(a,e.a=l),u!==e.o&&T(o,e.o=u),d!==e.i&&T(s,e.i=d),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),n}})};j([`click`]);var Jn=I(`<div>`),Yn=I(`<button>`),Xn=e=>{let t=$();return c(F,{get when(){return e.tags().length>0},get children(){var n=Jn();return A(n,c(o,{get each(){return e.tags()},children:n=>(()=>{var r=Yn();return r.$$click=()=>e.onToggleTag(n),A(r,n),i(i=>{var a=t().pluginMarketplaceTagButton,o={[t().pluginMarketplaceTagButtonActive]:e.selectedTags().has(n)};return a!==i.e&&T(r,i.e=a),i.t=w(r,o,i.t),i},{e:void 0,t:void 0}),r})()})),i(()=>T(n,t().pluginMarketplaceTagsContainer)),n}})};j([`click`]);var Zn=I(`<div><div><h2>Plugin Marketplace</h2><div style=display:flex;align-items:center><div><input type=text placeholder="Search plugins..."></div><button></button></div></div><p>Discover and install devtools for TanStack Query, Router, Form, and Pacer`),Qn=e=>{let t=$();return(()=>{var n=Zn(),r=n.firstChild,a=r.firstChild,o=a.nextSibling.firstChild,s=o.firstChild,l=o.nextSibling,u=r.nextSibling;return A(o,c(_t,{}),s),s.$$input=t=>e.onSearchInput(t.currentTarget.value),N(l,`click`,e.onSettingsClick,!0),A(l,c(yt,{})),A(n,c(Xn,{get tags(){return e.tags},get selectedTags(){return e.selectedTags},get onToggleTag(){return e.onToggleTag}}),null),i(e=>{var i=t().pluginMarketplaceHeader,c=t().pluginMarketplaceTitleRow,d=t().pluginMarketplaceTitle,f=t().pluginMarketplaceSearchWrapper,p=t().pluginMarketplaceSearch,m=t().pluginMarketplaceSettingsButton,h=t().pluginMarketplaceDescription;return i!==e.e&&T(n,e.e=i),c!==e.t&&T(r,e.t=c),d!==e.a&&T(a,e.a=d),f!==e.o&&T(o,e.o=f),p!==e.i&&T(s,e.i=p),m!==e.n&&T(l,e.n=m),h!==e.s&&T(u,e.s=h),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),i(()=>s.value=e.searchInput()),n})()};j([`input`,`click`]);var $n=[`react`,`solid`,`vue`,`svelte`,`angular`],er={"@tanstack/react-query-devtools":{packageName:`@tanstack/react-query-devtools`,title:`TanStack Query Devtools`,description:`Powerful devtools for TanStack Query - inspect queries, mutations, and cache`,requires:{packageName:`@tanstack/react-query`,minVersion:`5.0.0`},pluginId:`tanstack-query`,docsUrl:`https://tanstack.com/query/latest/docs/devtools`,author:`TanStack`,framework:`react`,featured:!0,tags:[`TanStack`,`data-fetching`,`caching`,`state-management`]},"@tanstack/solid-query-devtools":{packageName:`@tanstack/solid-query-devtools`,title:`TanStack Query Devtools`,description:`Powerful devtools for TanStack Query - inspect queries, mutations, and cache`,requires:{packageName:`@tanstack/solid-query`,minVersion:`5.0.0`},pluginId:`tanstack-query`,docsUrl:`https://tanstack.com/query/latest/docs/devtools`,author:`TanStack`,framework:`solid`,tags:[`TanStack`,`data-fetching`,`caching`,`state-management`]},"@tanstack/react-router-devtools":{packageName:`@tanstack/react-router-devtools`,title:`TanStack Router Devtools`,description:`Inspect routes, navigation, and router state in real-time`,requires:{packageName:`@tanstack/react-router`,minVersion:`1.0.0`},pluginId:`tanstack-router`,docsUrl:`https://tanstack.com/router/latest/docs/devtools`,author:`TanStack`,framework:`react`,featured:!0,tags:[`TanStack`,`routing`,`navigation`]},"@tanstack/solid-router-devtools":{packageName:`@tanstack/solid-router-devtools`,title:`TanStack Router Devtools`,description:`Inspect routes, navigation, and router state in real-time`,requires:{packageName:`@tanstack/solid-router`,minVersion:`1.0.0`},pluginId:`tanstack-router`,docsUrl:`https://tanstack.com/router/latest/docs/devtools`,author:`TanStack`,framework:`solid`,tags:[`TanStack`,`routing`,`navigation`]},"@tanstack/react-form-devtools":{packageName:`@tanstack/react-form-devtools`,title:`TanStack Form Devtools`,description:`Debug form state, validation, and field values`,requires:{packageName:`@tanstack/react-form`,minVersion:`1.23.0`},pluginImport:{importName:`FormDevtoolsPlugin`,type:`function`},pluginId:`tanstack-form`,docsUrl:`https://tanstack.com/form/latest/docs/devtools`,author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`,`forms`,`validation`]},"@tanstack/solid-form-devtools":{packageName:`@tanstack/solid-form-devtools`,title:`TanStack Form Devtools`,description:`Debug form state, validation, and field values`,requires:{packageName:`@tanstack/solid-form`,minVersion:`1.23.0`},pluginImport:{importName:`FormDevtoolsPlugin`,type:`function`},pluginId:`tanstack-form`,docsUrl:`https://tanstack.com/form/latest/docs/devtools`,author:`TanStack`,isNew:!0,framework:`solid`,tags:[`TanStack`,`forms`,`validation`]},"@tanstack/react-pacer-devtools":{packageName:`@tanstack/react-pacer-devtools`,title:`Pacer Devtools`,description:`Monitor and debug your Pacer animations and transitions`,requires:{packageName:`@tanstack/react-pacer`,minVersion:`0.16.4`},author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`]},"@tanstack/solid-pacer-devtools":{packageName:`@tanstack/solid-pacer-devtools`,title:`Pacer Devtools`,description:`Monitor and debug your Pacer animations and transitions`,requires:{packageName:`@tanstack/solid-pacer`,minVersion:`0.14.4`},author:`TanStack`,framework:`solid`,isNew:!0,tags:[`TanStack`]},"@tanstack/devtools-a11y":{packageName:`@tanstack/devtools-a11y`,title:`Accessibility Devtools`,description:`Audit accessibility issues in real-time with axe-core. Supports WCAG 2.1/2.2, live monitoring, and visual overlays.`,pluginImport:{importName:`createA11yPlugin`,type:`function`},pluginId:`devtools-a11y`,docsUrl:`https://tanstack.com/devtools/latest/docs/plugins/a11y`,author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`,`a11y`]},"@dimano/ts-devtools-plugin-prefetch-heatmap":{packageName:`@dimano/ts-devtools-plugin-prefetch-heatmap`,title:`Prefetch Heatmap`,description:`Visualize TanStack Router prefetch intent, hits, and waste with a color overlay and a live metrics panel.`,requires:{packageName:`@tanstack/react-router`,minVersion:`1.0.0`},pluginImport:{importName:`registerPrefetchHeatmapPlugin`,type:`function`},pluginId:`prefetch-heatmap`,logoUrl:`https://raw.githubusercontent.com/dimitrianoudi/tanstack-prefetch-heatmap/main/assets/prefetch-heatmap-card.png`,docsUrl:`https://github.com/dimitrianoudi/tanstack-prefetch-heatmap#prefetch-heatmap-devtools-plugin`,repoUrl:`https://github.com/dimitrianoudi/tanstack-prefetch-heatmap`,author:`Dimitris Anoudis (@dimitrianoudi)`,framework:`react`,isNew:!0,tags:[`Router`,`Prefetch`,`Analytics`,`Overlay`,`TanStack`]},"@santosvilanculos/bevor-react":{packageName:`@santosvilanculos/bevor-react`,title:`Inertia 3 Devtools`,description:`Inertia 3 devtools built on top of TanStack DevTools`,pluginImport:{importName:`inertiaDevtoolsPlugin`,type:`function`},pluginId:`inertia-devtools`,logoUrl:`https://raw.githubusercontent.com/santosvilanculos/bevor/main/logo.png`,docsUrl:`https://github.com/SantosVilanculos/bevor/tree/main/packages/react`,repoUrl:`https://github.com/SantosVilanculos/bevor`,author:`Santos Vilanculos (santosvilanculos@yahoo.com)`,framework:`react`,isNew:!0,tags:[`TanStack`,`React`,`Inertia`,`Laravel`]}};function tr(){return Object.values(er)}function nr(e){if(!e)return null;let t=e.replace(/^[v^~]/,``).split(`-`)[0]?.split(`+`)[0];if(!t)return null;let n=t.split(`.`);if(n.length<2)return null;let r=parseInt(n[0]??`0`,10),i=parseInt(n[1]??`0`,10),a=parseInt(n[2]??`0`,10);return isNaN(r)||isNaN(i)||isNaN(a)?null:{major:r,minor:i,patch:a,raw:e}}function rr(e,t){return e.major===t.major?e.minor===t.minor?e.patch-t.patch:e.minor-t.minor:e.major-t.major}function ir(e,t){let n=nr(e),r=nr(t);return!n||!r?!0:rr(n,r)>=0}function ar(e,t){let n=nr(e),r=nr(t);return!n||!r?!0:rr(n,r)<=0}function or(e,t,n){return!t&&!n?{satisfied:!0}:t&&!ir(e,t)?{satisfied:!1,reason:`Requires v${t} or higher (current: v${e})`}:n&&!ar(e,n)?{satisfied:!1,reason:`Requires v${n} or lower (current: v${e})`}:{satisfied:!0}}var sr=(e,t)=>{let n={...e.dependencies,...e.devDependencies},r={react:[`react`,`react-dom`],vue:[`vue`,`@vue/core`],solid:[`solid-js`],svelte:[`svelte`],angular:[`@angular/core`]};for(let e of t){let t=r[e];if(t&&t.some(e=>n[e]))return e}return`unknown`},cr=(e,t,n,r,i)=>{if(i)return Array.from(e).some(e=>{let t=e.toLowerCase(),n=i.toLowerCase();return t.startsWith(n)||t.includes(n)});if(e.has(t))return!0;let a=n.toLowerCase().split(/[-_/@]/).filter(e=>e.length>0),o=r.toLowerCase();return Array.from(e).some(e=>{let t=e.toLowerCase();if(t.includes(n.toLowerCase()))return!0;let r=a.filter(e=>t.includes(e));return!!(r.length>=2||t.includes(o)&&r.length>=1)})},lr=(e,t,n,r)=>{let i={...e.dependencies,...e.devDependencies},a=[];return tr().forEach(e=>{let o=e.packageName,s=e.framework===t||e.framework===`other`,c=e.requires?.packageName,l=c?!!i[c]:!1,u=!!i[o],d;if(l&&e.requires){let t=c?i[c]:void 0;if(t){let n=or(t,e.requires.minVersion,e.requires.maxVersion);d={current:t,required:e.requires.minVersion,satisfied:n.satisfied,reason:n.reason}}}let f=cr(n,o,e.packageName,e.framework,e.pluginId),p;p=s?e.requires&&!l?`requires-package`:d&&!d.satisfied?`bump-version`:u&&f?`already-installed`:u&&!f?`add-to-devtools`:!u&&e.requires&&l?`install-devtools`:`install`:`wrong-framework`;let m=r.find(e=>e.devtoolsPackage===o);a.push({requiredPackageName:c||``,devtoolsPackage:o,framework:e.framework,hasPackage:l,hasDevtools:u,isRegistered:f,actionType:p,status:m?.status||`idle`,error:m?.error,isCurrentFramework:s,metadata:e,versionInfo:d})}),a},ur=e=>{let t=[],n=e.filter(e=>e.metadata?.featured&&e.actionType!==`already-installed`&&e.isCurrentFramework);t.push({id:`featured`,displayName:`⭐ Featured`,cards:n});let r=e.filter(e=>e.actionType===`already-installed`&&e.isRegistered);r.length>0&&t.push({id:`active`,displayName:`✓ Active Plugins`,cards:r});let i=e.filter(e=>e.isCurrentFramework&&e.actionType!==`already-installed`&&!e.metadata?.featured);return i.length>0&&t.push({id:`available`,displayName:`Available Plugins`,cards:i}),t},dr=I(`<div><p>`),fr=I(`<div>`),pr=()=>{let e=$(),{plugins:t}=Vt(),[n,r]=f([]),[a,s]=f(null),[l,u]=f(``),[d,p]=f(``),[m,h]=f(new Set),[_,v]=f(!0),[y,b]=f(new Set),[x,S]=f(!1),C,w=e=>{u(e),C&&clearTimeout(C),C=setTimeout(()=>{p(e)},300)},D=e=>{h(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},ee=(e,t)=>{if(!t)return!0;let n=t.toLowerCase();return e.devtoolsPackage.toLowerCase().includes(n)||e.requiredPackageName.toLowerCase().includes(n)||e.framework.toLowerCase().includes(n)},O=()=>{let e=d(),r=_(),i=y(),o=a();if(!o)return[];let s=ur(lr(o,sr(o,$n),new Set(t()?.map(e=>e.id||``)||[]),n().flatMap(e=>e.cards)));return r||(s=s.filter(e=>e.id!==`active`)),i.size>0&&(s=s.map(e=>({...e,cards:e.cards.filter(e=>e.metadata?.tags?e.metadata.tags.some(e=>i.has(e)):!1)})).filter(e=>e.cards.length>0)),e?s.map(t=>({...t,cards:t.cards.filter(t=>ee(t,e))})).filter(e=>e.cards.length>0):s};re(()=>{let e=Z.on(`package-json-read`,e=>{s(e.payload.packageJson),k(e.payload.packageJson)}),t=Z.on(`package-json-updated`,e=>{s(e.payload.packageJson),k(e.payload.packageJson)}),n=Z.on(`devtools-installed`,e=>{r(t=>t.map(t=>({...t,cards:t.cards.map(t=>t.devtoolsPackage===e.payload.packageName?{...t,status:e.payload.success?`success`:`error`,error:e.payload.error}:t)})))}),i=Z.on(`plugin-added`,e=>{if(r(t=>t.map(t=>({...t,cards:t.cards.map(t=>t.devtoolsPackage===e.payload.packageName?{...t,status:e.payload.success?`success`:`error`,error:e.payload.error}:t)}))),e.payload.success){let e=a();e&&k(e)}});g(()=>{e(),t(),n(),i()}),Z.emit(`mounted`,void 0)});let k=e=>{e&&r(ur(lr(e,sr(e,$n),new Set(t()?.map(e=>e.id||``)||[]),n().flatMap(e=>e.cards))))},te=e=>{if(!(e.actionType===`requires-package`||e.actionType===`wrong-framework`||e.actionType===`already-installed`||e.actionType===`version-mismatch`)){if(r(t=>t.map(t=>({...t,cards:t.cards.map(t=>t.devtoolsPackage===e.devtoolsPackage?{...t,status:`installing`}:t)}))),e.actionType===`bump-version`){Z.emit(`bump-package-version`,{packageName:e.requiredPackageName,devtoolsPackage:e.devtoolsPackage,pluginName:e.metadata?.title||e.devtoolsPackage,minVersion:e.metadata?.requires?.minVersion,pluginImport:e.metadata?.pluginImport});return}if(e.actionType===`add-to-devtools`){Z.emit(`add-plugin-to-devtools`,{packageName:e.devtoolsPackage,pluginName:e.metadata?.title??e.devtoolsPackage,pluginImport:e.metadata?.pluginImport});return}Z.emit(`install-devtools`,{packageName:e.devtoolsPackage,pluginName:e.metadata?.title??e.devtoolsPackage,pluginImport:e.metadata?.pluginImport})}},j=()=>{let e=new Set;return n().forEach(t=>{(t.id===`featured`||t.id===`available`)&&t.cards.forEach(t=>{t.metadata?.tags&&t.metadata.tags.forEach(t=>e.add(t))})}),Array.from(e).sort()},M=e=>{b(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})};return(()=>{var t=fr();return A(t,c(qn,{isOpen:x,onClose:()=>S(!1),showActivePlugins:_,setShowActivePlugins:v}),null),A(t,c(Qn,{searchInput:l,onSearchInput:w,onSettingsClick:()=>S(!x()),tags:j,selectedTags:y,onToggleTag:M}),null),A(t,c(F,{get when(){return O().length>0},get children(){return c(o,{get each(){return O()},children:e=>c(Gn,{section:e,isCollapsed:()=>m().has(e.id),onToggleCollapse:()=>D(e.id),onCardAction:te})})}}),null),A(t,c(F,{get when(){return O().length===0},get children(){var t=dr(),n=t.firstChild;return A(n,(()=>{var e=E(()=>!!d());return()=>e()?`No plugins found matching "${d()}"`:`No additional plugins available. You have all compatible devtools installed and registered!`})()),i(r=>{var i=e().pluginMarketplaceEmpty,a=e().pluginMarketplaceEmptyText;return i!==r.e&&T(t,r.e=i),a!==r.t&&T(n,r.t=a),r},{e:void 0,t:void 0}),t}}),null),i(()=>T(t,e().pluginMarketplace)),t})()},mr=I(`<div><div><div><div></div><div><h3>Add More`),hr=I(`<div><h3>`),gr=I(`<div>`),_r=t=>{let{plugins:a,activePlugins:s,toggleActivePlugins:l}=Vt(),{expanded:u,hoverUtils:d,animationMs:p,setForceExpand:h}=Rt(),[g,v]=f(new Map),[y,x]=f(!1),S=$(),{theme:C}=Bt(),w=O(()=>a()?.length&&a().length>0);m(()=>{h(y())}),m(()=>{(a()?.filter(e=>s().includes(e.id)))?.forEach(e=>{let n=g().get(e.id);n&&e.render(n,{theme:C(),devtoolsOpen:t.isOpen})})});let E=()=>x(!y()),D=e=>{y()&&x(!1),l(e)};return c(F,{get when(){return w()},get fallback(){return c(pr,{})},get children(){var l=mr(),f=l.firstChild,h=f.firstChild,g=h.firstChild,x=g.nextSibling;return f.addEventListener(`mouseleave`,()=>{y()||d.leave()}),f.addEventListener(`mouseenter`,()=>d.enter()),A(g,c(o,{get each(){return a()},children:n=>{let a;m(()=>{a&&(typeof n.name==`string`?a.textContent=n.name:n.name(a,{theme:C(),devtoolsOpen:t.isOpen}))});let o=O(()=>s().includes(n.id));return(()=>{var t=hr(),s=t.firstChild;t.$$click=()=>D(n.id);var c=a;return typeof c==`function`?_(c,s):a=s,i(i=>{var a=r(S().pluginName,{active:o()}),c=`${e}-${n.id}`;return a!==i.e&&T(t,i.e=a),c!==i.t&&b(s,`id`,i.t=c),i},{e:void 0,t:void 0}),t})()}})),x.$$click=E,A(l,c(F,{get when(){return y()},get fallback(){return c(o,{get each(){return s()},children:e=>(()=>{var t=gr();return _(t=>{v(n=>{let r=new Map(n);return r.set(e,t),r})},t),b(t,`id`,`${n}-${e}`),i(()=>T(t,S().pluginsTabContent)),t})()})},get children(){return c(pr,{})}}),null),i(e=>{var t=S().pluginsTabPanel,n=r(S().pluginsTabDraw(u()),{[S().pluginsTabDraw(u())]:u()},S().pluginsTabDrawTransition(p)),i=r(S().pluginsTabSidebar(u()),S().pluginsTabSidebarTransition(p)),a=S().pluginsList,o=r(S().pluginNameAddMore,{active:y()});return t!==e.e&&T(l,e.e=t),n!==e.t&&T(f,e.t=n),i!==e.a&&T(h,e.a=i),a!==e.o&&T(g,e.o=a),o!==e.i&&T(x,e.i=o),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),l}})};j([`click`]);function vr(e,t={}){let{attributes:n=!0,childList:r=!0,subtree:i=!0,observeTitle:a=!0}=t;re(()=>{let t=new MutationObserver(t=>{for(let n of t)if(n.type===`childList`)n.addedNodes.forEach(t=>e({kind:`added`,node:t},n)),n.removedNodes.forEach(t=>e({kind:`removed`,node:t},n));else if(n.type===`attributes`){let t=n.target;e({kind:`attr`,target:t,name:n.attributeName,oldValue:n.oldValue??null},n)}else n.target.parentNode&&n.target.parentNode.tagName.toLowerCase()===`title`&&e({kind:`title`,title:document.title},n)});t.observe(document.head,{childList:r,attributes:n,subtree:i,attributeOldValue:n,characterData:!0,characterDataOldValue:!1});let o;if(a){let t=document.head.querySelector(`title`)||document.head.appendChild(document.createElement(`title`));o=new MutationObserver(()=>{e({kind:`title`,title:document.title})}),o.observe(t,{childList:!0,characterData:!0,subtree:!0})}g(()=>{t.disconnect(),o?.disconnect()})})}var yr=I(`<div><div> Preview</div><div></div><div></div><div>`),br=I(`<img alt=Preview>`),xr=I(`<div style=background:#222;color:#888;display:flex;align-items:center;justify-content:center;min-height:80px;width:100%>No Image`),Sr=I(`<div>`),Cr=I(`<div><strong>Missing tags for <!>:</strong><ul>`),wr=I(`<li>`),Tr=[{network:`Facebook`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#4267B2`},{network:`X/Twitter`,tags:[{key:`twitter:title`,prop:`title`},{key:`twitter:description`,prop:`description`},{key:`twitter:image`,prop:`image`},{key:`twitter:url`,prop:`url`}],color:`#1DA1F2`},{network:`LinkedIn`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#0077B5`},{network:`Discord`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#5865F2`},{network:`Slack`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#4A154B`},{network:`Mastodon`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#6364FF`},{network:`Bluesky`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#1185FE`}];function Er(e){let t=$();return(()=>{var n=yr(),r=n.firstChild,a=r.firstChild,o=r.nextSibling,s=o.nextSibling,c=s.nextSibling;return A(r,()=>e.network,a),A(n,(()=>{var n=E(()=>!!e.meta.image);return()=>n()?(()=>{var n=br();return i(r=>{var i=e.meta.image,a=t().seoPreviewImage;return i!==r.e&&b(n,`src`,r.e=i),a!==r.t&&T(n,r.t=a),r},{e:void 0,t:void 0}),n})():(()=>{var e=xr();return i(()=>T(e,t().seoPreviewImage)),e})()})(),o),A(o,()=>e.meta.title||`No Title`),A(s,()=>e.meta.description||`No Description`),A(c,()=>e.meta.url||window.location.href),i(i=>{var a=t().seoPreviewCard,l=e.color,u=t().seoPreviewHeader,d=e.color,f=t().seoPreviewTitle,p=t().seoPreviewDesc,m=t().seoPreviewUrl;return a!==i.e&&T(n,i.e=a),l!==i.t&&P(n,`border-color`,i.t=l),u!==i.a&&T(r,i.a=u),d!==i.o&&P(r,`color`,i.o=d),f!==i.i&&T(o,i.i=f),p!==i.n&&T(s,i.n=p),m!==i.s&&T(c,i.s=m),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),n})()}function Dr(){let[e,t]=f(r()),n=$();function r(){let e=Array.from(document.head.querySelectorAll(`meta`)),t=[];for(let n of Tr){let r={},i=[];for(let t of n.tags){let n=e.find(e=>(t.key.includes(`twitter:`)?!1:e.getAttribute(`property`)===t.key)||e.getAttribute(`name`)===t.key);n&&n.getAttribute(`content`)?r[t.prop]=n.getAttribute(`content`)||void 0:i.push(t.key)}t.push({network:n.network,found:r,missing:i})}return t}return vr(()=>{t(r())}),c(q,{get children(){return[c(Y,{children:`See how your current page will look when shared on popular social networks. The tool checks for essential meta tags and highlights any that are missing.`}),(()=>{var t=Sr();return A(t,c(o,{get each(){return e()},children:(e,t)=>{let r=Tr[t()];return(()=>{var t=Sr();return A(t,c(Er,{get meta(){return e.found},get color(){return r.color},get network(){return r.network}}),null),A(t,(()=>{var t=E(()=>e.missing.length>0);return()=>t()?(()=>{var t=Cr(),a=t.firstChild,s=a.firstChild.nextSibling;s.nextSibling;var l=a.nextSibling;return A(a,()=>r?.network,s),A(l,c(o,{get each(){return e.missing},children:e=>(()=>{var t=wr();return A(t,e),i(()=>T(t,n().seoMissingTag)),t})()})),i(e=>{var r=n().seoMissingTagsSection,i=n().seoMissingTagsList;return r!==e.e&&T(t,e.e=r),i!==e.t&&T(l,e.t=i),e},{e:void 0,t:void 0}),t})():null})(),null),t})()}})),i(()=>T(t,n().seoPreviewSection)),t})()]}})}var Or=I(`<div><div></div><div><div><div><span></span><span></span></div></div><div>`),kr=I(`<img alt="favicon icon">`),Ar=I(`<div>`),jr=I(`<div><strong>Issues for <!>:</strong><ul>`),Mr=I(`<li>`),Nr=60,Pr=158,Fr=120,Ir=`...`,Lr=[{message:`No favicon or icon set on the page.`,hasIssue:e=>!e.favicon},{message:`No title tag set on the page.`,hasIssue:e=>!e.title.trim()},{message:`No meta description set on the page.`,hasIssue:e=>!e.description.trim()},{message:`The title is wider than 600px and it may not be displayed in full length.`,hasIssue:(e,t)=>t.titleOverflow}],Rr=[{label:`Desktop preview`,isMobile:!1,extraChecks:[{message:`The meta description may get trimmed at ~960 pixels on desktop and at ~680px on mobile. Keep it below ~158 characters.`,hasIssue:(e,t)=>t.descriptionOverflow}]},{label:`Mobile preview`,isMobile:!0,extraChecks:[{message:`Description exceeds the 3-line limit for mobile view. Please shorten your text to fit within 3 lines.`,hasIssue:(e,t)=>t.descriptionOverflowMobile}]}];function zr(e,t){return e.length<=t?e:t<=Ir.length?Ir:e.slice(0,t-Ir.length)+Ir}function Br(){let e=document.title||``,t=typeof window<`u`?window.location.href:``,n=Array.from(document.head.querySelectorAll(`meta`)),r=n.find(e=>e.getAttribute(`name`)?.toLowerCase()===`description`)?.getAttribute(`content`)?.trim()||``,i=n.find(e=>e.getAttribute(`property`)===`og:site_name`)?.getAttribute(`content`)?.trim()||(typeof window<`u`?window.location.hostname.replace(/^www\./,``):``),a=Array.from(document.head.querySelectorAll(`link`)).find(e=>e.getAttribute(`rel`)?.toLowerCase().split(/\s+/).includes(`icon`))?.getAttribute(`href`)||null;if(a&&typeof window<`u`)try{a=new URL(a,t).href}catch{a=null}return{title:e,description:r,siteName:i,favicon:a,url:t}}function Vr(e,t,n){return n.filter(n=>n.hasIssue(e,t)).map(e=>e.message)}function Hr(e){let t=$();return(()=>{var n=Or(),r=n.firstChild,a=r.nextSibling,s=a.firstChild,l=s.firstChild,u=l.firstChild,d=u.nextSibling,f=s.nextSibling;return A(r,()=>e.label),A(s,(()=>{var n=E(()=>!!e.data.favicon);return()=>n()?(()=>{var n=kr();return i(r=>{var i=e.data.favicon,a=t().serpSnippetFavicon;return i!==r.e&&b(n,`src`,r.e=i),a!==r.t&&T(n,r.t=a),r},{e:void 0,t:void 0}),n})():(()=>{var e=Ar();return i(()=>T(e,t().serpSnippetDefaultFavicon)),e})()})(),l),A(u,()=>e.data.siteName||e.data.url),A(d,()=>e.data.url),A(f,()=>e.displayTitle||e.data.title||`No title`),A(a,(()=>{var n=E(()=>!e.isMobile);return()=>n()&&(()=>{var n=Ar();return A(n,()=>e.displayDescription||e.data.description||`No meta description.`),i(()=>T(n,t().serpSnippetDesc)),n})()})(),null),A(a,(()=>{var n=E(()=>!!e.isMobile);return()=>n()&&(()=>{var n=Ar();return A(n,()=>e.displayDescription||e.data.description||`No meta description.`),i(()=>T(n,t().serpSnippetDescMobile)),n})()})(),null),A(n,(()=>{var n=E(()=>e.issues.length>0);return()=>n()?(()=>{var n=jr(),r=n.firstChild,a=r.firstChild.nextSibling;a.nextSibling;var s=r.nextSibling;return A(r,()=>e.label,a),A(s,c(o,{get each(){return e.issues},children:e=>(()=>{var n=Mr();return A(n,e),i(()=>T(n,t().serpReportItem)),n})()})),i(e=>{var r=t().seoMissingTagsSection,i=t().serpErrorList;return r!==e.e&&T(n,e.e=r),i!==e.t&&T(s,e.t=i),e},{e:void 0,t:void 0}),n})():null})(),null),i(i=>{var o=t().serpPreviewBlock,c=t().serpPreviewLabel,p=e.isMobile?t().serpSnippetMobile:t().serpSnippet,m=t().serpSnippetTopRow,h=t().serpSnippetSiteColumn,g=t().serpSnippetSiteName,_=t().serpSnippetSiteUrl,v=t().serpSnippetTitle;return o!==i.e&&T(n,i.e=o),c!==i.t&&T(r,i.t=c),p!==i.a&&T(a,i.a=p),m!==i.o&&T(s,i.o=m),h!==i.i&&T(l,i.i=h),g!==i.n&&T(u,i.n=g),_!==i.s&&T(d,i.s=_),v!==i.h&&T(f,i.h=v),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),n})()}function Ur(){let[e,t]=f(Br());vr(()=>{t(Br())});let n=O(()=>{let t=e(),n=t.title||`No title`,r=t.description||`No meta description.`;return{displayTitle:zr(n,Nr),displayDescription:zr(r,Pr),overflow:{titleOverflow:n.length>Nr,descriptionOverflow:r.length>Pr,descriptionOverflowMobile:r.length>Fr}}});return c(q,{get children(){return[c(Y,{children:`See how your title tag and meta description may look in Google search results. Data is read from the current page.`}),c(o,{each:Rr,children:t=>{let r=O(()=>Vr(e(),n().overflow,[...Lr,...t.extraChecks]));return c(Hr,{get data(){return e()},get displayTitle(){return n().displayTitle},get displayDescription(){return n().displayDescription},get isMobile(){return t.isMobile},get label(){return t.label},get issues(){return r()}})}})]}})}var Wr=I(`<nav aria-label="SEO sections"><button type=button>Social previews</button><button type=button>SERP Preview`),Gr=()=>{let[e,t]=f(`social-previews`),n=$();return c(Tt,{withPadding:!0,get children(){return[(()=>{var r=Wr(),a=r.firstChild,o=a.nextSibling;return a.$$click=()=>t(`social-previews`),o.$$click=()=>t(`serp-preview`),i(t=>{var i=n().seoSubNav,s=`${n().seoSubNavLabel} ${e()===`social-previews`?n().seoSubNavLabelActive:``}`,c=`${n().seoSubNavLabel} ${e()===`serp-preview`?n().seoSubNavLabelActive:``}`;return i!==t.e&&T(r,t.e=i),s!==t.t&&T(a,t.t=s),c!==t.a&&T(o,t.a=c),t},{e:void 0,t:void 0,a:void 0}),r})(),c(F,{get when(){return e()===`social-previews`},get children(){return c(Dr,{})}}),c(F,{get when(){return e()===`serp-preview`},get children(){return c(Ur,{})}})]}})};j([`click`]);var Kr=[{name:`Plugins`,id:`plugins`,component:e=>c(_r,e),icon:()=>c(at,{})},{name:`SEO`,id:`seo`,component:()=>c(Gr,{}),icon:()=>c(ot,{})},{name:`Settings`,id:`settings`,component:()=>c(xn,{}),icon:()=>c(st,{})}],qr=I(`<div>`),Jr=I(`<button type=button>`),Yr=I(`<div style=margin-top:auto;width:100%><button type=button></button><button type=button>`),Xr=e=>{let t=$(),{state:n,setState:a}=Ht(),s=M(),l=()=>{s().requestPipWindow(`width=${window.innerWidth},height=${n().height},top=${window.screen.height},left=${window.screenLeft}}`)},{hoverUtils:u}=Rt();return(()=>{var d=qr();return A(d,c(o,{each:Kr,children:e=>(()=>{var o=Jr();return o.addEventListener(`mouseleave`,()=>{e.id===`plugins`&&u.leave()}),o.addEventListener(`mouseenter`,()=>{e.id===`plugins`&&u.enter()}),o.$$click=()=>a({activeTab:e.id}),A(o,()=>e.icon()),i(()=>T(o,r(t().tab,{active:n().activeTab===e.id}))),o})()}),null),A(d,(()=>{var n=E(()=>s().pipWindow!==null);return()=>n()?null:(()=>{var n=Yr(),a=n.firstChild,o=a.nextSibling;return a.$$click=l,A(a,c(xt,{})),o.$$click=()=>e.toggleOpen(),A(o,c(ft,{})),i(e=>{var n=r(t().tab,`detach`),i=r(t().tab,`close`);return n!==e.e&&T(a,e.e=n),i!==e.t&&T(o,e.t=i),e},{e:void 0,t:void 0}),n})()})(),null),i(()=>T(d,t().tabContainer)),d})()};j([`click`]);var Zr=I(`<div>`),Qr=e=>{let{state:t}=Ht(),n=$(),r=O(()=>Kr.find(e=>e.id===t().activeTab)?.component||null);return(()=>{var t=Zr();return A(t,()=>r()?.({isOpen:e.isOpen})),i(()=>T(t,n().tabContent)),t})()},$r=I(`<div style=pointer-events:none>`),ei=()=>{let{settings:e}=Q(),t=()=>({element:null,bounding:{width:0,height:0,left:0,top:0},dataSource:``}),[n,r]=C(t()),a=()=>{r(t())},[o,s]=f(null),c=Pt(()=>o()),[l,u]=C({x:0,y:0});de(document,`mousemove`,e=>{u({x:e.clientX,y:e.clientY})});let d=he(),[p,h]=f(!1),g=O(()=>Yt(d(),e().inspectHotkey));m(()=>{g()||h(!1)});let v=O(()=>g()&&!p());m(()=>{v()?document.body.style.cursor=`pointer`:document.body.style.cursor=``}),m(()=>{if(!v()){a();return}let e=document.elementFromPoint(l.x,l.y);if(!(e instanceof HTMLElement)){a();return}if(e===n.element)return;let t=e.getAttribute(`data-tsd-source`);if(!t){a();return}let i=e.getBoundingClientRect();r({element:e,bounding:{width:i.width,height:i.height,left:i.left,top:i.top},dataSource:t})}),de(document,`click`,t=>{if(!n.element)return;if(window.getSelection()?.removeAllRanges(),t.preventDefault(),t.stopPropagation(),h(!0),e().sourceAction===`copy-path`){navigator.clipboard.writeText(n.dataSource).catch(()=>{});return}let r=new URL(`/`,location.origin),i=new URL(`__tsd/open-source?source=${encodeURIComponent(n.dataSource)}`,r);fetch(i).catch(()=>{})});let y=O(()=>n.element?{display:`block`,width:`${n.bounding.width}px`,height:`${n.bounding.height}px`,left:`${n.bounding.left}px`,top:`${n.bounding.top}px`,"background-color":`oklch(55.4% 0.046 257.417 /0.25)`,transition:`all 0.05s linear`,position:`fixed`,"z-index":9999}:{display:`none`}),b=O(()=>{if(n.element&&o()){let e=window.innerWidth,t=c.height||26,r=c.width||0,i=n.bounding.left,a=n.bounding.top-t-4;return a<0&&(a=n.bounding.top+n.bounding.height+4),i+r>e&&(i=e-r-4),i<0&&(i=4),{position:`fixed`,left:`${i}px`,top:`${a}px`,"background-color":`oklch(55.4% 0.046 257.417 /0.80)`,color:`white`,padding:`2px 4px`,fontSize:`12px`,"border-radius":`2px`,"z-index":1e4,visibility:`visible`,transition:`all 0.05s linear`}}return{display:`none`}});return[(()=>{var e=$r();return _(s,e),A(e,()=>n.dataSource),i(t=>S(e,{...b()},t)),e})(),(()=>{var e=$r();return i(t=>S(e,{...y()},t)),e})()]},ti=I(`<div>`);function ni(){let{settings:e}=Q(),{setHeight:t}=Wt(),{persistOpen:n,setPersistOpen:r}=Ut(),[i,a]=f(),[o,s]=f(e().defaultOpen||n()),l=M(),u,[d,p]=f(!1),h=()=>{if(l().pipWindow)return;let e=!o();s(e),r(e),Z.emit(`trigger-toggled`,{isOpen:e})};m(()=>{g(Z.on(`trigger-toggled`,e=>{if(l().pipWindow)return;let t=e.payload.isOpen;t!==o()&&(s(t),r(t))}))});let v=(n,r)=>{if(r.button!==0||!n)return;p(!0);let i={originalHeight:n.getBoundingClientRect().height,pageY:r.pageY},a=n=>{let r=i.pageY-n.pageY,a=e().panelLocation===`bottom`?i.originalHeight+r:i.originalHeight-r;t(a),s(!(a<70))},o=()=>{p(!1),document.removeEventListener(`mousemove`,a),document.removeEventListener(`mouseUp`,o)};document.addEventListener(`mousemove`,a),document.addEventListener(`mouseup`,o)};m(()=>{if(o()){let e=i()?.parentElement?.style.paddingBottom,t=()=>{u&&i()?.parentElement&&a(e=>(e?.parentElement,e))};if(t(),typeof window<`u`)return(l().pipWindow??window).addEventListener(`resize`,t),()=>{(l().pipWindow??window).removeEventListener(`resize`,t),i()?.parentElement&&typeof e==`string`&&a(e=>e)}}else i()?.parentElement&&a(e=>(e?.parentElement&&e.parentElement.removeAttribute(`style`),e))}),m(()=>{window.addEventListener(`keydown`,e=>{e.key===`Escape`&&o()&&h()})}),Kt(o),m(()=>{if(i()){let e=i(),t=getComputedStyle(e).fontSize;e?.style.setProperty(`--tsrd-font-size`,t)}}),m(()=>{let t=e=>{if(!e||!(e instanceof HTMLElement))return!1;if(e.isContentEditable)return!0;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`?!0:e.getAttribute(`role`)===`textbox`},n=Jt(e().openHotkey);for(let e of n)_e(e,()=>{t(document.activeElement)||h()})});let{theme:y}=Bt();return m(()=>{typeof document>`u`||(document.documentElement.dataset.tanstackDevtoolsTheme=y())}),c(ye,{get theme(){return y()},get children(){return c(k,{get mount(){return(l().pipWindow??window).document.body},get children(){var t=ti();return _(a,t),b(t,`data-testid`,D),A(t,c(F,{get when(){return E(()=>l().pipWindow!==null)()?!0:E(()=>!!e().requireUrlFlag)()?window.location.search.includes(e().urlFlag):!0},get children(){return[c(dn,{isOpen:o,setIsOpen:h}),c(pn,{isResizing:d,isOpen:o,get children(){return c(hn,{ref:e=>u=e,handleDragStart:e=>v(u,e),get children(){return[c(Xr,{toggleOpen:h}),c(Qr,{get isOpen(){return o()}})]}})}})]}}),null),A(t,c(ei,{}),null),t}})}})}export{ni as default};