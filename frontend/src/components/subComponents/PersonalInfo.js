function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="First Name..."
        value={formData.first_name}
        onChange={(e) => {
          setFormData({ ...formData, first_name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Last Name..."
        value={formData.last_name}
        onChange={(e) => {
          setFormData({ ...formData, last_name: e.target.value });
        }}
      />
          <input
             type="number"
             placeholder="Age..."
             value={formData.age}
             onChange={(e) => {
               setFormData({ ...formData, age: e.target.value });
             }}
           />
       <input
        type="text"
        placeholder="Job..."
        value={formData.job}
        onChange={(e) => {
          setFormData({ ...formData, job: e.target.value });
        }}
      />
    </div>
  );
}

export default PersonalInfo;
