function EqubSlides(props) {
  return (
    // equb_id as a key for each equbs
    <div className="equb-slide shadow-md  shadow-slate-600 w-[370px] h-[175px] rounded-2xl flex p-3 items-center justify-between relative">
      <img src={props.img} alt="Equb picture" className="w-[170px] h-[170px] rounded-full" />
      <div className="equb-description p-1 ">
        <h3 className="equb-name text-green-400 font-semibold">{props.name}</h3>
        <p className="equb-type m-0 text-gray-500">{props.type}</p>
        <p className="equb-amount m-0">ETB {props.amount} per person</p>
        <p className="equb-round m-0">max {props.cycle} round</p>
        <button className="absolute bg-green-500 text-white rounded-lg shadow-md shadow-black p-1 hover:bg-green-700 w-[60px] bottom-[10px]">Join</button>
      </div>
    </div>
  );
}

export default EqubSlides;
