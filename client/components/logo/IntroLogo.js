import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    textAlign: "center",
    marginBottom: "20px",
    "& img": {
      width: "100%",
      maxWidth: "240px",
    },
  },
}));

const IntroLogo = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.logo}>
      <Link href="/">
        <a>
          <Image
            src="/images/logo.svg"
            width={240}
            height={68}
            alt="Logo"
            loading="eager"
            layout="intrinsic"
          />
        </a>
      </Link>
    </div>
  );
};

export default IntroLogo;
