import { useMessage } from '../context/MessageContext';

function MessageDisplay() {
  const { message } = useMessage();

  if (!message) return null;

  const { text, type } = message;
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-md z-50`}>
      {text}
    </div>
  );
}

export default MessageDisplay;