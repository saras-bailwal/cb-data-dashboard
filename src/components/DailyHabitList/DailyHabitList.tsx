import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "@/store/features/store";
import { Button, IconButton, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addDailyHabit, updateDailyHabit } from "@/store/features/dailyHabitsSlice";
import DailyHabitEdit from "../DailyHabitEdit";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';

const DailyHabitList = () => {
  const dailyHabitsList = useAppSelector((state) => state.dailyHabits.value);
  const habitsList = useAppSelector((state) => state.habits.habits);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [dateParam, setDateParam] = React.useState("");
  const [habitsData, setHabitsData] = React.useState([]);

  const [todayExists, setTodayExistence] = React.useState(false);

  const handleClickOpen = (dailyHab: any) => {
    // setDateParam(dailyHab.Date);
    // setHabitsData(dailyHab.habits);
    // setOpen(true);
    return (
            <DailyHabitEdit />
        )
  };
  const fetchMoreData = () => {
    setTimeout(() => {
           dailyHabitsList.concat(Array.from({ length: 20 }))
      }, 1500);
  }
  const handlePrintSection = (dailyHabDate: any) => {
    var today = moment();
    var yesterday = moment().subtract(1, 'day');
    
    if(moment(dailyHabDate).isSame(today, 'day')) {
        return "Today";
    } else if (!todayExists) {
        let todays = moment().format('YYYY-MM-DD');
        let newhabitslist: any = [];
        habitsList.map((habit: any) => {
            let habitName = habit['name'];
            let obj: any = {};
            obj[habitName] = false;
            newhabitslist.push(obj)
        })
        dispatch(addDailyHabit({
            Date: todays,
            habits: newhabitslist,
            id: 0
        }))
        setTodayExistence(true);
    }
    else if(moment(dailyHabDate).isSame(yesterday, 'day')) {
        return ("Yesterday" +' - ' + dailyHabDate);
    } else {
        return (moment(dailyHabDate).format('dddd') + ' - '+dailyHabDate);
    }
  }
  return (
    <InfiniteScroll
          dataLength={dailyHabitsList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
    <List sx={{ width: "100%", maxWidth: 760, bgcolor: "darkslategray" }}>
      {dailyHabitsList.map((dailyHab) => {
        return (
          <>
            <div key={dailyHab.id} style={{display: 'flex', alignItems: 'center',
    justifyContent: 'space-evenly'}}>
            <ArrowCircleRightIcon />
            <p>{handlePrintSection(dailyHab.Date)}</p>
            <IconButton edge="end" aria-label="delete" key={dailyHab.id} onClick={() => {handleClickOpen(dailyHab)}}>
                <EditOutlinedIcon />
            </IconButton>
            </div>
            <div style={{display: 'flex',
    justifyContent: 'center'}}>
            {
                dailyHab.habits.map((hab: any, idx: any) => {
                    const keyVal = Object.keys(hab)[0];
                    const valKeys = Object.values(hab)[0];
                    return (
                      <>
                        <React.Fragment key={idx}>
                          <FormGroup>
                            <FormControlLabel
                              disabled
                              control={
                                <Checkbox
                                  defaultChecked={valKeys ? true : false}
                                />
                              }
                              label={keyVal}
                            />
                          </FormGroup>
                        </React.Fragment>
                      </>
                    );
                  })}
            </div>
            <Divider variant="inset" component="li" />
          </>
        );

          function newFunction() {
              return handlePrintSection(dailyHab);
          }
      })}
    </List>
    </InfiniteScroll>
  );
};

export default DailyHabitList;
