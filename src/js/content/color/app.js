import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';

let id = "color-pick-ccdaa11b50a94f5cb6507b582fea1d96";
if (!document.getElementById(id)) {
  let container = document.createElement("div");
  container.id = id;
  document.body.append(container);
} else {
  document.getElementById(id).remove();
  let container = document.createElement("div");
  container.id = id;
  document.body.append(container);
}

ReactDOM.render(
  (<Index />),
  document.getElementById(id)
);
