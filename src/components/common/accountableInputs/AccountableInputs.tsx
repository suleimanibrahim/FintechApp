import "./styles.css";
import "./FormFields.css";
import React, { ComponentProps, ReactNode, useEffect, useState } from "react";
import { PasswordProps, Password } from "primereact/password";
import {
  InputNumber,
  InputNumberProps as InputNProps,
} from "primereact/inputnumber";
import BootstrapForm from "react-bootstrap/Form";
import {
  FieldAttributes,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
// import DataLoadingSpinner from "../Loaders/DataLoadingSpinner";
// import { InputProps } from "react-otp-input";
import { RxEyeClosed } from "react-icons/rx";
// import { Calendar } from "primereact/calendar";
// import Image from "next/image";
export type SelectOption = { name: string; value: string };
type TAccountableFormFieldLabelError = {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};
type ComponentName =
  | "password"
  | "input-text"
  | "select"
  | "date"
  | "phone-number"
  | "input-number";
type TypeObject = Record<ComponentName, ReactNode>;
type FormLabelProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  style?: ComponentProps<"label">["style"];
  withAsterisk?: boolean;
};
type AccountableFormFieldOtherProps = {
  labelClassName?: ComponentProps<"label">["className"];
  wrapperClassName?: ComponentProps<"div">["className"];
  label?: string;
  componentName?: ComponentName;
  labelAsterisk?: boolean;
  name: string;
  icon?: any;
};

type PasswordFieldProps = PasswordProps & TAccountableFormFieldLabelError & {};

type InputFieldProps = FieldAttributes<JSX.IntrinsicElements["input"]> &
  TAccountableFormFieldLabelError & {
    icon?: any;
  };

type SelectFieldProps = FieldAttributes<JSX.IntrinsicElements["select"]> &
  AccountableFormFieldOtherProps &
  Partial<TAccountableFormFieldLabelError> & {
    id?: string;
    name: string;
    optionLabel?: string;
    loading?: boolean;
  } & (
    | {
        value?: SelectOption;
        options: SelectOption[];
        valueSelector?: (value: SelectOption) => string;
        onValueChange?: (value: SelectOption) => void;
      }
    | {
        value?: string;
        options: string[];
        valueSelector?: (value: string) => string;
        onValueChange?: (value: string) => void;
      }
  );

type InputNumberProps = InputNProps &
  Partial<TAccountableFormFieldLabelError> &
  AccountableFormFieldOtherProps & {};

type PhoneNumberFieldProps = FieldAttributes<JSX.IntrinsicElements["input"]> &
  Partial<TAccountableFormFieldLabelError> &
  AccountableFormFieldOtherProps & {};

type AccountableFormFieldProps =
  | ({
      componentName?: "input-text";
    } & FieldAttributes<AccountableFormFieldOtherProps>)
  | ({
      componentName?: "password";
    } & FieldAttributes<AccountableFormFieldOtherProps> &
      PasswordProps)
  | ({
      componentName?: "select";
    } & SelectFieldProps)
  | ({
      componentName?: "date";
    } & FieldAttributes<AccountableFormFieldOtherProps>)
  | ({
      componentName?: "phone-number";
    } & PhoneNumberFieldProps)
  | ({
      componentName?: "input-number";
    } & InputNumberProps);

