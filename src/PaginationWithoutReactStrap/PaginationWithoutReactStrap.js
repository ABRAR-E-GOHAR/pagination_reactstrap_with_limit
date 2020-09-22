import React, { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Pagination";
import { Col, Container, Row, Table } from "reactstrap";

function PaginationWithoutReactStrap() {
  const [fetchData, newFetchData] = useState(null);
  const [data, newData] = useState(null);
  const [filter, newFilter] = useState(7);

  useEffect(() => {
    async function data() {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const dataJson = await data.json();
      newFetchData(dataJson);
    }
    data();
  }, []);

  const handleTodoChange = (data) => {
    newData(data);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            {data && (
              <Table striped>
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
    </div>
  );
}

export default PaginationWithoutReactStrap;
