"use client";

interface pubPageTopContainerProps {
  title: string;
  path: string[];
}

export default function pubPageTopContainer({
  title,
  path,
}: pubPageTopContainerProps) {
  const pathElement = path.map((element, index) => {
    return (
      <div key={index} className="flex items-stretch justify-between gap-2 ">
        {index !== 0 && (
          <div className="text-base leading-6 uppercase text-blue-50">/</div>
        )}
        <div
          className={
            "text-base leading-6  uppercase" +
            " " +
            (index === path.length - 1 ? " text-blue-600 " : "text-white")
          }
        >
          {element}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="mainContainer1">
        {/* <img
          loading="lazy"               
          srcSet="..."
          className="absolute inset-0 object-cover object-center w-full h-full"
        /> */}
        <div className="containerMiddle">
          <div className="containerText1">{title}</div>
          <div className="containerText2dev">{pathElement}</div>
        </div>
      </div>
    </>
  );
}
