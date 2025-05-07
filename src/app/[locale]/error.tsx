"use client";

import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";
import { OutlinedButton } from "../../components/common/OutlinedButton";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <CenteredPageWrapper>
      <div className="flex pr-4 mx-auto items-center justify-center w-3/5 h-full flex-col border-mainBorder pt-8 pb-12 rounded-xl">
        <p className="text-2xl mb-8 text-primaryText">Error: {error.message}</p>
        <div className="w-[8rem] h-[3rem]">          
          <OutlinedButton
            handleClick={() => reset()}
            className="border border-mainColor rounded-lg py-3 px-5 text-primaryText"
          >
            Try again
          </OutlinedButton>
        </div>
      </div>
    </CenteredPageWrapper>
  );
};
export default Error;
