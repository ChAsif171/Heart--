import "./Matrix.js";
import "./Array.js";

let np = window.np;

delete window["np"];
delete window.tempnpempty;
delete window.tempnpinfo;
delete window.tempnptable;
export default np;
