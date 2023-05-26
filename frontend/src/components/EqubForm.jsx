import { useState } from "react"
import { useCreateEqub } from "../hooks/useCreateEqub"


function EqubForm() {
    const [ formData, setFormData] = useState({
        equb_name: "",
        equb_type: "weekly",
        equb_amount: "",
        equb_round: "",
        equb_starting_date:""
    })
  
  const {createEqub,error,message}=useCreateEqub()
  
  const currentDate = new Date();
  const minStartingDate = new Date();
  minStartingDate.setDate(currentDate.getDate() + 3); // Minimum starting date should be 3 days ahead

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedStartingDate = new Date(formData.equb_starting_date);

    if (selectedStartingDate < minStartingDate) {
      // Display an error message if the selected starting date is not at least 3 days ahead
      // You can modify this error handling based on your UI requirements
      alert("Please select a starting date that is at least 3 days ahead.");
      return;
    }

    await createEqub(
      formData.equb_name,
      formData.equb_type,
      formData.equb_amount,
      formData.equb_round,
      formData.equb_starting_date
    )
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-1 items-center justify-center">
      <h3 className="text-xl text-fuchsia-700">Equb Informations</h3>
      <div className="flex flex-wrap gap-x-6 items-center justify-center">
      <div>
      
        <label htmlFor="name">Name</label>
          <input
        type="text"
        placeholder="Equb name..."
              value={formData.equb_name}
              id="name"
        onChange={(e) => {
          setFormData({ ...formData, equb_name: e.target.value });
        }}
          />
          <label htmlFor="type">Type</label>
          <select
              id="type"
          value={formData.equb_type}
          onChange={(e) => {
            setFormData({ ...formData, equb_type: e.target.value });
          }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly" >Monthly</option>
          </select>
          
          <label htmlFor="amount">Amount Of Money</label>
          <input
        type="text"
        placeholder="Amount of money to be contributed..."
              value={formData.equb_amount}
              id="amount"
        onChange={(e) => {
          setFormData({ ...formData, equb_amount: e.target.value });
        }}
          />
           
      </div>
      <div className="items-start">
           <label htmlFor="round">Number of Round</label>
          <input
        type="number"
        placeholder="Maximum number of rounds or people..."
              value={formData.equb_round}
            id="round"
            min="1"
            max={formData.equb_type === "monthly" ? "12" : "16"}
        onChange={(e) => {
          setFormData({ ...formData, equb_round: e.target.value });
        }}
      />

      <label htmlFor="starting">Starts at</label>
      <input
            type="date"
            placeholder="Starting date of this equb..."
            value={formData.equb_starting_date}
            id="starting"
            min={minStartingDate.toISOString().split("T")[0]} // Set the minimum attribute of the input to the minimum starting date
            onChange={(e) => {
              setFormData({ ...formData, equb_starting_date: e.target.value });
            }}
          />
        </div>
        </div>
          <button className="bg-lime-500 hover:bg-lime-700 shadow-md shadow-black">Create</button>
      {error && <div className="error">{error}</div>}
      {message && <div className="relative flex items-center justify-center "><div className=" bg-lime-500 text-white border-2 p-2 m-2 rounded-md border-lime-600 ">{message}</div></div>}
        {/* Toast needed here */}
        </form>
  )
}

export default EqubForm