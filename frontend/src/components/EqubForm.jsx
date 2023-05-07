import { useState } from "react"
import { useCreateEqub } from "../hooks/useCreateEqub"

function EqubForm() {
    const { formData, setFormData } = useState({
        equb_name: "",
        equb_type: "",
        equb_amount: "",
        equb_round:""
    })
  const {createEqub,error,isLoading}=useCreateEqub()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEqub(
      formData.equb_name,
      formData.equb_type,
      formData.equb_amount,
      formData.equb_round
    )
  };

  return (
      <form onSubmit={handleSubmit}>
              <h3>Equb Informations</h3>
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
           
           <label htmlFor="round">Max-Round</label>
          <input
        type="text"
        placeholder="Maximum number of rounds or people..."
              value={formData.equb.round}
              id="round"
        onChange={(e) => {
          setFormData({ ...formData, equb_round: e.target.value });
        }}
          />
          <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
      {/* Toast needed here */}
        </form>
  )
}

export default EqubForm