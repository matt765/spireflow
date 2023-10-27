interface ChipProps {
  label: string,
  onDelete: () => void;
}

export const Chip = ({ label, onDelete }: ChipProps) => {
    return (
      <div className="inline-flex items-center bg-gray-200 rounded-full px-2 pl-4 py-1 text-sm font-semibold !text-tableCellText dark:!text-secondaryTextDark mr-2 mb-2 h-8 pb-2 pt-1.5 form-element-styled">
        {label}
        <button onClick={onDelete} className="ml-2 pt-0.5">
          <svg
            className="w-4 h-4 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    );
  };
  