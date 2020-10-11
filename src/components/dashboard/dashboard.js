import React, { Component } from 'react';
import { Chart } from 'react-charts'
export default ()=> {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
    return (
    <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Dashboard v1</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
              <h3>150</h3>
              <p>New Orders</p>
            </div>sa
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
              <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
              <p>Bounce Rate</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>44</h3>
              <p>User Registrations</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>65</h3>
              <p>Unique Visitors</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
      {/* /.row */}
      {/* Main row */}
      <div className="row">
        {/* Left col */}
        <section className="col-lg-7 connectedSortable">
          {/* Custom tabs (Charts with tabs)*/}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-chart-pie mr-1" />
                Sales
              </h3>
              <div className="card-tools">
                <ul className="nav nav-pills ml-auto">
                  <li className="nav-item">
                    <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                  </li>
                </ul>
              </div>
            </div>{/* /.card-header */}
            <div className="card-body">
              <div className="tab-content p-0">
                {/* Morris chart - Sales */}
                <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}}>
         
                </div>
                <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}}>
                
                  <Chart data={data} axes={axes}  />                      
                </div>  
              </div>
            </div>{/* /.card-body */}
          </div>
        
        </section>
        {/* /.Left col */}
        
      </div>
      {/* /.row (main row) */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

      );
  }

