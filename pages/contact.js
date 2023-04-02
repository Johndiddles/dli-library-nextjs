import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import ButtonSpinner from "../components/Loader/ButtonSpinner";
import { axiosInstance } from "../globalFunctions/axiosInstance";

const { default: Head } = require("next/head");
const { default: Banner } = require("../components/Banner/Banner");

const ContactPage = () => {
  const [contactFormDetails, setContactFormDetails] = useState({
    full_name: "",
    contact_info: "",
    message: "",
  });

  const [submittingForm, setSubmittingForm] = useState(false);

  const submitContactForm = async (e) => {
    e.preventDefault();
    console.log({ contactFormDetails });

    setSubmittingForm(true);

    try {
      const response = await axiosInstance.post(
        "/create-contact-message",
        contactFormDetails
      );
      console.log({ response });

      if (response?.status === 201) {
        setContactFormDetails(() => ({
          full_name: "",
          contact_info: "",
          message: "",
        }));
        toast.success("Message sent successfully");
      } else {
        toast.success("An error occured");
      }

      setSubmittingForm(false);
    } catch (error) {
      console.log({ error });
      setSubmittingForm(false);
    }
  };
  return (
    <div>
      <Head>
        <title>Contact Us | DLI Library</title>
      </Head>

      <div className="w-full bg-gray-100 bg-opacity-95">
        <Banner
          title="Contact Us"
          imgUrl="https://images.unsplash.com/photo-1596670945993-7854448e5f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        />
        <section>
          <div className="w-full flex justify-center items-center px-8 py-14">
            <div className="w-full max-w-[600px] flex justify-center items-center">
              <form
                className="w-full pt-5 pb-8 flex flex-col gap-4 rounded-sm bg-white backdrop-blur-sm text-gray-400 relative"
                onSubmit={submitContactForm}
              >
                <p className="text-center  text-3xl font-semibold text-gray-600 font-raleway">
                  Send us a message
                </p>

                <div className="flex flex-col gap-3 px-5 lg:px-10">
                  <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
                    <label>
                      <FaLock />
                    </label>
                    <input
                      required
                      className="outline-none flex-grow"
                      value={contactFormDetails?.full_name}
                      onChange={(e) =>
                        setContactFormDetails((prev) => ({
                          ...prev,
                          full_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="flex gap-4 items-center py-2 px-4 border-b border-b-gray-300 ">
                    <label>
                      <HiMail />
                    </label>
                    <input
                      required
                      className="outline-none flex-grow"
                      value={contactFormDetails?.contact_info}
                      onChange={(e) =>
                        setContactFormDetails((prev) => ({
                          ...prev,
                          contact_info: e.target.value?.toLowerCase(),
                        }))
                      }
                      type="text"
                      placeholder="Email or Phone"
                    />
                  </div>

                  <div className="flex gap-4 items-center py-4 px-4 border-b border-b-gray-300 shadow-lg rounded ">
                    {/* <label>
                      <FaLock />
                    </label> */}
                    <textarea
                      rows={6}
                      required
                      className="outline-none flex-grow"
                      value={contactFormDetails?.message}
                      onChange={(e) =>
                        setContactFormDetails((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Message..."
                    />
                  </div>

                  <div className="w-full mt-2">
                    <button
                      className="w-full p-2 font-semibold bg-green-600 hover:bg-green-800 text-white duration-300 flex items-center gap-2 justify-center"
                      type="submit"
                      disabled={submittingForm}
                    >
                      {/* {submittingForm ? <ButtonSpinner /> : null} */}
                      {submittingForm ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
