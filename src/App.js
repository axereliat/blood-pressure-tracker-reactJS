import React, { Component } from 'react';
import Home from "./components/Home";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash);
library.add(faSave);

class App extends Component {
  render() {
    return (
      <div className="container-flex">
        <Home/>
      </div>
    );
  }
}

export default App;
