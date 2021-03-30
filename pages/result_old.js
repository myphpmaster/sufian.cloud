
		<div id="mainCarousel" className='container-fluid p-0 m-0 mw-100 carousel slide' data-ride="carousel">		
        <div className="carousel-inner">

            <div className='carousel-item active'>
                <div className="grid">
                    <div className="card d-none d-md-block">
                        <Bar
                        data={data}
                        width={800}
                        height={500}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                    <div className="card d-md-none d-block">
                        <Bar
                        data={data}
                        width={320}
                        height={400}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                </div>			
            </div>

            <div className='carousel-item active'>
                <div className="grid">
                    <div className="card d-none d-md-block">
                        <Line
                        data={data}
                        width={800}
                        height={500}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                    <div className="card d-md-none d-block">
                        <Line
                        data={data}
                        width={320}
                        height={400}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                </div>				
            </div>
            
            <div className='carousel-item active'>
                <div className="grid">
                    <div className="card d-none d-md-block">
                        <Doughnut
                        data={data}
                        width={800}
                        height={500}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                    <div className="card d-md-none d-block">
                        <Doughnut
                        data={data}
                        width={320}
                        height={400}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                </div>		
            </div>
            
            
            <div className='carousel-item active'>
                <div className="grid">
                    <div className="card d-none d-md-block">
                        <Pie
                        data={data}
                        width={800}
                        height={500}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                    <div className="card d-md-none d-block">
                        <Pie
                        data={data}
                        width={320}
                        height={400}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        }}
                        />
                    </div>
                </div>		
            </div>

        </div>

        <a className="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
    </a>

    </div>

  </main>
      
      <script
        dangerouslySetInnerHTML={
            {
            __html: `
            jQuery( document ).ready(function($) {
                $('.carousel-item').removeClass('active');
                $('.carousel-item:first-child').addClass('active');
                $('.carousel').carousel();	
            });
            `
        }}
      />
      