import QRCodeCard from "./QRcard";

const QuickChatSection: React.FC = () => {
  return (
    <div className="bg-white h-[467px] flex flex-col md:flex-row items-center justify-center p-8 ">
      {/* Text Container */}
      <div className="text-center items-center w-1/2 mb-8 md:mb-0">
        <h2 className="text-[48px] md:w-full md:text-[66px] font-bold text-black leading-tight syne-unique mb-4">
          Quick Chat!
        </h2>
        <p className="max-w-[520px] mx-auto leading-tight text-[18px] md:text-[25px] text-gray-500">
          Want To Ask A Quick Question.. Or Say Hello?
        </p>
      </div>
      {/* QR Code Cards */}
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:w-1/2">
        <QRCodeCard label="Whatsapp" />
        <QRCodeCard label="Instagram" />
      </div>
    </div>
  );
};

export default QuickChatSection;
