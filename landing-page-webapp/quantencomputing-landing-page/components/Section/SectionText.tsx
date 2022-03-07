interface SectionTextProps {
  heading: string;
  paragraphs: Array<React.ReactNode>;
}

const SectionText = ({ heading, paragraphs }: SectionTextProps) => {
  return (
    <div className={"justify-center align-center text-xl mt-10"}>
      <h3 className={"text-3xl font-bold pb-4"}>{heading}</h3>
      {paragraphs.map((paragraph, index) => (<div key={index}>{paragraph}</div>))}
    </div>
  );
};

export default SectionText;
