(this.webpackJsonptestreact=this.webpackJsonptestreact||[]).push([[0],{23:function(e){e.exports=JSON.parse('{"SongList1":[{"title":"Perfect","artist":"Ed Sheeran","link":"https://www.youtube.com/watch?v=emcFmUm5jtQ"},{"title":"There is moonshine","artist":"Bill Night","link":"https://www.youtube.com/watch?v=CYT2z11j-f8"},{"title":"Far to Good","artist":"John Smith","link":"https://www.youtube.com/watch?v=UBczT73O8sg"},{"title":"Lost","artist":"Anouk","link":"https://www.youtube.com/watch?v=dn_CjkNtl6s"},{"title":"Bohemian Rapsody (AGT)","artist":"Angelina Jordan","link":"https://www.youtube.com/watch?v=7gQljxeaNuM"},{"title":"I\'m a believer lesson","artist":"Monkeys Andi guitar","link":"https://youtu.be/RkFmHlILCyU"},{"title":"HOI ","artist":"Monkeys Andi guitar","link":"https://youtu.be/RkFmHlILCyU"}],"ImageList":[{"imageName":"Roger Waters.jpg"},{"imageName":"schouw zeilend water.jpg"},{"imageName":"Anouk.jpg"},{"imageName":"zeilen.png"},{"imageName":"BBKing.jpg"}],"homeTitle":"SilverMusic 1:  zomer 2020","homeBody":"Silvermusic is het initiatief van Hans. GladBck (Arnhem) heeft als voorbeeld gediend voor dit initaiatief om de wijk meer te verbinden en samen muziek te maken","homeImage":"BBKing.jpg"}')},25:function(e,t,a){},47:function(e,t,a){e.exports=a(81)},52:function(e,t,a){},73:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(21),i=a.n(l),c=(a(52),a(53),a(10)),o=a(11),s=a(13),m=a(12),u=a(20),h=a(4),d=a(84),f=a(85),g=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.song;this.props.index;return r.a.createElement("tr",null,r.a.createElement("td",null," ",e.title),r.a.createElement("td",null," ",e.artist," "),r.a.createElement("td",null," ",e.title,"      "),r.a.createElement("td",null,r.a.createElement("tr",null," ",r.a.createElement("a",{href:e.link,target:"_blank"},"video")," "),r.a.createElement("tr",null," ",r.a.createElement("a",{href:e.link,target:"_blank"},"akkooorden"))))}}]),a}(r.a.Component),p=a(23),v=(a(25),function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={filter:""},n}return Object(o.a)(a,[{key:"handleChange",value:function(e){this.setState({filter:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h4",null,"Playlist Silvermusic"),r.a.createElement("table",{className:"songlist"},r.a.createElement("tr",null," ",r.a.createElement("th",{className:"SLTH"},"song ")," ",r.a.createElement("th",{className:"SLTH"}," artist "),r.a.createElement("th",{className:"SLTH"},"afspraken")," ",r.a.createElement("th",{className:"SLTH"}," Linkjes ")),p.SongList1.filter((function(t){return t.artist.includes(e.state.filter)})).map((function(e,t){return r.a.createElement(g,{song:e,index:t})}))))}}]),a}(r.a.Component)),E=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleFetchRead1=function(){fetch("http://www.silvermusic.nl/test/apiBasic/read1.php").then((function(e){return e.json()})).then((function(e){n.setState({isLoaded:!0,items:e},console.log(n.setState.items))}))},n.handleRerender=function(){n.handleFetchRead1()},n.state={isLoaded:!1,rer:"leeg",items:[],filter:""},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.handleFetchRead1()}},{key:"handleChange",value:function(e){this.setState({filter:e.target.value.toLowerCase()})}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoaded,n=(t.rer,t.items);t.showModal;return a?r.a.createElement(r.a.Fragment,null,"Filter messages: ",r.a.createElement("input",{type:"text",value:this.state.filter,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("br",null),n.filter((function(t){return t.title.toLowerCase().includes(e.state.filter)||t.id.toLowerCase().includes(e.state.filter)})).map((function(e,t){return r.a.createElement(r.a.Fragment,null,e.title,"   ",e.message,r.a.createElement("br",null),"  ",r.a.createElement("br",null))}))):r.a.createElement("div",null,"Loading .... ")}}]),a}(r.a.Component),b=a(22),k=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).filenamePart=function(e){return e.substring(e.lastIndexOf("/")+1,e.length-e.lastIndexOf("/"))},e.fileInclPath=function(e){return"../images/"+e.substring(e.lastIndexOf("/")+1,e.length-e.lastIndexOf("/"))},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{class:"card-group"},p.ImageList.map((function(t){return r.a.createElement(b.a,null,r.a.createElement(b.a.Img,{variant:"bottom",src:"/testreact/images/"+e.filenamePart(t.imageName)}),r.a.createElement(b.a.Body,null,r.a.createElement(b.a.Title,null),r.a.createElement(b.a.Text,null,e.filenamePart(t.imageName))))}))))}}]),a}(r.a.Component),w=a(39),j=a.n(w),y=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(j.a,{controls:"true",url:"https://youtu.be/DBOx_61h_NE"})}}]),a}(r.a.Component),O=(a(73),function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Home page"))}),N=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).handleRerender=function(){},e}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement(u.a,{basename:"/"},r.a.createElement(d.a,{bg:"dark",variant:"dark",expand:"lg",sticky:"top"},r.a.createElement("span",{className:"menuWebsiteName"}," Silvermusic Huissen "),r.a.createElement(d.a.Brand,{href:"#home"}),r.a.createElement(d.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(d.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(f.a,{className:"mr-auto"},r.a.createElement(u.b,{className:"nav-link",to:"/Home"},"Home"),r.a.createElement(u.b,{className:"nav-link",to:"/lijst"},"Speellijst1"),r.a.createElement(u.b,{className:"nav-link",to:"/messages"},"messages"),r.a.createElement(u.b,{className:"nav-link",to:"/fotosBasic"},"fotos"),r.a.createElement(u.b,{className:"nav-link",to:"/player"},"Video vb")))),r.a.createElement("br",null),r.a.createElement(h.c,null,r.a.createElement(h.a,{exact:!0,path:"/",component:O}),r.a.createElement(h.a,{path:"/lijst",component:v}),r.a.createElement(h.a,{path:"/messages",component:E}),r.a.createElement(h.a,{path:"/fotosBasic",component:k}),r.a.createElement(h.a,{path:"/player",component:y}))))))}}]),a}(r.a.Component);a(80);var L=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(N,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[47,1,2]]]);
//# sourceMappingURL=main.b88fcc1e.chunk.js.map