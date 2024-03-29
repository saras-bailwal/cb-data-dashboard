import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
export interface Habits {
    id: number;
    name: string;
}

interface HabitsState {
    habits: Habits[]
}

const initialState: HabitsState = {
    habits: []
}

export const HabitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabits: (state, action: PayloadAction<Habits>) => {
            let isPresent = state.habits.some((el) => { return el.name === action.payload.name});
            if (!isPresent) {
                state.habits.push({
                    id: state.habits.length + 1,
                    name: action.payload.name
                })
            }
          
        },
        deleteHabit: (state, action: PayloadAction<{id:number}>) => {
            state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
        },
        updateHabitName: (state, action) => {
            state.habits.map((habit) => {
              if (habit.id === action.payload.id) {
                habit.name = action.payload.name;
              }
            });
        }
    }
})

export default HabitsSlice.reducer;
export const { addHabits, deleteHabit, updateHabitName } = HabitsSlice.actions;