import React, { Component } from "react";

// import "react-wheel-of-prizes/dist/index.css";
// import IMAGES from "./assets";

import WheelComponent from "../components/lotteryComponents/weel";
import "../components/lotteryComponents/lotteryStyle.css";
import TrPortal from "../components/lotteryComponents/lotteryPortal.js";
import Confetti from "react-confetti";

export class LotteryWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: false,
      show: false,
    };
  }

  onFinished = (winner) => {
    const { candidates, winner: winnerName } = this.props;
    const winningSegmentIndex = candidates.indexOf(String(winnerName));
    const show = candidates[winningSegmentIndex];
    this.setState({ show });
  };
  

  render() {
    const user = this.props.user;
    const candidates = this.props.candidates;
    const winnerName = this.props.winner;
    // Find the index of the winnerName in the candidates array
    const winningSegmentIndex = candidates.indexOf(String(winnerName));
   
    console.log("Lottery Wheel", this.props.candidates);
    console.log("Wheel user", this.props.user);
    console.log("Wheel winner", candidates[winningSegmentIndex]);
    // let objIndex = {
    //   "Iphone13promax": 1,
    //   "Bosesurroundspeakers": 2,
    //   "Samsung65-InchCrystalUHD4KFlatSmartTV": 3,
    //   "MacBookAirMGN6314”Display,AppleM1ChipWith8-Core": 4,
    //   "KIATELLURIDE2022": 5,
    //   "SAMSUNGFRONTLOADWASHINGMACHINE16KG": 6,
    //   "10GRAMSGOLDCOIN": 7,
    //   "VOUCHERFORGEORGIAFAMILYTRIPUPTO4": 8,
    //   "AMAZONGIFTVOUCHERWORTH1000AED": 9,
    //   "APPLEAIRPODSPRO":10
    // }
    // const segments=["daw","add","fgf","ass","ave"]
    const weelColors = () => {
      let arr = [];
      let colors = ["#32CD32", "#ADFF2F", "#7CFC00", "#00FF00", "#00FF7F"];
      candidates.forEach((el) => {
        let color = colors.shift();
        arr.push(color);
        colors.push(color);
      });

      return arr;
    };
    const segColors = weelColors();

    // const rand = () => {
    //   return setTimeout(() => {
    //     return segments[Math.floor(Math.random() * segments.length)];
    //   }, 5000);
    // };

    // const onFinished = () => {
    //   const winner = candidates[winningSegmentIndex]; // Predefined winner
    //   this.setState({ portal: false, show: winner });
    // };
    return (
      <div
        // id="pankaj"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5px",
          paddingBottom: "5px",
          //   background: `url(${IMAGES.background})`
        }}
        >
        {this.state.show &&
          user.firstname === candidates[winningSegmentIndex] && (
            <Confetti
            width={1600}
            height={1019}
            initialVelocityY={Number | { min: 1, max: 10 }}
            />
            )}

        <WheelComponent
          segments={candidates}
          segColors={segColors}
          winningSegment={candidates[winningSegmentIndex]}
          onFinished={this.onFinished}
          primaryColor="black"
          contrastColor="white"
          buttonText="Draw Equb"
          isOnlyOnce={true}
          size={10}
        />
        {this.state.portal ? <TrPortal /> : null}
        {this.state.show && (
          // modal
          <div className="box rounded-md">
            <div className="imageBox"></div>
            <h2 className="titleWin text-black">
              {user.firstname === candidates[winningSegmentIndex] ? (
                <span>
                  CONGRATULATIONS!!! YOU HAVE WON THIS ROUND{" "}
                  <span className="text-2xl text-lime-500">
                    {this.state.show}!!!
                  </span>{" "}
                  PLEASE VISIT THE EQUB OFFICE IN YOUR AREA TO FULFILL SOME
                  LEGALITY ISSUES AND TAKE YOUR MONEY.
                </span>
              ) : (
                <span>
                  THE WINNER OF THIS ROUND IS{" "}
                  <span className="text-2xl text-lime-500">
                    {this.state.show}!!!
                  </span>
                </span>
              )}
            </h2>

            <div className="closeContainer">
              <button
                className=" bg-lime-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-lime-700 w-[140px] justify-self-end"
                onClick={() => this.setState({ show: false })}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LotteryWheel;