const AccountableFormField = (
  props: AccountableFormFieldProps & {
    multiSelect?: boolean;
    dateRange?: any;
    setDateRange?: any;
    startDateName?: string;
    endDateName?: string;
    editedValue?: any;
    icon?: any;
  }
) => {
  const [hasError, setHasError] = useState(false);
  const {
    wrapperClassName,
    labelAsterisk,
    multiSelect,
    dateRange,
    startDateName,
    endDateName,
    setDateRange,
    editedValue,
    icon,
    componentName = "input-text",
    ...rest
  } = props;

  const typeObj: TypeObject = {
    "input-text": (
      <InputField
        {...(rest as any)}
        hasError={hasError}
        icon={icon}
        setHasError={setHasError}
      />
    ),

    password: (
      <PasswordField
        {...(rest as any)}
        hasError={hasError}
        icon={icon}
        setHasError={setHasError}
      />
    ),

    date: (
      <DateInputField
        {...(rest as any)}
        hasError={hasError}
        multiSelect={multiSelect}
        editedValue={editedValue}
        startDateName={startDateName}
        endDateName={endDateName}
        setDateRange={setDateRange}
        dateRange={dateRange}
        setHasError={setHasError}
      />
    ),

    select: (
      <SelectField
        {...(rest as any)}
        hasError={hasError}
        setHasError={setHasError}
      />
    ),
    "phone-number": (
      <PhoneNumberField
        {...(rest as any)}
        hasError={hasError}
        setHasError={setHasError}
      />
    ),
    "input-number": (
      <InputNumberField
        {...(rest as any)}
        hasError={hasError}
        setHasError={setHasError}
      />
    ),
  };

  return (
    <div className={`wrapper ${wrapperClassName}`}>
      {props.label && (
        <FormLabel
          label={props.label}
          htmlFor={props.id || props.name}
          className={`labelStyle ${hasError ? "labelErrorStyle" : undefined} ${
            props.labelClassName
          }`}
          withAsterisk={labelAsterisk}
        />
      )}
      {typeObj[componentName]}
      <FormFieldErrorMessage name={props.name} />
    </div>
  );
};

export default AccountableFormField;

export const FormLabel = ({
  label,
  className = "",
  withAsterisk,
  ...rest
}: FormLabelProps) => {
  return (
    <BootstrapForm.Label {...rest} className={`labelStyle ${className}`}>
      {label}
      {withAsterisk && <span className="text-danger">*</span>}
    </BootstrapForm.Label>
  );
};

