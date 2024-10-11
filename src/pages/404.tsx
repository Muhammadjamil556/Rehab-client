import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-lg mb-3">
        The page you're looking for is still under construction or not available
        🚧
      </p>
      <p className="text-sm mb-8">
        But not to worry because HazenAI is always working. 🙌
      </p>
      <Link to="/">
        <p className="text-blue-400 hover:underline">Return Home</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
