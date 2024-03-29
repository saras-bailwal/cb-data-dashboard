import { dailyHabitData } from "@/components/mockHabitData";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export interface DailyHabits {
    id: number;
    Date: string;
    habits: []
}

interface DailyHabitsState {
    dailyHabits: DailyHabits[]
}

// const initialState: DailyHabitsState =  {
//     dailyHabits: { value: dailyHabitData }
// }

export const DailyHabitsSlice = createSlice({
    name: 'dailyHabits',
    initialState: { value: dailyHabitData },
    reducers: {
        addDailyHabit: (state, action:PayloadAction<DailyHabits>) => {
            let isPresent = state.value.some((el) => { return el.Date === action.payload.Date});
            if (!isPresent) {
                state.value.push({
                    id: (action.payload.id).toString(),
                    Date: action.payload.Date,
                    habits: action.payload.habits
                })
            }
        },
        updateDailyHabit: (state, action: PayloadAction<DailyHabits>) => {
            state.value.map((dailyData,indx) => {
                    if (dailyData.Date === action.payload.Date) {
                        state.value[indx]['habits'] = action.payload.habits;
                      }
            })
        }
    }
})

export default DailyHabitsSlice.reducer;
export const { addDailyHabit, updateDailyHabit } = DailyHabitsSlice.actions;