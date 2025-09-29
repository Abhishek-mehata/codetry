import { FC } from "react";
import { Button } from "../../..";

interface Props {
  className?: string;

  backTite?: string;
  nextTite?: string;

  backDisabled?: boolean;
  nextDisabled?: boolean;
  loading?: boolean;

  onClickBack?: () => void;
  onClickNext?: () => void;
}

const TabButtons: FC<Props> = ({
  className,

  backTite = "Back",
  nextTite = "Next",

  backDisabled,
  nextDisabled,
  loading = false,

  onClickBack,
  onClickNext,
}) => (
  <div className={`flex items-center justify-between ${className} w-full`}>
    <Button title={backTite} disabled={backDisabled} onClick={onClickBack} />
    <Button
      title={loading ? "Saving..." : nextTite}
      disabled={nextDisabled || loading}
      variant="filled"
      onClick={onClickNext}
    />
  </div>
);

export default TabButtons;
