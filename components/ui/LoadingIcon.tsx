import clsx from "clsx";

type LoadingIconProps = {} & React.ComponentPropsWithoutRef<"span">;

const LoadingIcon = ({ className, ...props }: LoadingIconProps) => {
  return <span className={clsx("loader__loading", className)} {...props} />;
};

export default LoadingIcon;
