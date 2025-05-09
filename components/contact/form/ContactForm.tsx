import React from "react";

export const ZoomCallForm = () => {
  return (
    <form className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book A Zoom Call</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input className="input" placeholder="Full Name*" />
        <input className="input" placeholder="WhatsApp Number*" />
        <input className="input col-span-2" placeholder="Work Email*" />
        <input className="input" placeholder="Company Name*" />
        <select className="input" defaultValue="">
          <option value="" disabled>
            What Is Your Budget *
          </option>
          {/* ...options */}
        </select>
        <input className="input" placeholder="Website*" />
        <select className="input" defaultValue="">
          <option value="" disabled>
            Industry*
          </option>
          {/* ...options */}
        </select>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        Let's Have A Chat And Work Together. Fill Up The Form And I Will Get
        Back To You Within 3 Hours.
      </p>
      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-orange-400 text-white font-bold text-lg">
        Submit
      </button>
    </form>
  );
};
