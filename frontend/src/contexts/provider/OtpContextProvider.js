import React, { useState } from "react";
import  OtpContext  from "../contexts/OtpContext";

const OtpContextProvider = ({ children }) => {
    const [otp , setOtp] = useState({});

    return(
        <OtpContext.Provider value={{otp , setOtp }} >
            {children}
        </OtpContext.Provider>
    )
}

export default OtpContextProvider;