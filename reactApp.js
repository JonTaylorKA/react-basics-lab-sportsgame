// Deafault App component that all other compents are rendered through
function App(props) {
  const teamMagic = {
    name: "Magic",
    logo: "./assets/images/magic_logo.png"
  }
  const teamFlash = {
    name: "Flash",
    logo: "./assets/images/utah_flash.gif"
  }
  const teamBananas = {
    name: "Bananas",
    logo: "./assets/images/bananas.png"
  }
  const teamNuts = {
    name: 'Nuts',
    logo: "./assets/images/nuts.jpg"
  }
    return (<div className='app'>
      <Game venue="Thunderdome" hometeam={teamMagic} visitors={teamFlash}/>
      <Game venue="Wrigley Field" hometeam={teamNuts} visitors={teamBananas}/>
      </div>
      )
}

function Game(props) {
        return (
            <div className="container">
                <h1>Welcome to {props.venue}!</h1>
                <div className="arena">
                    <div className="team">
                      Home Team
                        <Team
                            name={props.hometeam.name}
                            logo={props.hometeam.logo}
                        />
                    </div>
                    <div className="team">
                      Visiting Team
                        <Team
                            name={props.visitors.name}
                            logo={props.visitors.logo}
                        />
                    </div>
                </div>
            </div>
        )
}

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shotsTaken: 0,
            score: 0,
            shotPercent: 0,
            name: props.name,
            logo: props.logo
          }
          this.shot = new Audio("./assets/sounds/bounce.mp3")
          this.cheer = new Audio("./assets/sounds/applause4.mp3")
    }

    handleShot = event => {
        let newShots = this.state.shotsTaken + 1
        let newScore = this.state.score
        if (Math.round(Math.random()) === 1) {
            newScore += 1
            this.cheer.play()
        } else {
            this.shot.play()
        }
        let newPercent = 0
        if (newScore > 0) {
            newPercent = Math.round((newScore / newShots) * 100)
        }
        this.setState((state, props) => ({
            shotsTaken: newShots,
            score: newScore,
            shotPercent: newPercent
        }))
    }

    render() {
        return (
            <div>
                <h2>{this.state.name}</h2>
                <img src={this.state.logo} />
                <p>
                    Shots Taken:
                    <span id="shots"> {this.state.shotsTaken} </span>
                </p>
                <p>
                    Score:<span id="score"> {this.state.score} </span>
                </p>
                {this.state.shotsTaken > 0 && (
                    <p>
                        Shot Percentage:
                        <span id="shotpercent">
                            {" "}
                            {this.state.shotPercent}{" "}
                        </span>{" "}
                        %
                    </p>
                )}
                <div>
                    <button onClick={this.handleShot} id="shoot">
                        Shoot!
                    </button>
                </div>
            </div>
        )
    }
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"))