export const InputField = (props: InputFieldProps) => {
  const [focus, setFocus] = useState(false);
  const {
    className = "",
    disabled,
    icon,
    setHasError,
    hasError,
    ...rest
  } = props;

  const [field, meta] = useField<any>(rest);

  useEffect(() => {
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };
  return (
    <BootstrapForm.Control
      {...(rest as any)}
      {...(field as any)}
      onBlur={(e: any) => {
        field?.onBlur?.(e);
        rest?.onBlur?.(e as any);
        _onBlur();
      }}
      onFocus={(e: any) => {
        _onFocus();
        rest?.onFocus?.(e as any);
      }}
      placeholder={icon + " " + rest?.placeholder}
      id={rest?.id || rest?.name}
      className={`formControlStyle ${
        Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
      } ${
        meta?.error && meta?.touched ? "formControlStyleError" : ""
      } ${className} `}
      disabled={disabled}
    />
  );
};

export const DateInputField = (
  props: InputFieldProps & {
    multiSelect?: boolean;
    setDateRange?: any;
    dateRange?: any;
    startDateName: string;
    editedValue: any;
    endDateName: string;
  }
) => {
  const [focus, setFocus] = useState(false);
  const {
    className = "",
    disabled,
    setHasError,
    setDateRange,
    dateRange,
    hasError,
    multiSelect = false,
    startDateName,
    endDateName,
    editedValue,
    ...rest
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<any>(rest);
  const [startDate, setStartDate] = useState(dateRange ? dateRange[0] : "");
  const [endDate, setEndDate] = useState(dateRange ? dateRange[1] : "");

  useEffect(() => {
    if (editedValue) {
      setStartDate(editedValue?.startDate);
      setEndDate(editedValue?.endDate);
    }
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError, editedValue]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    setFieldValue(startDateName, newStartDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    setFieldValue(endDateName, newEndDate);
  };

  return multiSelect ? (
    <div
      className={`${className} flex border items-center border-gray-300 rounded-md overflow-hidden w-[70%]`}
    >
      <input
        type="date"
        name={startDateName}
        readOnly={editedValue?.journal_date}
        value={startDate}
        onChange={handleStartDateChange}
        onBlur={(e: any) => {
          field?.onBlur?.(e);
          rest?.onBlur?.(e);
          _onBlur();
        }}
        onFocus={(e: any) => {
          _onFocus();
          rest?.onFocus?.(e);
        }}
        placeholder={rest?.placeholder}
        id={`${startDateName}`}
        className={`flex-grow-1 border-none  focus:outline-none   ${
          Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
        } ${
          meta?.error && meta?.touched ? "formControlStyleError" : ""
        } ${className}`}
        disabled={disabled}
      />
      <span>-</span>
      <input
        type="date"
        name={endDateName}
        value={endDate}
        readOnly={editedValue?.journal_date}
        onChange={handleEndDateChange}
        onBlur={(e: any) => {
          field?.onBlur?.(e);
          rest?.onBlur?.(e);
          _onBlur();
        }}
        onFocus={(e: any) => {
          _onFocus();
          rest?.onFocus?.(e);
        }}
        placeholder={rest?.placeholder}
        id={`${endDateName}`}
        className={`border-none  flex-grow-1  focus:outline-none  ${
          Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
        } ${
          meta?.error && meta?.touched ? "formControlStyleError" : ""
        } ${className}`}
        disabled={disabled}
      />
    </div>
  ) : (
    <input
      type="date"
      {...rest}
      {...field}
      onBlur={(e: any) => {
        field?.onBlur?.(e);
        rest?.onBlur?.(e);
        _onBlur();
      }}
      onFocus={(e: any) => {
        _onFocus();
        rest?.onFocus?.(e);
      }}
      placeholder={rest?.placeholder}
      id={rest?.id || rest?.name}
      className={`text-[14px] font-normal ${
        Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
      } ${
        meta?.error && meta?.touched ? "formControlStyleError" : ""
      } ${className}`}
      disabled={disabled}
    />
  );
};

export const PasswordField = ({
  className = "",
  hasError,
  setHasError,
  icon,
  ...rest
}: PasswordFieldProps) => {
  const [focus, setFocus] = useState(false);
  const [field, meta] = useField<any>(rest as any);
  const [show, setShow] = useState(false);

  useEffect(() => {
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };

  return (
    // <Password
    //   {...(rest as any)}
    //   {...(field as any)}
    //   onBlur={(e) => {
    //     field?.onBlur?.(e);
    //     rest?.onBlur?.(e as any);
    //     _onBlur();
    //   }}
    //   onFocus={(e) => {
    //     _onFocus();
    //     rest?.onFocus?.(e as any);
    //   }}
    //   id={rest?.id || rest?.name}
    //   feedback={rest?.feedback || false}
    //   toggleMask={false} // Disable the default toggle mask
    //   toggleMaskIcon={<RxEyeClosed />} // Set the toggle mask icon
    //   className={`${styles.formControlStyle} ${
    //     Boolean(field?.value) && !focus ? styles.formControlStyleGradient : ""
    //   } ${
    //     meta?.error && meta?.touched ? styles.formControlStyleError : ""
    //   } ${className} `}
    //   inputClassName={`${styles.passwordInputStyle} ${
    //     meta?.error && meta?.touched ? styles.inputErr : ""
    //   }`}
    // />

    <div className="password-container">
      <span onClick={() => setShow(!show)} className="passwordSpan">
        {show ? <RxEyeClosed /> : "show"}
      </span>
      <input
        type={show ? "text" : "password"}
        {...(rest as any)}
        {...(field as any)}
        onBlur={(e) => {
          field?.onBlur?.(e);
          rest?.onBlur?.(e as any);
          _onBlur();
        }}
        onFocus={(e) => {
          _onFocus();
          rest?.onFocus?.(e as any);
        }}
        placeholder={icon + " " + rest?.placeholder}
        id={rest?.id || rest?.name}
        feedback={rest?.feedback || false}
        className={`formControlStyle ${
          Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
        } ${
          meta?.error && meta?.touched ? "formControlStyleError" : ""
        } ${className} `}
      />
    </div>
  );
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    valueSelector,
    hasError,
    setHasError,
    options,
    optionLabel = "name",
    onValueChange,
    className = "",
    loading,
    ...rest
  } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(rest as any);
  useEffect(() => {
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const isSelectionOptionsPredicate = (
    options: SelectOption[] | string[]
  ): options is SelectOption[] => {
    return (options?.[0] as SelectOption)?.name !== undefined;
  };

  const _onChange = (e: DropdownChangeEvent) => {
    const val = e.value;
    let option;

    if (isSelectionOptionsPredicate(options)) {
      option =
        options.find((option: any) => option.value === val) ??
        ({} as SelectOption);
    } else {
      option = options.find((option: any) => option === val) ?? "";
    }
    onValueChange?.(option as any);
    setFieldValue(field.name, val);
    // console.log(options, option, val);
  };

  return (
    <Dropdown
      data-error={meta?.error && meta?.touched}
      {...(rest as any)}
      {...field}
      onChange={_onChange}
      options={options}
      optionLabel={
        !isSelectionOptionsPredicate(options) ? undefined : optionLabel
      }
      // dropdownIcon={(opts) =>
      //   loading ? <DataLoading /> : <DropdownIcon {...opts.iconProps} />
      // }
      className={`text-[12px] formControlStyle ${
        Boolean(field?.value) ? "formControlStyleGradient" : ""
      } ${
        meta?.error && meta?.touched ? "formControlStyleError" : ""
      } ${"selectField"} ${className}`}
    />
  );
};

// const DataLoading = () => {
//   return (
//     <div>
//       <DataLoadingSpinner main={false} small noPadding />
//     </div>
//   );
// };
const DropdownIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M13.2801 5.96582L8.93343 10.3125C8.42009 10.8258 7.58009 10.8258 7.06676 10.3125L2.72009 5.96582"
        stroke="#848382"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PhoneNumberField = (props: PhoneNumberFieldProps) => {
  const [focus, setFocus] = useState(false);
  const { setHasError, hasError, className = "", ...rest } = props;
  const [field, meta] = useField(rest);
  useEffect(() => {
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };

  return (
    <InputGroup
      className={`phoneFieldWrapper ${
        Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
      } ${meta?.error && meta?.touched ? "formControlStyleError" : ""} ${
        focus ? "phoneNumberFieldFocus" : ""
      } ${className} phoneFieldWrapper`}
    >
      <Dropdown
        id="dialCode"
        value={"+234"}
        dropdownIcon={
          <img
            className="flagIcon"
            src="/assets/images/student/studentNgIcon.svg"
            alt=""
            width={20}
            height={20}
          />
        }
        options={[{ label: "+234", value: "+234", disabled: true }]}
        className={`countrySelectBox dialCodeStyle`}
        // disabled
      />
      <BootstrapForm.Control
        {...(rest as any)}
        {...(field as any)}
        onBlur={(e: any) => {
          field?.onBlur?.(e);
          rest?.onBlur?.(e as any);
          _onBlur();
        }}
        onFocus={(e: any) => {
          _onFocus();
          rest?.onFocus?.(e as any);
        }}
        inputMode={rest?.inputMode || "tel"}
        placeholder={rest?.placeholder}
        id={rest?.id || rest?.name}
        className={`phoneFieldInput "passwordInputStyle ${
          meta?.error && meta?.touched ? "inputErr" : ""
        }`}
      />
    </InputGroup>
  );
};

export const InputNumberField = (props: InputNumberProps) => {
  const [focus, setFocus] = useState(false);
  const {
    className = "",
    minFractionDigits = 2,
    disabled,
    setHasError,
    hasError,
    ...rest
  } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(rest as any);

  useEffect(() => {
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };
  const changeValue = async (e: any) => {
    setFieldValue(field.name, e.value);
  };

  return (
    <InputNumber
      {...(rest as any)}
      {...(field as any)}
      name={field?.name}
      value={field?.value}
      onBlur={(e) => {
        rest?.onBlur?.(e as any);
        _onBlur();
        field?.onBlur?.(e);
      }}
      onFocus={(e) => {
        _onFocus();
        rest?.onFocus?.(e as any);
      }}
      onChange={changeValue}
      onValueChange={changeValue}
      minFractionDigits={minFractionDigits}
      placeholder={rest?.placeholder}
      id={rest?.id || rest?.name}
      className={`formControlStyle ${
        Boolean(field?.value) && !focus ? "formControlStyleGradient" : ""
      } ${
        meta?.error && meta?.touched ? "formControlStyleError" : ""
      } ${className} money`}
      disabled={disabled}
      data-error={meta?.error && meta?.touched}
    />
  );
};

export const FormFieldErrorMessage = (props: { name: string }) => {
  return (
    <ErrorMessage
      name={props.name}
      component="div"
      className={`errorMessage`}
    />
  );
};
