//*****************IMPORTED SASS STYLES*********************
import "../styles/style_components/main.scss";
//**********************************************************

import { slider } from "./slider";
import { loadAndRenderBooks } from "./loadBooks";

const init = () => {
  slider();
  loadAndRenderBooks();
};

init();
