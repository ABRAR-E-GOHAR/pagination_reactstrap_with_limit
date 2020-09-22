import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

export default function DownloadToCsvFile(props) {
  //   const csvData = [
  //     ["firstname", "lastname", "email"],
  //     ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //     ["Raed", "Labes", "rl@smthing.co.com"],
  //     ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  //   ];

  const csvData = props.csvData;

  return (
    <CSVLink data={csvData}>Download</CSVLink>
    // <CSVDownload data={csvData} target="_blank" />
  );
}

// or
{
}
