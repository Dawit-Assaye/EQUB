// Assuming you have a database or API for storing and retrieving equb data
const Equb = require("../models/equbModel");
const EqubPayWinner = require("../models/equbPayWinnerModel");

// Import necessary libraries and modules
const cron = require("node-cron");
// const { getEqubs } = require('./equbControllers');//updateEqub

// Define a function to perform equb management tasks
async function performEqubTasks() {
  try {
    console.log("EQUB CHECK");
    // console.log("THIS IS MY Checked equb");
    // Fetch equbs from the database
    const equbs = await Equb.find().sort({ createdAt: 1 });

    // Iterate over each equb
    for (const equb of equbs) {
      const today = new Date();

      console.log("LAST A", equb.last_payment_date);

      // Handler for all equbs
      // Check if the equb has already been processed for the current day's payment
      if (
        equb.last_payment_date &&
        equb.last_payment_date.toDateString() === today.toDateString() &&
        equb.current_round !== 1
      ) {
        continue; // Skip processing for this equb
      }

      console.log("LAST 0", equb.last_payment_date);
      // Check if the equb has already been processed for the current day's lottery
      if (
        equb.last_lottery_date &&
        equb.last_lottery_date.toDateString() === today.toDateString() &&
        equb.current_round !== 1
      ) {
        continue; // Skip processing for this equb
      }

      console.log("LAST 1", equb.last_payment_date);

      //Handler for round one exceptionally
      if (
        equb.last_payment_date &&
        equb.current_round === 1 &&
        equb.last_payment_date.getTime() + 24 * 60 * 60 * 1000 ===
          today.getTime()
      ) {
        continue; // Skip processing for this equb
      }

      if (
        equb.last_lottery_date &&
        equb.current_round === 1 &&
        equb.last_lottery_date.getTime() + 24 * 60 * 60 * 1000 ===
          today.getTime()
      ) {
        continue; // Skip processing for this equb
      }

      console.log("LAST 2", equb.last_payment_date);

      if (equb.status !== "completed") {
        // Check if it's the payment lasting date
        const today = new Date();
        const paymentDateobj = new Date(equb.payment_date);

        console.log("PAYMENTDATE", paymentDateobj.toDateString());
        console.log("TODAY", today.toDateString());

        if (paymentDateobj.toDateString() === today.toDateString()) {
          console.log("LAST 3", equb.last_payment_date);

          // Updating the members by including only the contributed equbers for the first round
          if (equb.current_round === 1) {
            equb.members = equb.contributed_equbers;
          }

          // Filter and add unpaid equbers to refundable equbers list if not already present
          const unpaidEqubers = equb.members.filter(
            (equber) => !equb.contributed_equbers.includes(equber)
          );
          const refundableEqubersData = unpaidEqubers.filter(
            (equber) =>
              !equb.refundable_equbers.some((item) => item.equber === equber)
          );
          const newRefundableEqubersData = refundableEqubersData.map(
            (equber) => ({ equber, round: equb.current_round - 1 }) //////////need to be minus 1
          );
          equb.refundable_equbers.push(...newRefundableEqubersData);
          console.log("refundable_equbers", newRefundableEqubersData);

          //calculate the next lottery date
          updatePaymentDate(equb);
          equb.last_payment_date = today;
        }

        // Check if it is the lottery drawing date
        const lotteryDateobj = new Date(equb.lottery_date);
        console.log("LOTTODATE", lotteryDateobj.toDateString());
        console.log("TODAY", today.toDateString());
        if (lotteryDateobj.toDateString() === today.toDateString()) {
          // Filter candidates to exclude winners
          const candidates = equb.contributed_equbers.filter(
            (equber) => !equb.winners.includes(equber)
          );

          console.log("CANDIDATES", candidates);

          // Perform lottery drawing if there are eligible candidates
          if (candidates.length > 0) {
            const winner = selectRandomWinner(candidates);

            if (winner) {
              // Update equb fields
              const updateQuery = {
                last_winner: winner,
                $push: { winners: winner },
                status:
                  equb.contributed_equbers.length === equb.winners.length /////completion problem the ffrist equber must pay to last
                    ? "completed"
                    : "active",
                last_contributed_equbers: equb.contributed_equbers,
                last_lottery_date: today,
                contributed_equbers: [],
                $inc: { current_round: 1 },
                lottery_date:
                  equb.type === "weekly"
                    ? new Date(
                        equb.lottery_date.getTime() +
                          (7 * 24 + 12) * 60 * 60 * 1000
                      )
                    : new Date(
                        equb.lottery_date.getTime() +
                          (30 * 24 + 12) * 60 * 60 * 1000
                      ),
              };

              // Update equb in the database and check version
              const updatedEqub = await Equb.findOneAndUpdate(
                {
                  _id: equb._id,
                  __v: equb.__v,
                  "winners._id": { $ne: winner._id },
                },
                updateQuery,
                { new: true }
              );

              // If the document was not found, return without further processing
              if (!updatedEqub) {
                return;
              }

              // Check if there is an existing transaction for this round and winner on this equb name
              const existingTransaction = await EqubPayWinner.findOne({
                equbId: equb._id,
                currentRound: equb.current_round,
                recipientEquberId: winner._id,
              });
              if (existingTransaction) {
                return;
              }

              // Send payment request to admin
              createPaymentRequest(updatedEqub, winner);

              // // Calculate the next lottery date
              // updateLotteryDate(updatedEqub);
            }
          }
        }

        // Update equb in the database
        await equb.save();
      }
    }
  } catch (error) {
    console.error("Error performing equb tasks:", error);
  }

  // Helper functions

  // Random winner selector function
  function selectRandomWinner(equbers) {
    const randomIndex = Math.floor(Math.random() * equbers.length);
    return equbers[randomIndex];
  }

  // Create an object containing the payment request details in the database
  async function createPaymentRequest(equb, winner) {
    try {
      const amountOfMoney = equb.amount * equb.last_contributed_equbers.length;
      const equberName = winner.first_name + " " + winner.last_name;

      await EqubPayWinner.create({
        equbId: equb._id,
        equbName: equb.equb_name,
        currentRound: equb.current_round,
        amountOfMoney: amountOfMoney,
        recipientEquberId: winner._id,
        recipientEquberName: equberName,
      });
    } catch (error) {
      console.log("Error on requesting winner payment", error);
    }
  }

  function updatePaymentDate(equb) {
    if (equb.type === "weekly") {
      // Add 7 days in milliseconds to the last payment date
      const nextPaymentDate = new Date(
        equb.payment_date.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      equb.payment_date = nextPaymentDate;
    } else if (equb.type === "monthly") {
      // Add 30 days in milliseconds to the last payment date
      const nextPaymentDate = new Date(
        equb.payment_date.getTime() + 30 * 24 * 60 * 60 * 1000
      );
      equb.payment_date = nextPaymentDate;
    } else {
      // Invalid equb type
      throw new Error("Invalid equb type");
    }
  }

  function updateLotteryDate(equb) {
    if (equb.type === "weekly") {
      // Add 7 and 12 hours in milliseconds to the current lottery date
      const nextLotteryDate = new Date(
        equb.lottery_date.getTime() + (7 * 24 + 12) * 60 * 60 * 1000
      );
      equb.lottery_date = nextLotteryDate;
    } else if (equb.type === "monthly") {
      // Add 30 and 12 hours in milliseconds to the current lottery date
      const nextLotteryDate = new Date(
        equb.lottery_date.getTime() + (30 * 24 + 12) * 60 * 60 * 1000
      );
      equb.lottery_date = nextLotteryDate;
    } else {
      // Invalid equb type
      throw new Error("Invalid equb type");
    }
  }
}
// Schedule the equb tasks to run daily at a specific time
cron.schedule("1 * * * *", performEqubTasks);

// Export the function
module.exports = performEqubTasks;
