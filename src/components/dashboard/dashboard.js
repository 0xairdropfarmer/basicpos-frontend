import React, { useEffect, useState } from "react";
import { Bar,Doughnut ,Line } from "react-chartjs-2";
import { server } from "../../constants";
import * as StatActions from "../../actions/stat.action";
import { useSelector, useDispatch } from "react-redux";
export default (props) => {
  const [inventorystat, setInventorystat] = useState([]);
  const statReducer = useSelector(({ statReducer }) => statReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(StatActions.getCurrentInventoryStat());
    if (statReducer.result);
  }, []);
  useEffect(() => {
    if (statReducer.result) {
      let name = statReducer.result.flat().map((item) => {
        return item.name;
      });
      let stock = statReducer.result.flat().map((item) => {
        return item.stock;
      });
      setInventorystat({ name: name, stock: stock });
      // console.log(result);
    }
  }, [statReducer.result]);
  const data = {
    labels: inventorystat.name,
    datasets: [
      {
        label: "# of Votes",
        data: inventorystat.stock,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const line_data = {
    labels:  inventorystat.name,
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: inventorystat.stock,
      }
    ]
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Dashboard</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard v1</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
              {/* Custom tabs (Charts with tabs)*/}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                     Inventory Stock Status
                  </h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content p-0">
                    {/* Morris chart - Sales */}
                    <div
                      className="chart tab-pane active"
                      id="revenue-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                      {statReducer.result && (
                        <Bar
                          redraw={true}
                          data={data}
                          width={400}
                          height={200}
                          options={{
                            maintainAspectRatio: false,
                          }}
                        />
                      )}
                    </div>
                    <div
                      className="chart tab-pane"
                      id="sales-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                       {statReducer.result && (
                        <Doughnut
                          redraw={true}
                          data={data}
                          width={400}
                          height={200}
                          options={{
                            maintainAspectRatio: false,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </section>
            {/* /.Left col */}
                {/* Left col */}
            <section className="col-lg-5 connectedSortable">
              {/* Custom tabs (Charts with tabs)*/}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                    Inventory Stock Status
                  </h3>
                  <div className="card-tools">
                    </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content p-0">
                    {/* Morris chart - Sales */}
                    <div
                      className="chart tab-pane active"
                      id="revenue-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                      {statReducer.result && (
                          <Line data={data} />
                      )}
                    </div>
                    <div
                      className="chart tab-pane"
                      id="sales-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                       {statReducer.result && (
                        <Doughnut
                          redraw={true}
                          data={data}
                          width={400}
                          height={200}
                          options={{
                            maintainAspectRatio: false,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </section>
            {/* /.Left col */}
          </div>
          <div className="row">
  {/* Left col */}
  <section className="col-lg-7 connectedSortable">
              {/* Custom tabs (Charts with tabs)*/}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                     Inventory Stock Status
                  </h3>
                  <div className="card-tools">
                  
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content p-0">
                    {/* Morris chart - Sales */}
                    <div
                      className="chart tab-pane active"
                      id="revenue-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                      {statReducer.result && (
                        <Doughnut
                          redraw={true}
                          data={data}
                          width={400}
                          height={200}
                          options={{
                            maintainAspectRatio: false,
                          }}
                        />
                      )}
                    </div>
                    <div
                      className="chart tab-pane"
                      id="sales-chart"
                      style={{ position: "relative", height: 300 }}
                    >
                      
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </section>
            {/* /.Left col */}
            </div>
          {/* /.row (main row) */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};
