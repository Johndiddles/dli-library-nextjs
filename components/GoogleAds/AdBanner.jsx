import { useEffect } from "react";

const AdBanner = (props) => {
  let adsbygoogle =
    typeof window !== "undefined" ? window?.adsbygoogle : undefined;
    
  useEffect(() => {
    try {
      (window.adsbygoogle = adsbygoogle || []).push({});
    } catch (error) {
      console.log({ error });
    }
  }, [adsbygoogle]);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{ display: "block", overflow: "hidden" }}
      data-ad-client="ca-pub-2165309084228939"
      {...props}
    />
  );
};

export default AdBanner;
