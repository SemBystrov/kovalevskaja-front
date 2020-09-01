import Vue from "vue";

// installation remarkable

import { Remarkable } from "remarkable";

const options = {
  html: true,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
  quotes: "«»‘’",
  imageURL: process.env.VUE_APP_API_URL
};

const md = new Remarkable("full", options);

// installation remarkable's plugins

import { linkify } from "remarkable/linkify";

md.use(linkify);

const katex = require("remarkable-katex");

md.use(katex);

const Embed = require("remarkable-embed");
const embed = new Embed.Plugin();
embed.register(Embed.extensions);

md.use(embed.hook);

import admonitions from "remarkable-admonitions";
import "../assets/styles/admonitions.scss";

md.use(admonitions());

// change image function render

const baseImageRenderer = md.renderer.rules.image;

md.renderer.rules.image = function(tokens, idx, options /*, env */) {
  tokens[idx].src = options.imageURL + tokens[idx].src;
  return baseImageRenderer(tokens, idx, options);
};

// mounting in vue as global variables

Vue.prototype.$md = md;
