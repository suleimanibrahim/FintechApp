// import {
//     IUseOtpBlockCodeProps,
//     useOtpBlockCode,
//   } from "@/hooks/useOtpBlockCode";

//   import "./styles.css";
//   import styles from "./FormField.module.css";

//   type OTPFieldsProps = IUseOtpBlockCodeProps & {
//     isSmall?: boolean;
//     wrapperClassName?: string;
//   };
//   const OTPFields = ({
//     className,
//     isSmall,
//     wrapperClassName = "",
//     ...rest
//   }: OTPFieldsProps) => {
//     const isNumeric = (value: string) => /^\d+$/.test(value);

//     const onValidateBeforeChange = async (data: { value: string }) => {
//       return isNumeric(data.value);
//     };

//     const { ids, onCreateInputProps } = useOtpBlockCode({
//       ...rest,
//       onValidateBeforeChange:
//         rest?.onValidateBeforeChange || onValidateBeforeChange,
//     });

//     return (
//       <div className={`${styles?.OTPWrapper} mb-2 ${wrapperClassName}`}>
//         {ids.map((inputId:any, index:number) => {
//           const {
//             className = "",
//             value,
//             ...inputProps
//           } = onCreateInputProps(index);
//           return (
//             <input
//               {...inputProps}
//               key={inputId}
//               value={value}
//               className={`${styles?.OTPInput} ${
//                 value ? styles.OTPInputGradient : ""
//               } ${className}`}
//               {...(isSmall && { "data-small-input": true })}
//             />
//           );
//         })}
//       </div>
//     );
//   };

//   export default OTPFields;
