import QRCodeCard from "./QRcard";

const QuickChatSection: React.FC = () => {
  return (
    <div className="bg-white rounded-t-3xl mt-[-2rem] p-8">
      <h2 className="text-3xl font-bold text-center mb-2">Quick Chat!</h2>
      <p className="text-center text-gray-500 mb-8">
        Want To Ask A Quick Question.. Or Say Hello?
      </p>
      <div className="flex justify-center gap-8"></div>
      <QRCodeCard label="Whatsapp" />
      <QRCodeCard label="Instagram" />
    </div>
  );
};

export default QuickChatSection;
