import React from 'react'
import { getPasswordStrength} from "../utils/getPasswordStrenth.js";
import { getColor } from "../utils/getColor.js";
import { getStrengthText } from "../utils/getStrengthText.js";
import PasswordCriteria from "./PasswordCriteria.jsx";

const PasswordStrengthMeter = ({password}) => {
    const strength = getPasswordStrength(password)
    const strengthText = getStrengthText(strength)
    return (
        <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Password Strength</span>
                  <span className="text-xs text-gray-400">{strengthText}</span>
              </div>
              <div className="flex space-x-1">
                  {
                      [...Array(4)].map((_, index) => (
                           <div key={index} className={`w-1/4 h-1 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-gray-400"}`} />
                      ))
                  }
              </div>
            <PasswordCriteria password={password}/>
        </div>
    )
}
export default PasswordStrengthMeter
