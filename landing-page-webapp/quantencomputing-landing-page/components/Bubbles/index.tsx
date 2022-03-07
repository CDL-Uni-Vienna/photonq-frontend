import { BubbleStyle } from "./style";
import { Bubble1, Bubble2, Bubble3, Bubble4 } from "./bubbles";
import React from "react";

const clearAllIntervals = (ids: Array<NodeJS.Timeout>) => {
  ids.forEach((id) => {
    clearInterval(id);
    ids.splice(ids.indexOf(id), 1);
  });
  return ids;
};

const randomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const triggerAnimation = (triggered: number, num: number) => num === triggered;

const Bubbles = () => {
  const [time, setTime] = React.useState<number>(randomNumber(20, 10));
  const [triggered, setTriggered] = React.useState(4);
  const [ids, setIds] = React.useState<Array<NodeJS.Timeout>>([]);

  if (ids.length > 4) {
    setIds(clearAllIntervals(ids));
  } else if (ids.length === 0) {
    setTime(randomNumber(20, 10));
  }

  React.useMemo(() => {
    const id = setTimeout(() => {
      setTriggered(randomNumber(4, 0));
      setTime(randomNumber(120, 10));
    }, time * 1000 + 3000);
    setIds(ids.concat(id));
  }, [time]);
  return (
    <BubbleStyle>
      <div className="flex">
        <Bubble1 className={`qubit`} trigger={triggerAnimation(triggered, 0)} />
        <Bubble2 className={`qubit`} trigger={triggerAnimation(triggered, 1)} />
      </div>
      <div className="flex">
        <Bubble3
          className={`mr-4 qubit`}
          trigger={triggerAnimation(triggered, 2)}
        />
        <Bubble4
          className={`mt-3 qubit`}
          trigger={triggerAnimation(triggered, 3)}
        />
      </div>
    </BubbleStyle>
  );
};

export default Bubbles;
