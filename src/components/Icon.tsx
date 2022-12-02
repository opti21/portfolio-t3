import { FC } from "react";

type Props = {
    icon: string
}

const Icon: FC<Props> = ({icon}) => {
  return (
    <div className="w-full text-center">
      <i className={"devicon-" + icon} />
    </div>
  );
};

export default Icon