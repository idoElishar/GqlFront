import {AppBar,Toolbar,Button,Stack,Typography,TextField,} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import UserProfile from "./UserActions";
import { useEffect, useState } from "react";
import { SearchResult } from "../../interface/interface";
import { allBannersForSearch, searchBanner } from "../../../services/banners2.service";

export default function Header() {
  const Navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (searchQuery: string) => {
    const banner = await searchBanner(searchQuery);
    setSearchResults(banner!);
  };
  
  useEffect(() => {
    const loadInitialSearchResults = async () => {
      const banners = await allBannersForSearch();
      setSearchResults(banners!);
    };
    loadInitialSearchResults();
  }, []);

  if (!userName) {
    Navigate("/banner/");
  }

  const homePage = () => {
    Navigate(`/banner/userBanners`);
  };
  const handleAddBanner = () => {
    Navigate("/banner/allProduct");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            flexGrow: 1,
          }}
        >
          <UserProfile />
          <Typography variant="h6" sx={{ marginLeft: "0.5rem" }}>
            {JSON.parse(userName!)}
          </Typography>
        </Stack>

        <Typography
          onClick={homePage}
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { md: "flex" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
            marginLeft: "15rem",
          }}
        >
          BANNERS
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Autocomplete
            freeSolo
            options={searchResults}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            onChange={(_, value) => {
              if (typeof value !== "string" && value?.id) {
                Navigate(`/banner/bannerPage/${value.id}`);
              }
            }}
            onInputChange={(_, newInputValue) => {
              if (newInputValue.length > 2) {
                handleSearch(newInputValue);
              }
            }}
            renderInput={(params) => (
              <TextField

                {...params}
                label="Search Banner"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  startAdornment: (
                    <SearchIcon sx={{ color: "white", marginRight: "10px" }} />
                  ),
                }}
                sx={{
                  width: 300,
                  backgroundColor: "#333",
                  borderRadius: "4px",
                  color: "white",
                  ".MuiInputLabel-root": {
                    color: "white",
                  },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            )}
          />
          <Button
            sx={{
              height:"80%"
            }}
            variant="outlined"
            onClick={handleAddBanner}
            style={{
              borderColor: "white",
              color: "white",
              marginLeft: ".5rem",
              marginTop: ".6rem"
            }}
          >
            ADD BANNER
          </Button>
          <Stack
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: ".5rem" }}
          >
            <HomeOutlinedIcon onClick={homePage} sx={{ color: "white" }} />
          </Stack>
        </div>
      </Toolbar>
    </AppBar>
  );
}
