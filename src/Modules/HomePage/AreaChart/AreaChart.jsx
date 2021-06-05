import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { getOperationCountForChart } from '../../../Services/operationService';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AreaChart extends Component {
	state = {
		year:'',
	};

	async componentDidMount() {
		const year = new Date().getFullYear();
		this.setState({year});
		const {data:arrayOfMonths} = await getOperationCountForChart();
		const jan = arrayOfMonths[0].count/100;
		this.setState({jan})
		
		const feb = arrayOfMonths[1].count/100;
		this.setState({feb})

		const march= arrayOfMonths[2].count/100;
		this.setState({march})

		const apr = arrayOfMonths[3].count/100;
		this.setState({apr})

		const may = arrayOfMonths[4].count/100;
		this.setState({may})

		const jun = arrayOfMonths[5].count/100;
		this.setState({jun})

		const jul = arrayOfMonths[6].count/100;
		this.setState({jul})

		const agu = arrayOfMonths[7].count/100;
		this.setState({agu})

		const sep = arrayOfMonths[8].count/100;
		this.setState({sep})

		const oct = arrayOfMonths[9].count/100;
		this.setState({oct})

		const nov = arrayOfMonths[10].count/100;
		this.setState({nov})

		const dec = arrayOfMonths[11].count/100;
		this.setState({dec})
	}

	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Numbers of Operations"
			},
			axisY: {
				title: "Number of Operations (in Hundred )",
				includeZero: false,
			},
			data: [
			{
				type: "area",
				xValueFormatString: "MMMM",
				yValueFormatString: "###.## Hundrude",
				dataPoints: 
				 [
					{ x: new Date(this.state.year, 0), y: this.state.jan},
					{ x: new Date(this.state.year, 1), y: this.state.feb},
					{ x: new Date(this.state.year, 2), y: this.state.march},
					{ x: new Date(this.state.year, 3), y: this.state.apr},
					{ x: new Date(this.state.year, 4), y: this.state.may},
					{ x: new Date(this.state.year, 5), y: this.state.jun},
					{ x: new Date(this.state.year, 6), y: this.state.jul},
					{ x: new Date(this.state.year, 7), y: this.state.agu},
					{ x: new Date(this.state.year, 8), y: this.state.sep},
					{ x: new Date(this.state.year, 9), y: this.state.oct},
					{ x: new Date(this.state.year, 10), y: this.state.nov},
					{ x: new Date(this.state.year, 11), y: this.state.dec}
				]
			}
			]
		}

		
		
		return (
		<div >
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default AreaChart;                           