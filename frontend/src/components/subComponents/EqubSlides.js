function EqubSlides(props) {
  return (
    // equb_id as a key for each equbs
    <div className="equb-slideshadow-md bg-green-100 shadow-black w-[400px] h-[175px] rounded-2xl flex p-3 items-center justify-between">
      <img src={props.img} alt="Equb picture" className="w-[170px] h-[170px] rounded-full" />
      <div className="equb-description p-1">
        <h3 className="equb-name">{props.name}</h3>
        <p className="equb-type m-0">{props.type}</p>
        <p className="equb-amount m-0">ETB {props.amount} per person</p>
        <p className="equb-round m-0">max {props.cycle} round</p>
      </div>
    </div>
  );
}

export default EqubSlides;
