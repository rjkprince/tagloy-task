import React, { useState } from "react";
import categories from "../constants/categories";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import _ from "lodash";

const initialState = categories.result.map((category) => {
  return {
    ...category,
    advertisers: category.advertisers.map((advertiser) => {
      return {
        ...advertiser,
        area: advertiser.area.map((ar) => {
          return {
            ...ar,
            selected: false,
          };
        }),
      };
    }),
  };
});
export default function Checkboxes() {
  const [data, setData] = useState(initialState);

  const handleChange = (category_id, city_id, area) => {
    let newState;
    const dataClone = _.cloneDeep(data);
    if (area) {
      newState = dataClone.map((category) => {
        if (category.id === category_id) {
          return {
            ...category,
            advertisers: category.advertisers.map((advertiser) => {
              if (advertiser.city_id === city_id) {
                return {
                  ...advertiser,
                  area: advertiser.area.map((ar) => {
                    if (ar.area === area) {
                      return {
                        ...ar,
                        selected: !ar.selected,
                      };
                    } else return ar;
                  }),
                };
              } else return advertiser;
            }),
          };
        } else return category;
      });
    } else if (city_id) {
      newState = dataClone.map((category) => {
        if (category.id === category_id) {
          return {
            ...category,
            advertisers: category.advertisers.map((advertiser) => {
              if (advertiser.city_id === city_id) {
                return {
                  ...advertiser,
                  area: advertiser.area.map((ar) => {
                    return {
                      ...ar,
                      selected: advertiser.area.some((ar) => ar.selected)
                        ? false
                        : true,
                    };
                  }),
                };
              } else return advertiser;
            }),
          };
        } else return category;
      });
    } else {
      newState = dataClone.map((category) => {
        if (category.id === category_id) {
          return {
            ...category,
            advertisers: category.advertisers.map((advertiser) => {
              return {
                ...advertiser,
                area: advertiser.area.map((ar) => {
                  return {
                    ...ar,
                    selected: category.advertisers.some((advertiser) =>
                      advertiser.area.some((ar) => ar.selected)
                    )
                      ? false
                      : true,
                  };
                }),
              };
            }),
          };
        } else return category;
      });
    }

    setData(newState);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {data.map((category) => {
        return (
          <>
            <FormControlLabel
              label={category.name}
              key={category.name}
              control={
                <Checkbox
                  checked={category.advertisers.every((advertiser) => {
                    return advertiser.area.every((ar) => ar.selected);
                  })}
                  indeterminate={
                    category.advertisers.some((advertiser) =>
                      advertiser.area.some((ar) => ar.selected)
                    ) &&
                    category.advertisers.some((advertiser) =>
                      advertiser.area.some((ar) => !ar.selected)
                    )
                  }
                  onChange={() => handleChange(category.id)}
                />
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {category.advertisers.map((advertiser) => {
                return (
                  <>
                    <FormControlLabel
                      label={advertiser.city.name}
                      key={advertiser.city.name}
                      control={
                        <Checkbox
                          checked={advertiser.area.every((ar) => {
                            return ar.selected;
                          })}
                          indeterminate={
                            advertiser.area.some((ar) => ar.selected) &&
                            advertiser.area.some((ar) => !ar.selected)
                          }
                          onChange={() =>
                            handleChange(category.id, advertiser.city_id)
                          }
                        />
                      }
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", ml: 3 }}
                    >
                      {advertiser.area.map((ar) => {
                        return (
                          <>
                            <FormControlLabel
                              label={ar.area}
                              key={ar.area}
                              control={
                                <Checkbox
                                  checked={ar.selected}
                                  onChange={() =>
                                    handleChange(
                                      category.id,
                                      advertiser.city_id,
                                      ar.area
                                    )
                                  }
                                />
                              }
                            />
                          </>
                        );
                      })}
                    </Box>
                  </>
                );
              })}
            </Box>
          </>
        );
      })}
    </Box>
  );
}
