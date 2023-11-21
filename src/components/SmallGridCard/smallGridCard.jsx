import "./smallGridCard.css";
import { IoMdArrowDropup } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRef } from "react";
import useAnimatedComponent from "../../hooks/useAnimatedComponent";

function SmallGridCard({ data = { value: null, change: 0 }, extras }) {
  const Icon = extras.icon;
  const cardRef = useRef();
  useAnimatedComponent(cardRef);

  return (
    <div ref={cardRef} className="smallGridCard hidden">
      <div className="smallGridCard-top">
        <div className="smallGridCard-top-left">
          <Icon fontSize={16} className="card-icon" />
        </div>
        <div className="smallGridCard-top-right">
          {data.change > 0 ? (
            <IoMdArrowDropup size={18} color="#4bd570" />
          ) : (
            <IoMdArrowDropdown color="#fe8361" size={18} />
          )}
          <span>&nbsp;{(data.change > 0 ? data.change : data.change * -1) + "%"}</span>
        </div>
      </div>
      <div className="smallGridCard-bottom">
        <div className="smallGridCard-bottom-left">
          <span className="value" id={`${extras.name}-counter`}></span>
          <span className="value">{data.value + extras.decorator}</span>
          <span className="title">{extras.title}</span>
        </div>
        <FaRegQuestionCircle size={22} className="smallGridCard-bottom-help" />
      </div>
    </div>
  );
}

export default SmallGridCard;
