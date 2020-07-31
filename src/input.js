import React,{Component} from 'react';
import classes from './main.css';



class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {            
            apiResponse:"",
            inputValue: '',
            inputValueError:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }
    
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
    }

    validate = () =>{

        let isError= false;
        const errors = {};

        if(this.state.inputValue.length > 10){
            isError : true;
            errors.inputValueError = "String is not more than 10 character";
        }

        if(isError){
            this.setState({
                ...this.setState,
                ...errors
            });
        }

        return isError;

    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value});
      }
    
      handleSubmit = (event) => {  
          
        const err = this.validate();

        if(!err){
            this.setState({
                inputValue:""
            });
        }

        alert('A form was submitted: ' + this.state.inputValue);    
        fetch('http://localhost:9000/testAPI', {
            method: 'POST',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(this.state)
          }).then(function(response) {
            console.log(response)
            return response.json();
          });
    
        event.preventDefault();
    }
    
  
    render(){
    
        return(

            <div  >
               <form className= {classes.main_container}  onSubmit={this.handleSubmit}>

                <select className={classes.input} name="data" id="data">
                <option value="select" >Select</option>
                <option value="ascending">Ascending</option>
                <option value="decending">Decending</option>
                </select>
                <br/>

                <input className={classes.inputext} type="text" placeholder="Input String"  
                name="inputValue"  onChange={this.handleChange} errorText={this.state.inputValueError}>
                </input>
                
                <br/>
                <input className={classes.button} type="Submit" value="Submit" ></input>
                <br/>

                <p className={classes.input}>{this.state.apiResponse}</p>
                </form>       
            </div>

        );
    };
}

export default Input;