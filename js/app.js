import { state } from "./state.js";
import { render, isiHalaman } from "./dom.js";
import { pasangPendengar } from "./events.js";

isiHalaman();

render(state);

pasangPendengar();