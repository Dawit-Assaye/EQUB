
function AdditionalInfo({ formData, setFormData }) {
  return (
    <div className="other-info-container">
      <input
        type="number"
        placeholder="Phone number..."
        value={formData.phone_number}
        onChange={(e) => {
          setFormData({ ...formData, phone_number: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="City..."
        value={formData.city}
        onChange={(e) => {
          setFormData({ ...formData, city: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Region..."
        value={formData.region}
        onChange={(e) => {
          setFormData({ ...formData, region: e.target.value });
        }}
      />
    </div>
  );
}

export default AdditionalInfo;
