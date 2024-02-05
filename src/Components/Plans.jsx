import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import sortWithoutWebWorker from "./WithoutWebWorker";
import sortWithWebWorker from "./WithWebWorker";
const Plans = () => {
  const [data, setData] = useState([]);
  const [timeWithWorker, setTimeWithWorker] = useState(0);
  const [timeWithoutWorker, setTimeWithoutWorker] = useState(0);

  useEffect(() => {
    GetPlans();
  }, []);

  async function GetPlans() {
    console.log("run");
    try {
      const response = await fetch(`${process.env.REACT_APP_URI}/GetPlans`, {
        method: "GET",
        headers: {
          "api-key": process.env.REACT_APP_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSortWithWorker = () => {
    const startTime = performance.now();

    sortWithWebWorker(data, (sortedArray) => {
      const endTime = performance.now();
      setData(sortedArray.reverse()); // Reverse the sorted array for descending order
      setTimeWithWorker(endTime - startTime);
    });
  };

  const handleSortWithoutWorker = () => {
    const startTime = performance.now();

    const sortedArray = sortWithoutWebWorker(data).reverse(); // Reverse the sorted array for descending order

    const endTime = performance.now();
    setData(sortedArray);
    setTimeWithoutWorker(endTime - startTime);
  };

  return (
    <div>
      <div class="container-scroller">
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a class="sidebar-brand brand-logo" href="index.html">
              <img
                src="assets/logo.png"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </a>
            <a class="sidebar-brand brand-logo-mini" href="index.html">
              <img
                src="assets/logo.png"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </a>
          </div>
          <ul class="nav">
            <li class="nav-item menu-items">
              <a class="nav-link" onClick={() => handleSortWithWorker()}>
                <span class="menu-icon">
                  <i class="mdi mdi-speedometer"></i>
                </span>
                <span class="menu-title">WithOut WebWorker</span>
              </a>
            </li>
            <li class="nav-item menu-items">
              <a class="nav-link" onClick={() => handleSortWithoutWorker()}>
                <span class="menu-icon">
                  <i class="mdi mdi-speedometer text-danger"></i>
                </span>
                <span class="menu-title">With WebWorker</span>
              </a>
            </li>
          </ul>
        </nav>{" "}
        {/* <!-- partial --> */}
        <div class="container-fluid page-body-wrapper">
          <nav class="navbar p-0 fixed-top d-flex flex-row">
            <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
              <a class="navbar-brand brand-logo-mini" href="/">
                <img src="assets/images/logo-mini.svg" alt="logo" />
              </a>
            </div>
            <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
              <button
                class="navbar-toggler navbar-toggler align-self-center"
                type="button"
                data-toggle="minimize"
              >
                <span class="mdi mdi-menu"></span>
              </button>
              <button
                class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                data-toggle="offcanvas"
              >
                <span class="mdi mdi-format-line-spacing"></span>
              </button>
            </div>
          </nav>

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <h4
                        className="card-title"
                        style={{ display: "inline-block", marginRight: "10px" }}
                      >
                        WithOut WebWorker:{timeWithWorker !== null ? (timeWithWorker.toFixed(3)) : "-"}ms
                      </h4>

                      <h4
                        className="card-title"
                        style={{ display: "inline-block", marginRight: "10%" ,marginLeft:'10%',color:'red'}}
                      >
                        Plans
                      </h4>
                      <h4
                        className="card-title"
                        style={{ display: "inline-block" }}
                      >
                        With WebWorker:{timeWithoutWorker !== null ? (timeWithoutWorker.toFixed(3)) : "-"}ms
                      </h4>
                      <div class="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Id{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                User{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Plan Number{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Investment Period{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Gain Ratio{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Amount{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Dated{" "}
                              </th>
                              <th
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                              >
                                {" "}
                                Expiry Dated{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((row, index) => (
                              <tr>
                                <td
                                  className="py-1"
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {row.id}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {row.name}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {row.plannumber}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {row.investmentperiod}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {row.gainratio}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {row.amount}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {new Date(row.createdt).toLocaleString(
                                    "en-US",
                                    {
                                      dateStyle: "medium",
                                      timeStyle: "medium",
                                    }
                                  )}
                                </td>
                                <td
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#191c24" : "black",
                                    color: "white",
                                  }}
                                >
                                  {new Date(
                                    new Date(row.createdt).getTime() +
                                      7 * 24 * 60 * 60 * 1000
                                  ).toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "medium",
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
