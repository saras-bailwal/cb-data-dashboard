import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppDispatch } from '@/store/features/store';
import { addHabits, deleteHabit, updateHabitName } from '@/store/features/habitsSlice';
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from '@/store/features/store';

const Habits = () => {
    const name = useRef<string>("");
    const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const [habitName, setHabitName] = React.useState("");
  const [habitId, setHabitId] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
    setHabitName("");
    setIsEdit(false);
  };

  const handleClickEditOpen = (selectedObj: any) => {
    setIsEdit(true);
    setOpen(true);
    setHabitName(selectedObj.name);
    setHabitId(selectedObj.id);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const habitsList = useAppSelector(state=>state.habits.habits)
  const habitsCount = useAppSelector(state=>state.habits.habits.length)

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} disabled={habitsCount === 4}>
        { habitsCount === 4 ?  "Max 4 habits can be added, please delete a habit to add new": "Create Habit" }
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>{isEdit ? 'Edit Habit' : 'Add New Habit'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Habit Name"
            type="text"
            fullWidth
            variant="standard"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={() => {
            isEdit ? dispatch(updateHabitName({
                name: habitName,
                id: habitId
            }))
            :
            dispatch(addHabits({
                name: habitName,
                id: 0
            }))
          }}>{isEdit ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <table>
        <thead>
            <tr>
                <th style={{padding: '10px'}}>ID</th>
                <th style={{padding: '10px'}}>Name</th>
            </tr>
        </thead>
        <tbody>
            {habitsList.map((habit, index) => (
                <tr key={habit.id}>
                    <td style={{padding: '10px'}}>{index + 1}</td>
                    <td style={{padding: '10px'}}>{habit.name}</td>
                    <IconButton onClick={() => {handleClickEditOpen(habit)}}><EditOutlinedIcon/></IconButton>
                    <IconButton onClick={() => dispatch(deleteHabit({id: habit.id}))}><DeleteIcon/></IconButton>
                </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default Habits