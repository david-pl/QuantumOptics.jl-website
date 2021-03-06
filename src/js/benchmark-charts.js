// Config
var qojl_data = "QuantumOptics.jl-ae69320f5c";
var qutip_data = "QuTiP-4.1.0";
var toolbox_data = "QuantumOpticsToolbox";

// Rearrange dat structure
function rearrange (jsondata) {
		d = [];

	for (var i in jsondata) {
		xval = jsondata[i].N;
		yval = jsondata[i].t;
		d.push({x: xval, y: yval});
	}

	return d;
}

// Dynamical object with all the plot parameters and settings
function chartconfig (data, charttitle) {
	return {
	    type: 'line',
	    data: {
	        datasets: [{
		       label: 'QuantumOptics.jl',
		       data: rearrange(data[qojl_data]),
		       fill: false,
		       borderWidth: 3.0,
		       borderColor: '#d66761',
		       backgroundColor: '#d66761'
	        }, {
	            label: 'QuTiP 4.1.0',
	            data: rearrange(data[qutip_data]),
	            fill: false,
	            borderWidth: 3.0,
	            borderColor: '#a87db6',
	            backgroundColor: '#a87db6'
	        }, {
		       label: 'QO Toolbox',
		       data: rearrange(data[toolbox_data]),
		       fill: false,
		       borderWidth: 3.0,
		       borderColor: '#6cac5b',
		       backgroundColor: '#6cac5b'
	        }]
	    },
	    options: {
		    title: {
			    display: true,
				text: charttitle,
				fontSize: 14,
				fontStyle: 'normal',
				fontColor: "#333333"
				},
	        scales: {
	            xAxes: [{
		            type: 'linear',
		            position: 'bottom',
	                scaleLabel: {
		                display: true,
		                labelString: 'Hilbert-Space Dimension',
		                fontSize: 14,
						fontStyle: 'normal',
	                }
	            }],
	            yAxes: [{
	                scaleLabel: {
		                display: true,
		                labelString: 'Elapsed Time [seconds]',
		                fontSize: 14,
						fontStyle: 'normal',
	                }

	            }]
	        }
	    }
	};
}

// Function to create Plot from JSON
function createplot (file, htmlid, title) {
	$.getJSON('/benchmark-data/'+file, function (data) {
	var ctx = $(htmlid);
	var scatterChart = new Chart(ctx, chartconfig(data, title));
	});
}

// Now, create the plots
createplot('timeevolution_master.json', '#plot-timeevolution-master', 'Time Evolution (Master Equation)');
createplot('timeevolution_particle.json', '#plot-timeevolution-particle', 'Time Evolution (Particle)');
createplot('timeevolution_timedependent.json', '#plot-timeevolution-timedependent', 'Time Evolution (Time dependent)');

createplot('multiplication_sparse_sparse.json', '#plot-multiplication-sparse-sparse', 'Multiplication: sparse-sparse');
createplot('multiplication_sparse_dense.json', '#plot-multiplication-sparse-dense', 'Multiplication: sparse-dense');
createplot('multiplication_dense_sparse.json', '#plot-multiplication-dense-sparse', 'Multiplication: dense-sparse');
createplot('multiplication_dense_dense.json', '#plot-multiplication-dense-dense', 'Multiplication: dense-dense');

createplot('expect_state.json', '#plot-expect-state', 'Expectation Value (State Vector)');
createplot('expect_operator.json', '#plot-expect-operator', 'Expectation Value (Density Operator)');
createplot('variance_operator.json', '#plot-variance-operator', 'Variance (Density Operator)');
createplot('variance_state.json', '#plot-variance-state', 'Variance (State Vector)');

createplot('ptrace.json', '#plot-ptrace', 'Partial Trace Performance');

createplot('coherentstate.json', '#plot-coherentstate', 'Coherent State Performance');
createplot('qfunc_state.json', '#plot-qfunc-state', 'Q-Function for State Vectors');
createplot('qfunc_operator.json', '#plot-qfunc-operator', 'Q-Function for Density Operators');
