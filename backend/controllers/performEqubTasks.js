// Assuming you have a database or API for storing and retrieving equb data
const Equb = require("../models/equbModel");
const EqubPayWinner=require("../models/equbPayWinnerModel")

// Import necessary libraries and modules
const cron = require("node-cron");
// const { getEqubs } = require('./equbControllers');//updateEqub

// Define a function to perform equb management tasks
async function performEqubTasks() {
  try {
    console.log("EQUB CHECK LAter");
    // console.log("THIS IS MY Checked equb");
    // Fetch equbs from the database
    const equbs = await Equb.find().sort({ createdAt: 1 });
    

    // Iterate over each equb
    for (const equb of equbs) {
      const today = new Date();

      // Check if the equb has already been processed for the current day's payment
      if (equb.last_payment_date && equb.last_payment_date.toDateString() === today.toDateString()) {
        continue; // Skip processing for this equb
      }
      // Check if the equb has already been processed for the current day's lottery
      if (equb.last_lottery_date && equb.last_lottery_date.toDateString() === today.toDateString()) {
        continue; // Skip processing for this equb
      }
    
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
          equb.last_payment_date = today
        }
          
        // Check if it is the lottery drawing date
        const lotteryDateobj = new Date(equb.lottery_date);
        console.log("EQUB CHECK for now", lotteryDateobj.toDateString() === today.toDateString());
        if (lotteryDateobj.toDateString() === today.toDateString()) {
            
          // Filter candidates to exclude winners
          const candidates = equb.contributed_equbers.filter(
            (equber) => !equb.winners.includes(equber)
          );

          // Perform lottery drawing if there are eligible candidates
          if (candidates.length > 0) {
            const winner = selectRandomWinner(candidates);

            

            if (winner) {
              // Update equb fields
              equb.last_winner = winner;
              equb.winners.push(winner);
              equb.status =
                equb.contributed_equbers.length === equb.winners.length
                  ? "completed"
                  : "active";

              // //check if it there is request for this round for this winner on this equb name
              // const existingTransaction = await EqubPayWinner.findOne({
              //   equbId: equb._id,
              //   currentRound: equb.current_round,
              //   recipientEquberId: winner._id,
              // });
              // if (existingTransaction) {
              //   return;
              // }
              // Send payment request to admin
              createPaymentRequest(equb, winner);

              // Assign the current date as the last lottery date
              equb.last_lottery_date = today
              
              
              //calculate next draw date based on the equb type (week or month)
              calculateNextDrawDate(equb)
              
              // Empty the contributed_equbers array
              equb.contributed_equbers = [];
              
              // Increment the current round
              equb.current_round++;
            }
          }
        
        
          // Update equb in the database
          await equb.save()
        }
      }
    }
  } catch (error) {
    console.error("Error performing equb tasks:", error);
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
  async function createPaymentRequest(equb, winner) {
    try {
      const amountOfMoney = equb.amount * equb.contributed_equbers.length;
      await EqubPayWinner.create({
        equbId: equb._id,
        equbName: equb.equb_name,
        currentRound: equb.current_round,
        amountOfMoney: amountOfMoney,
        recipientEquberId: winner._id,
        recipientEquberName: winner.first_name + " " + winner.last_name,
      });
    } catch (error) {
      console.log("Error on requesting winner payment", error);
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
}
// Export the function
module.exports = performEqubTasks;
