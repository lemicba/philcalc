import React,{useState} from 'react';
import Head from 'next/head'
import '../styles/Home.module.css'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;


function Home({ dolarPrice }) {
  const [currentSum,setCurrentSum]=useState(0);
  const [setClear]=useState(false);
  const [currentImp, setCurrentImp ] = useState(0);

  let dolarHoy = (JSON.stringify(dolarPrice));
  console.log(dolarHoy)

  const AddImpuesto=(e)=>{
    e.preventDefault();
    let currentImp = document.querySelector('#num').value
    let currentMoneda = document.querySelector('#moneda').value;

    let imp 
    if(currentMoneda === 'dolar'){
    imp = parseFloat((currentImp * dolarHoy) * 1.64).toFixed(2);
    } else {
      imp = parseFloat(currentImp * 1.64).toFixed(2);
    }
    setCurrentImp(imp)
  }

  const Clear=(e)=>{
    e.preventDefault();
    console.log('sum:', currentSum);
    document.querySelector('form').reset();
    setClear(true);
    setCurrentSum(0);
  }


  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
    <Row>
    <Col span={12} offset={6}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <div className="App">
      <div className="app-title">
        <h1 className="holis">Calculadora<br/>Impuestos</h1>
        Dolar a {dolarPrice}
      </div>
      <form> 
            <label>Elegi tu moneda</label>
            <select id="moneda" name="monedalist">
              <option value="peso">Peso</option>
              <option value="dolar">Dolar</option>
            </select>
            <input type="text" id="num" placeholder="enter a number" />
            <button onClick={AddImpuesto}>Impuestos</button>
            <button onClick={Clear}>Clear</button>

            Result = {currentImp}

      </form>
    </div>
      </div>
      </Col>
    </Row>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default Home;

export const getStaticProps = async (ctx) => {
  const res = await fetch('https://criptoya.com/api/dolar/')
  const json = await res.json()
  return {props :{ dolarPrice: json.oficial }}
}