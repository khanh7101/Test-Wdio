const __importMetaUrl = require('url').pathToFileURL(__filename).href;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.cts
var esmModule = import("./index.js");
exports.setValue = async function(key, value) {
  const m = await esmModule;
  return m.setValue(key, value);
};
exports.getValue = async function(key) {
  const m = await esmModule;
  return m.getValue(key);
};
exports.setResourcePool = async function(key, value) {
  const m = await esmModule;
  return m.setResourcePool(key, value);
};
exports.getValueFromPool = async function(key, options) {
  const m = await esmModule;
  return m.getValueFromPool(key, options);
};
exports.addValueToPool = async function(key, value) {
  const m = await esmModule;
  return m.addValueToPool(key, value);
};
