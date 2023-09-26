import{r as l,a as t}from"./react-bfabd40c.js";import{u as O,a as Q}from"./react-redux-45d870ba.js";import{h as J}from"./icons-material-4539f19e.js";import{L as A,A as _,D as B}from"./x-date-pickers-7b1cc7dd.js";import{cN as K,cO as U,cP as X,a4 as Z,bq as $,L as y,b5 as ee,cQ as te}from"./index-54d20a5c.js";import"./Card.module-3bdbfb7f.js";import{F as ae}from"./file-saver-7e589f53.js";import{i as h,A as re,h as f,O as ne,Q as ie,a as H,l as w}from"./material-e0a59a28.js";import{G as d}from"./@material-ui-774e3213.js";import{D as oe}from"./x-data-grid-cceece3f.js";import"./@babel-e11bafe1.js";import"./react-dom-b0178e93.js";import"./scheduler-765c72db.js";import"./hoist-non-react-statics-6cfbf744.js";import"./use-sync-external-store-18921cc2.js";import"./@date-io-f382d426.js";import"./dayjs-7f45ce31.js";import"./utils-c03c978f.js";import"./clsx-1229b3e0.js";import"./base-ff50cfe3.js";import"./@popperjs-f3391c26.js";import"./rifm-7b0f12ad.js";import"./system-a1d29c52.js";import"./styled-engine-f3bd09bf.js";import"./@emotion-77835cc8.js";import"./stylis-79144faa.js";import"./private-theming-970ac73c.js";import"./react-transition-group-7ded6f4d.js";import"./dom-helpers-9a525042.js";import"./redux-persist-d9cc1560.js";import"./redux-b7ba668d.js";import"./@reduxjs-4d37e7cf.js";import"./immer-41fd5235.js";import"./redux-thunk-ef899f4c.js";import"./axios-4a70c6fc.js";import"./react-router-622b2d59.js";import"./@remix-run-d753ad9e.js";import"./react-router-dom-60901e53.js";import"./react-icons-55b3b9a0.js";import"./jss-7659e388.js";import"./is-in-browser-9e40da8a.js";import"./jss-plugin-rule-value-function-051edbeb.js";import"./jss-plugin-global-64559e95.js";import"./jss-plugin-nested-6377d8b0.js";import"./jss-plugin-camel-case-92f9f32c.js";import"./hyphenate-style-name-80972348.js";import"./jss-plugin-default-unit-593cc4c5.js";import"./jss-plugin-vendor-prefixer-4dd06b33.js";import"./css-vendor-33142dc8.js";import"./jss-plugin-props-sort-0c9fca2f.js";import"./prop-types-d7fd566a.js";import"./reselect-36a88051.js";const N={from:null,to:null,owner:"",vehicle:""},it=()=>{var P;const L=[{field:"_id",headerName:"Id"},{field:"srNo",headerName:"Sr No"},{field:"formattedLSNo",headerName:"LTS no.",flex:1},{field:"date",headerName:"Date",flex:1},{field:"vehicleOwner",headerName:"Owner Name",flex:1},{field:"vehicleNo",headerName:"Vehicle no",flex:1},{field:"totalFreight",headerName:"Hire Rs",flex:1},{field:"advance",headerName:"Advance Rs",flex:1},{field:"hamali",headerName:"Hamali",flex:1},{field:"rent",headerName:"Commision",flex:1},{field:"totalPayable",headerName:"Total",flex:1}],R=O(K),b=Q(),g=O(e=>e.user),[T,I]=l.useState([]),[C,c]=l.useState(""),[o,D]=l.useState(null),[a,S]=l.useState(N),[z,u]=l.useState(!1),[m,M]=l.useState({page:0,pageSize:100}),[x,Y]=l.useState({isLoading:!1,data:[],total:0});l.useEffect(()=>{b(U()).then(({payload:e={}})=>{var r,i;const{message:n}=(e==null?void 0:e.data)||{};if(n)c(n);else if(c(""),I(e==null?void 0:e.data),g&&g.branch){const s=(i=(r=e==null?void 0:e.data)==null?void 0:r.find)==null?void 0:i.call(r,p=>p._id===g.branch);D(s)}}).catch(e=>{c(e.message)})},[]),l.useEffect(()=>{if(z&&(g.branch&&o||!g.branch)){const e={};o&&o._id&&(e.branch=o._id),a.from&&(e.from=a.from),a.to&&(e.to=a.to),a.owner&&(e.owner=a.owner),a.vehicle&&(e.vehicle=a.vehicle);const n={pagination:{limit:m.pageSize?m.pageSize:100,page:m.page+1},query:e};b(X(n)).then(({payload:r={}})=>{var s,p;const{message:i}=(r==null?void 0:r.data)||{};if(i)c(i);else{const G=(p=(s=r==null?void 0:r.data.loadingSlips)==null?void 0:s.map)==null?void 0:p.call(s,(E,V)=>({...E,srNo:V+1,date:Z(new Date(E.date)),formattedLSNo:$(E.lsNo)}));Y(E=>({...E,isLoading:!1,data:G||[],total:r==null?void 0:r.data.count}))}u(!1)}).catch(r=>{u(!1),c(r.message)})}},[m.page,m.pageSize,o,z,b,a.from,a.owner,a.vehicle,a.to]);const k=e=>{e.preventDefault();const n={isPrint:!0};o&&o._id&&(n.branch=o._id),a.from&&(n.from=a.from),a.to&&(n.to=a.to),a.owner&&(n.owner=a.owner),a.vehicle&&(n.vehicle=a.vehicle);const r={pagination:{limit:m.pageSize?m.pageSize:100,page:m.page+1},query:n};b(te(r)).then(({payload:i={}})=>{const{message:s}=(i==null?void 0:i.data)||{};if(s)c(s);else{const p=new Blob([i==null?void 0:i.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});ae.saveAs(p,"ChallanStatus.xlsx")}}).catch(i=>{c(i.message)})},W=(e,n)=>{D(n),u(!1),S(N)},q=e=>{e.preventDefault(),u(!0)},F=(e,n)=>{S(r=>({...r,[e]:new Date(n)}))},j=e=>{e.preventDefault(),S(N),u(!0)},v=e=>{const n=e.target.name,r=e.target.value;S(i=>({...i,[n]:r}))};return t.createElement(t.Fragment,null,R&&t.createElement(y,null),t.createElement("div",{className:"inner-wrap"},t.createElement("div",{className:"page_head-1",style:{display:"flex",justifyContent:"space-between"}},t.createElement("h1",{className:"pageHead"},"Loading Trip Sheet Register"),t.createElement("div",{className:""},t.createElement(h,{size:"small",sx:{width:"230px",marginRight:"5px",marginBottom:"20px"}},t.createElement(re,{disablePortal:!0,size:"small",name:"branch",options:T,value:o||null,onChange:W,disabled:!ee(),getOptionLabel:e=>e.name,openOnFocus:!0,renderInput:e=>t.createElement(f,{...e,label:"Select branch",fullWidth:!0})})))),C!==""&&t.createElement(ne,{sx:{width:"100%",margin:"0 0 30px 0",border:"1px solid red",borderRadius:"4px"},spacing:2},t.createElement(ie,{severity:"error"},C)),t.createElement(H,{sx:{padding:"20px",marginBottom:"20px"}},t.createElement("h2",{className:"mb20"},"Search"),t.createElement("form",{action:"",onSubmit:q},t.createElement(d,{container:!0,spacing:3},t.createElement(d,{item:!0,xs:2},t.createElement(h,{fullWidth:!0},t.createElement(A,{dateAdapter:_},t.createElement(B,{label:"From",inputFormat:"DD/MM/YYYY",value:a.from,onChange:F.bind(null,"from"),renderInput:e=>t.createElement(f,{name:"from",size:"small",...e})})))),t.createElement(d,{item:!0,xs:2},t.createElement(h,{fullWidth:!0},t.createElement(A,{dateAdapter:_},t.createElement(B,{label:"To",inputFormat:"DD/MM/YYYY",value:a.to,onChange:F.bind(null,"to"),renderInput:e=>t.createElement(f,{name:"to",size:"small",...e})})))),t.createElement(d,{item:!0,xs:2},t.createElement(h,{fullWidth:!0},t.createElement(f,{size:"small",variant:"outlined",label:"Owner",value:a.owner,onChange:v,name:"owner",id:"owner",inputProps:{maxLength:50}}))),t.createElement(d,{item:!0,xs:2},t.createElement(h,{fullWidth:!0},t.createElement(f,{size:"small",variant:"outlined",label:"Vehicle",value:a.vehicle,onChange:v,name:"vehicle",id:"vehicle",inputProps:{maxLength:50}}))),t.createElement(d,{item:!0,xs:3},t.createElement(h,{fullWidth:!0},t.createElement(f,{size:"small",variant:"outlined",label:"Search in List By",value:a.searchText,onChange:v,name:"searchText",id:"searchText",inputProps:{maxLength:50}}))),t.createElement(d,{style:{display:"flex"},item:!0,xs:2},t.createElement(w,{type:"submit",variant:"contained",size:"medium",color:"primary"},"Search"),t.createElement(w,{type:"button",variant:"outlined",size:"medium",className:"ml6",onClick:e=>j(e)},"Reset"))))),t.createElement(H,{sx:{width:"100%"}},((P=x.data)==null?void 0:P.length)>0?t.createElement("div",{className:"tbl_header"},t.createElement(w,{variant:"contained",endIcon:t.createElement(J,null),onClick:k},"Download")):null,t.createElement(oe,{autoHeight:!0,density:"compact",rows:x.data,rowCount:x.total,loading:x.isLoading,pageSizeOptions:[100],paginationModel:m,onPaginationModelChange:e=>{M(e),u(!0)},paginationMode:"server",columns:L,getRowId:e=>e._id,sx:{backgroundColor:"primary.contrastText"},initialState:{...L,columns:{columnVisibilityModel:{_id:!1}}},disableSelectionOnClick:!0}))))};export{it as default};
