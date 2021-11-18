import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  //aparently if it already fetched the info in another component it doenst fetch it again
  //maybe fetching data every 10s could make it update but not sure if the api allows that
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);

  const [searchTerm, setSearchTerm] = useState("");

  console.log(cryptos);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => {
      if (coin.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return coin;
      }
    });
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  //maybe it works without this
  if (isFetching) {
    return <Loader />;
  }
  if (cryptos) {
    return (
      <>
        <div className='search-crypto'>
          {!simplified && (
            <Input
              placeholder='search Cryptocurrency'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
        <Row gutter={[32, 32]} className='crypto-card-container'>
          {cryptos.map((currency) => {
            return (
              <Col
                xs={24}
                sm={12}
                lg={6}
                className='crypto-card'
                key={currency.id}
              >
                <Link to={`/crypto/${currency.id}`}>
                  <Card
                    title={`${currency.rank} ${currency.name}`}
                    extra={
                      <img className='crypto-image' src={currency.iconUrl} />
                    }
                    hoverable
                  >
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Change: {millify(currency.change)} %</p>{" "}
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
  return "Loading";
};

export default Cryptocurrencies;
