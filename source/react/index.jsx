import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{textAlign: 'center'}}>
                Hello World!
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('container'));