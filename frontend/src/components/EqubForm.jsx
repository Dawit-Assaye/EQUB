import { useState } from "react"
import { useCreateEqub } from "../hooks/useCreateEqub"


function EqubForm() {
    const [ formData, setFormData] = useState({
        equb_name: "",
        equb_type: "",
        equb_amount: "",
        equb_round: "",
        equb_starting_date:""
    })
  
  const {createEqub,error,message}=useCreateEqub()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <h3 className="text-xl text-green-500">Equb Informations</h3>
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
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
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
           <label htmlFor="round">Max-Round</label>
          <input
        type="text"
        placeholder="Maximum number of rounds or people..."
              value={formData.equb_round}
              id="round"
        onChange={(e) => {
          setFormData({ ...formData, equb_round: e.target.value });
        }}
      />

      <label htmlFor="starting">Starting date</label>
          <input
        type="date"
        placeholder="Starting date of this equb..."
              value={formData.equb_starting_date}
              id="starting"
        onChange={(e) => {
          setFormData({ ...formData, equb_starting_date: e.target.value });
        }}
          />
        </div>
        </div>
          <button className="bg-green-500">Create</button>
      {error && <div className="error">{error}</div>}
      {message && <div className="relative flex items-center justify-center "><div className="success">{message}</div></div>}
        {/* Toast needed here */}
        </form>
  )
}

export default EqubForm