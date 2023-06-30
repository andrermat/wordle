import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import HomePage from './components/homepage/HomePage';
import { root } from './store';

export default function App() {
  const store = useSelector(root)


  useEffect(() => {
    let style;
    if (store.theme === "Light")
      style = require("./assets/themes/Light.json")
    else
      style = require("./assets/themes/Dark.json")

    Object.entries(style).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string)
    })
  }, [store.theme])

  useEffect(() => {
    let style;
    if (store.mode === "Default")
      style = require("./assets/modes/Default.json")
    else
      style = require("./assets/modes/Colorblind.json")
      
    Object.entries(style).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string)
    })
  }, [store.mode])


  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Fragment>
  );
}
