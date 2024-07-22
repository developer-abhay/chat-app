import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ placeholder, onChange, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        width: "100%",
        height: "40px",
        borderRadius: "20px",
        mb: 1,
        p: 2,
      }}
    >
      <SearchIcon />
      <TextField
        autoComplete="off"
        size="small"
        sx={{
          "& fieldset": { border: "none" },
          background: "transparent",
          width: "100%",
        }}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </Box>
  );
};

export default SearchInput;
