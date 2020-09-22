import React, { Component } from "react";
import ReactPaginate from "react-paginate";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: this.props.perPage,
      currentPage: 0,
      data: this.props.data,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  async componentDidMount() {
    this.getData();
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    let data = this.state.data;

    let slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
    this.props.tableData(slice);
  }

  handleInputChange(slice) {
    this.props.tableData(slice);
  }

  getData() {
    var data = this.state.data;
    var slice =
      data &&
      data.slice(this.state.offset, this.state.offset + this.state.perPage);

    this.setState({
      pageCount: Math.ceil(data && data.length / this.state.perPage),
      orgtableData: data,
      tableData: slice,
    });
    this.handleInputChange(slice);
  }

  render() {
    return (
      <div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
