import { useState } from "react";
import OtpInput from 'react-otp-input';

export const OTPInput = ({setOTP, otp}:any) => {
  return (
    <OtpInput
      value={otp}
      onChange={setOTP}
      numInputs={6}
      inputStyle={{border:"1px solid white", color:"orange", borderRadius:"5px", backgroundColor:"#223256", margin:"0.5rem", width:"45px", height:"45px"}}
      renderInput={(props) => <input   {...props} />}
    />
  );
};
