import { useSpring, animated } from "@react-spring/web";
import { useRef, FC } from "react";
import { useInView } from "react-intersection-observer";
import { Item } from "../types/types";

type Props = {
    item: Item
    index: number,
}

const Card: FC<Props> = ({ item, index }) => {
    const { ref, inView, entry } = useInView({
        threshold: 0.9,
    });

    const spring = useSpring({
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 10,
        from: { opacity: 0, y: 10  },
        leave: { opacity: 1, y:0 }
    })

    return (
        <animated.div
            style={spring}
            ref={ref}
            key={item.name + index}
            className="border-4 border-double border-white bg-transparent w-full p-4 rounded-lg m-4 max-w-3xl flex flex-col gap-2"
        >
            <div className="text-2xl font-bold flex flex-row items-center">
                <span className="material-symbols-outlined mr-2">business_center</span>
                <span>{item.name}</span>
            </div>
            {item.beginDate && item.endDate && 
                <div className="flex flex-row items-center">
                    <span className="material-symbols-outlined mr-2">date_range</span>
                    {item.beginDate} - {item.endDate}
                </div>
            }
            {item.link &&
                <div className="flex flex-row items-center">
                    <span className="material-symbols-outlined mr-2">link</span>
                    <span className="hover:underline hover:cursor-pointer">{item.link}</span>
                </div>
            }
            {item.position &&
                <div className="flex flex-row items-center">
                    <span className="material-symbols-outlined mr-2">person</span>
                    {item.position}
                </div>
            }
            {item.bulletPoints && 
                <div className="flex flex-row items-start">
                    <span className="material-symbols-outlined mr-2">format_list_bulleted</span>
                    <ol className="list-disc pl-6">
                        {item.bulletPoints.map(point => (
                        <li>{point}</li>
                        ))}
                    </ol>
                </div>
            }
            {item.tech &&
                <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined mr-2">handyman</span>
                    {item.tech.map(tech => (
                        <div className="border border-white rounded-xl p-2">{tech}</div>
                    ))}
                </div>
            }
        </animated.div>
    )
}

export default Card