import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
// import WheelComponent from 'react-wheel-of-prizes';
import LotteryWheel from './LotteryWheel.js'

function Lottery() {
  const { user } = useAuthContext();
  const { equbId } = useParams();
  const [winner, setWinner] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [lotteryDate, setLotteryDate] = useState(''); 
  const [lastLotteryDate, setLastLotteryDate] = useState('');
  const[equb,setEqub]=useState('')


  useEffect(() => {
    const fetchEqubData = async (equbId) => {
      try {
        const response = await fetch(`/api/equb/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbData = await response.json();
        setLotteryDate(equbData.lottery_date);
        setLastLotteryDate(equbData.last_lottery_date)
        setEqub(equbData)
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

  console.log("LOTTERY NOW", lotteryDate)

  const handleCelebration = () => {
  
      return (
        <div className="text-white">
          <p>The last lottery winner was {winner.first_name}.</p>
          <p>Stay tuned for the next lottery announcement.</p>
        </div>
      );
    
  };

  const renderAnnouncement = () => {
    const today = new Date();
    // const lotteryDateObj = new Date(lotteryDate);
    const lastLotteryDateObj=new Date(lastLotteryDate)
    const lotteryDateTime = DateTime.fromISO(lotteryDate);


    if (today.toDateString() === lastLotteryDateObj.toDateString()) {
      if (candidates.length !== 0) {
      const candidatesArray=candidates.map(candidate => candidate.first_name)
      console.log(candidatesArray)
        return (
          <div className="flex flex-col items-center justify-content-center p-0 m-6">
            <p>Day To Know The Lucky One</p>
            <LotteryWheel candidates={candidatesArray} user={user} winner={winner} />
          </div>
        );
      }
    }else if ( equb.current_round === 1) {
      return (
        <p className="text-white">This equb has not yet started.</p>
      );
    } else if ((today-lastLotteryDateObj)>=3) {
      const lotteryDistance = lotteryDateTime.toRelative({ style: 'long' });

      return (
        <p className="text-white">The next lottery will be held {lotteryDistance}.</p>
      );
    }else {
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
