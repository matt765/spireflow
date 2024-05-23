import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Modal } from "../../common/Modal";
import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { ContainedButton } from "../../common/ContainedButton";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { Input } from "../../forms/Input";
import { Select } from "../../forms/Select";
import { OrderModalIcon } from "../../../assets/icons/OrderModalIcon";
import { AddEventModalProps } from "./types";

const hours = Array.from({ length: 9 }, (_, i) => `${i + 8}:00`);

export const AddEventModal = ({
  closeModal,
  onConfirm,
  loading,
  setEventTitle,
  setEventStart,
  setEventEnd,
  type = "default",
}: AddEventModalProps) => {
  const t = useTranslations("calendar");
  const [title, updateTitle] = useState("");
  const [startTime, updateStartTime] = useState(hours[0]);
  const [endTime, updateEndTime] = useState(hours[0]);
  const [error, setError] = useState("");
  const [isReadyToConfirm, setIsReadyToConfirm] = useState(false);

  const handleConfirmClick = useCallback(() => {
    let validationError = "";

    if (title === "") {
      validationError = t("addEventTitleRequiredError");
    } else if (title.length > 20) {
      validationError = t("addEventLengthError");
    } else {
      const startDate = new Date();
      const endDate = new Date();
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      startDate.setHours(startHour, startMinute);
      endDate.setHours(endHour, endMinute);

      if (startDate >= endDate) {
        validationError = t("addEventIncorrectTime");
      }
    }

    setError(validationError);

    if (!validationError) {
      setEventTitle(title);
      setEventStart(startTime);
      setEventEnd(endTime);
      setIsReadyToConfirm(true);
    }
  }, [title, startTime, endTime, setEventTitle, setEventStart, setEventEnd]);

  // This useEffect is necessary so user doesn't have to click confirm button twice
  useEffect(() => {
    if (isReadyToConfirm) {
      onConfirm();
      setIsReadyToConfirm(false);
    }
  }, [title, startTime, endTime, isReadyToConfirm, onConfirm]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleConfirmClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [title, startTime, endTime, handleConfirmClick]);

  return (
    <div>
      <Modal onClose={closeModal}>
        <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
          <div className="text-grayIcon rounded-full border border-mainBorder dark:border-mainBorderDark p-4 pl-4 w-16 h-16 flex justify-center items-center mr-[0rem] ">
            {type === "delete" ? (
              <DeleteIcon />
            ) : (
              <OrderModalIcon width={25} height={25} />
            )}
          </div>
          <h2 className="text-primaryText text-3xl w-full text-center mt-2">
            {t("addEventModalTitle")}
          </h2>
        </div>
        <h2 className="text-primaryText text-base w-full text-center text-secondaryText mt-4">
          {t("addEventModalSubtitle")}
        </h2>
        <div className="flex w-full justify-center mt-8 flex-col gap-4">
          <Input
            type="text"
            placeholder={t("addEventModalPlaceholder")}
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            className="text-input"
          />
          <div className="flex gap-4 w-full justify-between mt-1">
            <div className="w-1/2">
              <Select
                value={startTime}
                onChange={(e) => updateStartTime(e.target.value)}
                customOnDesktop
                customOptions={hours}
                enableOptionsDropdownScroll
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-1/2">
              <Select
                value={endTime}
                onChange={(e) => updateEndTime(e.target.value)}
                customOnDesktop
                customOptions={hours}
                enableOptionsDropdownScroll
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          {error && <div className="text-red-500 text-base">{error}</div>}
          <div className="w-full flex justify-center mt-5 gap-4 px-8">
            <div className="w-1/2 h-[2.5rem]">
              <OutlinedButton text={t("cancel")} handleClick={closeModal} />
            </div>
            <div className="w-1/2 h-[2.5rem] pb-0">
              <ContainedButton
                handleClick={handleConfirmClick}
                disabled={loading}
              >
                {loading ? (
                  <div className="pt-[0.3rem]">
                    <SpinnerIcon width={45} height={45} />
                  </div>
                ) : (
                  t("addEventConfirmButton")
                )}
              </ContainedButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
