import React from "react";

import { ContainedButton } from "../../components/common/ContainedButton";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { Modal } from "../../components/common/Modal";
import { useHandleLogout } from "../../hooks/auth/useHandleLogout";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

interface LogoutModalProps {
  closeModal: () => void;
}

export const LogoutModal = ({ closeModal }: LogoutModalProps) => {
  const { handleLogout, loading } = useHandleLogout();

  return (
    <div>
      <Modal onClose={closeModal}>
        <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
          <div className="rounded-full w-18 flex justify-center items-center mr-[0rem] stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
            <LogoutIcon width="55" height="55" />
          </div>
          <h2 className="text-primaryText text-3xl w-full text-center mt-2">
            Are you sure?
          </h2>
        </div>

        <h2 className="text-primaryText text-base w-full text-secondaryText mt-4">
          Click yes to sign out from application.
        </h2>
        <div className="flex w-full justify-center mt-12 gap-4">
          <div className="w-[6rem] h-[2.5rem]">
            <OutlinedButton text="Cancel" handleClick={closeModal} />
          </div>
          <div className="w-[6.5rem] h-[2.5rem] pb-0">
            <ContainedButton handleClick={handleLogout} disabled={loading}>
              {/* {loading ? <SpinnerIcon /> : t("createAccount")} */}
              {loading ? (
                <div className="pt-[0.3rem]">
                  <SpinnerIcon width={45} height={45} />
                </div>
              ) : (
                "Yes"
              )}
            </ContainedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
