import{r,a as t}from"./react-ef3a9354.js";import{c as R,e as G,f as H}from"./icons-material-e9adcbb1.js";import"./Card.module-3bdbfb7f.js";import{C as U}from"./Dialog-b7b75b66.js";import{at as $,L as j,au as B,av as M,aw as Q,n as x}from"./index-38e56929.js";import{a as W,u as C}from"./react-redux-60e7b2bb.js";import{u as Y,D as q,G as J}from"./x-data-grid-f709ef26.js";import{a as K}from"./react-router-c905df87.js";import{j as X}from"./utils-7edb168f.js";import{W as Z,Q as v,l as V,O as ee,h as te,m as re,f as N}from"./material-a209ad60.js";import"./@babel-5e587562.js";import"./react-dom-7dcc36ef.js";import"./scheduler-765c72db.js";import"./redux-persist-cccb0614.js";import"./redux-fa075741.js";import"./@reduxjs-2459f64e.js";import"./immer-41fd5235.js";import"./redux-thunk-ef899f4c.js";import"./axios-21b846bc.js";import"./hoist-non-react-statics-1d21e5a8.js";import"./react-router-dom-584a1cea.js";import"./@remix-run-8989dd9f.js";import"./react-icons-5ea1dfbe.js";import"./use-sync-external-store-54e50305.js";import"./system-5cdc79da.js";import"./styled-engine-b70b2ed8.js";import"./@emotion-afe87aa6.js";import"./stylis-79144faa.js";import"./private-theming-1cbad2aa.js";import"./react-transition-group-6e6f7170.js";import"./dom-helpers-9a525042.js";import"./base-7d25deaf.js";import"./@popperjs-f3391c26.js";import"./prop-types-a80e8cd9.js";import"./reselect-36a88051.js";const Ge=()=>{const u=[{field:"_id",headerName:"Id"},{field:"name",headerName:"Name",flex:1},{field:"type",headerName:"Type",flex:1},{field:"address",headerName:"Address",flex:1},{field:"email",headerName:"Email",flex:1},{field:"city",headerName:"City",flex:1},{field:"phone",headerName:"Contact No",flex:1},{field:"actions",headerName:"Action",flex:1,sortable:!1,renderCell:e=>{const a=i=>(i.stopPropagation(),P(e.row._id)),o=i=>(i.stopPropagation(),T(e.row._id));return t.createElement(t.Fragment,null,t.createElement(N,{size:"small",onClick:a,color:"primary"},t.createElement(G,null)),"  ",t.createElement(N,{size:"small",onClick:o,color:"error"},t.createElement(H,null)))}}],c=W(),m=Y(),{search:n}=C(({supplier:e})=>e),f=K(),[s,w]=r.useState([]),[h,l]=r.useState(""),[A,p]=r.useState(!1),[b,D]=r.useState(""),[I,d]=r.useState(!1),_=C($),[k,g]=r.useState(!1),E=()=>{c(B()).then(({payload:e={}})=>{const{message:a}=(e==null?void 0:e.data)||{};a?l(a):(l(""),w(e==null?void 0:e.data))}).catch(()=>{l("Something went wrong! Please try later or contact Administrator.")})};r.useEffect(()=>{E()},[]);const S=r.useMemo(()=>X(e=>{var a,o,i;m.current.setQuickFilterValues((i=(o=(a=e.split)==null?void 0:a.call(e," "))==null?void 0:o.filter)==null?void 0:i.call(o,F=>F!==""))},500),[m]);r.useEffect(()=>{n&&(s!=null&&s.length)&&(g(!0),S(n),setTimeout(()=>{g(!1)},500))},[s]);const y=e=>{S(e.target.value),c(M(e.target.value))},O=()=>{f("/master/suppliers/addSupplier")},P=e=>{x("Admin","Supplier","write")?f("/master/suppliers/editSupplier",{state:{supplierId:e}}):d(!0)},T=e=>{x("Admin","Supplier","write")?(D(e),p(!0)):d(!0)},z=e=>{e.target.value==="true"?c(Q(b)).then(()=>{p(!1),E()}).catch(()=>{l("Something went wrong! Please try later or contact Administrator.")}):p(!1)},L=()=>{d(!1)};return t.createElement(t.Fragment,null,(_||k)&&t.createElement(j,null),A&&t.createElement(U,{isOpen:!0,onClose:z,title:"Are you sure?",content:"Do you want to delete the supplier?",warning:!0}),t.createElement(Z,{anchorOrigin:{vertical:"top",horizontal:"center"},open:I,autoHideDuration:6e3,onClose:L},t.createElement(v,{severity:"warning"},"You are not authorized to perform the action")),t.createElement("div",{className:"inner-wrap"},t.createElement("div",{className:"page_head"},t.createElement("h1",{className:"pageHead"},"Suppliers list"),t.createElement("div",{className:"page_actions"},t.createElement(V,{variant:"contained",size:"small",type:"button",color:"primary",className:"ml6",onClick:O},"Add a supplier"))),h!==""&&t.createElement(ee,{sx:{width:"100%",margin:"0 0 30px 0",border:"1px solid red",borderRadius:"4px"},spacing:2},t.createElement(v,{severity:"error"},h)),t.createElement("div",{style:{width:"100%"}},t.createElement(q,{apiRef:m,sx:{backgroundColor:"primary.contrastText"},autoHeight:!0,density:"compact",getRowId:e=>e._id,rows:s,columns:u,initialState:{...u,columns:{columnVisibilityModel:{_id:!1}}},components:{Toolbar:()=>t.createElement(J,{sx:{gap:"6px",mb:"10px",justifyContent:"end",border:"none"}},t.createElement(te,{variant:"standard",placeholder:"Search...",autoFocus:!!n,onChange:y,value:n,InputProps:{startAdornment:t.createElement(re,{position:"start"},t.createElement(R,null))}}))},pageSize:10,rowsPerPageOptions:[10],disableSelectionOnClick:!0}))))};export{Ge as default};
