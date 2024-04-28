import React from "react";
import { useTranslations } from "next-intl";

import { Modal } from "../../common/Modal";
import { OutlinedButton } from "../../common/OutlinedButton";
import { ContainedButton } from "../../common/ContainedButton";
import { OrderType } from "./useOrders";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { OrderModalIcon } from "../../../assets/icons/OrderModalIcon";

interface OrderModalProps {
  closeModal: () => void;
  orderData: OrderType;
}

export const OrderModal = ({ closeModal, orderData }: OrderModalProps) => {
  const t = useTranslations("orders.orderModal");
  console.log(orderData);

  const orderDetails = [
    { label: t("id"), value: orderData.col1 },
    { label: t("product"), value: orderData.col2 },
    { label: t("customer"), value: orderData.col3 },
    { label: t("price"), value: `$${orderData.col4.toFixed(2)}` },
    {
      label: t("shipping"),
      value: orderData.col5.split(" ").slice(0, -1).join(" "),
    },
    { label: t("date"), value: orderData.col6 },
    { label: t("status"), value: orderData.col7 },
    // One mocked value to display even number of details, visual purposes only
    { label: t("priority"), value: t("normal") },
  ];

  return (
    <div>
      <Modal onClose={closeModal}>
        <div className="flex items-center justify-center w-full flex-col gap-2 min-w-[20rem]">
          <div className="rounded-full border border-mainBorder dark:border-mainBorderDark p-4 w-18 flex justify-center items-center mr-[0rem] text-secondaryText dark:text-secondaryTextDark -mt-1">
            <OrderModalIcon width={30} height={30} />
          </div>
          <h2 className="text-primaryText text-3xl w-full text-center mt-3 mb-2">
            {t("title")}
          </h2>
          <div className="text-primaryText text-base w-full text-left mt-4 flex flex-wrap max-w-[26rem] justify-between">
            {orderDetails.map((detail) => (
              <p
                key={detail.label}
                className="border-b border-mainBorder dark:border-mainBorderDark w-[47%] my-2 pb-2 flex text-nowrap"
              >
                <div className="text-secondaryText mr-1">{detail.label}:</div>
                {detail.value}
              </p>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center mt-12 gap-4 h-[2.7rem]">
          <OutlinedButton text={t("cancelButton")} />
          <ContainedButton text={t("callButton")} icon={<PhoneIcon />} />
        </div>
      </Modal>
    </div>
  );
};
