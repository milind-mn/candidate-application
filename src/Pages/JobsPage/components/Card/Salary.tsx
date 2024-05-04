import React, { memo } from "react";
import { Typography } from "@mui/material";
import { CURRENCY_MAPPER } from "./constants";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface Props {
  salaryCurrencyCode: string;
  minimumSalary: number | null;
  maximumSalary: number | null;
}

export const EstimatedSalary: React.FC<Props> = memo(
  ({ salaryCurrencyCode = "", minimumSalary = null, maximumSalary = null }) => {
    const currencySymbol: string =
      CURRENCY_MAPPER?.[salaryCurrencyCode.toLowerCase()]?.symbol;
    const currencySuffix: string | undefined =
      CURRENCY_MAPPER?.[salaryCurrencyCode.toLowerCase()]?.suffix;
    const currencyAbbreviation: string | undefined =
      CURRENCY_MAPPER?.[salaryCurrencyCode.toLowerCase()]?.abbreviation;

    const displayAmount = (amount: number): string => {
      return `${amount}${currencySuffix ? currencySuffix : ""}`;
    };

    return (
      <Typography
        sx={{ fontSize: 14, display: "flex", alignItems: "center" }}
        color="text.primary"
        gutterBottom
      >
        {`Estimated Salary: ${currencySymbol} ${
          minimumSalary != null ? displayAmount(minimumSalary) : ""
        } ${minimumSalary != null && maximumSalary != null ? "-" : ""} ${
          maximumSalary != null ? displayAmount(maximumSalary) : ""
        } ${currencyAbbreviation ? currencyAbbreviation : ""}`}
        <CheckBoxIcon sx={{ ml: 0.5 }} color="success" />
      </Typography>
    );
  }
);
