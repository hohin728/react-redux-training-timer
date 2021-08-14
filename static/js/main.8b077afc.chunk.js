(this["webpackJsonpreact-redux-training-timer"]=this["webpackJsonpreact-redux-training-timer"]||[]).push([[0],{104:function(e,t,n){},105:function(e,t,n){},116:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),c=n(11),r=n.n(c),o=(n(104),n(105),n(46)),s=n(28),l=n(8),u=n(74),d=n(37),m=n(53),j=n(29),b=function(e){var t=e.minute,n=e.second;return Object(j.isInteger)(t)&&Object(j.isInteger)(n)?1e3*(60*t+n):0},f=function(e){var t=e&&e.timerId?e.timerId:Object(j.uniqueId)(),n={id:t,label:e&&e.label?e.label:"timer label "+t,minute:e&&e.minute?e.minute:0,second:e&&e.second?e.second:3,remainTime:0,music:e&&e.music?e.music:"Muay_Thai_Sarama_ROUND_1.mp3"};return n.remainTime=b({minute:n.minute,second:n.second}),n},O={RUNNING:"RUNNING",PAUSED:"PAUSED",STOPPED:"STOPPED"},h=Object(d.b)(),p=h.getInitialState({showCountdown:!1,delay:1e3,activeTimerId:null,activeTimerMusic:"",status:O.STOPPED,loop:{current:1,total:1},mute:{alarm:!1,music:!1}}),v=Object(d.c)({name:"timers",initialState:p,reducers:{timersInitialized:h.addMany,timerAdded:h.addOne,timerDeleted:h.removeOne,timerSetLabel:function(e,t){var n=t.payload,i=n.timerId,a=n.label;e.entities[i].label=a},timerSetTime:{reducer:function(e,t){var n=t.payload,i=n.timerId,a=n.value,c=n.timeUnit,r=e.entities[i];"minute"!==c&&"second"!==c||(r[c]=a,r.remainTime=1e3*(60*r.minute+r.second))},prepare:function(e,t,n){return{payload:{timerId:e,value:t,timeUnit:n}}}},timerSetMusic:function(e,t){var n=t.payload,i=n.timerId,a=n.music;e.entities[i].music=a},timerDeductTime:{reducer:function(e,t){var n=t.payload,i=n.timerId,a=n.delay;e.entities[i].remainTime-=a},prepare:function(e){var t=e.timerId,n=e.delay;return n||(n=1e3),{payload:{timerId:t,delay:n}}}},timerStatusUpdated:function(e,t){var n=t.payload.status;e.status=n},timerSetNextTimer:function(e){var t,n=Object.values(e.entities),i=Object(u.a)(n.entries());try{for(i.s();!(t=i.n()).done;){var a=Object(o.a)(t.value,2),c=a[0],r=a[1];if(r.remainTime>0){e.activeTimerId=r.id,e.activeTimerMusic=r.music;break}c===n.length-1&&(e.status=O.STOPPED)}}catch(s){i.e(s)}finally{i.f()}},timerDelayUpdated:function(e,t){var n=t.payload.delay;e.delay=n},timerResetTimers:function(e){e.activeTimerId=null,e.activeTimerMusic="",e.status=O.STOPPED,Object.values(e.entities).forEach((function(e){e.remainTime=b({minute:e.minute,second:e.second})})),e.loop.current=1},timerResetRemainTime:function(e){Object.values(e.entities).forEach((function(e){e.remainTime=b({minute:e.minute,second:e.second})}))},timerSetShowCountdown:function(e,t){var n=t.payload.showCountdown;e.showCountdown=n},timerSetLoop:function(e,t){var n=t.payload,i=n.current,a=n.total;i&&Object(j.isInteger)(i)&&(e.loop.current=i),a&&Object(j.isInteger)(a)&&(e.loop.total=a)},timerToggledMute:function(e,t){var n=t.payload.muteType;"alarm"===n&&(e.mute.alarm=!e.mute.alarm),"music"===n&&(e.mute.music=!e.mute.music)}}}),x=v.reducer,g=v.actions,y=g.timersInitialized,I=g.timerAdded,w=g.timerDeleted,S=g.timerSetLabel,N=g.timerSetTime,T=g.timerSetMusic,C=g.timerDeductTime,k=g.timerStatusUpdated,M=g.timerSetNextTimer,P=g.timerDelayUpdated,R=g.timerResetTimers,D=g.timerResetRemainTime,U=g.timerSetShowCountdown,E=g.timerSetLoop,W=g.timerToggledMute,z=h.getSelectors((function(e){return e.timers})),B=z.selectAll,L=z.selectById,A=z.selectTotal,_=function(e){return e.timers.showCountdown},G=function(e){return e.timers.delay},F=function(e){return e.timers.activeTimerId},H=function(e){return e.timers.status},q=Object(m.a)(B,A,(function(e,t){return Object.values(e)[t-1].id})),J=function(e){return e.timers.loop.current},Y=function(e){return e.timers.loop.total},$=function(e){return e.timers.mute.music},K=function(e){return e.timers.activeTimerMusic},Q=n(142),V=n(144),X=n(146),Z=n(158),ee=n(162),te=n(149),ne=n(164),ie=n(159),ae=n(165),ce=n(79),re=n.n(ce),oe=n(3),se=Object(Q.a)((function(e){var t;return{musicInput:{minWidth:200},timerContainer:(t={borderRadius:30,padding:"10px 20px"},Object(s.a)(t,e.breakpoints.up("sm"),{padding:"20px 40px"}),Object(s.a)(t,"marginTop",e.spacing(2)),Object(s.a)(t,"marginBottom",e.spacing(2)),t),timerToolbar:Object(s.a)({justifyContent:"center"},e.breakpoints.up("sm"),{justifyContent:"flex-start"}),timerInput:{minWidth:60},deleteButton:{opacity:.2,position:"absolute",top:15,right:20,transition:"opacity 0.5s ease",zIndex:2,"&:hover":{opacity:1}}}})),le=function(e){var t,n,i=e.id,a=Object(l.b)(),c=se(),r=Object(l.c)((function(e){return L(e,i)})),o=function(e){var t=e.event.target.value,n=e.timeUnit;a(N(r.id,parseInt(t),n))};return Object(oe.jsxs)(V.a,{variant:"outlined",className:c.timerContainer,style:{position:"relative"},children:[Object(oe.jsx)(X.a,{onClick:function(){return a(w(r.id))},className:c.deleteButton,size:"small",children:Object(oe.jsx)(re.a,{fontSize:"small"})}),Object(oe.jsx)(Z.a,{m:1,display:"flex",justifyContent:"center",children:Object(oe.jsx)(ee.a,{value:null!==(t=r.label)&&void 0!==t?t:"",onChange:function(e){return function(e){return a(S({timerId:r.id,label:e.target.value}))}(e)},inputProps:{style:{textAlign:"center"}}})}),Object(oe.jsxs)(Z.a,{display:"flex",alignItems:"center",justifyContent:"center",children:[Object(oe.jsx)(Z.a,{m:1,children:Object(oe.jsx)(ee.a,{id:"timer-".concat(i,"-min"),label:"Minute",type:"number",InputLabelProps:{shrink:!0},inputProps:{min:0,max:59,className:c.timerInput},variant:"outlined",onChange:function(e){return o({event:e,timeUnit:"minute"})},value:r.minute})}),Object(oe.jsx)(Z.a,{m:1,children:":"}),Object(oe.jsx)(Z.a,{m:1,children:Object(oe.jsx)(ee.a,{id:"timer-".concat(i,"-sec"),label:"Second",type:"number",InputLabelProps:{shrink:!0},variant:"outlined",inputProps:{min:0,max:59,className:c.timerInput},onChange:function(e){return o({event:e,timeUnit:"second"})},value:r.second})})]}),Object(oe.jsx)(Z.a,{display:"flex",className:c.timerToolbar,children:Object(oe.jsxs)(te.a,{children:[Object(oe.jsx)(ne.a,{id:"timer-music-".concat(r.id,"-label"),children:"Timer Music"}),Object(oe.jsxs)(ie.a,{labelId:"timer-music-".concat(r.id,"-label"),id:"timer-music-".concat(r.id),value:null!==(n=r.music)&&void 0!==n?n:"",onChange:function(e){return a(T({timerId:r.id,music:e.target.value}))},className:c.musicInput,children:[Object(oe.jsx)(ae.a,{value:"",children:"No Music"}),Object(oe.jsx)(ae.a,{value:"Muay_Thai_Sarama_ROUND_1.mp3",children:"Muay Thai Music"})]})]})})]})},ue=function(){var e=Object(l.c)((function(e){return B(e)}));return Object(oe.jsx)("main",{children:e.map((function(e){return Object(oe.jsx)(le,{id:e.id},e.id)}))})};var de=n(87),me=Object(Q.a)({digits:{margin:10},millisecond:{position:"absolute",bottom:5,right:-40},mainDisplay:{position:"relative",width:"fit-content",margin:"0 auto"}}),je=function(e){var t,n=e.alarmPlayer,a=Object(l.b)(),c=me(),r=Object(l.c)(F),o=Object(l.c)((function(e){return L(e,r)})),s=Object(l.c)((function(e){return G(e)})),u=Object(l.c)(H),d=Object(l.c)(q),m=Object(l.c)(J),b=Object(l.c)(Y),f=(t=o.remainTime,!Object(j.isInteger)(t)||t<=0?{millisec:0,second:0,minute:0}:{millisec:t%1e3/10,second:Math.floor(t/1e3)%60,minute:Math.floor(t/1e3/60)%60}),h=function(e){return e<10?"0"+e:e};return function(e,t){var n=Object(i.useRef)();Object(i.useEffect)((function(){n.current=e}),[e]),Object(i.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){o.remainTime>0?a(C({timerId:o.id,delay:s})):(n.current.play(),r===d?m<b?(a(E({current:m+1})),a(D()),a(M())):a(k({status:O.STOPPED})):a(M()))}),u===O.RUNNING&&r&&o.id===r?s:null),Object(oe.jsxs)(Z.a,{textAlign:"center",height:"100%",display:"flex",flexDirection:"column",children:[Object(oe.jsxs)(de.a,{variant:"h4",component:"div",style:{marginTop:10},children:["Round: ",m," / ",b]}),Object(oe.jsxs)(Z.a,{display:"flex",justifyContent:"center",flexDirection:"column",height:"100%",children:[Object(oe.jsx)(de.a,{variant:"h4",component:"div",style:{marginBottom:10},children:o.label}),Object(oe.jsxs)(Z.a,{display:"flex",justifyContent:"center",alignItems:"center",className:c.mainDisplay,children:[Object(oe.jsx)(de.a,{variant:"h2",component:"div",className:"".concat(c.digits),children:h(f.minute)}),Object(oe.jsx)(de.a,{variant:"h3",children:":"}),Object(oe.jsx)(de.a,{variant:"h2",component:"div",className:"".concat(c.digits),children:h(f.second)}),s<1e3&&Object(oe.jsx)(de.a,{variant:"h5",className:"".concat(c.millisecond," ").concat(c.digits),children:h(f.millisec)})]})]})]})},be=n.p+"static/media/timesup.e69d4f91.mp3",fe=n(62),Oe=n.n(fe),he=n(150),pe=Object(Q.a)({mainSection:{overflowY:"scroll"}}),ve=function(e){var t=e.heightOfMainSection,n=pe(),a=Object(l.c)(H),c=Object(l.c)(_),r=Object(i.useRef)(null);return a===O.RUNNING||c?Object(oe.jsxs)(he.a,{maxWidth:"sm",style:{height:t},children:[Object(oe.jsx)(je,{alarmPlayer:r}),Object(oe.jsx)(Oe.a,{src:be,playing:!1,html5:!0,ref:r})]}):Object(oe.jsx)(Z.a,{style:{height:t},className:n.mainSection,children:Object(oe.jsx)(he.a,{maxWidth:"sm",children:Object(oe.jsx)(ue,{})})})},xe=n(151),ge=n(81),ye=n.n(ge),Ie=n(82),we=n.n(Ie),Se=n(80),Ne=n.n(Se),Te=n(63),Ce=n.n(Te),ke=Object(Q.a)((function(e){return{formControl:{width:125},controlPanelContainer:Object(s.a)({position:"relative",padding:e.spacing(1)},e.breakpoints.up("sm"),{padding:e.spacing(3)}),addButton:Object(s.a)({position:"absolute",top:0,right:0,zIndex:2},e.breakpoints.up("sm"),{right:50}),toolbar:{marginTop:16}}})),Me=function(e){var t=e.setHeightOfControlPanel,n=e.handleModalStatus,a=ke(),c=Object(l.b)(),r=Object(l.c)(H),o=Object(l.c)(F),s=Object(l.c)(Y),u=Object(l.c)($),d=Object(l.c)(_);return Object(i.useEffect)((function(){var e=document.getElementById("control-panel").clientHeight;t(e)})),Object(oe.jsx)(V.a,{elevation:10,id:"control-panel",children:Object(oe.jsxs)(he.a,{maxWidth:"md",className:a.controlPanelContainer,children:[Object(oe.jsx)(X.a,{size:"medium",onClick:function(){return c(I(f()))},disabled:d,className:a.addButton,color:"primary",children:Object(oe.jsx)(Ne.a,{})}),Object(oe.jsxs)(Z.a,{display:"flex",justifyContent:"center",children:[Object(oe.jsx)(Z.a,{m:1,children:Object(oe.jsx)(xe.a,{onClick:function(){o||c(M()),c(k({status:r===O.RUNNING?O.PAUSED:O.RUNNING})),c(U({showCountdown:!0}))},variant:"contained",color:"primary",size:"large",disabled:d&&r===O.STOPPED,children:r===O.RUNNING?"Pause":"Start"})}),Object(oe.jsx)(Z.a,{m:1,children:Object(oe.jsx)(xe.a,{onClick:function(){c(U({showCountdown:!1})),c(R())},variant:"contained",color:"secondary",size:"large",children:"Reset"})})]}),Object(oe.jsxs)(Z.a,{display:"flex",justifyContent:"space-around",className:a.toolbar,children:[Object(oe.jsxs)(Z.a,{display:"flex",justifyContent:"space-between",children:[Object(oe.jsx)(X.a,{onClick:function(e){return n(e,!0)},children:Object(oe.jsx)(Ce.a,{})}),Object(oe.jsx)(X.a,{onClick:function(){return c(W({muteType:"music"}))},children:u?Object(oe.jsx)(ye.a,{}):Object(oe.jsx)(we.a,{})})]}),Object(oe.jsx)(te.a,{className:a.formControl,children:Object(oe.jsx)(ee.a,{id:"loop",label:"No. of rounds",type:"number",value:s,onChange:function(e){return function(e){c(E({total:parseInt(e.target.value)}))}(e)},disabled:d,size:"small"})})]})]})})},Pe={darkMode:function(){var e=localStorage.getItem("darkMode");return null!==e?"true"===e:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}()},Re=Object(d.c)({name:"settings",initialState:Pe,reducers:{toggleDarkMode:function(e){e.darkMode=!e.darkMode}}}),De=Re.reducer,Ue=Re.actions.toggleDarkMode,Ee=function(e){return e.settings.darkMode},We=n(161),ze=n(152),Be=n(153),Le=n(154),Ae=n(155),_e=n(166),Ge=Object(Q.a)({formControl:{width:125}}),Fe=function(e){var t=e.open,n=e.handleOpen,i=Object(l.b)(),a=Ge(),c=Object(l.c)(G),r=Object(l.c)(Ee);return Object(oe.jsxs)(We.a,{onClose:function(e){return n(e,!1)},"aria-labelledby":"settings-dialog-title",open:t,maxWidth:"sm",fullWidth:!0,children:[Object(oe.jsx)(ze.a,{id:"settings-dialog-title",children:Object(oe.jsxs)(Z.a,{display:"flex",alignItems:"center",children:[Object(oe.jsx)(Ce.a,{}),Object(oe.jsx)(de.a,{component:"span",style:{marginLeft:10},children:"Settings"})]})}),Object(oe.jsx)(Be.a,{style:{paddingBottom:16},children:Object(oe.jsxs)(Le.a,{container:!0,children:[Object(oe.jsx)(Le.a,{item:!0,xs:6,children:Object(oe.jsxs)(te.a,{className:a.formControl,children:[Object(oe.jsx)(ne.a,{children:"Refresh rate"}),Object(oe.jsxs)(ie.a,{id:"updateFreq",value:c,onChange:function(e){return function(e){return i(P({delay:e.target.value}))}(e)},children:[Object(oe.jsx)(ae.a,{value:10,children:"10"}),Object(oe.jsx)(ae.a,{value:100,children:"100"}),Object(oe.jsx)(ae.a,{value:1e3,children:"1000"})]})]})}),Object(oe.jsx)(Le.a,{item:!0,xs:6,children:Object(oe.jsx)(Ae.a,{control:Object(oe.jsx)(_e.a,{checked:null!==r&&void 0!==r&&r,onChange:function(){i(Ue()),localStorage.setItem("darkMode",!r)}}),label:"Dark Theme"})})]})})]})},He=n.p+"static/media/Muay_Thai_Sarama_ROUND_1.d86445b7.mp3",qe=function(){var e=Object(l.b)(),t=Object(l.c)(H),n=Object(l.c)($),a=Object(l.c)(F),c=Object(l.c)(K),r=Object(i.useRef)(null);return Object(i.useEffect)((function(){r.current.seek(0),a&&e(k({status:O.RUNNING}))}),[a,e]),Object(oe.jsx)(Oe.a,{src:He,playing:t===O.RUNNING&&""!==c,mute:n,ref:r,loop:!0,html5:!0})},Je=Object(Q.a)({app:{overflow:"hidden",height:"100%",borderRadius:0},appBar:{position:"fixed",left:0,bottom:0,borderRadius:"5px 5px 0 0",zIndex:1100,boxSizing:"border-box",width:"100%"}}),Ye=function(){var e=Je(),t=Object(i.useState)(0),n=Object(o.a)(t,2),a=n[0],c=n[1],r=Object(i.useState)(0),s=Object(o.a)(r,2),l=s[0],u=s[1],d=Object(i.useState)(!1),m=Object(o.a)(d,2),j=m[0],b=m[1],f=function(){var e=window.innerHeight-a;u(e)},O=function(e,t){"boolean"===typeof t&&b(t)};return Object(i.useEffect)((function(){f()}),[a]),Object(i.useEffect)((function(){return f(),window.addEventListener("resize",f),function(){window.removeEventListener("resize",f)}})),Object(oe.jsxs)(V.a,{elevation:0,className:"App ".concat(e.app),children:[Object(oe.jsx)(Z.a,{className:e.mainSection,children:Object(oe.jsx)(ve,{heightOfMainSection:l})}),Object(oe.jsx)(Z.a,{className:e.appBar,children:Object(oe.jsx)(Me,{setHeightOfControlPanel:c,handleModalStatus:O})}),Object(oe.jsx)(qe,{}),Object(oe.jsx)(Fe,{open:j,handleOpen:O})]})},$e=n(157),Ke=n(156),Qe=n(83),Ve=n.n(Qe),Xe=function(){var e=Object(l.c)(Ee),t=a.a.useMemo((function(){return Object(Ke.a)({palette:{primary:{main:Ve.a[500]},type:e?"dark":"light"}})}),[e]);return Object(oe.jsx)($e.a,{theme:t,children:Object(oe.jsx)(Ye,{})})},Ze=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function et(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var tt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,169)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),a(e),c(e),r(e)}))},nt=Object(d.a)({reducer:{timers:x,settings:De}});nt.dispatch(y(function(){for(var e=[],t=0;t<3;t++){var n=f();e.push(n)}return e}())),r.a.render(Object(oe.jsx)(a.a.StrictMode,{children:Object(oe.jsx)(l.a,{store:nt,children:Object(oe.jsx)(Xe,{})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/react-redux-training-timer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/react-redux-training-timer","/service-worker.js");Ze?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):et(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):et(t,e)}))}}(),tt()}},[[116,1,2]]]);
//# sourceMappingURL=main.8b077afc.chunk.js.map