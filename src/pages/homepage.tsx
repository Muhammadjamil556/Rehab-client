import Navbar from "../components/global/navbar";
import backImage from "../assets/therapy.jpg";

type Props = {};

const testimonials = [
  {
    name: "Nat Reynolds",
    position: "Chief Accountant",
    quote:
      "Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Celia Almeda",
    position: "Secretary",
    quote:
      "Pharetra vel turpis nunc eget lorem. Quisque id diam vel quam elementum pulvinar etiam. Urna porttitor rhoncus dolor purus non enim praesent elementum.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Bob Roberts",
    position: "Sales Manager",
    quote:
      "Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin. Nibh nisl dictumst vestibulum rhoncus est pellentesque elit.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const HomePage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div>
        <div
          className="bg-no-repeat bg-cover bg-opacity-90"
          style={{
            backgroundImage: `url(${backImage})`,
          }}
        >
          <div className="flex flex-col h-[88vh] text-center items-center justify-center p-10">
            <h1 className="text-3xl font-bold text-white mb-3">
              Online PhysioTherapy with Rehab Tech
            </h1>
            <div>
              <h3 className="text-2xl text-white mb-2">
                Start Feeling Better In As Few As 3 Visits.
              </h3>
            </div>
          </div>
        </div>

        <div>
          <div className="py-16 bg-gray-100 text-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-green-800">
                What Clients Say
              </h2>
              <p className="text-gray-600 mt-4 text-lg">
                We place huge value on strong relationships and have seen the
                benefit they bring to our business. Customer feedback is vital
                in helping us to get it right.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-gray-300 mb-4"
                  />
                  <h3 className="text-xl font-bold text-green-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 mb-2">{testimonial.position}</p>
                  <p className="italic text-gray-700 relative">
                    <span className="absolute -left-4 -top-2 text-4xl text-green-800">
                      “
                    </span>
                    {testimonial.quote}
                    <span className="absolute -right-4 -bottom-2 text-4xl text-green-800">
                      ”
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
