import React,{Component} from 'react';

import Title from './components/title';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "908012ae65e8230ecb5ad93405efc1e7";

class App extends Component{

  state = {
    temperature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country){
      this.setState({
        temperature : data.main.temp,
        city : data.name,
        country : data.sys.country,
        humidity : data.main.humidity,
        description : data.weather[0].description,
        error : ""
      });
    }else{
      this.setState({
        temperature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : "Please Enter City and Country"
      });
    }
    }

  render(){
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 title-container">
                  <Title />
                </div>
                <div className="col-sm-9 form-container">
                <Form getWeather = {this.getWeather} />
                <Weather 
                  temperature = {this.state.temperature}
                  city = {this.state.city}
                  country = {this.state.country}
                  humidity = {this.state.humidity}
                  description = {this.state.description}
                  error = {this.state.error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;