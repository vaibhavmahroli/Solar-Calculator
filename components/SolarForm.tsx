import React, {Component} from 'react';
import * as PvWatts from '../api/PvWatts';

class SolarForm extends React.Component<IProps, ISolarFormProps>{

	constructor(props:ISolarFormProps){
		super(props);
		this.state={
			consumptionRadio: true, //boolean
			budgetRadio:false,
			consumptionValue:0,
			plantSizeRadio:false,
			budgetValue:0,
			cost:0,
			plantSize:0,
			plantSizeBudget:0,
			breakEven:0,
			electricityCost:0,
			calculateModal:false
		}

	}

    render(){

		const calculate = (e:any) => {
			e.preventDefault();
			this.setState({calculateModal:true})
			let total = this.props.solarValues?.ac_annual
			if(total){
				Math.round(total);
				let x = total/12;
				if(this.state.plantSize!=0 && this.state.plantSize){
					let plantSizeBudget=0;
					if(this.state.plantSize<=10){
						plantSizeBudget = this.state.plantSize*60000;
					}
					else if(this.state.plantSize>10 && this.state.plantSize<=100){
						plantSizeBudget = this.state.plantSize*55000;
					}
					else{
						plantSizeBudget = this.state.plantSize*53000;
					}
					this.setState({plantSizeBudget});
					if(this.state.electricityCost && this.props.solarValues?.ac_annual){
						console.log("in")
						let breakEven = plantSizeBudget/(this.props.solarValues?.ac_annual*this.state.electricityCost);
						
						this.setState({breakEven});
					}
				}
				else if(this.state.consumptionValue!=0 && this.state.consumptionValue){
					let plantSize=(this.state.consumptionValue/x)*8.2;
					console.log(plantSize, x);
					let plantSizeBudget = 0;
					if(plantSize<=10){
						plantSizeBudget = plantSize*60000;
					}
					else if(plantSize>10 && plantSize<=100){
						plantSizeBudget = plantSize*55000;
					}
					else{
						plantSizeBudget = plantSize*53000;
					}
					this.setState({plantSize, plantSizeBudget});
					console.log("Budget"+this.state.plantSizeBudget, "Cost"+this.state.electricityCost)
				
				if(this.state.electricityCost && this.props.solarValues?.ac_annual){
					console.log("in")
					let breakEven = plantSizeBudget/(this.props.solarValues?.ac_annual*this.state.electricityCost);
					
					this.setState({breakEven});
				}
				}
				else if(this.state.budgetValue!=0 && this.state.budgetValue){
					let plantSize=0;
					if(this.state.budgetValue<=600000){
						plantSize =  this.state.budgetValue/60000;
					}
					else if(this.state.budgetValue>600000 && this.state.budgetValue<=5500000){
						plantSize =  this.state.budgetValue/55000;
					}
					else{
						plantSize =  this.state.budgetValue/53000;
					}
					this.setState({plantSize, plantSizeBudget:this.state.budgetValue});
					if(this.state.electricityCost && this.props.solarValues?.ac_annual){
						console.log("in")
						let breakEven = this.state.budgetValue/(this.props.solarValues?.ac_annual*this.state.electricityCost);
						
						this.setState({breakEven});
					}
				}
				
				}
				
				
		}

		const commonChange = (e:any) => {
			this.setState({
				[e.target.name]:e.target.value
			});
		}

        return(
                <div style={{position:'relative'}}>
					{
						this.state.calculateModal?
						<div style={{position:'absolute', top:'-40vh', right:'20vw', width:'700px', height:'300px', background:'white'}} className="calculateModal">
							<h1>Results</h1><br />
							<strong>1. SIZE OF POWER PLANT</strong><br />
							Feasible size as per your capacity {this.state.plantSize}kW <br/>
							<strong>2. COST OF THE PLANT</strong><br />
							Rs. {this.state.plantSizeBudget?this.state.plantSizeBudget:null}<br/>
							<strong>3. Total Energy Generation</strong><br />
							{this.props.solarValues?.ac_annual.toFixed(2)}kWh<br/>
							The Breakeven for your plant is {this.state.breakEven? this.state.breakEven.toFixed(2):null} years
						</div>
						:
						null
					}
					
					<style jsx>
							{`
								.calculateModal{
									background-color:white;
									z-index:100;
									padding: 20px;
									border: 1px solid black;
									border-radius:10px;
									-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
									-moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
									box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
								}
							`}
						</style>
					<form onSubmit={calculate}>
		  <div className="mb-3">
		    <label  className="form-label">1. Choose any one of the following</label>
		    <div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" onClick={()=>this.setState({consumptionRadio:false, budgetRadio:false, plantSizeRadio:!this.state.plantSizeRadio})}/>
				  <label className="form-check-label">Plant Size</label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={()=>this.setState({consumptionRadio:!this.state.consumptionRadio, budgetRadio:false, plantSizeRadio:false})}/>
				  <label className="form-check-label">Monthly Consumption</label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"value="option3"  onClick={()=>this.setState({consumptionRadio:false, budgetRadio:!this.state.budgetRadio, plantSizeRadio:false})}/>
				  <label className="form-check-label">Your budget</label>
				</div>
				<div className="row mt-3">
				{
					  this.state.plantSizeRadio?
					  <div className="col">
					  <div id="capacity">
						<div className="input-group mb-3">
							<input type="number" name="plantSize" className="form-control" placeholder="Plant Size (kW)" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
						  </div>
					  </div>
					</div>
					  :null
				  }
				  {
					  this.state.consumptionRadio?
					  <div className="col">
					  <div id="capacity">
						<div className="input-group mb-3">
							<input type="number" name="consumptionValue" className="form-control" placeholder="Monthly Consumption (kWh)" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
						  </div>
					  </div>
					</div>
					  :null
				  }
				  {
					this.state.budgetRadio?
					<div className="col">
				    <div id="budget">
				      <div className="input-group mb-3">
						  <input type="number" name="budgetValue" className="form-control" placeholder="Your Budget" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
						</div>
						</div>
					</div>
				  	:null
				  }
				</div>
		    </div>
		  </div>
		  <div className="mb-3">
		    <label className="form-label">2. What is your average electricity cost? </label>
		    <div>
		    	<div className="input-group mb-3">
				  <input type="number" className="form-control" name="electricityCost" placeholder="Electricity Cost (in ₹)" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
				</div>
		    </div>
		  </div> 
		  <button type="submit" className="btn btn-primary" onClick={()=>this.setState({calculateModal:true})}>Calculate</button>
		</form>
				</div>
        );
    };
};

interface ISolarFormProps{
	consumptionRadio?:boolean,
	budgetRadio?:boolean,
	plantSizeRadio?:boolean,
	consumptionValue?:number,
	budgetValue?:number,
	cost?:number,
	plantSize?:number,
	plantSizeBudget?:number,
	calculateModal?:boolean,
	breakEven?:number,
	electricityCost?:number,
	solarValues?:PvWatts.ResponseOutput
}

interface IProps{
	solarValues?:PvWatts.ResponseOutput;
}

export default SolarForm;