import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //switch has been replaced with Routes
import { Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import axios from "axios";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<Homepage />}></Route>
              <Route exact path='/exchanges' element={<Exchanges />}></Route>
              <Route
                exact
                path='/cryptocurrencies'
                element={<Cryptocurrencies />}
              ></Route>
              <Route
                exact
                path='/crypto/:coinId'
                element={<CryptoDetails />}
              ></Route>
              <Route exact path='/news' element={<News />}></Route>
            </Routes>
          </div>
        </Layout>
        <div className='footer' level={5}>
          <Typography.Title style={{ color: "white", textAlign: "center" }}>
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
