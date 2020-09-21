import React, { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Pagination";
import ReactDOM from "react-dom";
import { Col, Container, Row, Table } from "reactstrap";

function App() {
  const [fetchData, newFetchData] = useState(null);
  const [data, newData] = useState(null);
  const [filter, newFilter] = useState(7);

  useEffect(() => {
    async function data() {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const dataJson = await data.json();
      console.log("Use effect");
      newFetchData(dataJson);
    }
    data();
  }, []);

  const handleTodoChange = (data) => {
    newData(data);
  };

  const changeHandler = (e) => {
    newFilter(e.target.value);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            {data && (
              <Table striped>
                {/* {Object.keys(data[0])} */}
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((header, index) => {
                      return <th key={index}> {header.toUpperCase()}</th>;
                    })}
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(data).map((item, index) => {
                    return (
                      <tr key={index}>
                        {Object.keys(data[0]).map((header, index) => {
                          return <td key={index}>{data[item][header]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 6, offset: 3 }} sm={{ size: 12 }} xs={{ size: 12 }}>
            {fetchData && (
              <Pagination
                data={fetchData}
                tableData={handleTodoChange}
                perPage={filter}
              />
            )}
          </Col>
        </Row>
      </Container>

      {/* <input
        type="number"
        placeholder="Type your Range"
        name="perPage"
        onChange={changeHandler}
        value={filter}
      /> */}
    </div>
  );
}

export default App;
