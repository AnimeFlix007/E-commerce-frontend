import { toast } from "react-toastify";

export const displayRazorPay = async (amount) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    toast.info("Something went wrong!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  const options = {
    key: "rzp_test_ZLNI9QNCLztFk3",
    currency: "INR",
    amount: amount * 100,
    name: "FootPrynt Pride",
    description: "Thanks for Purchasing",
    image: "https://i.imgur.com/Zb3NMb2.png",

    handler: function (res) {
      console.log(res);
      toast.success("SuccessFull Payment!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

const loadScript = (src) => {
  return new Promise((res, rej) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      res(true);
    };

    script.onerror = () => {
      rej(false);
    };

    document.body.appendChild(script);
  });
};