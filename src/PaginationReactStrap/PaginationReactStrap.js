import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import PaginationComponent from "react-reactstrap-pagination";
import DownloadToCsvFile from "../DownloadToCsvFile/DownloadToCsvFile";

function UserRow({ user }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.title}</td>
      <td>{user.body}</td>
    </tr>
  );
}

function PaginationReactStrap() {
  const [filteredUserList, newFilteredUserList] = useState(null);
  const [selectedPage, newSelectedPage] = useState(1);
  const [pageSize, newPageSize] = useState(8);
  const [maxPaginationNumbers] = useState(3);

  useEffect(() => {
    async function data() {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const dataJson = await data.json();
      newFilteredUserList(dataJson);
    }
    data();
  }, []);

  const handleSelectedActivePage = (selectedPage) => {
    newSelectedPage(selectedPage);
  };

  const changeHandler = ({ target }) => {
    newPageSize(parseInt(target.value));
  };

  let csvData = [["Id", "Title", "Body"]];

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            {filteredUserList && (
              <Table striped>
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Title</th>
                    <th>Body</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUserList && filteredUserList.length > 0 ? (
                    filteredUserList
                      .slice(
                        (selectedPage - 1) * pageSize,
                        selectedPage * pageSize
                      )
                      .map((user, index) => {
                        csvData.push([
                          user.id.toString(),
                          user.title,
                          user.body,
                        ]);
                        return <UserRow key={index} user={user} />;
                      })
                  ) : (
                    <tr>
                      <td>No User Found!</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

        <Row className="d-flex align-items-flex-end">
          <Col md={8}>
            {filteredUserList && (
              <PaginationComponent
                size="sm"
                totalItems={filteredUserList.length}
                pageSize={pageSize}
                onSelect={handleSelectedActivePage}
                maxPaginationNumbers={maxPaginationNumbers}
                activePage={selectedPage}
              />
            )}
          </Col>

          <Col md={2} xs={6}>
            <input
              className="form-control"
              type="number"
              placeholder="Type your Range"
              name="perPage"
              onChange={changeHandler}
              value={pageSize}
            />
          </Col>

          <Col md={2} xs={6}>
            {csvData.length > 0 && <DownloadToCsvFile csvData={csvData} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PaginationReactStrap;
