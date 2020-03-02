// Deafault App component that all other compents are rendered through
function App(props) {
    return <Game venue="Thunderdome" />
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            venue: props.venue
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Welcome to {this.state.venue}!</h1>
                <div className="arena">
                    <div className="team">
                      Home Team
                        <Team
                            name="Magic"
                            logo="./assets/images/magic_logo.png"
                        />
                    </div>
                    <div className="team">
                      Visiting Team
                        <Team
                            name="Flash"
                            logo="./assets/images/utah_flash.gif"
                        />
                    </div>
                </div>
            </div>
        )
    }
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
