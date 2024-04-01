import * as React from "react";

export default function MyComponent(props) {
  return (
    <div className="bg-white flex flex-col">
      <div className="flex-col items-center overflow-hidden self-stretch relative flex min-h-[309px] w-full justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
        <img
          loading="lazy"
          src="\img\publicPagesIMG\bgimg.jpg"
          className="absolute h-full w-full object-cover object-center inset-0"
          alt="About Us"
        />
        <div className="relative max-w-[1320px] flex w-full flex-col pl-3 pr-20 py-12 items-start max-md:max-w-full max-md:pr-5">
          <div className="text-white text-6xl font-black leading-[76.8px] whitespace-nowrap max-md:text-4xl">
            About Us
          </div>
          <div className="flex items-stretch gap-2 mt-4">
            <div className="text-white text-base leading-6 uppercase">Home</div>
            <div className="text-blue-50 text-base leading-6 uppercase">/</div>
            <div className="text-blue-600 text-base leading-6 uppercase">
              About
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout for Equal Size Boxes */}
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-blue-100 rounded-lg shadow flex items-center justify-center">
            <img src="img\about1.jpg" alt="Global Learning" className="rounded-lg h-full w-full object-cover" />
          </div>
          {/* Text */}
          <div className="bg-blue-100 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-800">Our Vision</h2>
            <p className="mt-2 text-md text-gray-600 text-justify">
              Our vision is to revolutionize healthcare
              delivery by seamlessly integrating technology
              into every facet of patient care. We envision a
              future where patients experience unparalleled convenience,
              efficiency, and personalized care throughout their outpatient
              journey. Our system will empower healthcare providers 
              with cutting-edge tools for streamlined scheduling, patient tracking, 
              and data management, enabling them to focus more on delivering quality care. 
            </p>
          </div>
          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-blue-100 rounded-lg shadow p-4">
              <span className="text-3xl font-bold text-gray-800">3.5</span>
              <p className="text-md text-gray-600">Years&apos; Experience</p>
            </div>
            <div className="text-center bg-blue-100 rounded-lg shadow p-4">
              <span className="text-3xl font-bold text-gray-800">23</span>
              <p className="text-md text-gray-600">Skilled Doctors</p>
            </div>
            <div className="text-center bg-blue-100 rounded-lg shadow p-4">
              <span className="text-3xl font-bold text-gray-800">830+</span>
              <p className="text-md text-gray-600">Positive Reviews</p>
            </div>
            <div className="text-center bg-blue-100 rounded-lg shadow p-4">
              <span className="text-3xl font-bold text-gray-800">100K</span>
              <p className="text-md text-gray-600">Trusted Patients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}