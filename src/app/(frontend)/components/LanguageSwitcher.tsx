"use client";

import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemText
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocaleStore } from "../store/useLocaleStore";

const options: ("en" | "ua" | "ru" | "pl" | "all")[] = ["en", "ua", "ru", "pl"];

const languageLabels: Record<"en" | "ua" | "ru" | "pl" | "all", string> = {
  en: "English",
  ua: "Українська",
  ru: "Русский",
  pl: "Polski",
  all: "ALL",
};

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocaleStore();
  const currentLocale = locale ?? "en";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: "pl" | "en" | "ua" | "ru" | "all") => {
    setLocale(option);
    document.cookie = `locale=${option}; path=/`;
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button
      sx={{display:"flex",width:"fit-content", backgroundColor:"#8d004c"}}
        variant="contained"

        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {languageLabels[currentLocale as "en" | "ua" | "ru" | "pl" | "all"] ||
          currentLocale.toUpperCase()}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            <ListItemText primary={languageLabels[option]} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
