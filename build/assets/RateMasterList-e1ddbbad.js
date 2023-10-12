import{r as i,a as t}from"./react-ef3a9354.js";import{c as N,e as A}from"./icons-material-e9adcbb1.js";import"./Card.module-3bdbfb7f.js";import{aP as _,aQ as k,L as y,aR as I,n as P}from"./index-38e56929.js";import{a as z,u as S}from"./react-redux-60e7b2bb.js";import{u as F,D as T,G as D}from"./x-data-grid-f709ef26.js";import{a as G}from"./react-router-c905df87.js";import{j as H}from"./utils-7edb168f.js";import{l as O,O as Q,Q as j,h as w,m as B,f as W}from"./material-a209ad60.js";import"./@babel-5e587562.js";import"./react-dom-7dcc36ef.js";import"./scheduler-765c72db.js";import"./redux-persist-cccb0614.js";import"./redux-fa075741.js";import"./@reduxjs-2459f64e.js";import"./immer-41fd5235.js";import"./redux-thunk-ef899f4c.js";import"./axios-21b846bc.js";import"./hoist-non-react-statics-1d21e5a8.js";import"./react-router-dom-584a1cea.js";import"./@remix-run-8989dd9f.js";import"./react-icons-5ea1dfbe.js";import"./use-sync-external-store-54e50305.js";import"./system-5cdc79da.js";import"./styled-engine-b70b2ed8.js";import"./@emotion-afe87aa6.js";import"./stylis-79144faa.js";import"./private-theming-1cbad2aa.js";import"./react-transition-group-6e6f7170.js";import"./dom-helpers-9a525042.js";import"./base-7d25deaf.js";import"./@popperjs-f3391c26.js";import"./prop-types-a80e8cd9.js";import"./reselect-36a88051.js";const Le=()=>{const p=[{field:"_id",headerName:"Id"},{field:"customerName",headerName:"Name",minWidth:250,flex:1},{field:"actions",headerName:"Action",sortable:!1,flex:1,renderCell:e=>{const r=a=>(a.stopPropagation(),L(e.row._id));return t.createElement(t.Fragment,null,t.createElement(W,{size:"small",onClick:r,color:"primary"},t.createElement(A,null)))}}],u=z(),m=F(),{search:s}=S(({ratemaster:e})=>e),g=G(),[f,c]=i.useState(""),b=S(_),[v,h]=i.useState(!1),[n,x]=i.useState({page:0,pageSize:100}),[o,M]=i.useState({isLoading:!1,data:[],total:0});i.useEffect(()=>{u(k({pagination:{limit:n.pageSize?n.pageSize:100,page:n.page+1}})).then(({payload:e={}})=>{const{message:r,rateList:a,count:l}=(e==null?void 0:e.data)||{};r?c(r):(c(""),M(d=>({...d,isLoading:!1,data:a,total:l})))}).catch(()=>{c("Something went wrong! Please try later or contact Administrator.")})},[]);const E=i.useMemo(()=>H(e=>{var r,a,l;m.current.setQuickFilterValues((l=(a=(r=e.split)==null?void 0:r.call(e," "))==null?void 0:a.filter)==null?void 0:l.call(a,d=>d!==""))},500),[m]);i.useEffect(()=>{var e;s&&((e=o.data)!=null&&e.length)&&(h(!0),E(s),setTimeout(()=>{h(!1)},500))},[o.data]);const C=e=>{E(e.target.value),u(I(e.target.value))},R=()=>{g("/master/rateMasterList/addRateMaster")},L=e=>{P("Admin","RateMaster","write")&&g("/master/rateMasterList/editRateMaster",{state:{rateMasterId:e}})};return t.createElement(t.Fragment,null,(b||v)&&t.createElement(y,null),t.createElement("div",{className:"inner-wrap"},t.createElement("div",{className:"page_head"},t.createElement("h1",{className:"pageHead"},"Rate master"),t.createElement("div",{className:"page_actions"},t.createElement(O,{variant:"contained",size:"small",type:"button",color:"primary",className:"ml6",onClick:R},"Add rates"))),f!==""&&t.createElement(Q,{sx:{width:"100%",margin:"0 0 30px 0",border:"1px solid red",borderRadius:"4px"},spacing:2},t.createElement(j,{severity:"error"},f)),t.createElement("div",{style:{width:"100%"}},t.createElement(T,{apiRef:m,autoHeight:!0,density:"compact",rows:o.data,rowCount:o.total,loading:o.isLoading,pageSizeOptions:[100],paginationModel:n,onPaginationModelChange:x,paginationMode:"server",columns:p,getRowId:e=>e==null?void 0:e._id,sx:{backgroundColor:"primary.contrastText"},initialState:{...p,columns:{columnVisibilityModel:{_id:!1}}},disableSelectionOnClick:!0,disableColumnFilter:!0,disableColumnSelector:!0,disableDensitySelector:!0,components:{Toolbar:()=>t.createElement(D,{sx:{gap:"6px",mb:"10px",justifyContent:"end",border:"none"}},t.createElement(w,{variant:"standard",placeholder:"Search...",autoFocus:!!s,onChange:C,value:s,InputProps:{startAdornment:t.createElement(B,{position:"start"},t.createElement(N,null))}}))}}))))};export{Le as default};
