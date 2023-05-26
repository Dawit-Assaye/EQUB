// Assuming you have a database or API for storing and retrieving equb data
const Equb = require("../models/equbModel");
const EqubPayWinner=require("../models/equbPayWinnerModel")

// Import necessary libraries and modules
const cron = require("node-cron");
// const { getEqubs } = require('./equbControllers');//updateEqub

// Define a function to perform equb management tasks
async function performEqubTasks() {
  try {
    // Fetch equbs from the database
    const equbs = await Equb.find().sort({ createdAt: 1 });
    
    // Iterate over each equb
    for (const equb of equbs) {
      // const {
      //   _id,
      //   equb_name,
      //   members,
      //   current_round,
      //   contributed_equbers,
      //   refundable_equbers,
      //   winners,
      //   status,
      //   lottery_date,
      //   payment_date,
      // } = equb;
      
      if (equb.status !== "completed") {

        // Check if it's the payment lasting date
        const today = new Date();
        const paymentDateobj = new Date(equb.payment_date);
        if (paymentDateobj.toDateString() === today.toDateString()) {
          // Updating the members by including only the contributed equbers for the first round
          if (equb.current_round === 1) {
            equb.members = equb.contributed_equbers;
          }

          // Filter and add unpaid equbers to refundable equbers list if not already present
          const unpaidEqubers = equb.members.filter(
            (equber) => !equb.contributed_equbers.includes(equber)
          );
          const refundableEqubersData = unpaidEqubers.filter(
            (equber) => !equb.refundable_equbers.some((item) => item.equber === equber)
          );
          const newRefundableEqubersData = refundableEqubersData.map(
            (equber) => ({ equber, round: equb.current_round })
          );
          equb.refundable_equbers.push(...newRefundableEqubersData);
          
          // Check if it is the lottery drawing date
          const today = new Date();
          const lotteryDateobj = new Date(equb.lottery_date);
          if (lotteryDateobj.toDateString() === today.toDateString()) {
            // Perform lottery drawing
            const winner = selectRandomWinner(equb.contributed_equbers);
            
            if (winner) {
              // Update equb fields
              equb.current_winner = winner;
              equb.winners.push(winner);
              equb.status =
              equb.contributed_equbers.length === equb.winners.length
                  ? "completed"
                  : "active";

              // Send payment request to admin
              createPaymentRequest(equb, winner);

              //calculate next draw date based on the equb type (week or month)
              calculateNextDrawDate(equb)
              
              // Empty the contributed_equbers array
              equb.contributed_equbers = [];
            
              // Increment the current round
              equb.current_round++;
            }
          }
        }

        // Update equb in the database
        await equb.save()
        console.log('THIS IS MY EQUB');
      }
    }
    
  } catch (error) {
    console.error("Error performing equb tasks:", error);
  }
}

// Schedule the equb tasks to run daily at a specific time
cron.schedule("*/30 * * * *", performEqubTasks);

// Helper functions

// Random winner selector function
function selectRandomWinner(equbers) {
  const randomIndex = Math.floor(Math.random() * equbers.length);
  return equbers[randomIndex];
}


// Create an object containing the payment request details in the database
async function  createPaymentRequest (equb,winner) {
  try{
    await EqubPayWinner.create({
      equbId:equb._id,
      equbName:equb.equb_name,
      currentRound:equb.current_round,
      amountOfMoney:equb.amount,
      recipientEquberId:winner._id,
      recipientEquberName:winner.firstname + ' ' + winner.lastname,
    })
  }catch(error) {
    console.log('Error on requesting winner payment',error);
  }
}

function calculateNextDrawDate(equb) {
  // const { type, payment_date, lottery_date } = equb;
  let nextPaymentDate;
  let nextLotteryDate;

  if (equb.type === "weekly") {
    // Add 7 days in milliseconds to the last payment date
    nextPaymentDate = new Date(equb.payment_date.getTime() + 7 * 24 * 60 * 60 * 1000);
    // Add 7 and 12 hours in milliseconds to the current lottery date
    nextLotteryDate = new Date(equb.lottery_date.getTime() + (7 * 24 + 12) * 60 * 60 * 1000);
  } else if (equb.type === "monthly") {
    // Add 30 days in milliseconds to the last payment date
    nextPaymentDate = new Date(equb.payment_date.getTime() + 30 * 24 * 60 * 60 * 1000);
    // Add 30 and 12 hours in milliseconds to the current lottery date
    nextLotteryDate = new Date(equb.lottery_date.getTime() + (30 * 24 + 12) * 60 * 60 * 1000);
  } else {
    // Invalid equb type
    throw new Error("Invalid equb type");
  }

  // Update the fields in the equb object
  equb.payment_date = nextPaymentDate;
  equb.lottery_date = nextLotteryDate;
}

// Export the function
module.exports = performEqubTasks;
