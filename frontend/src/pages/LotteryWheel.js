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
  
  render() {
    const user = this.props.user
    const candidates=this.props.candidates
    console.log("Lottery Wheel", this.props.candidates);
    console.log('Wheel user',this.props.user);
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
    const onFinished = () => {
      const winner = candidates[1]; // Predefined winner
      this.setState({ portal: false, show: winner });
    };
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
       
        {this.state.show && user.firstname === candidates[1] && <Confetti width={1600} height={1019} initialVelocityY={Number | { min: 1, max: 10 }} />} 
        <WheelComponent
          segments={candidates}
          segColors={segColors}
          winningSegment={candidates[1]} 
          onFinished={(winner) => onFinished(winner)}
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
            <div className="imageBox">
            </div>
            <h2 className="titleWin text-fuchsia-700 flex items-center gap-2">
            {user.firstname===candidates[1] ? `CONGRATULATIONS!!! YOU HAVE WON THIS ROUND ${<p className="text-2xl ">{this.state.show}!!!</p>} Please visit the admin's office to fulfill some legality issues.` :"THE WINNER OF THIS ROUND IS"} <p className="text-2xl ">{this.state.show}!!!</p> 
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