import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
// import WheelComponent from 'react-wheel-of-prizes';
import LotteryWheel from './LotteryWheel.js'

function Lottery() {
  const { user } = useAuthContext();
  const { equbId } = useParams();
  const [winner, setWinner] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [lotteryDate, setLotteryDate] = useState('');

  useEffect(() => {
    const fetchEqubData = async (equbId) => {
      try {
        const response = await fetch(`/api/equb/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbData = await response.json();
        setLotteryDate(equbData.lottery_date);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWinnerData = async (equbId) => {
      try {
        const response = await fetch(`/api/equb/winner/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const winnerData = await response.json();
        setWinner(winnerData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchContributedMembers = async (equbId) => {
      try {
        const response = await fetch(`/api/equb/candidates/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const contributorsData = await response.json();
        setCandidates(contributorsData);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchEqubData(equbId);
      fetchContributedMembers(equbId);
      fetchWinnerData(equbId);
    }
  }, [equbId, user]);

  // const getRandomColor = () => {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  const handleCelebration = () => {
    if (user.user_id === winner._id) {
      return (
        <div className="text-white">
          <p>Congratulations, {winner.first_name}!</p>
          <p>You are the winner of the last lottery.</p>
          <p>Please visit the admin's office to fulfill some legality issues.</p>
        </div>
      );
    } else {
      return (
        <div className="text-white">
          <p>The last lottery winner was {winner.first_name}.</p>
          <p>Stay tuned for the next lottery announcement.</p>
        </div>
      );
    }
  };

  // const handlePrizeWheelFinished = () => {
  //   console.log("PRRRRiiiizeee")
  //   return (
  //     <div>
  //       <p className="text-red-600 text-xl font-bold">This round winner is {winner.first_name}.</p>
  //     </div>
  //   )
  // };

  const renderAnnouncement = () => {
    const today = new Date();
    const lotteryDateObj = new Date(lotteryDate);


    if (today.toDateString() === lotteryDateObj.toDateString()) {
      if (candidates.length !== 0) {
      const candidatesArray=candidates.map(candidate => candidate.first_name)
      console.log(candidatesArray)
        return (
          <div className="flex flex-col items-center justify-content-center p-0 m-6">
            <p>Day To Know The Lucky One</p>
            <LotteryWheel candidates={candidatesArray} user={user} winner={winner} />
            {/* <WheelComponent
              segments={candidatesArray}
              segColors={candidates.map(() => getRandomColor())}
              winningSegment={user.first_name} // Adjust this based on your winner data
              onFinished={handlePrizeWheelFinished()}
              primaryColor='black'
              contrastColor='white'
              buttonText='Draw Equb'
              isOnlyOnce={false}
              size={200}
              upDuration={1000}
              downDuration={1000}
              fontFamily='Arial'
              mustStartSpinning={false} // Start spinning automatically
              prizeNumber={0} // Index of the desired partition (0-based index)
            /> */}
          </div>
        );
      }
    } else if (today < lotteryDateObj) {
      const distanceToLottery = formatDistanceToNow(lotteryDateObj, { addSuffix: true });

      return (
        <p className="text-white">The next lottery will be held {distanceToLottery}.</p>
      );
    } else {
      return handleCelebration();
    }
  };

  return (
    <div className="bg-gray-900 mx-11 px-11 min-h-screen mb-32 pb-9 rounded-lg flex ">
      <div className="container px-4 mb-32 flex flex-col items-center justify-center rounded-lg bg-gray-800 shadow-md shadow-lime-500">
        <h1 className="text-3xl font-bold text-lime-500 mb-4 ">Equb Lottery</h1>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md shadow-lime-300 border-lime-500 border-2 hover:border-lime-500">
          {renderAnnouncement()}
        </div>
      </div>
    </div>
  );
}

export default Lottery;
