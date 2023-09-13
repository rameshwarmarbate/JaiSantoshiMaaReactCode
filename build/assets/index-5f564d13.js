import { a as s, r as u } from "./react-bfabd40c.js";
import { c as Ks } from "./react-dom-b0178e93.js";
import { u as $, a as ys, P as Ws } from "./react-redux-45d870ba.js";
import {
  d as ns,
  p as qs,
  F as Js,
  R as Xs,
  P as Zs,
  a as en,
  b as tn,
  c as an,
  e as sn,
  f as nn,
} from "./redux-persist-d9cc1560.js";
import { c as n, a as g, b as rn } from "./@reduxjs-4d37e7cf.js";
import { a as v } from "./axios-4a70c6fc.js";
import { c as cn } from "./redux-b7ba668d.js";
import "./hoist-non-react-statics-6cfbf744.js";
import {
  d as b,
  a as Ss,
  e as dn,
  f as i,
  c as Rs,
  b as Ls,
} from "./react-router-1b5f20a2.js";
import {
  N as ln,
  C as un,
  O as on,
  Q as pn,
  f as ps,
  D as mn,
  R as En,
  U as fn,
} from "./material-e0a59a28.js";
import { L as cs, B as gn } from "./react-router-dom-4405dfe9.js";
import { d as Cn, a as hn } from "./icons-material-4539f19e.js";
import { F as _n, a as Tn, b as yn, c as Sn } from "./react-icons-55b3b9a0.js";
import "./@babel-e11bafe1.js";
import "./scheduler-765c72db.js";
import "./use-sync-external-store-18921cc2.js";
import "./immer-41fd5235.js";
import "./redux-thunk-ef899f4c.js";
import "./@remix-run-d753ad9e.js";
import "./system-a1d29c52.js";
import "./styled-engine-f3bd09bf.js";
import "./@emotion-77835cc8.js";
import "./stylis-79144faa.js";
import "./utils-c03c978f.js";
import "./private-theming-970ac73c.js";
import "./react-transition-group-7ded6f4d.js";
import "./dom-helpers-9a525042.js";
import "./base-ff50cfe3.js";
import "./@popperjs-f3391c26.js";
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) c(d);
  new MutationObserver((d) => {
    for (const l of d)
      if (l.type === "childList")
        for (const E of l.addedNodes)
          E.tagName === "LINK" && E.rel === "modulepreload" && c(E);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(d) {
    const l = {};
    return (
      d.integrity && (l.integrity = d.integrity),
      d.referrerPolicy && (l.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : d.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function c(d) {
    if (d.ep) return;
    d.ep = !0;
    const l = a(d);
    fetch(d.href, l);
  }
})();
const Rn = window.env.API_BASE_PATH,
  Io = [
    { label: "Door", value: "Door" },
    { label: "Godown", value: "Godown" },
    { label: "Office", value: "Office" },
  ],
  jo = [
    { label: "TBB", value: "TBB" },
    { label: "ToPay", value: "ToPay" },
    { label: "Paid", value: "Paid" },
    { label: "FOC", value: "FOC" },
  ],
  No = [
    { label: "Consignor", value: "Consignor" },
    { label: "Consignee", value: "Consignee" },
    { label: "Third party", value: "Third party" },
  ],
  ko = [
    { label: "Consignor", value: "Consignor" },
    { label: "Consignee", value: "Consignee" },
    { label: "NA", value: "NA" },
  ],
  Uo = [
    { label: "By Cash", value: "By Cash" },
    { label: "By Cheque", value: "By Cheque" },
  ],
  Vo = [
    { label: "Cash", value: "Cash" },
    { label: "Cheque", value: "Cheque" },
    { label: "NEFT/RTGS", value: "NEFT/RTGS" },
    { label: "Online banking", value: "Online banking" },
  ],
  ds = () => rs.getState().user,
  Ln = () => localStorage.getItem("jwt_token") || "",
  An = (t) => localStorage.setItem("jwt_token", t),
  Pn = (t) => localStorage.setItem("type", t),
  G = () => localStorage.getItem("type") === "Superadmin",
  Bn = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  wn = (t) => {
    var E, f;
    const e = new Date(t),
      c = (f = (E = "0" + e.getDate()).slice) == null ? void 0 : f.call(E, -2),
      d = e.getMonth(),
      l = e.getFullYear();
    return `${c} ${Bn[d]} ${l}`;
  },
  Mo = (t) => {
    const e = new Date(t);
    let a = e.getHours(),
      c = e.getMinutes(),
      d = e.getSeconds();
    d = d <= 9 ? "0" + d : d;
    const l = a >= 12 ? "PM" : "AM";
    return (
      (a = a % 12),
      (a = a || 12),
      (c = c < 10 ? "0" + c : c),
      `${a}:${c}:${d} ${l}`
    );
  },
  m = () => {
    var e, a, c;
    const t = ds();
    return t &&
      t.type &&
      ((a = (e = t.type) == null ? void 0 : e.toLowerCase) == null
        ? void 0
        : a.call(e)) === "superadmin"
      ? t == null
        ? void 0
        : t._id
      : (c = t == null ? void 0 : t.employee) == null
      ? void 0
      : c._id;
  },
  xo = [
    "Maharashtra",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and",
    "Daman & Diu",
    "Jammu & Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ],
  zo =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Fo = /^[0-9]{10}$/,
  Yo = (t) => {
    var e;
    for (
      t = (e = t.toString) == null ? void 0 : e.call(t);
      (t == null ? void 0 : t.length) < 6;

    )
      t = "0" + t;
    return t;
  },
  Ho = (t) => {
    var e;
    for (
      t = (e = t.toString) == null ? void 0 : e.call(t);
      (t == null ? void 0 : t.length) < 5;

    )
      t = "0" + t;
    return t;
  },
  Qo = (t) => {
    var e;
    for (
      t = (e = t.toString) == null ? void 0 : e.call(t);
      (t == null ? void 0 : t.length) < 5;

    )
      t = "0" + t;
    return t;
  },
  Ko = (t) => {
    var e, a, c, d;
    if (t && t.code) {
      const E = +((d =
        (c = ((a = (e = t.code).split) == null ? void 0 : a.call(e, "/"))[2]) ==
        null
          ? void 0
          : c.replace) == null
        ? void 0
        : d.call(c, "EMP-", ""));
      return `DTP/${new Date().getFullYear()}/EMP-${E + 1}`;
    }
    if (!t || !t.code) return `DTP/${new Date().getFullYear()}/EMP-1`;
  },
  Wo = (t) => {
    var e, a, c, d;
    if (t && t.code) {
      const E = +((d =
        (c = ((a = (e = t.code).split) == null ? void 0 : a.call(e, "/"))[2]) ==
        null
          ? void 0
          : c.replace) == null
        ? void 0
        : d.call(c, "DRV-", ""));
      return `DTP/${new Date().getFullYear()}/DRV-${E + 1}`;
    }
    if (!t || !t.code) return `DTP/${new Date().getFullYear()}/DRV-1`;
  },
  qo = () => {
    var e, a, c, d;
    const t = ds();
    return (
      t &&
      t.type &&
      (((a = (e = t.type) == null ? void 0 : e.toLowerCase) == null
        ? void 0
        : a.call(e)) === "superadmin" ||
        ((d = (c = t.type) == null ? void 0 : c.toLowerCase) == null
          ? void 0
          : d.call(c)) === "admin")
    );
  },
  Jo = (t, e) => {
    var a;
    for (
      t = (a = t.toString) == null ? void 0 : a.call(t);
      (t == null ? void 0 : t.length) < e;

    )
      t = "0" + t;
    return t;
  },
  Xo = (t) => {
    var e;
    if (t) {
      const a = atob(t),
        c = new Array(a == null ? void 0 : a.length);
      for (let f = 0; f < (a == null ? void 0 : a.length); f++)
        c[f] =
          (e = a == null ? void 0 : a.charCodeAt) == null
            ? void 0
            : e.call(a, f);
      const d = new Uint8Array(c),
        l = new Blob([d], { type: "application/pdf;base64" });
      return URL.createObjectURL(l);
    }
    return null;
  },
  Zo = (t, e) => {
    const a = document.createElement("a");
    (a.href = t),
      (a.download = e),
      document.body.append(a),
      a.click(),
      a.remove(),
      setTimeout(() => URL.revokeObjectURL(a.href), 7e3);
  },
  ep = (t) => {
    var a, c, d, l, E, f, T, C;
    const e =
      (l =
        (d =
          (c = (a = t.target.value) == null ? void 0 : a.replace) == null
            ? void 0
            : c.call(a, /[^0-9.]/g, "")) == null
          ? void 0
          : d.replace) == null
        ? void 0
        : l.call(d, /(\..*?)\..*/g, "$1");
    t.target.value =
      (f = (E = e + "").includes) != null &&
      f.call(E, ".") &&
      !parseInt((C = (T = e + "").split) == null ? void 0 : C.call(T, ".")[1])
        ? e
        : e !== ""
        ? parseFloat(e || 0)
        : "";
  },
  tp = (t) => {
    var a, c, d, l;
    const e =
      (l =
        (d =
          (c = (a = t.target.value) == null ? void 0 : a.slice) == null
            ? void 0
            : c.call(a, 0, 10)) == null
          ? void 0
          : d.replace) == null
        ? void 0
        : l.call(d, /[^0-9]/g, "");
    t.target.value = e;
  },
  r = (t, e, a, c) => bn(e, t, a, c),
  vn = (t, e) => {
    const a = Ln();
    return {
      headers: {
        "Content-Type":
          t === "MULTIPART" ? "multipart/form-data" : "application/json",
        Authorization: "Bearer " + a,
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
      params: { ...e },
      timeout: 60 * 10 * 1e3,
    };
  },
  bn = (t, e, a, c = {}) => {
    const d = Rn + t,
      l = vn(e, c);
    if (e === "GET") return v({ url: d, method: "get", ...l });
    if (e === "POST" || e === "MULTIPART")
      return v({ url: d, method: "post", data: a, ...l });
    if (e === "DELETE") return v({ url: d, method: "delete", data: a, ...l });
    if (e === "PUT") return v({ url: d, method: "put", data: a, ...l });
    if (e === "PATCH") return v({ url: d, method: "patch", data: a, ...l });
    if (e === "BLOB")
      return v({ url: d, method: "post", data: a, ...l, responseType: "blob" });
  };
function $n(t) {
  return r("POST", "api/user/login", t);
}
function On(t) {
  return r("POST", "api/user/signupAdmin", t);
}
function Dn(t) {
  const e = `api/user/getUser/${t}`;
  return r("GET", e, "");
}
function Gn(t) {
  const e = `api/user/updateUser/${t._id}`;
  return r("PUT", e, t);
}
function In() {
  return r("GET", "api/master/getBranches", "");
}
function jn() {
  return r("GET", "api/master/getEmployees", "");
}
function Nn(t) {
  const e = `api/user/getUsersByBranch/${t}`;
  return r("GET", e, "");
}
function kn(t) {
  const e = "api/user/updateUserPermissions";
  return (t.updatedBy = m()), r("POST", e, t);
}
function Un(t) {
  const e = "api/user/signup";
  return (t.createdBy = m()), r("POST", e, t);
}
function Vn() {
  return r("GET", "api/user/getUsers", "");
}
function Mn(t) {
  const e = `api/user/removeUser/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function xn(t) {
  return r("POST", "api/user/getSearchedUsers", { search: t });
}
const ms = {
    status: "idle",
    branch: "",
    employee: {},
    permissions: {},
    type: "",
    username: "",
    search: "",
  },
  k = n("VALIDATE_USER", async (t) => {
    const { data: e, status: a } = await $n(t);
    return { data: e, status: a };
  }),
  U = n("CREATE_USER", async (t) => {
    const { data: e, status: a } = await On(t);
    return { data: e, status: a };
  }),
  V = n("GET_USER_DETAIL", async (t) => {
    const { data: e, status: a } = await Dn(t);
    return { data: e, status: a };
  }),
  M = n("UPDATE_USER_DETAIL", async (t) => {
    const { data: e, status: a } = await Gn(t);
    return { data: e, status: a };
  }),
  x = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await In();
    return { data: e, status: a };
  }),
  z = n("GET_EMPLOYEES", async (t) => {
    const { data: e, status: a } = await jn();
    return { data: e, status: a };
  }),
  F = n("GET_USERS_BY_BRANCH", async (t) => {
    const { data: e, status: a } = await Nn(t);
    return { data: e, status: a };
  }),
  Y = n("UPDATE_PERMISSIONS", async (t) => {
    const { data: e, status: a } = await kn(t);
    return { data: e, status: a };
  }),
  H = n("REGISTER_USER", async (t) => {
    const { data: e, status: a } = await Un(t);
    return { data: e, status: a };
  }),
  Q = n("GET_USERS", async (t) => {
    const { data: e, status: a } = await Vn();
    return { data: e, status: a };
  }),
  K = n("DELETE_USER", async (t) => {
    const { data: e, status: a } = await Mn(t);
    return { data: e, status: a };
  }),
  W = n("SEARCH_USER", async (t) => {
    const { data: e, status: a } = await xn(t);
    return { data: e, status: a };
  }),
  As = g({
    name: "user",
    initialState: ms,
    reducers: {
      updateUser: (t, e) => ({ ...e.payload }),
      removeUser: () => ({ ...ms }),
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(k.pending, (e) => {
        e.status = "loading";
      })
        .addCase(k.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(k.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(U.pending, (e) => {
          e.status = "loading";
        })
        .addCase(U.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(U.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(V.pending, (e) => {
          e.status = "loading";
        })
        .addCase(V.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(V.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(M.pending, (e) => {
          e.status = "loading";
        })
        .addCase(M.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(M.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(x.pending, (e) => {
          e.status = "loading";
        })
        .addCase(x.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(x.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(z.pending, (e) => {
          e.status = "loading";
        })
        .addCase(z.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(z.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(F.pending, (e) => {
          e.status = "loading";
        })
        .addCase(F.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(F.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Y.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Y.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Y.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(H.pending, (e) => {
          e.status = "loading";
        })
        .addCase(H.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(H.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(K.pending, (e) => {
          e.status = "loading";
        })
        .addCase(K.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(K.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(W.pending, (e) => {
          e.status = "loading";
        })
        .addCase(W.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(W.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Q.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Q.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Q.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { updateUser: zn, removeUser: Ps, setSearch: ap } = As.actions,
  Fn = As.reducer,
  Yn = (t) => t.user.status === "loading",
  Hn = { status: "idle" },
  Qn = g({ name: "billregister", initialState: Hn, reducers: {} }),
  Kn = Qn.reducer;
function Wn() {
  return r("GET", "api/master/getBranches");
}
function qn() {
  return r("GET", "api/master/getCustomers");
}
function Jn(t) {
  return r("POST", "api/transactions/getLorryReceiptsForReport", t);
}
function Xn(t) {
  return r("BLOB", "api/transactions/downloadLRReport", { query: t });
}
const Zn = { status: "idle" },
  q = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await Wn();
    return { data: e, status: a };
  }),
  J = n("GET_CUSTOMER", async (t) => {
    const { data: e, status: a } = await qn();
    return { data: e, status: a };
  }),
  X = n("GET_LR_RECEIPT_FOR_REPORT", async (t) => {
    const { data: e, status: a } = await Jn(t);
    return { data: e, status: a };
  }),
  Z = n("GET_LR_FOR_REPORT", async (t) => {
    const { data: e, status: a } = await Xn(t);
    return { data: e, status: a };
  }),
  er = g({
    name: "tripsheet",
    initialState: Zn,
    reducers: {},
    extraReducers: (t) => {
      t.addCase(q.pending, (e) => {
        e.status = "loading";
      })
        .addCase(q.fulfilled, (e) => {})
        .addCase(q.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(J.pending, (e) => {
          e.status = "loading";
        })
        .addCase(J.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(J.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(X.pending, (e) => {
          e.status = "loading";
        })
        .addCase(X.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(X.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Z.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Z.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Z.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  tr = er.reducer,
  sp = (t) => t.lrregisterreport.status === "loading";
function ar() {
  return r("GET", "api/master/getBranches");
}
function sr() {
  return r("GET", "api/master/getCustomers");
}
function nr(t) {
  return r("POST", "api/transactions/getLoadingSlipForReport", t);
}
function rr(t) {
  return r("BLOB", "api/transactions/getLoadingSlipForReport", t);
}
const cr = { status: "idle" },
  ee = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await ar();
    return { data: e, status: a };
  }),
  te = n("GET_CUSTOMER", async (t) => {
    const { data: e, status: a } = await sr();
    return { data: e, status: a };
  }),
  ae = n("GET_LOADING_SLIP_FOR_REPORT", async (t) => {
    const { data: e, status: a } = await nr(t);
    return { data: e, status: a };
  }),
  se = n("GET_LR_FOR_CHALLAN_REPORT", async (t) => {
    const { data: e, status: a } = await rr(t);
    return { data: e, status: a };
  }),
  dr = g({
    name: "tripsheet",
    initialState: cr,
    reducers: {},
    extraReducers: (t) => {
      t.addCase(ee.pending, (e) => {
        e.status = "loading";
      })
        .addCase(ee.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ee.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(te.pending, (e) => {
          e.status = "loading";
        })
        .addCase(te.fulfilled, (e) => {})
        .addCase(te.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ae.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ae.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ae.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(se.pending, (e) => {
          e.status = "loading";
        })
        .addCase(se.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(se.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  lr = dr.reducer,
  np = (t) => t.tripsheetreport.status === "loading";
function ir() {
  return r("GET", "api/master/getBranches");
}
function ur(t) {
  return r("POST", "api/transactions/getLRAckWithCount", t);
}
function or(t) {
  return r("POST", "api/transactions/getLoadingSlipsById", { lsList: t });
}
function pr(t) {
  return r("POST", "api/transactions/getAllLRAck", t);
}
function mr(t) {
  const e = `api/transactions/getChallanAck/${t}`;
  return r("GET", e);
}
function Er(t) {
  const e = `api/transactions/updateLorryReceiptAck/${t._id}`;
  return r("PUT", e, t);
}
function fr(t) {
  const e = `api/transactions/getLorryReceipt/${t}`;
  return r("GET", e);
}
const gr = { status: "idle", search: "" },
  ne = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await ir();
    return { data: e, status: a };
  }),
  re = n("GET_LR_ACK_WITH_COUNT", async (t) => {
    const { data: e, status: a } = await ur(t);
    return { data: e, status: a };
  }),
  ce = n("GET_LOADING_SLIP_BY_ID", async (t) => {
    const { data: e, status: a } = await or(t);
    return { data: e, status: a };
  }),
  de = n("GET_ALL_LR_ACK", async (t) => {
    const { data: e, status: a } = await pr(t);
    return { data: e, status: a };
  }),
  le = n("GET_CHALLAN_ACK", async (t) => {
    const { data: e, status: a } = await mr(t);
    return { data: e, status: a };
  }),
  ie = n("UPDATE_LR_ACK", async (t) => {
    const { data: e, status: a } = await Er(t);
    return { data: e, status: a };
  }),
  ue = n("GET_LR_RECEIPT", async (t) => {
    const { data: e, status: a } = await fr(t);
    return { data: e, status: a };
  }),
  Bs = g({
    name: "acknowledge",
    initialState: gr,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(ne.pending, (e) => {
        e.status = "loading";
      })
        .addCase(ne.fulfilled, (e) => {
          G() && (e.status = "succeeded");
        })
        .addCase(ne.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(re.pending, (e) => {
          e.status = "loading";
        })
        .addCase(re.fulfilled, (e, { payload: a }) => {
          var c;
          ((c = a == null ? void 0 : a.data.lorryReceipts) != null &&
            c.length) ||
            (e.status = "succeeded");
        })
        .addCase(re.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ce.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ce.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ce.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(de.pending, (e) => {
          e.status = "loading";
        })
        .addCase(de.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(de.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(le.pending, (e) => {
          e.status = "loading";
        })
        .addCase(le.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(le.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ue.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ue.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ue.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ie.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ie.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ie.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: rp } = Bs.actions,
  Cr = Bs.reducer,
  cp = (t) => t.acknowledge.status === "loading";
function hr() {
  return r("GET", "api/master/getBranches");
}
function _r() {
  return r("GET", "api/master/getCustomers");
}
function Tr(t) {
  return (t.createdBy = m()), r("POST", "api/transactions/addBill", t);
}
function yr(t) {
  return r("POST", "api/transactions/getLorryReceiptsByConsignor", t);
}
function Sr({ id: t, email: e }) {
  const a = `api/transactions/printBill/${t}`;
  return r("POST", a, { email: e });
}
function Rr(t) {
  return r("POST", "api/transactions/getBills", t);
}
function Lr(t) {
  const e = `api/transactions/removeBill/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function Ar(t) {
  const e = `api/transactions/getBill/${t}`;
  return r("GET", e);
}
function Pr(t) {
  t.updatedBy = m();
  const e = `api/transactions/updateBill/${t._id}`;
  return r("PUT", e, t);
}
function Br({ id: t }) {
  const e = `api/transactions/exportToExcelBill/${t}`;
  return r("BLOB", e);
}
const wr = { status: "idle", branches: [], customers: [], search: "" },
  oe = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await hr();
    return { data: e, status: a };
  }),
  pe = n("GET_CUSTOMER", async (t) => {
    const { data: e, status: a } = await _r();
    return { data: e, status: a };
  }),
  me = n("CREATE_BILL", async (t) => {
    const { data: e, status: a } = await Tr(t);
    return { data: e, status: a };
  }),
  Ee = n("GET_LR_RECEIPT_BY_CONSIGNOR", async (t) => {
    const { data: e, status: a } = await yr(t);
    return { data: e, status: a };
  }),
  fe = n("DOWNLOAD_BILL", async (t) => {
    const { data: e, status: a } = await Sr(t);
    return { data: e, status: a };
  }),
  dp = n("DOWNLOAD_EXCEL_BILL", async (t) => {
    const { data: e, status: a } = await Br(t);
    return { data: e, status: a };
  }),
  ge = n("GE_BILLS", async (t) => {
    const { data: e, status: a } = await Rr(t);
    return { data: e, status: a };
  }),
  Ce = n("DELETE_BILL", async (t) => {
    const { data: e, status: a } = await Lr(t);
    return { data: e, status: a };
  }),
  he = n("GE_BILL", async (t) => {
    const { data: e, status: a } = await Ar(t);
    return { data: e, status: a };
  }),
  _e = n("UPDATE_BILL", async (t) => {
    const { data: e, status: a } = await Pr(t);
    return { data: e, status: a };
  }),
  ws = g({
    name: "bill",
    initialState: wr,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(oe.pending, (e) => {
        e.status = "loading";
      })
        .addCase(oe.fulfilled, (e, { payload: a }) => {
          var c, d;
          G() && (e.status = "succeeded"),
            (e.branches =
              (d =
                (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
              null
                ? void 0
                : d.call(c, (l) => ({
                    ...l,
                    label: l.name,
                    value: l == null ? void 0 : l._id,
                  })));
        })
        .addCase(oe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(pe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(pe.fulfilled, (e, { payload: a }) => {
          e.customers = a == null ? void 0 : a.data;
        })
        .addCase(pe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(me.pending, (e) => {
          e.status = "loading";
        })
        .addCase(me.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(me.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ee.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ee.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ee.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(fe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(fe.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(fe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(he.pending, (e) => {
          e.status = "loading";
        })
        .addCase(he.fulfilled, (e) => {})
        .addCase(he.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ce.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ce.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ce.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(_e.pending, (e) => {
          e.status = "loading";
        })
        .addCase(_e.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(_e.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ge.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ge.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ge.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: lp } = ws.actions,
  vr = ws.reducer,
  ip = (t) => t.bill.status === "loading";
function br() {
  return r("GET", "api/master/getBranches");
}
function $r() {
  return r("GET", "api/master/getCustomers");
}
function Or() {
  return r("GET", "api/master/getVehicles");
}
function Dr() {
  return r("GET", "api/master/getSuppliers");
}
function Gr() {
  return r("GET", "api/master/getPlaces");
}
function Ir() {
  return r("GET", "api/master/getDrivers");
}
function jr() {
  return r("GET", "api/master/getArticles");
}
function Nr() {
  return r("GET", "api/transactions/getLastLR");
}
function kr(t) {
  return (t.updatedBy = m()), r("PUT", "api/transactions/addFONum", t);
}
function Ur(t) {
  return (t.createdBy = m()), r("POST", "api/transactions/addLorryReceipt", t);
}
function Vr({ id: t, email: e, isWithoutAmount: a, user: c }) {
  const d = `api/transactions/viewLorryReceipt/${t}`;
  return r("POST", d, { email: e, isWithoutAmount: a, user: c });
}
function Mr(t) {
  const e = `api/transactions/removeLorryReceipt/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function xr(t) {
  const e = `api/master/getRateMasterByCustomer/${t}`;
  return r("GET", e, "");
}
function zr(t) {
  return r("POST", "api/transactions/getLorryReceipts", { branch: t });
}
function Fr(t) {
  t.updatedBy = m();
  const e = `api/transactions/updateLorryReceipt/${t._id}`;
  return r("PUT", e, t);
}
function Yr(t) {
  const e = `api/transactions/getLorryReceipt/${t}`;
  return r("GET", e, {});
}
function Hr(t) {
  return r("POST", "api/transactions/getLorryReceiptsWithCount", t);
}
function Qr(t) {
  const e = `api/master/getTransactionPrefix/${t}`;
  return r("GET", e);
}
function Kr(t) {
  return r("POST", "api/master/addTransactionPrefix", t);
}
const Wr = {
    status: "idle",
    branches: [],
    customers: [],
    vehicles: [],
    articles: [],
    drivers: [],
    places: [],
    suppliers: [],
    search: "",
  },
  Te = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await br();
    return { data: e, status: a };
  }),
  ye = n("GET_CUSTOMER", async (t) => {
    const { data: e, status: a } = await $r();
    return { data: e, status: a };
  }),
  Se = n("GET_VEHICLES", async (t) => {
    const { data: e, status: a } = await Or();
    return { data: e, status: a };
  }),
  Re = n("GET_SUPPLIER", async (t) => {
    const { data: e, status: a } = await Dr();
    return { data: e, status: a };
  }),
  Le = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await Gr();
    return { data: e, status: a };
  }),
  Ae = n("GET_DRIVERS", async (t) => {
    const { data: e, status: a } = await Ir();
    return { data: e, status: a };
  }),
  Pe = n("GET_ARTICLES", async (t) => {
    const { data: e, status: a } = await jr();
    return { data: e, status: a };
  }),
  Be = n("GET_LAST_LR", async (t) => {
    const { data: e, status: a } = await Nr();
    return { data: e, status: a };
  }),
  we = n("CREATE_LORRY_RECEIPT", async (t) => {
    const { data: e, status: a } = await Ur(t);
    return { data: e, status: a };
  }),
  ve = n("UPDATE_LORRY_RECEIPT", async (t) => {
    const { data: e, status: a } = await Fr(t);
    return { data: e, status: a };
  }),
  be = n("DOWNLOAD_LORRY_RECEIPT", async (t) => {
    const { data: e, status: a } = await Vr(t);
    return { data: e, status: a };
  }),
  $e = n("GET_LORRY_RECEIPTS", async (t) => {
    const { data: e, status: a } = await zr(t);
    return { data: e, status: a };
  }),
  Oe = n("GET_LORRY_RECEIPT", async (t) => {
    const { data: e, status: a } = await Yr(t);
    return { data: e, status: a };
  }),
  De = n("CREATE_FO_NUM", async (t) => {
    const { data: e, status: a } = await kr(t);
    return { data: e, status: a };
  }),
  Ge = n("DELETE_LORRY_RECEIPT", async (t) => {
    const { data: e, status: a } = await Mr(t);
    return { data: e, status: a };
  }),
  Ie = n("GET_MASTER_BY_CUSTOMERS", async (t) => {
    const { data: e, status: a } = await xr(t);
    return { data: e, status: a };
  }),
  je = n("GET_LORRY_RECEIPT_COUNT", async (t) => {
    const { data: e, status: a } = await Hr(t);
    return { data: e, status: a };
  });
n("GET_LORRY_RECEIPT_NUMBER", async (t) => {
  const { data: e, status: a } = await Qr(t);
  return { data: e, status: a };
});
n("CREATE_LR_NUMBER", async (t) => {
  const { data: e, status: a } = await Kr(t);
  return { data: e, status: a };
});
const vs = g({
    name: "lorryreceipt",
    initialState: Wr,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Te.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Te.fulfilled, (e, { payload: a }) => {
          e.branches = a == null ? void 0 : a.data;
        })
        .addCase(Te.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ye.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ye.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.customers =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name }));
        })
        .addCase(ye.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Se.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Se.fulfilled, (e, { payload: a }) => {
          e.vehicles = a == null ? void 0 : a.data;
        })
        .addCase(Se.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Re.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Re.fulfilled, (e, { payload: a }) => {
          e.suppliers = a == null ? void 0 : a.data;
        })
        .addCase(Re.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Le.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Le.fulfilled, (e, { payload: a }) => {
          var c, d;
          G() && (e.status = "succeeded"),
            (e.places =
              (d =
                (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
              null
                ? void 0
                : d.call(c, (l) => ({ ...l, label: l.name, value: l.name })));
        })
        .addCase(Le.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ae.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ae.fulfilled, (e, { payload: a }) => {
          e.drivers = a == null ? void 0 : a.data;
        })
        .addCase(Ae.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Pe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Pe.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.articles =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name, value: l._id }));
        })
        .addCase(Pe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Be.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Be.fulfilled, (e) => {})
        .addCase(Be.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(we.pending, (e) => {
          e.status = "loading";
        })
        .addCase(we.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(we.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ve.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ve.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ve.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(be.pending, (e) => {
          e.status = "loading";
        })
        .addCase(be.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(be.rejected, (e) => {
          e.status = "failed";
        })
        .addCase($e.pending, (e) => {
          e.status = "loading";
        })
        .addCase($e.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase($e.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Oe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Oe.fulfilled, (e) => {})
        .addCase(Oe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(De.pending, (e) => {
          e.status = "loading";
        })
        .addCase(De.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(De.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ge.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ge.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ge.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ie.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ie.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ie.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(je.pending, (e) => {
          e.status = "loading";
        })
        .addCase(je.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(je.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: up } = vs.actions,
  qr = vs.reducer,
  op = (t) => t.lorryreceipt.status === "loading";
function Jr() {
  return r("GET", "api/master/getBranches");
}
function Xr() {
  return r("GET", "api/master/getPlaces");
}
function Zr(t) {
  return r("POST", "api/transactions/getLoadingSlips", t);
}
function ec(t) {
  const e = `api/transactions/removeLoadingSlip/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const tc = { status: "idle" },
  Ne = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await Jr();
    return { data: e, status: a };
  }),
  ke = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await Xr();
    return { data: e, status: a };
  }),
  Ue = n("GE_LORRY_RECEIPTS", async (t) => {
    const { data: e, status: a } = await Zr(t);
    return { data: e, status: a };
  }),
  Ve = n("DELETE_LOADING_BILL", async (t) => {
    const { data: e, status: a } = await ec(t);
    return { data: e, status: a };
  }),
  ac = g({
    name: "localmemo",
    initialState: tc,
    reducers: {},
    extraReducers: (t) => {
      t.addCase(Ne.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ne.fulfilled, (e) => {})
        .addCase(Ne.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ke.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ke.fulfilled, (e) => {})
        .addCase(ke.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ue.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ue.fulfilled, (e) => {})
        .addCase(Ue.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ve.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ve.fulfilled, (e) => {})
        .addCase(Ve.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  sc = ac.reducer,
  pp = (t) => t.localmemo.status === "loading";
function nc() {
  return r("GET", "api/master/getBranches");
}
function rc() {
  return r("GET", "api/master/getCustomers");
}
function cc() {
  return r("GET", "api/master/getVehicles");
}
function dc() {
  return r("GET", "api/master/getSuppliers");
}
function lc() {
  return r("GET", "api/master/getPlaces");
}
function ic() {
  return r("GET", "api/master/getDrivers");
}
function uc(t) {
  return (t.createdBy = m()), r("POST", "api/transactions/addLoadingSlip", t);
}
function oc({ branch: t, page: e }) {
  return r("POST", "api/transactions/getLorryReceiptsForLS", {
    branch: t,
    page: e,
  });
}
function pc({ id: t, email: e }) {
  const a = `api/transactions/printLoadingSlip/${t}`;
  return r("POST", a, { email: e });
}
function mc(t) {
  return r("POST", "api/transactions/getLorryReceipts", { branch: t });
}
function Ec(t) {
  const e = `api/transactions/removeLoadingSlip/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function fc(t) {
  const e = `api/transactions/getLoadingSlip/${t}`;
  return r("GET", e);
}
function gc(t) {
  t.updatedBy = m();
  const e = `api/transactions/updateLoadingSlip/${t._id}`;
  return r("PUT", e, t);
}
function Cc(t) {
  return r("POST", "api/transactions/getLoadingSlips", t);
}
const hc = {
    status: "idle",
    branches: [],
    customers: [],
    vehicles: [],
    suppliers: [],
    places: [],
    drivers: [],
    search: "",
  },
  Me = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await nc();
    return { data: e, status: a };
  }),
  xe = n("GET_CUSTOMERS", async (t) => {
    const { data: e, status: a } = await rc();
    return { data: e, status: a };
  }),
  ze = n("GET_VEHICLES", async (t) => {
    const { data: e, status: a } = await cc();
    return { data: e, status: a };
  }),
  Fe = n("GET_SUPPLIERS", async (t) => {
    const { data: e, status: a } = await dc();
    return { data: e, status: a };
  }),
  Ye = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await lc();
    return { data: e, status: a };
  }),
  He = n("GET_DRIVERS", async (t) => {
    const { data: e, status: a } = await ic();
    return { data: e, status: a };
  }),
  Qe = n("CREATE_LOADING_SLIP", async (t) => {
    const { data: e, status: a } = await uc(t);
    return { data: e, status: a };
  }),
  Ke = n("GET_LR_RECEIPT_FOR_LS", async (t) => {
    const { data: e, status: a } = await oc(t);
    return { data: e, status: a };
  }),
  We = n("DOWNLOAD_LOADING_SLIP", async (t) => {
    const { data: e, status: a } = await pc(t);
    return { data: e, status: a };
  }),
  qe = n("GE_LORRY_RECEIPTS", async (t) => {
    const { data: e, status: a } = await mc(t);
    return { data: e, status: a };
  }),
  Je = n("GE_LOADING_SLIPS", async (t) => {
    const { data: e, status: a } = await Cc(t);
    return { data: e, status: a };
  }),
  Xe = n("DELETE_LOADING_BILL", async (t) => {
    const { data: e, status: a } = await Ec(t);
    return { data: e, status: a };
  }),
  Ze = n("GE_LOADING_SLIP", async (t) => {
    const { data: e, status: a } = await fc(t);
    return { data: e, status: a };
  }),
  et = n("UPDATE_LOADING_SLIP", async (t) => {
    const { data: e, status: a } = await gc(t);
    return { data: e, status: a };
  }),
  bs = g({
    name: "loadingslip",
    initialState: hc,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Me.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Me.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.branches =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name, value: l._id }));
        })
        .addCase(Me.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(xe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(xe.fulfilled, (e, { payload: a }) => {
          e.customers = a == null ? void 0 : a.data;
        })
        .addCase(xe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ze.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ze.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.vehicles =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({
                  ...l,
                  label: l.vehicleNo,
                  value: l.vehicleNo,
                }));
        })
        .addCase(ze.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Fe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Fe.fulfilled, (e, { payload: a }) => {
          G() && (e.status = "succeeded"),
            (e.suppliers = a == null ? void 0 : a.data);
        })
        .addCase(Fe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ye.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ye.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.places =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name, value: l.name }));
        })
        .addCase(Ye.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(He.pending, (e) => {
          e.status = "loading";
        })
        .addCase(He.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.drivers =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name, value: l.name }));
        })
        .addCase(He.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Qe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Qe.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Qe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ke.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ke.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ke.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(We.pending, (e) => {
          e.status = "loading";
        })
        .addCase(We.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(We.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Je.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Je.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Je.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Xe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Xe.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Xe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(qe.pending, (e) => {
          e.status = "loading";
        })
        .addCase(qe.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(qe.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ze.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ze.fulfilled, (e) => {})
        .addCase(Ze.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(et.pending, (e) => {
          e.status = "loading";
        })
        .addCase(et.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(et.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: mp } = bs.actions,
  _c = bs.reducer,
  Ep = (t) => t.loadingslip.status === "loading";
function Tc() {
  return r("GET", "api/master/getBranches");
}
function yc(t) {
  return (t.createdBy = m()), r("POST", "api/transactions/addMoneyTransfer", t);
}
function Sc(t) {
  const e = `api/transactions/removeMoneyTransfer/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function Rc(t) {
  return r("POST", "api/transactions/getMoneyTransfers", { branch: t });
}
function Lc(t) {
  t.updatedBy = m();
  const e = `api/transactions/updateMoneyTransfer/${t._id}`;
  return r("PUT", e, t);
}
function Ac(t) {
  const e = `api/transactions/getMoneyTransfer/${t}`;
  return r("GET", e, {});
}
const Pc = { status: "idle", search: "" },
  tt = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await Tc();
    return { data: e, status: a };
  }),
  at = n("CREATE_MONEY_TRANSFER", async (t) => {
    const { data: e, status: a } = await yc(t);
    return { data: e, status: a };
  }),
  st = n("UPDATE_MONEY_TRANSFER", async (t) => {
    const { data: e, status: a } = await Lc(t);
    return { data: e, status: a };
  }),
  nt = n("GET_MONEY_TRANSFERS", async (t) => {
    const { data: e, status: a } = await Rc(t);
    return { data: e, status: a };
  }),
  rt = n("GET_MONEY_TRANSFER", async (t) => {
    const { data: e, status: a } = await Ac(t);
    return { data: e, status: a };
  }),
  ct = n("DELETE_MONEY_TRANSFER", async (t) => {
    const { data: e, status: a } = await Sc(t);
    return { data: e, status: a };
  }),
  $s = g({
    name: "moneytransfer",
    initialState: Pc,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(tt.pending, (e) => {})
        .addCase(tt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(tt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(at.pending, (e) => {
          e.status = "loading";
        })
        .addCase(at.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(at.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(st.pending, (e) => {
          e.status = "loading";
        })
        .addCase(st.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(st.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(nt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(nt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(nt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(rt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(rt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(rt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ct.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ct.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ct.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: fp } = $s.actions,
  Bc = $s.reducer,
  gp = (t) => t.moneytransfer.status === "loading";
function wc() {
  return r("GET", "api/master/getBranches");
}
function vc(t) {
  const e = `api/master/getSupplier/${t}`;
  return r("GET", e);
}
function bc() {
  return r("GET", "api/master/getPlaces");
}
function $c() {
  return r("GET", "api/master/getBanks");
}
function Oc() {
  return r("GET", "api/master/getBankAccounts");
}
function Dc({ supplier: t, branch: e }) {
  const a = `api/transactions/getLoadingSlipsBySupplier/${t}`;
  return r("POST", a, { branch: e });
}
function Gc(t) {
  return (t.createdBy = m()), r("POST", "api/transactions/saveSupplierBill", t);
}
function Ic(t) {
  return (
    (t.createdBy = m()),
    r("POST", "api/transactions/saveSupplierPayments", { loadingSlips: t })
  );
}
function jc(t) {
  return r("POST", "api/transactions/updateSupplierBills", {
    supplierBills: t,
  });
}
function Nc(t) {
  return r("POST", "api/master/getSuppliersByType", { supplierType: t });
}
function kc({ supplier: t, branch: e }) {
  const a = `api/transactions/getSupplierBills/${t}`;
  return r("POST", a, { branch: e });
}
const Uc = {
    status: "idle",
    branches: [],
    suppliers: [],
    banks: [],
    bankAccounts: [],
    search: "",
  },
  dt = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await wc();
    return { data: e, status: a };
  }),
  lt = n("GET_SUPPLIER", async (t) => {
    const { data: e, status: a } = await vc(t);
    return { data: e, status: a };
  }),
  it = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await bc();
    return { data: e, status: a };
  }),
  ut = n("GET_BANKS", async (t) => {
    const { data: e, status: a } = await $c();
    return { data: e, status: a };
  }),
  ot = n("GET_BANK_ACCOUNTS", async (t) => {
    const { data: e, status: a } = await Oc();
    return { data: e, status: a };
  }),
  pt = n("CREATE_SUPPLIER_BILL", async (t) => {
    const { data: e, status: a } = await Gc(t);
    return { data: e, status: a };
  }),
  mt = n("CREATE_SUPPLIER_PAYMENTS", async (t) => {
    const { data: e, status: a } = await Ic(t);
    return { data: e, status: a };
  }),
  Et = n("GET_LOADING_SLIPS_BY_SUPPLIER", async (t) => {
    const { data: e, status: a } = await Dc(t);
    return { data: e, status: a };
  }),
  ft = n("GET_SUPPLIER_BY_TYPE", async (t) => {
    const { data: e, status: a } = await Nc(t);
    return { data: e, status: a };
  }),
  gt = n("GET_SUPPLIER_BILLS", async (t) => {
    const { data: e, status: a } = await kc(t);
    return { data: e, status: a };
  }),
  Ct = n("UPDATE_SUPPLIER_BILLS", async (t) => {
    const { data: e, status: a } = await jc(t);
    return { data: e, status: a };
  }),
  Os = g({
    name: "paymentadvice",
    initialState: Uc,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(dt.pending, (e) => {
        e.status = "loading";
      })
        .addCase(dt.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.branches =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({
                  ...l,
                  label: l.accountNo,
                  value: l.accountNo,
                }));
        })
        .addCase(dt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ut.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ut.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.banks =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name, value: l.name }));
        })
        .addCase(ut.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ot.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ot.fulfilled, (e, { payload: a }) => {
          (e.status = "succeeded"),
            (e.bankAccounts = a == null ? void 0 : a.data);
        })
        .addCase(ot.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(lt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(lt.fulfilled, (e, { payload: a }) => {
          e.suppliers = a == null ? void 0 : a.data;
        })
        .addCase(lt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(it.pending, (e) => {
          e.status = "loading";
        })
        .addCase(it.fulfilled, (e, { payload: a }) => {
          e.places = a == null ? void 0 : a.data;
        })
        .addCase(it.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(pt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(pt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(pt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(mt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(mt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(mt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Et.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Et.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Et.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ft.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ft.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ft.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(gt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(gt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(gt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ct.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ct.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ct.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Cp } = Os.actions,
  Vc = Os.reducer,
  hp = (t) => t.paymentadvice.status === "loading";
function Mc() {
  return r("GET", "api/master/getBranches");
}
function xc() {
  return r("GET", "api/master/getBanks");
}
function zc() {
  return r("GET", "api/master/getBankAccounts");
}
function Fc({ customer: t, branch: e }) {
  return r("POST", "api/transactions/getBillsByCustomer", {
    customer: t,
    branch: e,
  });
}
function Yc(t) {
  var a;
  return (
    (a = t == null ? void 0 : t.forEach) == null ||
      a.call(t, (c) => {
        c.payment && (c.payment.createdBy = m());
      }),
    r("POST", "api/transactions/updateBills", { bills: t })
  );
}
function Hc(t) {
  return r("POST", "api/master/getCustomersByBranch", { branchId: t });
}
function Qc({ billId: t, collectionId: e, email: a }) {
  const c = `api/transactions/viewPaymentCollection/${t}/${e}`;
  return r("POST", c, { email: a });
}
const Kc = { status: "idle", search: "" },
  ht = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await Mc();
    return { data: e, status: a };
  }),
  _t = n("GET_CUSTOMER_BY_BRANCH", async (t) => {
    const { data: e, status: a } = await Hc(t);
    return { data: e, status: a };
  }),
  Tt = n("DOWNLOAD_COLLECTION", async (t) => {
    const { data: e, status: a } = await Qc(t);
    return { data: e, status: a };
  }),
  yt = n("GET_BANKS", async (t) => {
    const { data: e, status: a } = await xc();
    return { data: e, status: a };
  }),
  St = n("GET_BANK_ACCOUNTS", async (t) => {
    const { data: e, status: a } = await zc();
    return { data: e, status: a };
  }),
  Rt = n("GET_BILLS_BY_CUSTOMER", async (t) => {
    const { data: e, status: a } = await Fc(t);
    return { data: e, status: a };
  }),
  Lt = n("UPDATE_BILLS", async (t) => {
    const { data: e, status: a } = await Yc(t);
    return { data: e, status: a };
  }),
  Ds = g({
    name: "paymentcollection",
    initialState: Kc,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(ht.pending, (e) => {
        e.status = "loading";
      })
        .addCase(ht.fulfilled, (e) => {
          G() && (e.status = "succeeded");
        })
        .addCase(ht.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(_t.pending, (e) => {
          e.status = "loading";
        })
        .addCase(_t.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(_t.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Tt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Tt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Tt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(yt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(yt.fulfilled, (e) => {})
        .addCase(yt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(St.pending, (e) => {
          e.status = "loading";
        })
        .addCase(St.fulfilled, (e) => {})
        .addCase(St.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Rt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Rt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Rt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Lt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Lt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Lt.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: _p } = Ds.actions,
  Wc = Ds.reducer,
  Tp = (t) => t.paymentcollection.status === "loading";
function qc() {
  return r("GET", "api/master/getBranches");
}
function Jc() {
  return r("GET", "api/master/getCustomers");
}
function Xc() {
  return r("GET", "api/master/getEmployees", "");
}
function Zc() {
  return r("GET", "api/master/getSuppliers");
}
function ed() {
  return r("GET", "api/master/getDrivers");
}
function td() {
  return r("GET", "api/master/getBanks");
}
function ad() {
  return r("GET", "api/master/getBankAccounts");
}
function sd(t) {
  return r("POST", "api/transactions/getPettyTransactions", { branch: t });
}
function nd(t) {
  const e = { ...t },
    a = new Date(e.endDate).getFullYear(),
    c = new Date(e.endDate).getMonth() + 1,
    d = new Date(e.endDate).getDate(),
    l = `${a}-${c}-${d + 1}`;
  let E = new Date(l).setUTCHours(23, 59, 59, 999);
  return (
    (E = new Date(E).toISOString()),
    (e.endDate = E),
    r("POST", "api/transactions/getPettyTransactionsByDate", e)
  );
}
function rd(t) {
  return (
    (t.createdBy = m()), r("POST", "api/transactions/addPettyTransaction", t)
  );
}
function cd(t) {
  return r("POST", "api/transactions/getLoadingSlips", t);
}
function dd() {
  return r("GET", "api/transactions/getPettyCashBalance", {});
}
const ld = { status: "idle" },
  At = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await qc();
    return { data: e, status: a };
  }),
  Pt = n("GET_SUPPLIERS", async (t) => {
    const { data: e, status: a } = await Zc();
    return { data: e, status: a };
  }),
  Bt = n("GET_BANKS", async (t) => {
    const { data: e, status: a } = await td();
    return { data: e, status: a };
  }),
  wt = n("GET_BANK_ACCOUNTS", async (t) => {
    const { data: e, status: a } = await ad();
    return { data: e, status: a };
  }),
  vt = n("GET_CUSTOMERS", async (t) => {
    const { data: e, status: a } = await Jc();
    return { data: e, status: a };
  }),
  bt = n("GET_EMPLOYEES", async (t) => {
    const { data: e, status: a } = await Xc();
    return { data: e, status: a };
  }),
  $t = n("GET_DRIVERS", async (t) => {
    const { data: e, status: a } = await ed();
    return { data: e, status: a };
  }),
  Ot = n("GET_PETTY_TRANSACTIONS", async (t) => {
    const { data: e, status: a } = await sd(t);
    return { data: e, status: a };
  }),
  Dt = n("GET_PETTY_TRANSACTIONS_BY_DATE", async (t) => {
    const { data: e, status: a } = await nd(t);
    return { data: e, status: a };
  }),
  Gt = n("CREATE_PETTY_TRANSACTION", async (t) => {
    const { data: e, status: a } = await rd(t);
    return { data: e, status: a };
  }),
  It = n("GET_LOADING_SLIPS", async (t) => {
    const { data: e, status: a } = await cd(t);
    return { data: e, status: a };
  }),
  jt = n("GET_PETTY_CASH_BALANCE", async (t) => {
    const { data: e, status: a } = await dd();
    return { data: e, status: a };
  }),
  id = g({
    name: "pettycash",
    initialState: ld,
    reducers: {},
    extraReducers: (t) => {
      t.addCase(At.pending, (e) => {
        e.status = "loading";
      })
        .addCase(At.fulfilled, (e) => {})
        .addCase(At.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(vt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(vt.fulfilled, (e) => {})
        .addCase(vt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Bt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Bt.fulfilled, (e) => {})
        .addCase(Bt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Pt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Pt.fulfilled, (e) => {})
        .addCase(Pt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(wt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(wt.fulfilled, (e) => {})
        .addCase(wt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase($t.pending, (e) => {
          e.status = "loading";
        })
        .addCase($t.fulfilled, (e) => {})
        .addCase($t.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(bt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(bt.fulfilled, (e) => {})
        .addCase(bt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ot.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ot.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ot.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Dt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Dt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Dt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Gt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Gt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Gt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(It.pending, (e) => {
          e.status = "loading";
        })
        .addCase(It.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(It.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(jt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(jt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(jt.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  ud = id.reducer,
  yp = (t) => t.pettycash.status === "loading";
function od() {
  return r("GET", "api/master/getPlaces");
}
function pd(t) {
  return (t.createdBy = m()), r("POST", "api/transactions/addQuotation", t);
}
function md(t) {
  const e = `api/transactions/getQuotation/${t}`;
  return r("GET", e, {});
}
function Ed(t) {
  return r("POST", "api/transactions/updateQuotation", t);
}
function fd() {
  return r("GET", "api/transactions/getQuotations", {});
}
function gd(t) {
  const e = `api/transactions/removeQuotation/${t}`;
  return r("POST", e, { id: t, updatedBy: m() });
}
function Cd({ id: t, email: e }) {
  const a = `api/transactions/viewQuotation/${t}`;
  return r("POST", a, { email: e });
}
const hd = { status: "idle", places: [], search: "" },
  Nt = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await od();
    return { data: e, status: a };
  }),
  kt = n("CREATE_QUOTATION", async (t) => {
    const { data: e, status: a } = await pd(t);
    return { data: e, status: a };
  }),
  Ut = n("GET_QUOTATION", async (t) => {
    const { data: e, status: a } = await md(t);
    return { data: e, status: a };
  }),
  Vt = n("UPDATE_QUOTATION", async (t) => {
    const { data: e, status: a } = await Ed(t);
    return { data: e, status: a };
  }),
  Mt = n("GET_QUOTATIONS", async (t) => {
    const { data: e, status: a } = await fd();
    return { data: e, status: a };
  }),
  xt = n("DELETE_QUOTATION", async (t) => {
    const { data: e, status: a } = await gd(t);
    return { data: e, status: a };
  }),
  zt = n("DOWNLOAD_QUOTATION", async (t) => {
    const { data: e, status: a } = await Cd(t);
    return { data: e, status: a };
  }),
  Gs = g({
    name: "quotation",
    initialState: hd,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Nt.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Nt.fulfilled, (e, { payload: a }) => {
          var c, d;
          e.places =
            (d = (c = a == null ? void 0 : a.data) == null ? void 0 : c.map) ==
            null
              ? void 0
              : d.call(c, (l) => ({ ...l, label: l.name, value: l.name }));
        })
        .addCase(Nt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(kt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(kt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(kt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ut.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ut.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ut.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Vt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Vt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Vt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Mt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Mt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Mt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(xt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(xt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(xt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(zt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(zt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(zt.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Sp } = Gs.actions,
  _d = Gs.reducer,
  Rp = (t) => t.quotation.status === "loading";
function Td(t) {
  return (t.createdBy = m()), r("POST", "api/master/addArticle", t);
}
function yd(t) {
  const e = `api/master/getArticle/${t}`;
  return r("GET", e);
}
function Sd(t) {
  t.updatedBy = m();
  const e = `api/master/updateArticle/${t._id}`;
  return r("PUT", e, t);
}
function Rd() {
  return r("GET", "api/master/getArticles");
}
function Ld(t) {
  const e = `api/master/removeArticle/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const Ad = { status: "idle", search: "" },
  Ft = n("CREATE_ARTICLE", async (t) => {
    const { data: e, status: a } = await Td(t);
    return { data: e, status: a };
  }),
  Yt = n("GET_ARTICLE", async (t) => {
    const { data: e, status: a } = await yd(t);
    return { data: e, status: a };
  }),
  Ht = n("UPDATE_ARTICLE", async (t) => {
    const { data: e, status: a } = await Sd(t);
    return { data: e, status: a };
  }),
  Qt = n("GET_ARTICLES", async (t) => {
    const { data: e, status: a } = await Rd();
    return { data: e, status: a };
  }),
  Kt = n("DELETE_ARTICLE", async (t) => {
    const { data: e, status: a } = await Ld(t);
    return { data: e, status: a };
  }),
  Is = g({
    name: "article",
    initialState: Ad,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ft.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ft.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ft.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Yt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Yt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Yt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ht.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ht.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ht.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Qt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Qt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Qt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Kt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Kt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Kt.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Lp } = Is.actions,
  Pd = Is.reducer,
  Ap = (t) => t.article.status === "loading";
function Bd(t) {
  return (t.createdBy = m()), r("POST", "api/master/addBankAccount", t);
}
function wd(t) {
  const e = `api/master/getBankAccount/${t}`;
  return r("GET", e);
}
function vd(t) {
  t.updatedBy = m();
  const e = `api/master/updateBankAccount/${t._id}`;
  return r("PUT", e, t);
}
function bd() {
  return r("GET", "api/master/getBankAccountList");
}
function $d(t) {
  const e = `api/master/removeBankAccount/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function Od() {
  return r("GET", "api/master/getBanks");
}
const Dd = { status: "idle", search: "", banks: [] },
  Wt = n("CREATE_BANK_ACCOUNT", async (t) => {
    const { data: e, status: a } = await Bd(t);
    return { data: e, status: a };
  }),
  qt = n("GET_BANK_ACCOUNT", async (t) => {
    const { data: e, status: a } = await wd(t);
    return { data: e, status: a };
  }),
  Jt = n("UPDATE_BANK_ACCOUNT", async (t) => {
    const { data: e, status: a } = await vd(t);
    return { data: e, status: a };
  }),
  Xt = n("GET_BANK_ACCOUNTS", async (t) => {
    const { data: e, status: a } = await bd();
    return { data: e, status: a };
  }),
  Zt = n("DELETE_BANK_ACCOUNT", async (t) => {
    const { data: e, status: a } = await $d(t);
    return { data: e, status: a };
  }),
  ea = n("GET_BANKS", async (t) => {
    const { data: e, status: a } = await Od();
    return { data: e, status: a };
  }),
  js = g({
    name: "bankAccount",
    initialState: Dd,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Wt.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Wt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Wt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(qt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(qt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(qt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Jt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Jt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Jt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Xt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Xt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Xt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Zt.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Zt.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Zt.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ea.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ea.fulfilled, (e, { payload: a }) => {
          var c, d;
          (e.status = "succeeded"),
            (e.banks =
              (d = (c = a.data) == null ? void 0 : c.map) == null
                ? void 0
                : d.call(c, (l) => ({ ...l, label: l.name, value: l._id })));
        })
        .addCase(ea.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Pp } = js.actions,
  Gd = js.reducer,
  Bp = (t) => t.bankaccount.status === "loading";
function Id(t) {
  return (t.createdBy = m()), r("POST", "api/master/addBank", t);
}
function jd(t) {
  const e = `api/master/getBank/${t}`;
  return r("GET", e);
}
function Nd(t) {
  t.updatedBy = m();
  const e = `api/master/updateBank/${t._id}`;
  return r("PUT", e, t);
}
function kd() {
  return r("GET", "api/master/getBanks");
}
function Ud(t) {
  const e = `api/master/removeBank/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const Vd = { status: "idle", search: "" },
  ta = n("CREATE_BANK", async (t) => {
    const { data: e, status: a } = await Id(t);
    return { data: e, status: a };
  }),
  aa = n("GET_BANK", async (t) => {
    const { data: e, status: a } = await jd(t);
    return { data: e, status: a };
  }),
  sa = n("UPDATE_BANK", async (t) => {
    const { data: e, status: a } = await Nd(t);
    return { data: e, status: a };
  }),
  na = n("GET_BANKS", async (t) => {
    const { data: e, status: a } = await kd();
    return { data: e, status: a };
  }),
  ra = n("DELETE_BANK", async (t) => {
    const { data: e, status: a } = await Ud(t);
    return { data: e, status: a };
  }),
  Ns = g({
    name: "bank",
    initialState: Vd,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(ta.pending, (e) => {
        e.status = "loading";
      })
        .addCase(ta.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ta.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(aa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(aa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(aa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(sa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(sa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(sa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(na.pending, (e) => {
          e.status = "loading";
        })
        .addCase(na.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(na.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ra.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ra.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ra.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: wp } = Ns.actions,
  Md = Ns.reducer,
  vp = (t) => t.bank.status === "loading";
function xd(t) {
  return (t.createdBy = m()), r("POST", "api/master/addBranch", t);
}
function zd(t) {
  const e = `api/master/getBranch/${t}`;
  return r("GET", e);
}
function Fd(t) {
  t.updatedBy = m();
  const e = `api/master/updateBranch/${t._id}`;
  return r("PUT", e, t);
}
function Yd() {
  return r("GET", "api/master/getBranchList");
}
function Hd(t) {
  const e = `api/master/removeBranch/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function Qd() {
  return r("GET", "api/master/getPlaces");
}
const Kd = { status: "idle", search: "", places: [] },
  ca = n("CREATE_BRANCH", async (t) => {
    const { data: e, status: a } = await xd(t);
    return { data: e, status: a };
  }),
  da = n("GET_BRANCH", async (t) => {
    const { data: e, status: a } = await zd(t);
    return { data: e, status: a };
  }),
  la = n("UPDATE_BRANCH", async (t) => {
    const { data: e, status: a } = await Fd(t);
    return { data: e, status: a };
  }),
  ia = n("GET_BRANCHES", async (t) => {
    const { data: e, status: a } = await Yd();
    return { data: e, status: a };
  }),
  ua = n("DELETE_BRANCH", async (t) => {
    const { data: e, status: a } = await Hd(t);
    return { data: e, status: a };
  }),
  oa = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await Qd();
    return { data: e, status: a };
  }),
  ks = g({
    name: "branch",
    initialState: Kd,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(ca.pending, (e) => {
        e.status = "loading";
      })
        .addCase(ca.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ca.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(da.pending, (e) => {
          e.status = "loading";
        })
        .addCase(da.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(da.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(la.pending, (e) => {
          e.status = "loading";
        })
        .addCase(la.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(la.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ia.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ia.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ia.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ua.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ua.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ua.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(oa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(oa.fulfilled, (e, { payload: a }) => {
          var c, d;
          (e.status = "succeeded"),
            (e.places =
              (d = (c = a.data) == null ? void 0 : c.map) == null
                ? void 0
                : d.call(c, (l) => ({ ...l, label: l.name, value: l._id })));
        })
        .addCase(oa.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: bp } = ks.actions,
  Wd = ks.reducer,
  $p = (t) => t.branch.status === "loading";
function qd(t) {
  return (t.createdBy = m()), r("POST", "api/master/addCustomer", t);
}
function Jd(t) {
  const e = `api/master/getCustomer/${t}`;
  return r("GET", e);
}
function Xd(t) {
  t.updatedBy = m();
  const e = `api/master/updateCustomer/${t._id}`;
  return r("PUT", e, t);
}
function Zd() {
  return r("GET", "api/master/getCustomers");
}
function el(t) {
  const e = `api/master/removeCustomer/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const tl = { status: "idle", search: "" },
  pa = n("CREATE_CUSTOMER", async (t) => {
    const { data: e, status: a } = await qd(t);
    return { data: e, status: a };
  }),
  ma = n("GET_CUSTOMER", async (t) => {
    const { data: e, status: a } = await Jd(t);
    return { data: e, status: a };
  }),
  Ea = n("UPDATE_CUSTOMER", async (t) => {
    const { data: e, status: a } = await Xd(t);
    return { data: e, status: a };
  }),
  fa = n("GET_CUSTOMERS", async (t) => {
    const { data: e, status: a } = await Zd();
    return { data: e, status: a };
  }),
  ga = n("DELETE_CUSTOMER", async (t) => {
    const { data: e, status: a } = await el(t);
    return { data: e, status: a };
  }),
  Us = g({
    name: "customer",
    initialState: tl,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(pa.pending, (e) => {
        e.status = "loading";
      })
        .addCase(pa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(pa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ma.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ma.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ma.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ea.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ea.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ea.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(fa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(fa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(fa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ga.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ga.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ga.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Op } = Us.actions,
  al = Us.reducer,
  Dp = (t) => t.customer.status === "loading";
function sl(t) {
  return (t.createdBy = m()), r("POST", "api/master/addDriver", t);
}
function nl(t) {
  const e = `api/master/getDriver/${t}`;
  return r("GET", e);
}
function rl(t) {
  t.updatedBy = m();
  const e = `api/master/updateDriver/${t._id}`;
  return r("PUT", e, t);
}
function cl() {
  return r("GET", "api/master/getDrivers");
}
function dl(t) {
  const e = `api/master/removeDriver/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function ll() {
  return r("GET", "api/master/getLastDriver");
}
const il = { status: "idle", search: "" },
  Ca = n("CREATE_DRIVER", async (t) => {
    const { data: e, status: a } = await sl(t);
    return { data: e, status: a };
  }),
  ha = n("GET_DRIVER", async (t) => {
    const { data: e, status: a } = await nl(t);
    return { data: e, status: a };
  }),
  _a = n("UPDATE_DRIVER", async (t) => {
    const { data: e, status: a } = await rl(t);
    return { data: e, status: a };
  }),
  Ta = n("GET_DRIVERS", async (t) => {
    const { data: e, status: a } = await cl();
    return { data: e, status: a };
  }),
  ya = n("DELETE_DRIVER", async (t) => {
    const { data: e, status: a } = await dl(t);
    return { data: e, status: a };
  }),
  Sa = n("GET_LAST_DRIVER", async (t) => {
    const { data: e, status: a } = await ll();
    return { data: e, status: a };
  }),
  Vs = g({
    name: "driver",
    initialState: il,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ca.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ca.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ca.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ha.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ha.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ha.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(_a.pending, (e) => {
          e.status = "loading";
        })
        .addCase(_a.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(_a.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ta.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ta.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ta.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ya.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ya.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ya.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Sa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Sa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Sa.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Gp } = Vs.actions,
  ul = Vs.reducer,
  Ip = (t) => t.driver.status === "loading";
function ol(t) {
  return (t.createdBy = m()), r("POST", "api/master/addEmployee", t);
}
function pl(t) {
  const e = `api/master/getEmployee/${t}`;
  return r("GET", e);
}
function ml(t) {
  t.updatedBy = m();
  const e = `api/master/updateEmployee/${t._id}`;
  return r("PUT", e, t);
}
function El() {
  return r("GET", "api/master/getEmployees");
}
function fl(t) {
  const e = `api/master/removeEmployee/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function gl() {
  return r("GET", "api/master/getLastEmployee");
}
const Cl = { status: "idle", search: "" },
  Ra = n("CREATE_EMPLOYEE", async (t) => {
    const { data: e, status: a } = await ol(t);
    return { data: e, status: a };
  }),
  La = n("GET_EMPLOYEE", async (t) => {
    const { data: e, status: a } = await pl(t);
    return { data: e, status: a };
  }),
  Aa = n("UPDATE_EMPLOYEE", async (t) => {
    const { data: e, status: a } = await ml(t);
    return { data: e, status: a };
  }),
  Pa = n("GET_EMPLOYEES", async (t) => {
    const { data: e, status: a } = await El();
    return { data: e, status: a };
  }),
  Ba = n("DELETE_EMPLOYEE", async (t) => {
    const { data: e, status: a } = await fl(t);
    return { data: e, status: a };
  }),
  wa = n("GET_LAST_EMPLOYEE", async (t) => {
    const { data: e, status: a } = await gl();
    return { data: e, status: a };
  }),
  Ms = g({
    name: "employee",
    initialState: Cl,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ra.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ra.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ra.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(La.pending, (e) => {
          e.status = "loading";
        })
        .addCase(La.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(La.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Aa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Aa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Aa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Pa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Pa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Pa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ba.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ba.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ba.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(wa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(wa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(wa.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: jp } = Ms.actions,
  hl = Ms.reducer,
  Np = (t) => t.employee.status === "loading";
function _l(t) {
  return (t.createdBy = m()), r("POST", "api/master/addPlace", t);
}
function Tl(t) {
  const e = `api/master/getPlace/${t}`;
  return r("GET", e);
}
function yl(t) {
  t.updatedBy = m();
  const e = `api/master/updatePlace/${t._id}`;
  return r("PUT", e, t);
}
function Sl() {
  return r("GET", "api/master/getPlaces");
}
function Rl(t) {
  const e = `api/master/removePlace/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const Ll = { status: "idle", search: "" },
  va = n("CREATE_PLACE", async (t) => {
    const { data: e, status: a } = await _l(t);
    return { data: e, status: a };
  }),
  ba = n("GET_PLACE", async (t) => {
    const { data: e, status: a } = await Tl(t);
    return { data: e, status: a };
  }),
  $a = n("UPDATE_PLACE", async (t) => {
    const { data: e, status: a } = await yl(t);
    return { data: e, status: a };
  }),
  Oa = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await Sl();
    return { data: e, status: a };
  }),
  Da = n("DELETE_PLACE", async (t) => {
    const { data: e, status: a } = await Rl(t);
    return { data: e, status: a };
  }),
  xs = g({
    name: "place",
    initialState: Ll,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(va.pending, (e) => {
        e.status = "loading";
      })
        .addCase(va.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(va.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ba.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ba.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ba.rejected, (e) => {
          e.status = "failed";
        })
        .addCase($a.pending, (e) => {
          e.status = "loading";
        })
        .addCase($a.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase($a.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Oa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Oa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Oa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Da.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Da.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Da.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: kp } = xs.actions,
  Al = xs.reducer,
  Up = (t) => t.place.status === "loading";
function Pl(t) {
  return (t.createdBy = m()), r("POST", "api/master/addToRateMaster", t);
}
function Bl(t) {
  const e = `api/master/getRateMasterById/${t}`;
  return r("GET", e);
}
function wl(t) {
  return (t.updatedBy = m()), r("POST", "api/master/updateRateMaster", t);
}
function vl(t) {
  return r("POST", "api/master/getRateListWithPagination", t);
}
function bl() {
  return r("GET", "api/master/getPlaces");
}
function $l() {
  return r("GET", "api/master/getArticles");
}
function Ol() {
  return r("GET", "api/master/getCustomersForRateMaster");
}
const Dl = { status: "idle", search: "" },
  Ga = n("CREATE_RATE_MASTER", async (t) => {
    const { data: e, status: a } = await Pl(t);
    return { data: e, status: a };
  }),
  Ia = n("GET_RATE_MASTER", async (t) => {
    const { data: e, status: a } = await Bl(t);
    return { data: e, status: a };
  }),
  ja = n("UPDATE_RATE_MASTER", async (t) => {
    const { data: e, status: a } = await wl(t);
    return { data: e, status: a };
  }),
  Na = n("GET_RATE_MASTERS", async (t) => {
    const { data: e, status: a } = await vl(t);
    return { data: e, status: a };
  }),
  ka = n("GET_PLACES", async (t) => {
    const { data: e, status: a } = await bl();
    return { data: e, status: a };
  }),
  Ua = n("GET_ARTICLES", async (t) => {
    const { data: e, status: a } = await $l();
    return { data: e, status: a };
  }),
  Va = n("GET_CUSTOMERS_FOR_RATE_MASTER", async (t) => {
    const { data: e, status: a } = await Ol();
    return { data: e, status: a };
  }),
  zs = g({
    name: "rateMaster",
    initialState: Dl,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ga.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ga.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ga.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ia.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ia.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ia.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ja.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ja.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ja.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ka.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ka.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ka.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Na.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Na.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Na.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ua.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ua.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ua.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Va.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Va.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Va.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Vp } = zs.actions,
  Gl = zs.reducer,
  Mp = (t) => t.ratemaster.status === "loading";
function Il(t) {
  return (t.createdBy = m()), r("POST", "api/master/addSupplier", t);
}
function jl(t) {
  const e = `api/master/getSupplier/${t}`;
  return r("GET", e);
}
function Nl(t) {
  t.updatedBy = m();
  const e = `api/master/updateSupplier/${t._id}`;
  return r("PUT", e, t);
}
function kl() {
  return r("GET", "api/master/getSuppliers");
}
function Ul(t) {
  const e = `api/master/removeSupplier/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const Vl = { status: "idle", search: "" },
  Ma = n("CREATE_SUPPLIER", async (t) => {
    const { data: e, status: a } = await Il(t);
    return { data: e, status: a };
  }),
  xa = n("GET_SUPPLIER", async (t) => {
    const { data: e, status: a } = await jl(t);
    return { data: e, status: a };
  }),
  za = n("UPDATE_SUPPLIER", async (t) => {
    const { data: e, status: a } = await Nl(t);
    return { data: e, status: a };
  }),
  Fa = n("GET_SUPPLIERS", async (t) => {
    const { data: e, status: a } = await kl();
    return { data: e, status: a };
  }),
  Ya = n("DELETE_SUPPLIER", async (t) => {
    const { data: e, status: a } = await Ul(t);
    return { data: e, status: a };
  }),
  Fs = g({
    name: "supplier",
    initialState: Vl,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ma.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ma.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ma.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(xa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(xa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(xa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(za.pending, (e) => {
          e.status = "loading";
        })
        .addCase(za.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(za.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Fa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Fa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Fa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ya.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ya.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ya.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: xp } = Fs.actions,
  Ml = Fs.reducer,
  zp = (t) => t.supplier.status === "loading";
function xl(t) {
  return (t.createdBy = m()), r("POST", "api/master/addVehicleType", t);
}
function zl(t) {
  const e = `api/master/getVehicleType/${t}`;
  return r("GET", e);
}
function Fl(t) {
  t.updatedBy = m();
  const e = `api/master/updateVehicleType/${t._id}`;
  return r("PUT", e, t);
}
function Yl() {
  return r("GET", "api/master/getVehicleTypes");
}
function Hl(t) {
  const e = `api/master/removeVehicleType/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
const Ql = { status: "idle", search: "" },
  Ha = n("CREATE_VEHICLE_TYPE", async (t) => {
    const { data: e, status: a } = await xl(t);
    return { data: e, status: a };
  }),
  Qa = n("GET_VEHICLE_TYPE", async (t) => {
    const { data: e, status: a } = await zl(t);
    return { data: e, status: a };
  }),
  Ka = n("UPDATE_VEHICLE_TYPE", async (t) => {
    const { data: e, status: a } = await Fl(t);
    return { data: e, status: a };
  }),
  Wa = n("GET_VEHICLE_TYPES", async (t) => {
    const { data: e, status: a } = await Yl();
    return { data: e, status: a };
  }),
  qa = n("DELETE_VEHICLE_TYPE", async (t) => {
    const { data: e, status: a } = await Hl(t);
    return { data: e, status: a };
  }),
  Ys = g({
    name: "vehicleType",
    initialState: Ql,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ha.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ha.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ha.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Qa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Qa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Qa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Ka.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Ka.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ka.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Wa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Wa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Wa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(qa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(qa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(qa.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Fp } = Ys.actions,
  Kl = Ys.reducer,
  Yp = (t) => t.vehicletype.status === "loading";
function Wl(t) {
  return (t.createdBy = m()), r("POST", "api/master/addVehicle", t);
}
function ql(t) {
  const e = `api/master/getVehicle/${t}`;
  return r("GET", e);
}
function Jl(t) {
  t.updatedBy = m();
  const e = `api/master/updateVehicle/${t._id}`;
  return r("PUT", e, t);
}
function Xl() {
  return r("GET", "api/master/getVehicleList");
}
function Zl(t) {
  const e = `api/master/removeVehicle/${t}`;
  return r("DELETE", e, { id: t, updatedBy: m() });
}
function ei() {
  return r("GET", "api/master/getVehicleTypes");
}
function ti() {
  return r("GET", "api/master/getSuppliers");
}
const ai = { status: "idle", search: "", vehicleTypes: [], suppliers: [] },
  Ja = n("CREATE_VEHICLE", async (t) => {
    const { data: e, status: a } = await Wl(t);
    return { data: e, status: a };
  }),
  Xa = n("GET_VEHICLE", async (t) => {
    const { data: e, status: a } = await ql(t);
    return { data: e, status: a };
  }),
  Za = n("UPDATE_VEHICLE", async (t) => {
    const { data: e, status: a } = await Jl(t);
    return { data: e, status: a };
  }),
  es = n("GET_VEHICLES", async (t) => {
    const { data: e, status: a } = await Xl();
    return { data: e, status: a };
  }),
  ts = n("DELETE_VEHICLE", async (t) => {
    const { data: e, status: a } = await Zl(t);
    return { data: e, status: a };
  }),
  as = n("GET_VEHICLE_TYPES", async (t) => {
    const { data: e, status: a } = await ei();
    return { data: e, status: a };
  }),
  ss = n("GET_SUPPLIERS", async (t) => {
    const { data: e, status: a } = await ti();
    return { data: e, status: a };
  }),
  Hs = g({
    name: "vehicle",
    initialState: ai,
    reducers: {
      setSearch: (t, { payload: e }) => {
        t.search = e;
      },
    },
    extraReducers: (t) => {
      t.addCase(Ja.pending, (e) => {
        e.status = "loading";
      })
        .addCase(Ja.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Ja.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Xa.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Xa.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Xa.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(es.pending, (e) => {
          e.status = "loading";
        })
        .addCase(es.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(es.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(Za.pending, (e) => {
          e.status = "loading";
        })
        .addCase(Za.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(Za.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(as.pending, (e) => {
          e.status = "loading";
        })
        .addCase(as.fulfilled, (e, { payload: a }) => {
          var c, d;
          (e.status = "succeeded"),
            (e.vehicleTypes =
              (d = (c = a.data) == null ? void 0 : c.map) == null
                ? void 0
                : d.call(c, (l) => ({ ...l, label: l.type, value: l._id })));
        })
        .addCase(as.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ts.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ts.fulfilled, (e) => {
          e.status = "succeeded";
        })
        .addCase(ts.rejected, (e) => {
          e.status = "failed";
        })
        .addCase(ss.pending, (e) => {
          e.status = "loading";
        })
        .addCase(ss.fulfilled, (e, { payload: a }) => {
          var c, d;
          (e.status = "succeeded"),
            (e.suppliers =
              (d = (c = a.data) == null ? void 0 : c.map) == null
                ? void 0
                : d.call(c, (l) => ({ ...l, label: l.name, value: l._id })));
        })
        .addCase(ss.rejected, (e) => {
          e.status = "failed";
        });
    },
  }),
  { setSearch: Hp } = Hs.actions,
  si = Hs.reducer,
  Qp = (t) => t.vehicle.status === "loading",
  ni = cn({
    user: Fn,
    lrregisterreport: tr,
    billregisterreport: Kn,
    tripsheetreport: lr,
    acknowledge: Cr,
    bill: vr,
    localmemo: sc,
    loadingslip: _c,
    lorryreceipt: qr,
    moneytransfer: Bc,
    paymentadvice: Vc,
    paymentcollection: Wc,
    pettycash: ud,
    quotation: _d,
    article: Pd,
    bankaccount: Gd,
    bank: Md,
    branch: Wd,
    customer: al,
    driver: ul,
    employee: hl,
    place: Al,
    ratemaster: Gl,
    supplier: Ml,
    vehicletype: Kl,
    vehicle: si,
  }),
  ri = (t, e) => (
    e.type === "user/removeUser" &&
      (ns.removeItem("persist:root"), ns.removeItem("jwt_token"), (t = {})),
    ni(t, e)
  ),
  ci = { timeout: 500, key: "root", version: 1, storage: ns, blacklist: [""] },
  di = qs(ci, ri),
  rs = rn({
    reducer: di,
    middleware: (t) =>
      t({ serializableCheck: { ignoredActions: [Js, Xs, Zs, en, tn, an] } }),
  }),
  li = "modulepreload",
  ii = function (t) {
    return "/" + t;
  },
  Es = {},
  o = function (e, a, c) {
    if (!a || a.length === 0) return e();
    const d = document.getElementsByTagName("link");
    return Promise.all(
      a.map((l) => {
        if (((l = ii(l)), l in Es)) return;
        Es[l] = !0;
        const E = l.endsWith(".css"),
          f = E ? '[rel="stylesheet"]' : "";
        if (!!c)
          for (let y = d.length - 1; y >= 0; y--) {
            const R = d[y];
            if (R.href === l && (!E || R.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${l}"]${f}`)) return;
        const C = document.createElement("link");
        if (
          ((C.rel = E ? "stylesheet" : li),
          E || ((C.as = "script"), (C.crossOrigin = "")),
          (C.href = l),
          document.head.appendChild(C),
          E)
        )
          return new Promise((y, R) => {
            C.addEventListener("load", y),
              C.addEventListener("error", () =>
                R(new Error(`Unable to preload CSS for ${l}`))
              );
          });
      })
    )
      .then(() => e())
      .catch((l) => {
        const E = new Event("vite:preloadError", { cancelable: !0 });
        if (((E.payload = l), window.dispatchEvent(E), !E.defaultPrevented))
          throw l;
      });
  },
  p = ({ parent: t, path: e, process: a, children: c }) => {
    const d = $((l) => l.user);
    return !d || !d.type || !d.username
      ? s.createElement(b, { to: "/", replace: !0 })
      : d.permissions[t][e][a]
      ? c
      : s.createElement(b, { to: "/unauthorized", replace: !0 });
  },
  Kp = (t, e, a) => {
    const c = ds();
    return (c && c.username ? c : {}).permissions[t][e][a];
  },
  ui = () =>
    s.createElement(
      ln,
      { open: !0, sx: { color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 } },
      s.createElement(un, { color: "inherit" })
    ),
  oi = "/assets/arrow-down-72795007.svg",
  pi = "/assets/arrow-c5db7dfb.svg",
  mi = "/assets/jsmt-31d40a0b.png",
  Ei = "/assets/tnb_logo_01-8d7ca1f8.jpg",
  fi = "/assets/web-81498467.png";
const gi = { username: "", password: "" },
  fs = {
    username: { invalid: !1, message: "" },
    password: { invalid: !1, message: "" },
  },
  Ci = () => {
    const [t, e] = u.useState(gi),
      [a, c] = u.useState(fs),
      [d, l] = u.useState(""),
      E = $(Yn),
      f = ys(),
      T = Ss(),
      C = u.useRef(null),
      y = u.useRef(null);
    u.useEffect(() => {
      f(Ps());
    }, []);
    const R = u.useCallback(() => {
        T("/");
      }, [T]),
      w = (h) => {
        var P, I, j, is, N, us, os;
        const _ = { ...fs };
        (!h.username ||
          !(
            (I = (P = h.username) == null ? void 0 : P.trim) != null &&
            I.call(P)
          )) &&
          ((_.username = { invalid: !0, message: "Username is required" }),
          (y.current.style.border = "1px solid red")),
          !h.password ||
          !(
            (is = (j = h.password) == null ? void 0 : j.trim) != null &&
            is.call(j)
          )
            ? ((_.password = { invalid: !0, message: "Password is required" }),
              (C.current.style.border = "1px solid red"))
            : ((os =
                (us = (N = h.password) == null ? void 0 : N.trim) == null
                  ? void 0
                  : us.call(N)) == null
                ? void 0
                : os.length) < 5 &&
              ((_.password = {
                invalid: !0,
                message: "Password length should be 5 or more characters",
              }),
              (C.current.style.border = "1px solid red"));
        let B = !1;
        for (const Qs in _) _[Qs].invalid === !0 && (B = !0);
        return B && c(_), B;
      },
      A = (h) => {
        h.preventDefault(),
          w(t) ||
            f(k(t))
              .then(({ payload: _ = {} }) => {
                var B;
                if ((B = _ == null ? void 0 : _.data) != null && B.message)
                  l(_.data.message);
                else {
                  const { token: P, type: I } =
                    (_ == null ? void 0 : _.data) || {};
                  An(P),
                    Pn(I),
                    f(zn(_ == null ? void 0 : _.data)),
                    l(""),
                    P && R();
                }
              })
              .catch(() => {
                l(
                  "Something went wrong! Please try later or contact Administrator."
                );
              });
      },
      S = (h) => {
        const _ = h.target.name,
          B = h.target.value;
        (y.current.style.border = "none"),
          (C.current.style.border = "none"),
          e((P) => ({ ...P, [_]: B }));
      },
      O = () => {
        let h = document.getElementById("toggler");
        C.current.type === "text"
          ? ((C.current.type = "password"),
            h.classList.remove("far"),
            h.classList.remove("fa-eye"),
            h.classList.add("fa-regular"),
            h.classList.add("fa-eye-slash"))
          : ((C.current.type = "text"),
            h.classList.add("fa-eye"),
            h.classList.add("far"),
            h.classList.remove("fa-regular"),
            h.classList.remove("fa-eye-slash"));
      };
    return s.createElement(
      s.Fragment,
      null,
      E && s.createElement(ui, null),
      s.createElement(
        "div",
        { className: "container" },
        s.createElement(
          "div",
          { className: "row" },
          s.createElement(
            "div",
            { className: "col-lg-6" },
            s.createElement("img", {
              src: Ei,
              alt: "Transporter NoteBook",
              className: "imgontop",
            })
          )
        )
      ),
      s.createElement(
        "section",
        { className: "sectionimage", style: { height: "93dvh" } },
        s.createElement(
          "div",
          { className: "px-4 py-5 px-md-5 text-center text-lg-start" },
          s.createElement(
            "div",
            { className: "container" },
            s.createElement(
              "div",
              { className: "row gx-lg-5 align-items-center down" },
              s.createElement(
                "div",
                { className: "col-lg-6 mb-5 mb-lg-0" },
                s.createElement(
                  "h1",
                  { className: "my-4 display-6 h1 ls-tight" },
                  "Welcome to the Transporter NoteBook Digital ERP System"
                ),
                s.createElement(
                  "h4",
                  { className: "divider h4 ls-tight" },
                  "Facilitating Transport, Enabling Growth"
                ),
                s.createElement(
                  "p",
                  { className: "p" },
                  "Economic growth critically depends on efficient transportation systems. TNB makes all the data and processes in multiple branches across India, completely digital, safe, and accessible from anywhere"
                )
              ),
              s.createElement(
                "div",
                { className: "col-lg-6 mb-5 mb-lg-0 form" },
                s.createElement(
                  "div",
                  { className: "card" },
                  s.createElement(
                    "div",
                    { className: "card-body py-5 px-md-5" },
                    s.createElement(
                      "form",
                      null,
                      s.createElement(
                        "div",
                        { className: "row" },
                        s.createElement(
                          "p",
                          { className: "p", style: { textAlign: "center" } },
                          s.createElement("img", {
                            src: mi,
                            alt: "Transporter NoteBook",
                            width: "80%",
                          })
                        ),
                        s.createElement(
                          "div",
                          { className: "wrap-input" },
                          s.createElement("input", {
                            ref: y,
                            type: "email",
                            className: "input100 input",
                            name: "username",
                            placeholder: "Username or Email ID",
                            required: !0,
                            onChange: S,
                          }),
                          s.createElement("span", {
                            className: "focus-input100",
                          }),
                          s.createElement(
                            "span",
                            { className: "symbol-input100" },
                            s.createElement("i", { className: "fa fa-user" })
                          )
                        ),
                        s.createElement(
                          "div",
                          { className: "wrap-input" },
                          s.createElement("input", {
                            ref: C,
                            type: "password",
                            className: "input100 input",
                            name: "password",
                            placeholder: "Password",
                            id: "tnbpass",
                            required: !0,
                            onChange: S,
                          }),
                          s.createElement("span", {
                            className: "focus-input100",
                          }),
                          s.createElement(
                            "span",
                            { className: "symbol-input100" },
                            s.createElement("i", { className: "fa fa-lock" })
                          ),
                          s.createElement(
                            "span",
                            null,
                            s.createElement("i", {
                              id: "toggler",
                              className: "fa-regular fa-eye-slash",
                              onClick: O,
                            })
                          )
                        )
                      ),
                      s.createElement(
                        "div",
                        { className: "col-lg-12 buttonform" },
                        s.createElement(
                          "div",
                          { className: "text-center" },
                          s.createElement(
                            "button",
                            {
                              type: "submit",
                              className:
                                "btn btn-primary btn-block mb-4 formbutton button",
                              onClick: A,
                            },
                            "LOGIN"
                          )
                        )
                      ),
                      d &&
                        s.createElement(
                          on,
                          {
                            sx: {
                              width: "100%",
                              margin: "0 0 30px 0",
                              border: "1px solid red",
                              borderRadius: "4px",
                            },
                            spacing: 2,
                          },
                          s.createElement(pn, { severity: "error" }, d)
                        )
                    )
                  )
                )
              )
            )
          )
        )
      ),
      s.createElement(
        "section",
        { style: { padding: "10px" } },
        s.createElement(
          "div",
          { className: "container" },
          s.createElement(
            "div",
            { className: "row" },
            s.createElement(
              "div",
              { className: "col-lg-7" },
              s.createElement("img", {
                src: fi,
                alt: "Transporter NoteBook Website",
                height: "50%",
              }),
              " ",
              " ",
              s.createElement(
                "a",
                {
                  href: "https://transporternotebook.com/",
                  target: "_blank",
                  rel: "noreferrer",
                },
                "Transporter Note Book"
              )
            ),
            s.createElement(
              "div",
              { className: "col-lg-3" },
              "Powered by ",
              s.createElement("a", { href: "vspace.in" }, "vspace.in"),
              " software"
            ),
            s.createElement(
              "div",
              { className: "col-lg-2" },
              "Email ",
              s.createElement(
                "a",
                { href: "mailto:tnb@vspae.in" },
                "tnb@vspae.in"
              )
            )
          )
        )
      )
    );
  },
  hi = () => {
    var e;
    const t = $((a) => a.user);
    return t.username
      ? s.createElement(
          s.Fragment,
          null,
          s.createElement(
            "h1",
            { className: "pageHead homeTitle", style: { textAlign: "center" } },
            s.createElement(
              "span",
              { className: "welcome-text" },
              "Welcome",
              " ",
              t && t.employee && t.employee.name ? t.employee.name : "",
              " ",
              "to"
            ),
            " ",
            s.createElement("br", null),
            " ",
            (e = "Jai Santoshi Maa Transport".toLowerCase) == null
              ? void 0
              : e.call("Jai Santoshi Maa Transport")
          )
        )
      : s.createElement(Ci, null);
  },
  _i = u.lazy(() =>
    o(
      () => import("./UsersList-2e7de8a8.js"),
      [
        "assets/UsersList-2e7de8a8.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ti = u.lazy(() =>
    o(
      () => import("./UserRegistration-abb6634c.js"),
      [
        "assets/UserRegistration-abb6634c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  yi = u.lazy(() =>
    o(
      () => import("./UserPermissions-c841aa44.js"),
      [
        "assets/UserPermissions-c841aa44.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
        "assets/UserPermissions-f843ec4f.css",
      ]
    )
  ),
  Si = u.lazy(() =>
    o(
      () => import("./UserEdit-448816e5.js"),
      [
        "assets/UserEdit-448816e5.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ri = u.lazy(() =>
    o(
      () => import("./ArticlesList-d31dcce1.js"),
      [
        "assets/ArticlesList-d31dcce1.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Li = u.lazy(() =>
    o(
      () => import("./ArticleAdd-564b6c1d.js"),
      [
        "assets/ArticleAdd-564b6c1d.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ai = u.lazy(() =>
    o(
      () => import("./ArticleEdit-01f6b569.js"),
      [
        "assets/ArticleEdit-01f6b569.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Pi = u.lazy(() =>
    o(
      () => import("./index-4a628cbb.js"),
      [
        "assets/index-4a628cbb.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
      ]
    )
  ),
  Bi = u.lazy(() =>
    o(
      () => import("./PlacesList-b512470a.js"),
      [
        "assets/PlacesList-b512470a.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  wi = u.lazy(() =>
    o(
      () => import("./PlaceAdd-0f889734.js"),
      [
        "assets/PlaceAdd-0f889734.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  vi = u.lazy(() =>
    o(
      () => import("./PlaceEdit-707df9dc.js"),
      [
        "assets/PlaceEdit-707df9dc.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  bi = u.lazy(() =>
    o(
      () => import("./BranchList-0f98b94e.js"),
      [
        "assets/BranchList-0f98b94e.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  $i = u.lazy(() =>
    o(
      () => import("./BranchAdd-e2f0d971.js"),
      [
        "assets/BranchAdd-e2f0d971.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Oi = u.lazy(() =>
    o(
      () => import("./BranchEdit-a69c4d39.js"),
      [
        "assets/BranchEdit-a69c4d39.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Di = u.lazy(() =>
    o(
      () => import("./CustomersList-b21ffc03.js"),
      [
        "assets/CustomersList-b21ffc03.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Gi = u.lazy(() =>
    o(
      () => import("./CustomerAdd-d239835c.js"),
      [
        "assets/CustomerAdd-d239835c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/ContactPersonForm-318a0da1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/TaxDetailList-4b4d08c3.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/@material-ui-774e3213.js",
        "assets/clsx-1229b3e0.js",
        "assets/jss-7659e388.js",
        "assets/is-in-browser-9e40da8a.js",
        "assets/jss-plugin-rule-value-function-051edbeb.js",
        "assets/jss-plugin-global-64559e95.js",
        "assets/jss-plugin-nested-6377d8b0.js",
        "assets/jss-plugin-camel-case-92f9f32c.js",
        "assets/hyphenate-style-name-80972348.js",
        "assets/jss-plugin-default-unit-593cc4c5.js",
        "assets/jss-plugin-vendor-prefixer-4dd06b33.js",
        "assets/css-vendor-33142dc8.js",
        "assets/jss-plugin-props-sort-0c9fca2f.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ii = u.lazy(() =>
    o(
      () => import("./CustomerEdit-940a23ee.js"),
      [
        "assets/CustomerEdit-940a23ee.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/ContactPersonForm-318a0da1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/TaxDetailList-4b4d08c3.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/@material-ui-774e3213.js",
        "assets/clsx-1229b3e0.js",
        "assets/jss-7659e388.js",
        "assets/is-in-browser-9e40da8a.js",
        "assets/jss-plugin-rule-value-function-051edbeb.js",
        "assets/jss-plugin-global-64559e95.js",
        "assets/jss-plugin-nested-6377d8b0.js",
        "assets/jss-plugin-camel-case-92f9f32c.js",
        "assets/hyphenate-style-name-80972348.js",
        "assets/jss-plugin-default-unit-593cc4c5.js",
        "assets/jss-plugin-vendor-prefixer-4dd06b33.js",
        "assets/css-vendor-33142dc8.js",
        "assets/jss-plugin-props-sort-0c9fca2f.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  ji = u.lazy(() =>
    o(
      () => import("./DriversList-e100853e.js"),
      [
        "assets/DriversList-e100853e.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ni = u.lazy(() =>
    o(
      () => import("./DriverAdd-2084e19b.js"),
      [
        "assets/DriverAdd-2084e19b.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  ki = u.lazy(() =>
    o(
      () => import("./DriverEdit-c22b6a50.js"),
      [
        "assets/DriverEdit-c22b6a50.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/dayjs-7f45ce31.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ui = u.lazy(() =>
    o(
      () => import("./EmployeeList-42dcab5c.js"),
      [
        "assets/EmployeeList-42dcab5c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Vi = u.lazy(() =>
    o(
      () => import("./EmployeeAdd-cd40b1a3.js"),
      [
        "assets/EmployeeAdd-cd40b1a3.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Mi = u.lazy(() =>
    o(
      () => import("./EmployeeEdit-98295722.js"),
      [
        "assets/EmployeeEdit-98295722.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/dayjs-7f45ce31.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  xi = u.lazy(() =>
    o(
      () => import("./VehiclesList-aa7146e9.js"),
      [
        "assets/VehiclesList-aa7146e9.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  zi = u.lazy(() =>
    o(
      () => import("./VehicleAdd-4e2ddd73.js"),
      [
        "assets/VehicleAdd-4e2ddd73.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/TaxDetailList-53787b08.js",
        "assets/icons-material-4539f19e.js",
        "assets/TaxDetailList-4b4d08c3.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Fi = u.lazy(() =>
    o(
      () => import("./VehicleEdit-1e528d4e.js"),
      [
        "assets/VehicleEdit-1e528d4e.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/dayjs-7f45ce31.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/TaxDetailList-53787b08.js",
        "assets/icons-material-4539f19e.js",
        "assets/TaxDetailList-4b4d08c3.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Yi = u.lazy(() =>
    o(
      () => import("./VehicleTypesList-7dbc03ce.js"),
      [
        "assets/VehicleTypesList-7dbc03ce.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Hi = u.lazy(() =>
    o(
      () => import("./VehicleTypeAdd-5c9106cf.js"),
      [
        "assets/VehicleTypeAdd-5c9106cf.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Qi = u.lazy(() =>
    o(
      () => import("./VehicleTypeEdit-5eb30199.js"),
      [
        "assets/VehicleTypeEdit-5eb30199.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ki = u.lazy(() =>
    o(
      () => import("./SuppliersList-013ec014.js"),
      [
        "assets/SuppliersList-013ec014.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Wi = u.lazy(() =>
    o(
      () => import("./SupplierAdd-c081f172.js"),
      [
        "assets/SupplierAdd-c081f172.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/ContactPersonForm-318a0da1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/TaxDetailList-4b4d08c3.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/@material-ui-774e3213.js",
        "assets/clsx-1229b3e0.js",
        "assets/jss-7659e388.js",
        "assets/is-in-browser-9e40da8a.js",
        "assets/jss-plugin-rule-value-function-051edbeb.js",
        "assets/jss-plugin-global-64559e95.js",
        "assets/jss-plugin-nested-6377d8b0.js",
        "assets/jss-plugin-camel-case-92f9f32c.js",
        "assets/hyphenate-style-name-80972348.js",
        "assets/jss-plugin-default-unit-593cc4c5.js",
        "assets/jss-plugin-vendor-prefixer-4dd06b33.js",
        "assets/css-vendor-33142dc8.js",
        "assets/jss-plugin-props-sort-0c9fca2f.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  qi = u.lazy(() =>
    o(
      () => import("./SupplierEdit-953eccf4.js"),
      [
        "assets/SupplierEdit-953eccf4.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/ContactPersonForm-318a0da1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/TaxDetailList-4b4d08c3.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/@material-ui-774e3213.js",
        "assets/clsx-1229b3e0.js",
        "assets/jss-7659e388.js",
        "assets/is-in-browser-9e40da8a.js",
        "assets/jss-plugin-rule-value-function-051edbeb.js",
        "assets/jss-plugin-global-64559e95.js",
        "assets/jss-plugin-nested-6377d8b0.js",
        "assets/jss-plugin-camel-case-92f9f32c.js",
        "assets/hyphenate-style-name-80972348.js",
        "assets/jss-plugin-default-unit-593cc4c5.js",
        "assets/jss-plugin-vendor-prefixer-4dd06b33.js",
        "assets/css-vendor-33142dc8.js",
        "assets/jss-plugin-props-sort-0c9fca2f.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ji = u.lazy(() =>
    o(
      () => import("./BankList-45fca7eb.js"),
      [
        "assets/BankList-45fca7eb.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Xi = u.lazy(() =>
    o(
      () => import("./BankAdd-dbaca52c.js"),
      [
        "assets/BankAdd-dbaca52c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Zi = u.lazy(() =>
    o(
      () => import("./BankEdit-5b40cf4e.js"),
      [
        "assets/BankEdit-5b40cf4e.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  eu = u.lazy(() =>
    o(
      () => import("./BankAccountList-61458558.js"),
      [
        "assets/BankAccountList-61458558.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  tu = u.lazy(() =>
    o(
      () => import("./BankAccountAdd-038d9367.js"),
      [
        "assets/BankAccountAdd-038d9367.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  gs = u.lazy(() =>
    o(
      () => import("./BankAccountEdit-4136df26.js"),
      [
        "assets/BankAccountEdit-4136df26.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  au = u.lazy(() =>
    o(
      () => import("./RateMasterList-73da46af.js"),
      [
        "assets/RateMasterList-73da46af.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  su = u.lazy(() =>
    o(
      () => import("./AddRateMaster-2d120bc2.js"),
      [
        "assets/AddRateMaster-2d120bc2.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  nu = u.lazy(() =>
    o(
      () => import("./EditRateMaster-2665f82c.js"),
      [
        "assets/EditRateMaster-2665f82c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  ru = u.lazy(() =>
    o(
      () => import("./LorryReceipts-bc90ec58.js"),
      [
        "assets/LorryReceipts-bc90ec58.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/SendEmail-1635d4f3.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  cu = u.lazy(() =>
    o(
      () => import("./LorryReceiptAdd-d753c290.js"),
      [
        "assets/LorryReceiptAdd-d753c290.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/TransactionDetails-007bf0d0.js",
        "assets/icons-material-4539f19e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  du = u.lazy(() =>
    o(
      () => import("./LorryReceiptEdit-deb63d98.js"),
      [
        "assets/LorryReceiptEdit-deb63d98.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/TransactionDetails-007bf0d0.js",
        "assets/icons-material-4539f19e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  lu = u.lazy(() =>
    o(
      () => import("./FONumAdd-264b2a73.js"),
      [
        "assets/FONumAdd-264b2a73.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  iu = u.lazy(() =>
    o(
      () => import("./LoadingSlips-f2968566.js"),
      [
        "assets/LoadingSlips-f2968566.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/SendEmail-1635d4f3.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Cs = u.lazy(() =>
    o(
      () => import("./LoadingSlipAdd-9a764649.js"),
      [
        "assets/LoadingSlipAdd-9a764649.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  hs = u.lazy(() =>
    o(
      () => import("./LoadingSlipEdit-0656b644.js"),
      [
        "assets/LoadingSlipEdit-0656b644.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  uu = u.lazy(() =>
    o(
      () => import("./LRAcknowledgement-08b6d65c.js"),
      [
        "assets/LRAcknowledgement-08b6d65c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/icons-material-4539f19e.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  ou = u.lazy(() =>
    o(
      () => import("./LRAcknowledgementEdit-888e6873.js"),
      [
        "assets/LRAcknowledgementEdit-888e6873.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  pu = u.lazy(() =>
    o(
      () => import("./LRAcknowledgementAdd-5c12a384.js"),
      [
        "assets/LRAcknowledgementAdd-5c12a384.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  mu = u.lazy(() =>
    o(
      () => import("./LocalMemoList-f5b7ba5c.js"),
      [
        "assets/LocalMemoList-f5b7ba5c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Eu = u.lazy(() =>
    o(
      () => import("./BillList-a1e54c71.js"),
      [
        "assets/BillList-a1e54c71.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/SendEmail-1635d4f3.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  fu = u.lazy(() =>
    o(
      () => import("./BillAdd-bfaaf7c8.js"),
      [
        "assets/BillAdd-bfaaf7c8.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/LorryReceipts-4f1738e2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/file-saver-7e589f53.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  gu = u.lazy(() =>
    o(
      () => import("./BillEdit-be9ac6aa.js"),
      [
        "assets/BillEdit-be9ac6aa.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/LorryReceipts-4f1738e2.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/file-saver-7e589f53.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Cu = u.lazy(() =>
    o(
      () => import("./CashMemoList-7be7763b.js"),
      [
        "assets/CashMemoList-7be7763b.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
      ]
    )
  ),
  hu = u.lazy(() =>
    o(
      () => import("./PaymentCollection-2b4d643f.js"),
      [
        "assets/PaymentCollection-2b4d643f.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/icons-material-4539f19e.js",
        "assets/SendEmail-1635d4f3.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  _u = u.lazy(() =>
    o(
      () => import("./PaymentAdvice-3bbdbb7e.js"),
      [
        "assets/PaymentAdvice-3bbdbb7e.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/icons-material-4539f19e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Tu = u.lazy(() =>
    o(
      () => import("./SupplierBillView-581b7267.js"),
      [
        "assets/SupplierBillView-581b7267.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  yu = u.lazy(() =>
    o(
      () => import("./MoneyTransfers-e6392be4.js"),
      [
        "assets/MoneyTransfers-e6392be4.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Su = u.lazy(() =>
    o(
      () => import("./MoneyTransferAdd-7b9158ea.js"),
      [
        "assets/MoneyTransferAdd-7b9158ea.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Ru = u.lazy(() =>
    o(
      () => import("./MoneyTransferEdit-7f3462a7.js"),
      [
        "assets/MoneyTransferEdit-7f3462a7.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Lu = u.lazy(() =>
    o(
      () => import("./PettyCashHistory-a53934e7.js"),
      [
        "assets/PettyCashHistory-a53934e7.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Au = u.lazy(() =>
    o(
      () => import("./PettyCashTransactionAdd-8a5e72ae.js"),
      [
        "assets/PettyCashTransactionAdd-8a5e72ae.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/react-redux-45d870ba.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/icons-material-4539f19e.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Pu = u.lazy(() =>
    o(
      () => import("./LorryReceiptRegister-765ae7f7.js"),
      [
        "assets/LorryReceiptRegister-765ae7f7.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/file-saver-7e589f53.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/@material-ui-774e3213.js",
        "assets/jss-7659e388.js",
        "assets/is-in-browser-9e40da8a.js",
        "assets/jss-plugin-rule-value-function-051edbeb.js",
        "assets/jss-plugin-global-64559e95.js",
        "assets/jss-plugin-nested-6377d8b0.js",
        "assets/jss-plugin-camel-case-92f9f32c.js",
        "assets/hyphenate-style-name-80972348.js",
        "assets/jss-plugin-default-unit-593cc4c5.js",
        "assets/jss-plugin-vendor-prefixer-4dd06b33.js",
        "assets/css-vendor-33142dc8.js",
        "assets/jss-plugin-props-sort-0c9fca2f.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Bu = u.lazy(() =>
    o(
      () => import("./LoadingTripSheet-17b57f94.js"),
      [
        "assets/LoadingTripSheet-17b57f94.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/file-saver-7e589f53.js",
        "assets/@material-ui-774e3213.js",
        "assets/jss-7659e388.js",
        "assets/is-in-browser-9e40da8a.js",
        "assets/jss-plugin-rule-value-function-051edbeb.js",
        "assets/jss-plugin-global-64559e95.js",
        "assets/jss-plugin-nested-6377d8b0.js",
        "assets/jss-plugin-camel-case-92f9f32c.js",
        "assets/hyphenate-style-name-80972348.js",
        "assets/jss-plugin-default-unit-593cc4c5.js",
        "assets/jss-plugin-vendor-prefixer-4dd06b33.js",
        "assets/css-vendor-33142dc8.js",
        "assets/jss-plugin-props-sort-0c9fca2f.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  wu = u.lazy(() =>
    o(
      () => import("./BillRegister-1c24f353.js"),
      [
        "assets/BillRegister-1c24f353.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
      ]
    )
  ),
  vu = u.lazy(() =>
    o(
      () => import("./BilledLRStatus-78dc970e.js"),
      [
        "assets/BilledLRStatus-78dc970e.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
      ]
    )
  ),
  bu = u.lazy(() =>
    o(
      () => import("./PaymentCollectionReport-a363cdd3.js"),
      [
        "assets/PaymentCollectionReport-a363cdd3.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
      ]
    )
  ),
  $u = u.lazy(() =>
    o(
      () => import("./Unauthorized-c148c7ea.js"),
      [
        "assets/Unauthorized-c148c7ea.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
      ]
    )
  ),
  Ou = u.lazy(() =>
    o(
      () => import("./NotFound-4a2806f0.js"),
      [
        "assets/NotFound-4a2806f0.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
      ]
    )
  ),
  Du = u.lazy(() =>
    o(
      () => import("./QuotationList-9b564a6d.js"),
      [
        "assets/QuotationList-9b564a6d.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Dialog-cfe6f9ef.js",
        "assets/SendEmail-1635d4f3.js",
        "assets/x-data-grid-cceece3f.js",
        "assets/clsx-1229b3e0.js",
        "assets/prop-types-d7fd566a.js",
        "assets/reselect-36a88051.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Gu = u.lazy(() =>
    o(
      () => import("./QuotationAdd-4cd8968c.js"),
      [
        "assets/QuotationAdd-4cd8968c.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Stations-22d95b0d.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  Iu = u.lazy(() =>
    o(
      () => import("./QuotationEdit-582bc676.js"),
      [
        "assets/QuotationEdit-582bc676.js",
        "assets/react-bfabd40c.js",
        "assets/@babel-e11bafe1.js",
        "assets/react-redux-45d870ba.js",
        "assets/react-dom-b0178e93.js",
        "assets/scheduler-765c72db.js",
        "assets/hoist-non-react-statics-6cfbf744.js",
        "assets/use-sync-external-store-18921cc2.js",
        "assets/icons-material-4539f19e.js",
        "assets/material-e0a59a28.js",
        "assets/system-a1d29c52.js",
        "assets/styled-engine-f3bd09bf.js",
        "assets/@emotion-77835cc8.js",
        "assets/stylis-79144faa.js",
        "assets/utils-c03c978f.js",
        "assets/private-theming-970ac73c.js",
        "assets/react-transition-group-7ded6f4d.js",
        "assets/dom-helpers-9a525042.js",
        "assets/base-ff50cfe3.js",
        "assets/@popperjs-f3391c26.js",
        "assets/x-date-pickers-7b1cc7dd.js",
        "assets/@date-io-f382d426.js",
        "assets/dayjs-7f45ce31.js",
        "assets/clsx-1229b3e0.js",
        "assets/rifm-7b0f12ad.js",
        "assets/Card.module-3bdbfb7f.js",
        "assets/Card-288b2e71.css",
        "assets/Stations-22d95b0d.js",
        "assets/react-router-1b5f20a2.js",
        "assets/@remix-run-d753ad9e.js",
        "assets/redux-persist-d9cc1560.js",
        "assets/redux-b7ba668d.js",
        "assets/@reduxjs-4d37e7cf.js",
        "assets/immer-41fd5235.js",
        "assets/redux-thunk-ef899f4c.js",
        "assets/axios-4a70c6fc.js",
        "assets/react-router-dom-4405dfe9.js",
        "assets/react-icons-55b3b9a0.js",
      ]
    )
  ),
  ju = () =>
    s.createElement(
      u.Suspense,
      { fallback: null },
      s.createElement(
        dn,
        null,
        s.createElement(i, { path: "/", element: s.createElement(hi, null) }),
        s.createElement(
          i,
          { path: "/users" },
          s.createElement(i, {
            index: !0,
            element: s.createElement(b, { to: "/users/usersList" }),
          }),
          s.createElement(
            i,
            null,
            s.createElement(i, {
              path: "usersList",
              element: s.createElement(
                p,
                { parent: "User", path: "UserActivation", process: "write" },
                s.createElement(_i, null)
              ),
            }),
            s.createElement(i, {
              path: "userRegistration",
              element: s.createElement(
                p,
                { parent: "User", path: "UserRegister", process: "write" },
                s.createElement(Ti, null)
              ),
            }),
            s.createElement(i, {
              path: "userEdit",
              element: s.createElement(
                p,
                { parent: "User", path: "UserRegister", process: "write" },
                s.createElement(Si, null)
              ),
            }),
            s.createElement(i, {
              path: "userPermissions",
              element: s.createElement(
                p,
                { parent: "User", path: "RoleMaster", process: "write" },
                s.createElement(yi, null)
              ),
            })
          )
        ),
        s.createElement(
          i,
          { path: "/master" },
          s.createElement(i, {
            index: !0,
            element: s.createElement(
              p,
              { parent: "Admin", path: "Branch", process: "write" },
              s.createElement(b, { to: "/master/branches" })
            ),
          }),
          s.createElement(
            i,
            { path: "branches" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Branch", process: "write" },
                s.createElement(bi, null)
              ),
            }),
            s.createElement(i, {
              path: "addBranch",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Branch", process: "write" },
                s.createElement($i, null)
              ),
            }),
            s.createElement(i, {
              path: "editBranch",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Branch", process: "write" },
                s.createElement(Oi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "articles" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Article", process: "write" },
                s.createElement(Ri, null)
              ),
            }),
            s.createElement(i, {
              path: "addArticle",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Article", process: "write" },
                s.createElement(Li, null)
              ),
            }),
            s.createElement(i, {
              path: "editArticle",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Article", process: "write" },
                s.createElement(Ai, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "places" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Place", process: "write" },
                s.createElement(Bi, null)
              ),
            }),
            s.createElement(i, {
              path: "addPlace",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Place", process: "write" },
                s.createElement(wi, null)
              ),
            }),
            s.createElement(i, {
              path: "editPlace",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Place", process: "write" },
                s.createElement(vi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "customers" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Customers", process: "write" },
                s.createElement(Di, null)
              ),
            }),
            s.createElement(i, {
              path: "addCustomer",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Customers", process: "write" },
                s.createElement(Gi, null)
              ),
            }),
            s.createElement(i, {
              path: "editCustomer",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Customers", process: "write" },
                s.createElement(Ii, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "vehicleTypes" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "VehicleType", process: "write" },
                s.createElement(Yi, null)
              ),
            }),
            s.createElement(i, {
              path: "addVehicleType",
              element: s.createElement(
                p,
                { parent: "Admin", path: "VehicleType", process: "write" },
                s.createElement(Hi, null)
              ),
            }),
            s.createElement(i, {
              path: "editVehicleType",
              element: s.createElement(
                p,
                { parent: "Admin", path: "VehicleType", process: "write" },
                s.createElement(Qi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "vehicles" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Vehicle", process: "write" },
                s.createElement(xi, null)
              ),
            }),
            s.createElement(i, {
              path: "addVehicle",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Vehicle", process: "write" },
                s.createElement(zi, null)
              ),
            }),
            s.createElement(i, {
              path: "editVehicle",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Vehicle", process: "write" },
                s.createElement(Fi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "employees" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Employee", process: "write" },
                s.createElement(Ui, null)
              ),
            }),
            s.createElement(i, {
              path: "addEmployee",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Employee", process: "write" },
                s.createElement(Vi, null)
              ),
            }),
            s.createElement(i, {
              path: "editEmployee",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Employee", process: "write" },
                s.createElement(Mi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "drivers" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Driver", process: "write" },
                s.createElement(ji, null)
              ),
            }),
            s.createElement(i, {
              path: "addDriver",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Driver", process: "write" },
                s.createElement(Ni, null)
              ),
            }),
            s.createElement(i, {
              path: "editDriver",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Driver", process: "write" },
                s.createElement(ki, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "suppliers" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "Supplier", process: "write" },
                s.createElement(Ki, null)
              ),
            }),
            s.createElement(i, {
              path: "addSupplier",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Supplier", process: "write" },
                s.createElement(Wi, null)
              ),
            }),
            s.createElement(i, {
              path: "editSupplier",
              element: s.createElement(
                p,
                { parent: "Admin", path: "Supplier", process: "write" },
                s.createElement(qi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "banks" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankMaster",
                  process: "write",
                },
                s.createElement(Ji, null)
              ),
            }),
            s.createElement(i, {
              path: "addBank",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankMaster",
                  process: "write",
                },
                s.createElement(Xi, null)
              ),
            }),
            s.createElement(i, {
              path: "editBank",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankMaster",
                  process: "write",
                },
                s.createElement(Zi, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "bankAccounts" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankAccountMaster",
                  process: "write",
                },
                s.createElement(eu, null)
              ),
            }),
            s.createElement(i, {
              path: "addBankAccount",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankAccountMaster",
                  process: "write",
                },
                s.createElement(tu, null)
              ),
            }),
            s.createElement(i, {
              path: "editBankAccount",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankAccountMaster",
                  process: "write",
                },
                s.createElement(gs, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "RateMasterList" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "RateMaster", process: "read" },
                s.createElement(au, null)
              ),
            }),
            s.createElement(i, {
              path: "addRateMaster",
              element: s.createElement(
                p,
                { parent: "Admin", path: "RateMaster", process: "write" },
                s.createElement(su, null)
              ),
            }),
            s.createElement(i, {
              path: "editRateMaster",
              element: s.createElement(
                p,
                { parent: "Admin", path: "RateMaster", process: "write" },
                s.createElement(nu, null)
              ),
            }),
            s.createElement(i, {
              path: "editBankAccount",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "BankAccountMaster",
                  process: "write",
                },
                s.createElement(gs, null)
              ),
            })
          )
        ),
        s.createElement(
          i,
          { path: "/transactions" },
          s.createElement(i, {
            index: !0,
            element: s.createElement(b, { to: "/transactions/lorryReceipts" }),
          }),
          s.createElement(
            i,
            { path: "lorryReceipts" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LorryReceipt",
                  process: "write",
                },
                s.createElement(ru, null)
              ),
            }),
            s.createElement(i, {
              path: "addLorryReceipt",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LorryReceiptReg",
                  process: "write",
                },
                s.createElement(cu, null)
              ),
            }),
            s.createElement(i, {
              path: "editLorryReceipt",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LorryReceiptReg",
                  process: "write",
                },
                s.createElement(du, null)
              ),
            })
          ),
          s.createElement(i, {
            path: "addFONum",
            element: s.createElement(
              p,
              { parent: "Sales/Purchase", path: "Add_FO_No", process: "write" },
              s.createElement(lu, null)
            ),
          }),
          s.createElement(
            i,
            { path: "loadingSlips" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LoadingSlip",
                  process: "write",
                },
                s.createElement(iu, null)
              ),
            }),
            s.createElement(i, {
              path: "addLoadingSlip",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LoadingSlipRegister",
                  process: "write",
                },
                s.createElement(Cs, null)
              ),
            }),
            s.createElement(i, {
              path: "editLoadingSlip",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LoadingSlipRegister",
                  process: "write",
                },
                s.createElement(hs, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "lrAcknowledgement" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LRAcknowledge",
                  process: "write",
                },
                s.createElement(uu, null)
              ),
            }),
            s.createElement(i, {
              path: "editLRAcknowledgement",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LRAcknowledge",
                  process: "write",
                },
                s.createElement(ou, null)
              ),
            }),
            s.createElement(i, {
              path: "addLRAcknowledgement",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "LRAcknowledge",
                  process: "write",
                },
                s.createElement(pu, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "localMemoList" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(mu, null),
            }),
            s.createElement(i, {
              path: "addLocalMemoLS",
              element: s.createElement(Cs, null),
            }),
            s.createElement(i, {
              path: "editLocalMemoLS",
              element: s.createElement(hs, null),
            })
          ),
          s.createElement(
            i,
            { path: "billList" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Accounts", path: "RouteBill", process: "write" },
                s.createElement(Eu, null)
              ),
            }),
            s.createElement(i, {
              path: "addBill",
              element: s.createElement(
                p,
                { parent: "Accounts", path: "BillRegister", process: "write" },
                s.createElement(fu, null)
              ),
            }),
            s.createElement(i, {
              path: "editBill",
              element: s.createElement(
                p,
                { parent: "Accounts", path: "BillRegister", process: "write" },
                s.createElement(gu, null)
              ),
            })
          ),
          s.createElement(i, {
            path: "/transactions/cashMemoList",
            element: s.createElement(Cu, null),
          }),
          s.createElement(i, {
            path: "/transactions/paymentCollection",
            element: s.createElement(
              p,
              {
                parent: "Accounts",
                path: "PaymentCollection",
                process: "write",
              },
              s.createElement(hu, null)
            ),
          }),
          s.createElement(
            i,
            { path: "/transactions/paymentAdvice" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "PaymentAdvice",
                  process: "write",
                },
                s.createElement(_u, null)
              ),
            }),
            s.createElement(i, {
              path: "viewSupplierBill",
              element: s.createElement(Tu, null),
            })
          ),
          s.createElement(
            i,
            { path: "moneyTransfers" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                { parent: "Admin", path: "MoneyTransfer", process: "write" },
                s.createElement(yu, null)
              ),
            }),
            s.createElement(i, {
              path: "addMoneyTransfer",
              element: s.createElement(
                p,
                { parent: "Admin", path: "MoneyTransfer", process: "write" },
                s.createElement(Su, null)
              ),
            }),
            s.createElement(i, {
              path: "editMoneyTransfer",
              element: s.createElement(
                p,
                { parent: "Admin", path: "MoneyTransfer", process: "write" },
                s.createElement(Ru, null)
              ),
            })
          ),
          s.createElement(
            i,
            { path: "pettyCashHistory" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(Lu, null),
            }),
            s.createElement(i, {
              path: "addPettyCashTransaction",
              element: s.createElement(Au, null),
            })
          ),
          s.createElement(
            i,
            { path: "quotations" },
            s.createElement(i, {
              index: !0,
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "TripSheet",
                  process: "write",
                },
                s.createElement(Du, null)
              ),
            }),
            s.createElement(i, {
              path: "addQuotation",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "TripSheet",
                  process: "write",
                },
                s.createElement(Gu, null)
              ),
            }),
            s.createElement(i, {
              path: "editQuotation",
              element: s.createElement(
                p,
                {
                  parent: "Sales/Purchase",
                  path: "TripSheet",
                  process: "write",
                },
                s.createElement(Iu, null)
              ),
            })
          )
        ),
        s.createElement(
          i,
          { path: "/reports" },
          s.createElement(i, {
            index: !0,
            element: s.createElement(b, {
              to: "/reports/lorryReceiptRegister",
            }),
          }),
          s.createElement(i, {
            path: "/reports/lorryReceiptRegister",
            element: s.createElement(
              p,
              { parent: "Accounts", path: "BilledLRStatus", process: "write" },
              s.createElement(Pu, null)
            ),
          }),
          s.createElement(i, {
            path: "/reports/loadingTripSheet",
            element: s.createElement(
              p,
              { parent: "Accounts", path: "LoadingSlip", process: "write" },
              s.createElement(Bu, null)
            ),
          }),
          s.createElement(i, {
            path: "/reports/billRegister",
            element: s.createElement(wu, null),
          }),
          s.createElement(i, {
            path: "/reports/billedLRStatus",
            element: s.createElement(vu, null),
          }),
          s.createElement(i, {
            path: "/reports/paymentCollectionReport",
            element: s.createElement(bu, null),
          })
        ),
        s.createElement(i, {
          path: "/reports",
          element: s.createElement(Pi, null),
        }),
        s.createElement(i, {
          path: "/unauthorized",
          element: s.createElement($u, null),
        }),
        s.createElement(i, { path: "*", element: s.createElement(Ou, null) })
      )
    ),
  Nu = "_header_1p5x8_1",
  ku = "_head_1p5x8_1",
  Uu = "_logo_1p5x8_33",
  Vu = "_logout_1p5x8_56",
  Mu = "_burger_1p5x8_61",
  xu = "_bar_1p5x8_73",
  zu = "_active_1p5x8_98",
  L = {
    header: Nu,
    head: ku,
    logo: Uu,
    logout: Vu,
    burger: Mu,
    bar: xu,
    active: zu,
  },
  Fu = L.burger,
  Yu = `${L.burger} ${L.active}`,
  Hu = () => {
    var y, R, w, A;
    const t = $((S) => S.user),
      e = ys(),
      a = Ss(),
      [c, d] = u.useState({}),
      [l, E] = u.useState(L.burger);
    u.useEffect(() => {
      d(t);
    }, [t]);
    const f = wn(new Date()),
      T = () => {
        e(Ps());
        const S = document.createElement("link");
        S.setAttribute(
          "href",
          "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.1/mdb.min.css"
        ),
          S.setAttribute("rel", "stylesheet"),
          document.head.appendChild(S),
          window.location.reload(),
          a("/");
      },
      C = () => {
        var S;
        (S = document.body.classList) != null &&
        S.length &&
        document.body.classList.contains("show-menu")
          ? (document.body.classList.remove("show-menu"), E(Fu))
          : (document.body.classList.add("show-menu"), E(Yu));
      };
    return s.createElement(
      "header",
      { className: L.header },
      s.createElement(
        "div",
        { className: L.head },
        t && t.type
          ? s.createElement(
              "div",
              { className: l, onClick: C },
              s.createElement("div", { className: L.bar }),
              s.createElement("div", { className: L.bar }),
              s.createElement("div", { className: L.bar })
            )
          : null,
        s.createElement(
          "div",
          { className: L.logo },
          s.createElement(cs, { to: "/" }, "Jai Santoshi Maa Transport")
        ),
        c &&
          c.username &&
          s.createElement(
            "div",
            { className: "head-rgt" },
            s.createElement(
              "div",
              { className: L.logout },
              s.createElement("span", { className: "head-date" }, "Date: ", f),
              " ",
              s.createElement("span", { className: "headPipe" }, "|"),
              " ",
              t.employee && ((y = t.employee) == null ? void 0 : y.name),
              !t.employee &&
                !((R = t.employee) != null && R.name) &&
                t.username,
              " ",
              " ",
              s.createElement(
                ps,
                {
                  size: "small",
                  onClick: T,
                  sx: {
                    color: "#fff",
                    fontSize: "1em",
                    "&:hover": { color: "#fff" },
                  },
                },
                s.createElement(Cn, { sx: { fontSize: "1.5em" } }),
                "Logout"
              )
            )
          ),
        (!c || !c.username) &&
          s.createElement(
            "div",
            { className: L.logout },
            s.createElement("span", { className: "head-date" }, "Date: ", f),
            " ",
            s.createElement("span", { className: "headPipe" }, "|"),
            " ",
            t.employee && ((w = t.employee) == null ? void 0 : w.name),
            !t.employee && !((A = t.employee) != null && A.name) && t.username,
            " ",
            s.createElement(
              ps,
              {
                size: "small",
                onClick: T,
                sx: {
                  color: "#fff",
                  fontSize: "1em",
                  "&:hover": { color: "#fff" },
                },
              },
              s.createElement(hn, { sx: { fontSize: "1.5em" } }),
              " Login"
            )
          )
      )
    );
  },
  Qu = "_mainFooter_1o1k1_1",
  Ku = { mainFooter: Qu },
  Wu = () =>
    s.createElement(
      "footer",
      { className: Ku.mainFooter },
      s.createElement(mn, null),
      s.createElement(
        "p",
        null,
        new Date().getFullYear(),
        " ©",
        " ",
        s.createElement(
          "strong",
          null,
          s.createElement(
            "a",
            {
              href: "https://www.vspace.co.in/",
              target: "_blank",
              rel: "noreferrer",
            },
            "Vspace Software"
          )
        ),
        " ",
        "- ",
        s.createElement("em", null, "Save your time, choose the best")
      )
    ),
  qu = "_main_bq84z_4",
  Ju = "_main1_bq84z_12",
  _s = {
    main: qu,
    main1: Ju,
    "show-menu": "_show-menu_bq84z_20",
    "left-panel": "_left-panel_bq84z_20",
  },
  Xu = (t) => {
    const e = $((a) => a.user);
    return (
      u.useEffect(() => {
        var a;
        if (e.username) {
          const c = document.getElementsByTagName("link")[1];
          (a = c == null ? void 0 : c.parentNode) == null || a.removeChild(c);
        }
      }, [e]),
      s.createElement(
        s.Fragment,
        null,
        e &&
          e.username &&
          s.createElement(
            s.Fragment,
            null,
            s.createElement(Hu, null),
            s.createElement(
              "div",
              { className: "main-wrap" },
              s.createElement(
                "div",
                { className: "left-panel" },
                s.createElement(to, null)
              ),
              s.createElement(
                "div",
                { className: "right-panel" },
                s.createElement("main", { className: _s.main }, t.children),
                s.createElement(Wu, null)
              )
            )
          ),
        !e.username &&
          s.createElement(
            "div",
            { className: "bg-login" },
            s.createElement(
              "div",
              { className: "bl_login" },
              s.createElement("main", { className: _s.main1 }, t.children)
            )
          )
      )
    );
  },
  Zu = "_nav_jqhye_1",
  eo = "_active_jqhye_61",
  ls = { nav: Zu, active: eo },
  D = [
    {
      label: "Users",
      to: "/users",
      icon: s.createElement(_n, null),
      children: [
        { label: "Users list", to: "/users/usersList" },
        { label: "User registration", to: "/users/userRegistration" },
        { label: "User persmissions", to: "/users/userPermissions" },
      ],
    },
    {
      label: "Master",
      to: "/master",
      icon: s.createElement(Tn, null),
      children: [
        { label: "Branches", to: "/master/branches" },
        { label: "Places", to: "/master/places" },
        { label: "Articles", to: "/master/articles" },
        { label: "Employees", to: "/master/employees" },
        { label: "Drivers", to: "/master/drivers" },
        { label: "Customers", to: "/master/customers" },
        { label: "Suppliers", to: "/master/suppliers" },
        { label: "Vehicle Types", to: "/master/vehicleTypes" },
        { label: "Vehicles", to: "/master/vehicles" },
        { label: "Bank List", to: "/master/banks" },
        { label: "Bank Account List", to: "/master/bankAccounts" },
        { label: "Rate Master", to: "/master/rateMasterList" },
      ],
    },
    {
      label: "Transactions",
      to: "/transactions",
      icon: s.createElement(yn, null),
      children: [
        { label: "Lorry Receipts", to: "/transactions/lorryReceipts" },
        { label: "Add FO Num", to: "/transactions/addFONum" },
        {
          label: "Lorry Freight Challan List",
          to: "/transactions/loadingSlips",
        },
        { label: "LR Acknowledgement", to: "/transactions/lrAcknowledgement" },
        { label: "Bill List", to: "/transactions/billList" },
        { label: "Payment Collection", to: "/transactions/paymentCollection" },
        { label: "Payment Advice", to: "/transactions/paymentAdvice" },
        { label: "Money Transfers", to: "/transactions/moneyTransfers" },
        { label: "Quotations", to: "/transactions/quotations" },
      ],
    },
    {
      label: "Reports",
      to: "/reports",
      icon: s.createElement(Sn, null),
      children: [
        {
          label: "Lorry Receipt Stock Status",
          to: "/reports/lorryReceiptRegister",
        },
        {
          label: "Lorry Receipt Challan Status",
          to: "/reports/loadingTripSheet",
        },
      ],
    },
  ],
  to = () => {
    var e;
    const t = $((a) => a.user);
    return s.createElement(
      "nav",
      { className: ls.nav },
      s.createElement(
        "ul",
        null,
        (e = D == null ? void 0 : D.map) == null
          ? void 0
          : e.call(D, (a) => {
              var c, d, l;
              return t &&
                t.type &&
                ((d = (c = t.type) == null ? void 0 : c.toLowerCase) == null
                  ? void 0
                  : d.call(c)) === "user" &&
                (a.to === "/users" || a.to === "/master")
                ? null
                : a.children &&
                  ((l = a.children) == null ? void 0 : l.length) > 0
                ? s.createElement(
                    Ts,
                    { key: a.to, to: a.to, subnav: a.children },
                    s.createElement("span", { className: "nav-icons" }, a.icon),
                    a.label
                  )
                : s.createElement(
                    Ts,
                    { key: a.to, to: a.to },
                    s.createElement("span", { className: "nav-icons" }, a.icon),
                    a.label
                  );
            })
      )
    );
  },
  Ts = ({ to: t, children: e, ...a }) => {
    var y, R, w, A, S;
    const c = Rs(t),
      d = Ls(),
      l =
        (R = (y = d.pathname).includes) == null
          ? void 0
          : R.call(y, c.pathname);
    let E = !1;
    !E && d.pathname.startsWith(t) && (E = !0);
    const [f, T] = u.useState(!1);
    u.useEffect(() => {
      T(l || E);
    }, [d]);
    const C = () => {
      T(!f);
    };
    return s.createElement(
      "li",
      { className: f ? ls.active : "" },
      s.createElement(cs, { to: t, ...a }, e),
      a.subnav &&
        ((w = a.subnav) == null ? void 0 : w.length) > 0 &&
        s.createElement(
          "ul",
          null,
          (S = (A = a.subnav) == null ? void 0 : A.map) == null
            ? void 0
            : S.call(A, (O) =>
                s.createElement(ao, { key: O.to, subto: O.to }, O.label)
              )
        ),
      s.createElement(
        "span",
        { onClick: C, className: "nav-arrow" },
        f
          ? s.createElement("img", { src: oi, alt: "" })
          : s.createElement("img", { src: pi, alt: "" })
      )
    );
  },
  ao = ({ subto: t, children: e, ...a }) => {
    var f, T;
    const c = Rs(t),
      d = Ls(),
      l =
        (T = (f = d.pathname).includes) == null
          ? void 0
          : T.call(f, c.pathname);
    let E = !1;
    return (
      !E && d.pathname.startsWith(t) && (E = !0),
      s.createElement(
        "li",
        { key: t, className: l || E ? ls.active : "" },
        s.createElement(cs, { to: t, ...a }, e)
      )
    );
  };
function so() {
  const t = En({
      typography: { fontFamily: ["Roboto"].join(",") },
      palette: {
        mode: "light",
        primary: {
          main: "#0b0e12",
          light: "#b4b8ac",
          dark: "#296192",
          contrastText: "#fff",
        },
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.6)",
          disabled: "rgba(0, 0, 0, 0.38)",
        },
      },
    }),
    e = sn(rs);
  return s.createElement(
    Ws,
    { store: rs },
    s.createElement(
      nn,
      { loading: null, persistor: e },
      s.createElement(
        fn,
        { theme: t },
        s.createElement(
          gn,
          null,
          s.createElement(Xu, null, s.createElement(ju, null))
        )
      )
    )
  );
}
const no = Ks(document.getElementById("root"));
no.render(s.createElement(so, null));
export {
  Ca as $,
  $a as A,
  $p as B,
  ia as C,
  bp as D,
  ua as E,
  oa as F,
  ca as G,
  da as H,
  la as I,
  Dp as J,
  fa as K,
  ui as L,
  Op as M,
  ga as N,
  tp as O,
  xo as P,
  pa as Q,
  Fo as R,
  zo as S,
  ma as T,
  Ea as U,
  Ip as V,
  Ta as W,
  Gp as X,
  ya as Y,
  Sa as Z,
  Wo as _,
  ap as a,
  ye as a$,
  ha as a0,
  _a as a1,
  Np as a2,
  Pa as a3,
  wn as a4,
  jp as a5,
  Ba as a6,
  wa as a7,
  Ko as a8,
  Ra as a9,
  vp as aA,
  na as aB,
  wp as aC,
  ra as aD,
  ta as aE,
  aa as aF,
  sa as aG,
  Bp as aH,
  Xt as aI,
  Pp as aJ,
  Zt as aK,
  ea as aL,
  Wt as aM,
  qt as aN,
  Jt as aO,
  Mp as aP,
  Na as aQ,
  Vp as aR,
  ka as aS,
  Ua as aT,
  Va as aU,
  Ga as aV,
  Ia as aW,
  ja as aX,
  op as aY,
  Te as aZ,
  Pe as a_,
  La as aa,
  Aa as ab,
  Qp as ac,
  es as ad,
  Hp as ae,
  ts as af,
  ss as ag,
  as as ah,
  Ja as ai,
  Xa as aj,
  Za as ak,
  ep as al,
  Yp as am,
  Wa as an,
  Fp as ao,
  qa as ap,
  Ha as aq,
  Qa as ar,
  Ka as as,
  zp as at,
  Fa as au,
  xp as av,
  Ya as aw,
  Ma as ax,
  xa as ay,
  za as az,
  W as b,
  _p as b$,
  Le as b0,
  je as b1,
  be as b2,
  Xo as b3,
  Zo as b4,
  qo as b5,
  up as b6,
  Io as b7,
  jo as b8,
  No as b9,
  re as bA,
  ce as bB,
  rp as bC,
  ue as bD,
  le as bE,
  ie as bF,
  de as bG,
  ds as bH,
  pp as bI,
  Ne as bJ,
  ke as bK,
  Ue as bL,
  Ve as bM,
  ip as bN,
  oe as bO,
  fe as bP,
  ge as bQ,
  lp as bR,
  Ce as bS,
  Ee as bT,
  me as bU,
  dp as bV,
  he as bW,
  _e as bX,
  Tp as bY,
  Tt as bZ,
  Jo as b_,
  ko as ba,
  Uo as bb,
  we as bc,
  Ie as bd,
  Oe as be,
  ve as bf,
  $e as bg,
  De as bh,
  Ep as bi,
  Me as bj,
  xe as bk,
  ze as bl,
  Fe as bm,
  Ye as bn,
  He as bo,
  We as bp,
  Yo as bq,
  Je as br,
  mp as bs,
  Ke as bt,
  Qe as bu,
  qe as bv,
  Ze as bw,
  et as bx,
  cp as by,
  ne as bz,
  x as c,
  ht as c0,
  yt as c1,
  St as c2,
  _t as c3,
  Vo as c4,
  Rt as c5,
  Lt as c6,
  Cp as c7,
  hp as c8,
  Et as c9,
  bt as cA,
  Pt as cB,
  $t as cC,
  vt as cD,
  wt as cE,
  jt as cF,
  It as cG,
  Gt as cH,
  sp as cI,
  J as cJ,
  q as cK,
  X as cL,
  Z as cM,
  np as cN,
  ee as cO,
  ae as cP,
  se as cQ,
  Rp as cR,
  Nt as cS,
  zt as cT,
  Mt as cU,
  Sp as cV,
  xt as cW,
  kt as cX,
  Ut as cY,
  Vt as cZ,
  mt as ca,
  pt as cb,
  ot as cc,
  gt as cd,
  Ct as ce,
  it as cf,
  dt as cg,
  ut as ch,
  ft as ci,
  lt as cj,
  gp as ck,
  tt as cl,
  nt as cm,
  Ho as cn,
  fp as co,
  ct as cp,
  at as cq,
  rt as cr,
  st as cs,
  yp as ct,
  At as cu,
  Bt as cv,
  Ot as cw,
  Qo as cx,
  Mo as cy,
  Dt as cz,
  K as d,
  z as e,
  F as f,
  Q as g,
  V as h,
  M as i,
  Ap as j,
  Qt as k,
  Lp as l,
  Kt as m,
  Kp as n,
  Ft as o,
  Yt as p,
  Ht as q,
  H as r,
  Yn as s,
  Up as t,
  Y as u,
  Oa as v,
  kp as w,
  Da as x,
  va as y,
  ba as z,
};
