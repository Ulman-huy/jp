import React, { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import clsx from "clsx";

type CountUpProps = {
  from: number;
  to: number;
  duration?: number;
  className?: string;
};

const CountUp: React.FC<CountUpProps> = ({
  from,
  to,
  duration = 4000,
  className,
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return new Intl.NumberFormat("en-US").format(Math.round(latest));
  });

  useEffect(() => {
    const controls = animate(count, to, { duration: duration / 1000 });

    return () => controls.stop();
  }, [to]);

  return (
    <motion.div className={clsx(className ? className : "!text-[#03DEAA]")}>
      {rounded}
    </motion.div>
  );
};

export default CountUp;
