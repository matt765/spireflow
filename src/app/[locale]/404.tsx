"use client";

import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";

const Custom404 = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <CenteredPageWrapper>
      <div className="flex pr-4 mx-auto items-center justify-center w-3/5 h-full flex-col border-mainBorder dark:border-mainBorderDark pt-8 pb-12 rounded-xl">
        <p className="text-2xl mb-8">
          {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="border border-mainColor dark:border-mainColorDark rounded-lg py-3 px-5"
        >
          Try again
        </button>
      </div>
    </CenteredPageWrapper>
  );
};

export default Custom404;
