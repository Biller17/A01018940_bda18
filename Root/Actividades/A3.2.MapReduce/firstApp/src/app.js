class MyApp extends React.Component {
  render(){

    var info = {
      title: "titulo",
      subtitle: "subtitle"
    }
    return(
      <div>
        <Header info = {info}/>
        <Action/>
        <Options/>
      </div>
    )
  }
}



class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionArray: []
    };
  }

  onFormSubmit()  {
    if (document.getElementById('comment').value[0] == " "){
      alert("Error, no puedes poner solo espacios");
    }
    else{
      var options = this.state.optionArray;
      options.push(document.getElementById('comment').value)
      document.getElementById('comment').value  = "";
      this.setState({
        optionArray: options,
      });
    }

  }


  deleteComment(index){
    alert("Estas borrando un comentario: ", this.state.optionArray[index] )
    var options = this.state.optionArray
    options.splice(index,1);
    this.setState({
      optionArray: options
    })
  }
  render(){
    console.log(this.state.optionArray);
    return(
      <div>
        <input type="text" name="comment" id="comment"></input>
        <button className ="addComment" onClick={() => this.onFormSubmit()}>Agregar comentario</button>
        <ul>
          {
            this.state.optionArray.map((option, index) => {
              return(<li><Option info= {option}/><button onClick = {() => this.deleteComment(index)}>Borrar</button></li>)
            })
          }
        </ul>
    </div>
    )
  }
}

class Option extends React.Component {
  render(){
    return(
      <div>
        <p>{this.props.info}</p>
      </div>
    )
  }
}


class Header extends React.Component {
  render(){
    return (
      <div>
        <h1>{this.props.info.title}</h1>
        <h2>{this.props.info.subtitle}</h2>
      </div>
    )
  }
}


class Action extends React.Component {
  render(){
    return(
      <div>
        <button>Accion</button>
      </div>
    )
  }
}

ReactDOM.render(<MyApp/>, document.getElementById('app'));
