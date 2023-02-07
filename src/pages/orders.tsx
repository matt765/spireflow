import { useMemo } from "react";
import {
  Column,
  useFlexLayout,
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";

import { PageContainer } from "../components/PageContainer";
import { Layout } from "../layout/Layout";

export default function Orders() {
  const data = useMemo(
    () => [
      {
        col1: "#23423",
        col2: "iPhone XR",
        col3: "John Doe",
        col4: "$799",
        col5: "Two-day shipping",
        col6: "Delivered",
      },
      {
        col1: "#82342",
        col2: "Macbook Pro",
        col3: "Jane Doe",
        col4: "$1,299",
        col5: "Standard shipping",
        col6: "In Transit",
      },
      {
        col1: "#82423",
        col2: "Beats Solo Pro",
        col3: "Alex Smith",
        col4: "$299",
        col5: "Free shipping",
        col6: "Shipped",
      },
      {
        col1: "#23423",
        col2: "iPad Pro",
        col3: "Emily Davis",
        col4: "$799",
        col5: "Express shipping",
        col6: "Delivered",
      },
      {
        col1: "#82423",
        col2: "Apple Watch Series 6",
        col3: "Daniel Lee",
        col4: "$399",
        col5: "Standard shipping",
        col6: "In Transit",
      },
      {
        col1: "#12345",
        col2: "Samsung Galaxy S21",
        col3: "David Smith",
        col4: "$699",
        col5: "Standard Shipping",
        col6: "Delivered",
      },
      {
        col1: "#67890",
        col2: "Google Pixel 5",
        col3: "Emma Johnson",
        col4: "$599",
        col5: "Two-Day Shipping",
        col6: "In Transit",
      },
      {
        col1: "#23456",
        col2: "OnePlus 9 Pro",
        col3: "John Doe",
        col4: "$799",
        col5: "Free Shipping",
        col6: "Shipped",
      },
      {
        col1: "#34567",
        col2: "Huawei P40 Pro",
        col3: "Jane Doe",
        col4: "$599",
        col5: "Express Shipping",
        col6: "Delivered",
      },
      {
        col1: "#45678",
        col2: "Xiaomi Mi 11",
        col3: "Michael Brown",
        col4: "$599",
        col5: "Standard Shipping",
        col6: "In Transit",
      },
      {
        col1: "#56789",
        col2: "Realme X50 Pro",
        col3: "Sarah Johnson",
        col4: "$449",
        col5: "Two-Day Shipping",
        col6: "Shipped",
      },
      {
        col1: "#67890",
        col2: "Oppo Find X3 Pro",
        col3: "Emily Davis",
        col4: "$999",
        col5: "Express Shipping",
        col6: "Delivered",
      },
      {
        col1: "#78901",
        col2: "Nokia 9 PureView",
        col3: "Daniel Lee",
        col4: "$499",
        col5: "Two-Day Shipping",
        col6: "In Transit",
      },
      {
        col1: "#89012",
        col2: "LG Wing",
        col3: "Alex Smith",
        col4: "$999",
        col5: "Free Shipping",
        col6: "Shipped",
      },
      {
        col1: "#82343",
        col2: "AirPods Pro",
        col3: "Sarah Johnson",
        col4: "$249",
        col5: "Two-day shipping",
        col6: "Shipped",
      },
      {
        col1: "#23423",
        col2: "iMac Pro",
        col3: "Michael Brown",
        col4: "$1,999",
        col5: "Express shipping",
        col6: "Delivered",
      },
      {
        col1: "#23423",
        col2: "Apple TV 4K",
        col3: "Emily Davis",
        col4: "$199",
        col5: "Two-day shipping",
        col6: "In Transit",
      },
      {
        col1: "#83423",
        col2: "Mac Mini",
        col3: "Alex Smith",
        col4: "$699",
        col5: "Free shipping",
        col6: "Shipped",
      },
      {
        col1: "#82342",
        col2: "Macbook Pro",
        col3: "Jane Doe",
        col4: "$1,299",
        col5: "Standard shipping",
        col6: "In Transit",
      },
      {
        col1: "#82423",
        col2: "Beats Solo Pro",
        col3: "Alex Smith",
        col4: "$299",
        col5: "Free shipping",
        col6: "Shipped",
      },
      {
        col1: "#23423",
        col2: "iPad Pro",
        col3: "Emily Davis",
        col4: "$799",
        col5: "Express shipping",
        col6: "Delivered",
      },
      {
        col1: "#82423",
        col2: "Apple Watch Series 6",
        col3: "Daniel Lee",
        col4: "$399",
        col5: "Standard shipping",
        col6: "In Transit",
      },
      {
        col1: "#82343",
        col2: "AirPods Pro",
        col3: "Sarah Johnson",
        col4: "$249",
        col5: "Two-day shipping",
        col6: "Shipped",
      },
      {
        col1: "#23423",
        col2: "iMac Pro",
        col3: "Michael Brown",
        col4: "$1,999",
        col5: "Express shipping",
        col6: "Delivered",
      },
      {
        col1: "#23423",
        col2: "Apple TV 4K",
        col3: "Emily Davis",
        col4: "$199",
        col5: "Two-day shipping",
        col6: "In Transit",
      },
    ],
    []
  );

  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
      col6: string;
    }>
  > = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "col1", // accessor is the "key" in the data
        maxWidth: 100,
      },
      {
        Header: "Product name",
        accessor: "col2",
        width: 200,
      },
      {
        Header: "User",
        accessor: "col3",
        width: 200,
      },
      {
        Header: "Price",
        accessor: "col4",
      },
      {
        Header: "Delivery type",
        accessor: "col5",
      },
      {
        Header: "Status",
        accessor: "col6",
      },
    ],
    []
  );
  const tableInstance = useTable({ columns, data }, useFlexLayout);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Layout>
      <PageContainer title="Dashboard">
        <div className="flex w-full p-10 paper text-lg">
          <table {...getTableProps()} className="w-full  rounded-lg">
            <thead className="w-full  rounded-lg">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      key={index}
                      className="text-gray-700 font-medium text-left text-base pl-4 py-4 border bg-gray-50"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={index}
                    className="hover:bg-gray-50"
                  >
                    {row.cells.map((cell, index) => (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="text-gray-500 font-medium p-4 border"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PageContainer>
    </Layout>
  );
}
