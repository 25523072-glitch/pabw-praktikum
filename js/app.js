
import { state } from "./state.js";
import { render, isiHalaman } from "./dom.js";
import { pasangPendengar } from "./events.js";

window.state = state;

isiHalaman();

render(state);

pasangPendengar();