interface CharacterInfoProps {
  headline: string;
  content: string | string[];
}

export const CharacterInfo = ({ headline, content }: CharacterInfoProps) => {
  return (
    <div className="flex flex-col border-1 mb-4 bg-accent p-2">
      <h4 className="h3-bold text-xs uppercase text-muted-foreground mb-1">{headline}</h4>
      {Array.isArray(content) ? (
        content.map((item, index) => (
          <ul key={index}>
            <li>{item}</li>
          </ul>
        ))
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
};
