const CustomButton = (props) => {
    return (
        <button
        onClick={props.onClickFunction}
        type="button"
        className="bg-shopper-green ml-1 h-14 rounded-sm text-xs font-semibold p-4"
      >
        {props.buttonName}
      </button>
    );
  };
  
  export default CustomButton;