import React from 'react'
import {Check, X} from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        {label: "At least 6 characters", met: password.length >= 6},
        {label: "contains Uppercase letter", met: /[A-Z]/.test(password)},
        {label: "contains Lowercase letter", met: /[a-z]/.test(password)},
        {label: "contains a number", met: /\d/.test(password)},
        {label: "contains special character", met: /[^A-Za-z0-9]/.test(password)},
    ]
   return (
       <div className="mt-2 space-y-1">
           {
               criteria.map((item) => (
                    <div key={item.label} className="flex items-center text-xs">
                        {
                            item.met? <Check className="size-4 text-green-500 mr-2"/> :
                                <X  className="size-4 text-gray-500 mr-2" />
                        }
                        <span className={item.met ? "text-green-500": "text-gray-500"}>{item.label}</span>
                    </div>
               ))
           }
       </div>
   )
};
const PasswordStrengthMeter = ({password}) => {
    const getStrength = (pass) => {

        let strength = 0
        if(pass.length >= 6) strength++
        if(pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++
        if(pass.match(/\d/)) strength++
        if(pass.match(/[^A-Za-z0-9]/)) strength++
        return strength

    }
    const strength = getStrength(password)
    const getColor = (strength) => {
        switch (strength) {
            case 0:
                return "bg-red-500"
            case 1:
                return "bg-red-400"
            case 2:
                return "bg-yellow-500"
            case 3:
                return "bg-yellow-500"
            default: return "bg-green-500"
        }
    }
    const getStrengthText = () => {
        switch (strength) {
            case 0:
                return "Very Weak"
            case 1:
                return "Weak"
            case 2:
                return "Fair"
            case 3:
                return "Good"
            default: return "Strong"
        }
    }
    return (
        <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Password Strength</span>
                  <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
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
