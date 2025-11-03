interface CharacterInfoItem {
  label: string;
  description?: string;
}

type CharacterInfoContent = string | string[] | CharacterInfoItem[];

interface CharacterInfoProps {
  headline: string;
  content: CharacterInfoContent;
  checkable?: boolean;
  checkedItems?: boolean[];
  onToggle?: (index: number, checked: boolean) => void;
  isCheckBox?: boolean;
}

export const CharacterInfo = ({
  headline,
  content,
  checkable = false,
  checkedItems = [],
  onToggle,
  isCheckBox = false,
}: CharacterInfoProps) => {
  const items = Array.isArray(content) ? content : [content];

  return (
    <div className="flex flex-col border mb-4 bg-accent p-2">
      <h4 className="h3-bold text-xs uppercase text-muted-foreground dark:text-cyan-500 mb-1">
        {headline}
      </h4>
      <ul className={isCheckBox ? "list-none" : ""}>
        {items.map((item, index) => {
          const isObject = typeof item === "object" && item !== null;
          const label = isObject ? item.label : item;
          const description =
            isObject && item.description ? item.description : null;

          return (
            <li key={index}>
              {isCheckBox && (
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-1"
                  checked={checkedItems[index] || false}
                  onChange={(e) => onToggle?.(index, e.target.checked)}
                  disabled={!checkable}
                  id={`checkbox-${label}`}
                />
              )}
              <label title={description ?? label} htmlFor={`checkbox-${label}`}>{label}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
